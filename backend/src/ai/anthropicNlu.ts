import type { NluContext, NluProvider, ParsedIntent } from "./nluProvider.js";
import { logger } from "../utils/logger.js";

const SYSTEM_PROMPT = `You translate a chemistry-lab user's natural language into a JSON array of structured intents. Output ONLY JSON, no prose, no markdown fences.

Each array element must be one of:
{"kind":"operation","actionType":"ADD_CHEMICAL","chemicalQuery":"<name as the user said it>","amount":<number>,"unit":"g"|"kg"|"mg"|"mol"|"mmol"|"mL"|"L","assumedDefaults":["..."] }
{"kind":"operation","actionType":"MIX"}
{"kind":"operation","actionType":"HEAT","targetTemperatureC":<number>,"assumedDefaults":["..."]}
{"kind":"operation","actionType":"COOL","targetTemperatureC":<number>,"assumedDefaults":["..."]}
{"kind":"operation","actionType":"REMOVE","chemicalQuery":"<name>"}
{"kind":"operation","actionType":"MEASURE"}
{"kind":"operation","actionType":"RUN_REACTION"}
{"kind":"query","question":"WHAT_PRODUCED"|"WHY_PRECIPITATE"|"SHOW_IONIC_EQUATION"|"EXPLAIN_REACTION_TYPE"|"SAFETY_INFO"|"GENERAL"}
{"kind":"unrecognized","rawText":"<original text>"}

Only include "amount"/"unit" if the user actually stated a quantity; otherwise omit them and add an entry to "assumedDefaults" explaining a sensible default will be needed. Never invent a chemical identity beyond what the user said -- pass their words through in chemicalQuery verbatim (lowercased is fine) and let the caller resolve it against the real database. If the text does not match any operation or question, return a single "unrecognized" intent.`;

/**
 * Calls the real Anthropic API for more flexible natural-language
 * understanding than the regex-based provider. This is entirely optional --
 * the app works fully offline without it (see RuleBasedNluProvider) -- and
 * even when enabled, its output is just another ParsedIntent[], subject to
 * the exact same downstream validation as any other source.
 */
export class AnthropicNluProvider implements NluProvider {
  readonly name = "anthropic-llm";

  constructor(private readonly apiKey: string) {}

  async parse(text: string, context?: NluContext): Promise<ParsedIntent[]> {
    const userMessage = context?.recentChemicalIds?.length
      ? `Chemicals currently in the experiment: ${context.recentChemicalIds.join(", ")}.\nUser said: "${text}"`
      : `User said: "${text}"`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!response.ok) {
      logger.warn("AnthropicNluProvider request failed, falling back to unrecognized intent", { status: response.status });
      return [{ kind: "unrecognized", rawText: text }];
    }

    const data = (await response.json()) as { content?: { type: string; text?: string }[] };
    const textBlock = data.content?.find((b) => b.type === "text")?.text ?? "[]";
    const cleaned = textBlock.replace(/```json|```/g, "").trim();

    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) return parsed as ParsedIntent[];
      return [{ kind: "unrecognized", rawText: text }];
    } catch (err) {
      logger.warn("AnthropicNluProvider returned non-JSON output, falling back", { error: String(err) });
      return [{ kind: "unrecognized", rawText: text }];
    }
  }
}
