import type Database from "better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { ChemicalRepository } from "../data/repositories/chemicalRepository.js";
import { ReactionRepository } from "../data/repositories/reactionRepository.js";
import { resolveReaction, generateProcessBreakdown, type ChemicalLookupPort } from "../chemistry-engine/reactionResolver.js";
import { computeStoichiometry } from "../chemistry-engine/stoichiometry.js";
import { computeCalorimetry } from "../chemistry-engine/calorimetry.js";
import { parseFormula } from "../chemistry-engine/formulaParser.js";
import { computeMolarMass } from "../chemistry-engine/molarMass.js";
import { aiReactionPredictor, type PredictReactionOptions } from "./aiReactionPredictor.js";
import { chemrxnService } from "./chemrxnService.js";
import { HttpError } from "../utils/errors.js";
import type {
  CalorimetryResult,
  Chemical,
  ReactionConditions,
  ReactionInputSpecies,
  ReactionResolution,
  StoichiometryLine,
  ObservableEffect,
} from "../chemistry-engine/types.js";
import { logger } from "../utils/logger.js";

const prisma = new PrismaClient();

export interface SimulationResult {
  resolution: ReactionResolution;
  stoichiometry?: StoichiometryLine[];
  limitingReagentChemicalId?: string;
  calorimetry?: CalorimetryResult;
}

export class SimulationService {
  private readonly chemicalRepo: ChemicalRepository;
  private readonly reactionRepo: ReactionRepository;
  private readonly lookup: ChemicalLookupPort;

  constructor(db: Database.Database) {
    this.chemicalRepo = new ChemicalRepository(db);
    this.reactionRepo = new ReactionRepository(db);
    this.lookup = {
      getById: (id) => this.chemicalRepo.getById(id),
      findByComposition: (composition, charge) => this.chemicalRepo.findByComposition(composition, charge),
      findCuratedReactionsByReactantSet: (ids) => this.reactionRepo.findByReactantSet(ids),
    };
  }

  private resolveChemicalsOrThrow(inputs: ReactionInputSpecies[]): Chemical[] {
    const chemicals: Chemical[] = [];
    const missing: string[] = [];
    for (const input of inputs) {
      let chem = this.chemicalRepo.getById(input.chemicalId);
      if (!chem && input.formula) {
        try {
          const parsed = parseFormula(input.formula);
          chem = {
            id: input.chemicalId.toLowerCase(),
            formula: input.formula,
            commonName: input.formula,
            composition: parsed.composition,
            charge: parsed.charge ?? 0,
            chemicalClass: "other",
            physicalState: "liquid",
            molarMass: computeMolarMass(parsed.composition),
            density: 1.0,
            isAcid: false,
            isBase: false,
            acidBaseStrength: "none",
            aliases: [],
            hazards: [],
            provenance: {
              source: "ai_predictor",
              confidence: "medium",
              dataVersion: "1.0",
            },
          };
        } catch {
          // not a valid formula
        }
      }
      if (chem) chemicals.push(chem);
      else missing.push(input.chemicalId);
    }
    if (missing.length > 0) {
      throw HttpError.badRequest(
        "UNKNOWN_CHEMICAL",
        `Unknown chemical id(s): ${missing.join(", ")}. Search /api/chemicals/search to find valid ids.`,
        { missing }
      );
    }
    return chemicals;
  }

  private getMolarMass(chemicalId: string, formula?: string): number {
    const registered = this.chemicalRepo.getById(chemicalId);
    if (registered?.molarMass) return registered.molarMass;
    const candidateFormula = formula || (chemicalId && !chemicalId.includes(" ") ? chemicalId : undefined);
    if (candidateFormula) {
      try {
        const parsed = parseFormula(candidateFormula);
        return computeMolarMass(parsed.composition);
      } catch {
        return 50.0;
      }
    }
    return 50.0;
  }

  /**
   * Synchronous core simulation using local chemical engine and curated database.
   */
  simulate(inputs: ReactionInputSpecies[], conditions: ReactionConditions = {}): SimulationResult {
    const chemicals = this.resolveChemicalsOrThrow(inputs);

    const resolution = resolveReaction(chemicals, conditions, this.lookup);
    logger.info("Reaction simulated", {
      reactants: chemicals.map((c) => c.id),
      status: resolution.status,
      tier: resolution.confidenceTier,
    });

    if (resolution.status !== "REACTION") {
      return { resolution };
    }

    const stoichReactants = resolution.reactants.map((r) => ({
      chemicalId: r.chemicalId,
      formula: r.formula,
      commonName: r.commonName,
      coefficient: r.coefficient,
      molarMass: this.getMolarMass(r.chemicalId, r.formula),
    }));

    const stoichProducts = resolution.products
      .filter((p) => p.isRegistered)
      .map((p) => ({
        chemicalId: p.chemicalId,
        formula: p.formula,
        commonName: p.commonName,
        coefficient: p.coefficient,
        molarMass: this.getMolarMass(p.chemicalId, p.formula),
        isByproduct: p.isByproduct,
      }));

    try {
      const stoich = computeStoichiometry(stoichReactants, stoichProducts, inputs);

      let calorimetry: CalorimetryResult | undefined;
      let augmentedResolution = resolution;

      if (resolution.enthalpyKjPerMol !== undefined && stoich.extentMoles > 0) {
        calorimetry = computeCalorimetry({
          inputs,
          extentMoles: stoich.extentMoles,
          enthalpyKjPerMol: resolution.enthalpyKjPerMol,
          initialTemperatureC: conditions.temperatureC ?? 25.0,
          molarMassLookup: (id) => this.getMolarMass(id),
        });

        const augmentedEffects = resolution.observableEffects.map((effect) => {
          if (effect.type === "temperature_decrease" || effect.type === "temperature_increase") {
            const isDecrease = calorimetry!.temperatureDeltaC < 0;
            const changeLabel = isDecrease
              ? `Temperature decreased by ${Math.abs(calorimetry!.temperatureDeltaC).toFixed(1)} °C (from ${calorimetry!.initialTemperatureC.toFixed(1)} °C to ${calorimetry!.finalTemperatureC.toFixed(1)} °C).`
              : calorimetry!.temperatureDeltaC > 0
                ? `Temperature increased by ${calorimetry!.temperatureDeltaC.toFixed(1)} °C (from ${calorimetry!.initialTemperatureC.toFixed(1)} °C to ${calorimetry!.finalTemperatureC.toFixed(1)} °C).`
                : `No significant temperature change (${calorimetry!.initialTemperatureC.toFixed(1)} °C).`;

            return {
              ...effect,
              temperatureDeltaC: calorimetry!.temperatureDeltaC,
              initialTemperatureC: calorimetry!.initialTemperatureC,
              finalTemperatureC: calorimetry!.finalTemperatureC,
              description: `${changeLabel} ${effect.description}`,
            };
          }
          return effect;
        });

        augmentedResolution = {
          ...resolution,
          observableEffects: augmentedEffects,
          calorimetry,
        };

        if (!augmentedResolution.processBreakdown) {
          augmentedResolution.processBreakdown = generateProcessBreakdown(augmentedResolution);
        }
      }

      return {
        resolution: augmentedResolution,
        stoichiometry: stoich.lines,
        limitingReagentChemicalId: stoich.limitingReagentChemicalId,
        calorimetry,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown stoichiometry error";
      return {
        resolution: { ...resolution, warnings: [...resolution.warnings, `Stoichiometry not computed: ${message}`] },
      };
    }
  }

  /**
   * Asynchronous simulation with AI fallback when not in database or unsupported by engine.
   */
  async simulateWithAi(
    inputs: ReactionInputSpecies[],
    conditions: ReactionConditions = {},
    options?: PredictReactionOptions
  ): Promise<SimulationResult> {
    const result = this.simulate(inputs, conditions);

    if (result.resolution.status === "UNSUPPORTED") {
      // 1. Check ChemRxn Patent Database (35,000+ real experimental records)
      try {
        const reactantTokens = inputs.map((input) => {
          const chem = this.chemicalRepo.getById(input.chemicalId);
          return chem?.commonName || chem?.formula || input.formula || input.chemicalId;
        });
        const chemrxnMatch = chemrxnService.findByReactants(reactantTokens);
        if (chemrxnMatch) {
          logger.info("Found matching ChemRxn patent reaction", {
            id: chemrxnMatch.id,
            docId: chemrxnMatch.documentId,
          });
          return chemrxnService.simulateChemrxnReaction(chemrxnMatch, conditions);
        }
      } catch (err: any) {
        logger.warn("ChemRxn lookup skipped", { error: err.message });
      }

      if (process.env.NODE_ENV === "test" && !options?.apiKey) {
        return result;
      }
      try {
        const chemicals = this.resolveChemicalsOrThrow(inputs);
        const reactantDetails = inputs.map((input) => {
          const chem = this.chemicalRepo.getById(input.chemicalId);
          const name = chem?.commonName || input.chemicalId;
          const formula = chem?.formula || input.formula || input.chemicalId;
          const conc = input.concentrationMolar ? `${input.concentrationMolar} M` : undefined;
          const amt = `${input.amount} ${input.unit}`;
          return {
            name,
            formula,
            amount: conc ? `${amt} (${conc})` : amt,
            class: chem?.chemicalClass,
            state: chem?.physicalState,
          };
        });

        const reactantDescription = chemicals
          .map((c) => `${c.commonName} (${c.formula})`)
          .join(" + ");
        const aiResolution = await aiReactionPredictor.predict(reactantDescription, {
          apiKey: options?.apiKey,
          provider: options?.provider,
          conditions,
          reactantDetails,
        });

        if (aiResolution.status !== "REACTION") {
          return { resolution: aiResolution };
        }

        const stoichReactants = aiResolution.reactants.map((r) => ({
          chemicalId: r.chemicalId,
          formula: r.formula,
          commonName: r.commonName,
          coefficient: r.coefficient,
          molarMass: this.getMolarMass(r.chemicalId, r.formula),
        }));

        const stoichProducts = aiResolution.products.map((p) => ({
          chemicalId: p.chemicalId,
          formula: p.formula,
          commonName: p.commonName,
          coefficient: p.coefficient,
          molarMass: this.getMolarMass(p.chemicalId, p.formula),
          isByproduct: p.isByproduct,
        }));

        let stoichiometry: StoichiometryLine[] | undefined;
        let calorimetry: CalorimetryResult | undefined;
        try {
          const stoich = computeStoichiometry(stoichReactants, stoichProducts, inputs);
          stoichiometry = stoich.lines;
          if (aiResolution.enthalpyKjPerMol !== undefined && stoich.extentMoles > 0) {
            try {
              calorimetry = computeCalorimetry({
                inputs,
                extentMoles: stoich.extentMoles,
                enthalpyKjPerMol: aiResolution.enthalpyKjPerMol,
                initialTemperatureC: conditions.temperatureC ?? 25.0,
                molarMassLookup: (id) => this.getMolarMass(id),
              });
            } catch {
              // Keep calorimetry optional
            }
          }
        } catch {
          // Keep stoichiometry optional if custom inputs
        }

        return {
          resolution: aiResolution,
          stoichiometry,
          calorimetry,
        };
      } catch (err: any) {
        logger.info("AI reaction prediction skipped or not available", { error: err.message });
        if (err.message && err.message.includes("NO_API_KEY")) {
          result.resolution.warnings = [
            ...(result.resolution.warnings ?? []),
            "This reaction is not in our curated 4,391 database. Set an AI API key in ✨ AI Settings to automatically predict and balance it in the background.",
          ];
        }
      }
    }

    return result;
  }

  /**
   * Predicts a reaction from free text (e.g. "KMnO4 + H2O2 + H2SO4" or "glucose fermentation").
   * First checks the curated 4,391 database records in SQLite dev.db.
   * If not in database, dynamically calls the AI predictor.
   */
  async predictAny(
    query: string,
    conditions: ReactionConditions = {},
    options?: PredictReactionOptions
  ): Promise<{ simulationResult: SimulationResult; source: "curated_database" | "ai_predicted" }> {
    const clean = query.trim();

    // 1. Search dev.db
    const byKey = await prisma.reaction.findUnique({ where: { reactantKey: clean.toLowerCase() } }).catch(() => null);
    let matchedRow = byKey;

    if (!matchedRow) {
      const parts = clean.toLowerCase().split(/[+,\s]+/).filter(Boolean).sort().join("+");
      matchedRow = await prisma.reaction.findUnique({ where: { reactantKey: parts } }).catch(() => null);
    }

    if (!matchedRow) {
      matchedRow = await prisma.reaction.findFirst({
        where: {
          OR: [
            { name: { contains: clean } },
            { equation: { contains: clean } },
            { id: { contains: clean.toLowerCase() } },
          ],
        },
      }).catch(() => null);
    }

    if (matchedRow) {
      const cond = (matchedRow.conditions as any) || {};
      const obs = (matchedRow.observations as any[]) || [];
      const reactants = (matchedRow.reactants as any[]) || [];
      const products = (matchedRow.products as any[]) || [];

      const resolution: ReactionResolution = {
        status: "REACTION",
        confidenceTier: "SUPPORTED",
        confidenceScore: matchedRow.confidenceScore,
        reactionType: matchedRow.reactionType as any,
        balancedEquation: matchedRow.equation,
        netIonicEquation: matchedRow.netIonicEquation ?? undefined,
        reactants: reactants.map((r: any) => ({
          chemicalId: r.chemicalId,
          formula: r.chemicalId.toUpperCase(),
          commonName: r.chemicalId,
          coefficient: r.coefficient,
          isRegistered: true,
        })),
        products: products.map((p: any) => ({
          chemicalId: p.chemicalId,
          formula: p.chemicalId.toUpperCase(),
          commonName: p.chemicalId,
          coefficient: p.coefficient,
          isByproduct: !!p.isByproduct,
          isRegistered: true,
        })),
        observableEffects: obs as ObservableEffect[],
        energyClassification: cond.energyClassification,
        enthalpyKjPerMol: cond.enthalpyKjPerMol,
        explanation: `Curated reaction from verified chemical database: ${matchedRow.name}.`,
        ruleApplied: "curated_database",
        safetyNotes: (matchedRow.hazards as any)?.safetyNotes,
        warnings: [],
      };

      resolution.processBreakdown = generateProcessBreakdown(resolution);

      return {
        simulationResult: { resolution },
        source: "curated_database",
      };
    }

    // 2. Check ChemRxn Patent Database
    try {
      const chemrxnRes = chemrxnService.search({ q: clean, limit: 1 });
      if (chemrxnRes.items.length > 0 && chemrxnRes.items[0]) {
        const match = chemrxnRes.items[0];
        const simRes = chemrxnService.simulateChemrxnReaction(match, conditions);
        return {
          simulationResult: simRes,
          source: "curated_database",
        };
      }
    } catch (err: any) {
      logger.warn("ChemRxn predict lookup skipped", { error: err.message });
    }

    // 3. Not in database: use AI Reaction Predictor
    const resolution = await aiReactionPredictor.predict(clean, {
      apiKey: options?.apiKey,
      provider: options?.provider,
      conditions,
    });

    if (resolution.status !== "REACTION") {
      return {
        simulationResult: { resolution },
        source: "ai_predicted",
      };
    }

    const stoichReactants = resolution.reactants.map((r) => ({
      chemicalId: r.chemicalId,
      formula: r.formula,
      commonName: r.commonName,
      coefficient: r.coefficient,
      molarMass: this.getMolarMass(r.chemicalId, r.formula),
    }));

    const stoichProducts = resolution.products.map((p) => ({
      chemicalId: p.chemicalId,
      formula: p.formula,
      commonName: p.commonName,
      coefficient: p.coefficient,
      molarMass: this.getMolarMass(p.chemicalId, p.formula),
      isByproduct: p.isByproduct,
    }));

    const mockInputs: ReactionInputSpecies[] = resolution.reactants.map((r) => ({
      chemicalId: r.chemicalId,
      amount: r.coefficient,
      unit: "mol",
    }));

    let stoichiometry: StoichiometryLine[] | undefined;
    let calorimetry: CalorimetryResult | undefined;
    try {
      const stoich = computeStoichiometry(stoichReactants, stoichProducts, mockInputs);
      stoichiometry = stoich.lines;
      if (resolution.enthalpyKjPerMol !== undefined && stoich.extentMoles > 0) {
        try {
          calorimetry = computeCalorimetry({
            inputs: mockInputs,
            extentMoles: stoich.extentMoles,
            enthalpyKjPerMol: resolution.enthalpyKjPerMol,
            initialTemperatureC: conditions.temperatureC ?? 25.0,
            molarMassLookup: (id) => this.getMolarMass(id),
          });
        } catch {
          // Keep optional
        }
      }
    } catch {
      // Ignore stoichiometry calculation error on unusual predicted formulas
    }

    return {
      simulationResult: {
        resolution,
        stoichiometry,
        calorimetry,
      },
      source: "ai_predicted",
    };
  }
}
