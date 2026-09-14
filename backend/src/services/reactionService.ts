import type Database from "better-sqlite3";
import { ReactionRepository } from "../data/repositories/reactionRepository.js";
import { HttpError } from "../utils/errors.js";
import { balanceEquation, type BalancerSpecies } from "../chemistry-engine/balancer.js";
import { parseFormula } from "../chemistry-engine/formulaParser.js";
import type { CuratedReaction } from "../chemistry-engine/types.js";

export class ReactionService {
  private readonly repo: ReactionRepository;

  constructor(db: Database.Database) {
    this.repo = new ReactionRepository(db);
  }

  getById(id: string): CuratedReaction {
    const reaction = this.repo.getById(id);
    if (!reaction) {
      throw HttpError.notFound("REACTION_NOT_FOUND", `No curated reaction with id "${id}".`);
    }
    return reaction;
  }

  list(limit: number, offset: number) {
    return this.repo.list(limit, offset);
  }

  get repository(): ReactionRepository {
    return this.repo;
  }

  /**
   * Standalone equation balancer (POST /api/reactions/balance): balances
   * arbitrary formula strings without requiring them to be registered
   * chemicals, since this endpoint is meant as a general-purpose tool.
   */
  balance(reactantFormulas: string[], productFormulas: string[]) {
    const toSpecies = (formula: string): BalancerSpecies => {
      const parsed = parseFormula(formula);
      return { label: formula, formula, composition: parsed.composition, charge: parsed.charge };
    };
    return balanceEquation(reactantFormulas.map(toSpecies), productFormulas.map(toSpecies));
  }
}
