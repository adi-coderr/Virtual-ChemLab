import type { NluContext, NluProvider, ParsedIntent, ProposedOperation } from "./nluProvider.js";

const UNIT_ALIASES: Record<string, ProposedOperation["unit"]> = {
  ml: "mL",
  milliliter: "mL",
  milliliters: "mL",
  millilitre: "mL",
  millilitres: "mL",
  l: "L",
  liter: "L",
  liters: "L",
  litre: "L",
  litres: "L",
  g: "g",
  gram: "g",
  grams: "g",
  kg: "kg",
  kilogram: "kg",
  kilograms: "kg",
  mg: "mg",
  milligram: "mg",
  milligrams: "mg",
  mol: "mol",
  mole: "mol",
  moles: "mol",
  mmol: "mmol",
  millimole: "mmol",
  millimoles: "mmol",
};

const DEFAULT_ADD_AMOUNT = 20;
const DEFAULT_ADD_UNIT: ProposedOperation["unit"] = "mL";
const DEFAULT_HEAT_TARGET_C = 80;
const DEFAULT_COOL_TARGET_C = 5;

function stripTrailingPunctuation(text: string): string {
  return text.replace(/[.!?,;:]+$/, "").trim();
}

function parseAddChemical(text: string): ProposedOperation | null {
  const match = text.match(
    /add\s+(\d+(?:\.\d+)?)\s*(milliliters?|millilitres?|ml|liters?|litres?|l|kilograms?|kg|milligrams?|mg|grams?|g|millimoles?|mmol|moles?|mol)\s+(?:of\s+)?(.+)/i
  );
  if (match) {
    const [, amountStr, unitRaw, nameRaw] = match;
    const unit = UNIT_ALIASES[(unitRaw as string).toLowerCase()];
    if (!unit) return null;
    return {
      kind: "operation",
      actionType: "ADD_CHEMICAL",
      chemicalQuery: stripTrailingPunctuation(nameRaw as string),
      amount: parseFloat(amountStr as string),
      unit,
    };
  }

  // "mix it with sodium hydroxide" / "add sodium hydroxide" (no explicit quantity)
  const noQuantityMatch = text.match(/(?:add|mix(?:\s+it)?\s+with)\s+(?:some\s+)?(.+)/i);
  if (noQuantityMatch) {
    const name = stripTrailingPunctuation(noQuantityMatch[1] as string);
    if (name.length > 0 && !/^\d/.test(name)) {
      return {
        kind: "operation",
        actionType: "ADD_CHEMICAL",
        chemicalQuery: name,
        amount: DEFAULT_ADD_AMOUNT,
        unit: DEFAULT_ADD_UNIT,
        assumedDefaults: [`No amount specified; defaulted to ${DEFAULT_ADD_AMOUNT} ${DEFAULT_ADD_UNIT}.`],
      };
    }
  }
  return null;
}

function extractTemperature(text: string): number | undefined {
  const match = text.match(/(-?\d+(?:\.\d+)?)\s*(?:°|degrees?)?\s*c?\b/i);
  return match ? parseFloat(match[1] as string) : undefined;
}

export class RuleBasedNluProvider implements NluProvider {
  readonly name = "rule-based-v0.1";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parse(text: string, _context?: NluContext): Promise<ParsedIntent[]> {
    const trimmed = text.trim();
    const lower = trimmed.toLowerCase();

    if (/what\s+(?:did\s+(?:i|we)\s+(?:produce|make|get)|(?:are\s+)?the\s+products)/.test(lower)) {
      return [{ kind: "query", question: "WHAT_PRODUCED" }];
    }
    if (/why\s+(?:did\s+)?(?:this|that|it)?\s*precipitat/.test(lower) || /why\s+is\s+there\s+a\s+precipitate/.test(lower)) {
      return [{ kind: "query", question: "WHY_PRECIPITATE" }];
    }
    if (/(show|give|what('?s| is))\s+(?:me\s+)?(?:the\s+)?(?:net\s+)?ionic\s+equation/.test(lower)) {
      return [{ kind: "query", question: "SHOW_IONIC_EQUATION" }];
    }
    if (/what\s+(?:type|kind)\s+of\s+reaction/.test(lower)) {
      return [{ kind: "query", question: "EXPLAIN_REACTION_TYPE" }];
    }
    if (/(is\s+(?:it|this)\s+(?:dangerous|safe|hazardous))|safety/.test(lower)) {
      return [{ kind: "query", question: "SAFETY_INFO" }];
    }
    if (/(explain|what)\s+(?:every\s+|all\s+)?(?:the\s+)?(changes?|process|transformation)/.test(lower)) {
      return [{ kind: "query", question: "EXPLAIN_PROCESS_CHANGES" }];
    }
    if (/(how\s+much\s+(?:did\s+)?(?:the\s+)?temp|what\s+(?:is|was)\s+(?:the\s+)?temp|did\s+(?:the\s+)?temp.*change|temperature\s+(?:change|decrease|increase|drop|rise))/.test(lower)) {
      return [{ kind: "query", question: "TEMPERATURE_CHANGE" }];
    }
    if (/why\b/.test(lower) && lower.length < 120) {
      return [{ kind: "query", question: "GENERAL" }];
    }

    if (/^(run|start|perform|execute)\b.*(reaction|experiment)/.test(lower) || /^react\b/.test(lower) || lower === "go" || lower === "run it") {
      return [{ kind: "operation", actionType: "RUN_REACTION" }];
    }

    if (/^heat\b/.test(lower)) {
      const temp = extractTemperature(lower);
      return [
        {
          kind: "operation",
          actionType: "HEAT",
          targetTemperatureC: temp ?? DEFAULT_HEAT_TARGET_C,
          assumedDefaults: temp === undefined ? [`No target temperature specified; defaulted to ${DEFAULT_HEAT_TARGET_C} \u00b0C.`] : undefined,
        },
      ];
    }
    if (/^cool\b/.test(lower)) {
      const temp = extractTemperature(lower);
      return [
        {
          kind: "operation",
          actionType: "COOL",
          targetTemperatureC: temp ?? DEFAULT_COOL_TARGET_C,
          assumedDefaults: temp === undefined ? [`No target temperature specified; defaulted to ${DEFAULT_COOL_TARGET_C} \u00b0C.`] : undefined,
        },
      ];
    }

    const addIntent = parseAddChemical(trimmed);
    if (addIntent) return [addIntent];

    if (/^mix\b/.test(lower)) {
      return [{ kind: "operation", actionType: "MIX" }];
    }

    return [{ kind: "unrecognized", rawText: trimmed }];
  }
}
