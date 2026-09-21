/**
 * The assistant's ONLY job is to turn free text into one of these structured
 * intents. It never touches the database or the chemistry engine directly --
 * every ProposedOperation still has to pass through the same
 * experimentActionSchema validation (see validation/schemas.ts) as a
 * manually-clicked UI action before anything happens. This is what makes
 * "the AI must never bypass validation" (product brief section 33) actually
 * true rather than just a comment.
 */

export type ProposedOperationType = "ADD_CHEMICAL" | "MIX" | "HEAT" | "COOL" | "REMOVE" | "MEASURE" | "RUN_REACTION";

export interface ProposedOperation {
  kind: "operation";
  actionType: ProposedOperationType;
  /** Free-text chemical name as mentioned by the user; resolved to a real id by the assistant service, never assumed here. */
  chemicalQuery?: string;
  amount?: number;
  unit?: "g" | "kg" | "mg" | "mol" | "mmol" | "mL" | "L";
  targetTemperatureC?: number;
  /** True when a value (like amount) had to be defaulted because the user didn't specify one -- surfaced to the user for confirmation rather than silently assumed. */
  assumedDefaults?: string[];
}

export type QueryKind =
  | "WHAT_PRODUCED"
  | "WHY_PRECIPITATE"
  | "SHOW_IONIC_EQUATION"
  | "EXPLAIN_REACTION_TYPE"
  | "SAFETY_INFO"
  | "EXPLAIN_PROCESS_CHANGES"
  | "TEMPERATURE_CHANGE"
  | "GENERAL";

export interface ProposedQuery {
  kind: "query";
  question: QueryKind;
}

export interface UnrecognizedIntent {
  kind: "unrecognized";
  rawText: string;
}

export type ParsedIntent = ProposedOperation | ProposedQuery | UnrecognizedIntent;

export interface NluContext {
  /** Ids of chemicals already known to be in the experiment, to help disambiguate pronouns like "it". */
  recentChemicalIds?: string[];
}

export interface NluProvider {
  readonly name: string;
  parse(text: string, context?: NluContext): Promise<ParsedIntent[]>;
}
