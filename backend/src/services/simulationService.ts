import type Database from "better-sqlite3";
import { ChemicalRepository } from "../data/repositories/chemicalRepository.js";
import { ReactionRepository } from "../data/repositories/reactionRepository.js";
import { resolveReaction, generateProcessBreakdown, type ChemicalLookupPort } from "../chemistry-engine/reactionResolver.js";
import { computeStoichiometry } from "../chemistry-engine/stoichiometry.js";
import { computeCalorimetry } from "../chemistry-engine/calorimetry.js";
import { HttpError } from "../utils/errors.js";
import type { CalorimetryResult, Chemical, ReactionConditions, ReactionInputSpecies, ReactionResolution, StoichiometryLine } from "../chemistry-engine/types.js";
import { logger } from "../utils/logger.js";

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
      const chem = this.chemicalRepo.getById(input.chemicalId);
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

    // Only reactants that are actually consumed (not a catalyst, which lives in `conditions`) participate in stoichiometry.
    const stoichReactants = resolution.reactants.map((r) => ({
      chemicalId: r.chemicalId,
      formula: r.formula,
      commonName: r.commonName,
      coefficient: r.coefficient,
      molarMass: this.chemicalRepo.getById(r.chemicalId)?.molarMass ?? 0,
    }));
    const stoichProducts = resolution.products
      .filter((p) => p.isRegistered)
      .map((p) => ({
        chemicalId: p.chemicalId,
        formula: p.formula,
        commonName: p.commonName,
        coefficient: p.coefficient,
        molarMass: this.chemicalRepo.getById(p.chemicalId)?.molarMass ?? 0,
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
          molarMassLookup: (id) => this.chemicalRepo.getById(id)?.molarMass,
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

        augmentedResolution.processBreakdown = generateProcessBreakdown(augmentedResolution);
      }

      return {
        resolution: augmentedResolution,
        stoichiometry: stoich.lines,
        limitingReagentChemicalId: stoich.limitingReagentChemicalId,
        calorimetry,
      };
    } catch (err) {
      // A resolvable reaction but incomplete quantity data: still return the
      // qualitative resolution (equation, products, safety) rather than
      // failing the whole request, and surface why stoichiometry is absent.
      const message = err instanceof Error ? err.message : "Unknown stoichiometry error";
      return {
        resolution: { ...resolution, warnings: [...resolution.warnings, `Stoichiometry not computed: ${message}`] },
      };
    }
  }
}
