import type Database from "better-sqlite3";
import { ChemicalRepository } from "../data/repositories/chemicalRepository.js";
import { HttpError } from "../utils/errors.js";
import type { Chemical } from "../chemistry-engine/types.js";

export class ChemicalService {
  private readonly repo: ChemicalRepository;

  constructor(db: Database.Database) {
    this.repo = new ChemicalRepository(db);
  }

  getById(id: string): Chemical {
    const chemical = this.repo.getById(id);
    if (!chemical) {
      throw HttpError.notFound("CHEMICAL_NOT_FOUND", `No chemical with id "${id}" is registered in the database.`);
    }
    return chemical;
  }

  requireByIds(ids: string[]): Chemical[] {
    const found = this.repo.getByIds(ids);
    if (found.length !== ids.length) {
      const foundIds = new Set(found.map((c) => c.id));
      const missing = ids.filter((id) => !foundIds.has(id));
      throw HttpError.badRequest(
        "UNKNOWN_CHEMICAL",
        `Unknown chemical id(s): ${missing.join(", ")}. Search /api/chemicals/search to find valid ids.`,
        { missing }
      );
    }
    return found;
  }

  search(query: string, limit: number, offset: number) {
    return this.repo.search(query, limit, offset);
  }

  list(limit: number, offset: number, chemicalClass?: string) {
    return this.repo.list(limit, offset, chemicalClass);
  }

  get repository(): ChemicalRepository {
    return this.repo;
  }
}
