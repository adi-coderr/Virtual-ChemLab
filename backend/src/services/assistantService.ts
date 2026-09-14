import type Database from "better-sqlite3";
import { ChemicalRepository } from "../data/repositories/chemicalRepository.js";
import { ExperimentRepository } from "../data/repositories/experimentRepository.js";
import { RuleBasedNluProvider } from "../ai/ruleBasedNlu.js";
import { AnthropicNluProvider } from "../ai/anthropicNlu.js";
import type { NluProvider, ParsedIntent } from "../ai/nluProvider.js";
import { getConfig } from "../config/env.js";
import type { SimulationResultDTO } from "../types/api.js";

export interface AssistantResponseItem {
  kind: "proposed_action" | "answer" | "clarification_needed";
  actionType?: string;
  payload?: Record<string, unknown>;
  matchedChemical?: { id: string; commonName: string; formula: string };
  text: string;
}

export class AssistantService {
  private readonly chemicalRepo: ChemicalRepository;
  private readonly experimentRepo: ExperimentRepository;
  private readonly provider: NluProvider;

  constructor(db: Database.Database) {
    this.chemicalRepo = new ChemicalRepository(db);
    this.experimentRepo = new ExperimentRepository(db);
    const config = getConfig();
    this.provider = config.anthropicApiKey ? new AnthropicNluProvider(config.anthropicApiKey) : new RuleBasedNluProvider();
  }

  get providerName(): string {
    return this.provider.name;
  }

  private lastReactionResult(experimentId: string): SimulationResultDTO | undefined {
    const experiment = this.experimentRepo.getById(experimentId);
    if (!experiment) return undefined;
    for (let i = experiment.actions.length - 1; i >= 0; i--) {
      const action = experiment.actions[i];
      if (action?.actionType === "RUN_REACTION" && action.result) {
        return action.result as SimulationResultDTO;
      }
    }
    return undefined;
  }

  private answerQuery(question: string, experimentId?: string): string {
    const result = experimentId ? this.lastReactionResult(experimentId) : undefined;
    if (!result) {
      return "I don't have a completed reaction to look at yet for this experiment -- run a reaction first and then ask me again.";
    }
    const { resolution } = result;

    switch (question) {
      case "WHAT_PRODUCED": {
        if (resolution.status !== "REACTION" || resolution.products.length === 0) {
          return "That combination didn't produce new products: " + resolution.explanation;
        }
        const names = resolution.products.map((p) => `${p.commonName} (${p.formula})`).join(", ");
        return `You produced: ${names}. ${resolution.explanation}`;
      }
      case "WHY_PRECIPITATE": {
        const effect = resolution.observableEffects.find((e) => e.type === "precipitation");
        if (!effect) return "No precipitate formed in this reaction, so there isn't one to explain.";
        return `${effect.description} ${resolution.explanation}`;
      }
      case "SHOW_IONIC_EQUATION": {
        if (!resolution.netIonicEquation) {
          return "A net ionic equation isn't available for this particular reaction (it may not be an ionic reaction in solution, or this isn't curated with one yet).";
        }
        return `Net ionic equation: ${resolution.netIonicEquation}`;
      }
      case "EXPLAIN_REACTION_TYPE": {
        return resolution.reactionType
          ? `This was classified as: ${resolution.reactionType.replace(/_/g, " ")}. ${resolution.explanation}`
          : "This reaction wasn't classified into one of the modeled reaction types.";
      }
      case "SAFETY_INFO": {
        return resolution.safetyNotes ?? "No specific safety notes are on file for this reaction; always follow standard lab safety practices.";
      }
      default:
        return resolution.explanation;
    }
  }

  async handle(text: string, experimentId?: string): Promise<AssistantResponseItem[]> {
    const recentChemicalIds = experimentId
      ? this.experimentRepo
          .getById(experimentId)
          ?.actions.filter((a) => a.actionType === "ADD_CHEMICAL")
          .map((a) => a.payload.chemicalId as string)
          .filter(Boolean)
      : undefined;

    const intents: ParsedIntent[] = await this.provider.parse(text, { recentChemicalIds });
    const responses: AssistantResponseItem[] = [];

    for (const intent of intents) {
      if (intent.kind === "unrecognized") {
        responses.push({
          kind: "clarification_needed",
          text: `I couldn't confidently turn "${intent.rawText}" into a lab action or question. Try something like "add 20 mL of hydrochloric acid" or "what did I produce?"`,
        });
        continue;
      }

      if (intent.kind === "query") {
        responses.push({ kind: "answer", text: this.answerQuery(intent.question, experimentId) });
        continue;
      }

      // intent.kind === "operation"
      if (intent.chemicalQuery) {
        const searchResult = this.chemicalRepo.search(intent.chemicalQuery, 1, 0);
        const match = searchResult.items[0];
        if (!match) {
          responses.push({
            kind: "clarification_needed",
            text: `I don't recognize "${intent.chemicalQuery}" as a chemical in the database yet. Try searching for it directly, or check the spelling.`,
          });
          continue;
        }
        responses.push({
          kind: "proposed_action",
          actionType: intent.actionType,
          payload: {
            chemicalId: match.id,
            amount: intent.amount,
            unit: intent.unit,
          },
          matchedChemical: { id: match.id, commonName: match.commonName, formula: match.formula },
          text:
            `Proposing: ${intent.actionType.replace(/_/g, " ").toLowerCase()} ${match.commonName} (${match.formula})` +
            (intent.amount ? `, ${intent.amount} ${intent.unit}` : "") +
            (intent.assumedDefaults?.length ? ` -- ${intent.assumedDefaults.join(" ")}` : "") +
            ". Confirm to add it to the bench.",
        });
        continue;
      }

      responses.push({
        kind: "proposed_action",
        actionType: intent.actionType,
        payload: intent.kind === "operation" ? { targetTemperatureC: intent.targetTemperatureC } : {},
        text:
          `Proposing: ${intent.actionType.replace(/_/g, " ").toLowerCase()}` +
          (intent.kind === "operation" && intent.assumedDefaults?.length ? ` -- ${intent.assumedDefaults.join(" ")}` : "") +
          ". Confirm to run it.",
      });
    }

    return responses;
  }
}
