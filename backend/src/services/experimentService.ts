import type Database from "better-sqlite3";
import { ExperimentRepository } from "../data/repositories/experimentRepository.js";
import { ChemicalRepository } from "../data/repositories/chemicalRepository.js";
import { SimulationService } from "./simulationService.js";
import { HttpError } from "../utils/errors.js";
import type { ExperimentActionType, ExperimentDTO } from "../types/api.js";

export class ExperimentService {
  private readonly repo: ExperimentRepository;
  private readonly chemicalRepo: ChemicalRepository;
  private readonly simulationService: SimulationService;

  constructor(db: Database.Database) {
    this.repo = new ExperimentRepository(db);
    this.chemicalRepo = new ChemicalRepository(db);
    this.simulationService = new SimulationService(db);
  }

  create(name?: string): ExperimentDTO {
    return this.repo.create(name);
  }

  getById(id: string): ExperimentDTO {
    const experiment = this.repo.getById(id);
    if (!experiment) {
      throw HttpError.notFound("EXPERIMENT_NOT_FOUND", `No experiment with id "${id}".`);
    }
    return experiment;
  }

  list(limit: number, offset: number) {
    return this.repo.list(limit, offset);
  }

  reset(id: string): ExperimentDTO {
    this.getById(id); // throws if missing
    this.repo.reset(id);
    return this.getById(id);
  }

  /**
   * Applies one allowlisted action to an experiment. This is the single
   * choke point every lab operation passes through -- whether it originated
   * from a direct API call or from the AI assistant's parsed intent -- so
   * there is no path for either to bypass validation (product brief section 33).
   */
  applyAction(experimentId: string, actionType: ExperimentActionType, payload: Record<string, unknown>) {
    this.getById(experimentId); // throws if missing

    if (actionType === "ADD_CHEMICAL" || actionType === "REMOVE") {
      const chemicalId = payload.chemicalId as string;
      if (!this.chemicalRepo.getById(chemicalId)) {
        throw HttpError.badRequest("UNKNOWN_CHEMICAL", `Unknown chemical id "${chemicalId}".`);
      }
    }

    if (actionType === "RUN_REACTION") {
      const reactants = payload.reactants as { chemicalId: string; amount: number; unit: string; concentrationMolar?: number }[];
      const conditions = (payload.conditions as Record<string, unknown> | undefined) ?? {};
      const simulationResult = this.simulationService.simulate(
        reactants as Parameters<SimulationService["simulate"]>[0],
        conditions
      );
      const action = this.repo.appendAction(experimentId, actionType, payload, simulationResult as unknown as Record<string, unknown>);
      return { action, simulationResult };
    }

    const action = this.repo.appendAction(experimentId, actionType, payload);
    return { action, simulationResult: undefined };
  }
}
