import type Database from "better-sqlite3";
import { ChemicalRepository } from "../data/repositories/chemicalRepository.js";
import { ReactionRepository } from "../data/repositories/reactionRepository.js";
import { resolveReaction, type ChemicalLookupPort } from "../chemistry-engine/reactionResolver.js";
import { computeStoichiometry } from "../chemistry-engine/stoichiometry.js";
import { HttpError } from "../utils/errors.js";
import type { Chemical, ReactionConditions, ReactionInputSpecies, ReactionResolution, StoichiometryLine } from "../chemistry-engine/types.js";
import { logger } from "../utils/logger.js";

export interface SimulationResult {
  resolution: ReactionResolution;
  stoichiometry?: StoichiometryLine[];
  limitingReagentChemicalId?: string;
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
      return { resolution, stoichiometry: stoich.lines, limitingReagentChemicalId: stoich.limitingReagentChemicalId };
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
