import { getConfig } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { parseFormula } from "../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../chemistry-engine/balancer.js";
import { getDb } from "../data/db.js";
import type {
  ReactionResolution,
  ReactionConditions,
  Chemical,
  ResolvedSpecies,
  ObservableEffect,
  ChemicalProcessBreakdown,
  ReactionType,
  EnergyClassification,
  PhysicalState,
} from "../chemistry-engine/types.js";

export type AiProviderType = "groq" | "gemini" | "openai" | "anthropic";

export interface ReactantDetailItem {
  name: string;
  formula: string;
  amount?: string;
  class?: string;
  state?: string;
}

export interface PredictReactionOptions {
  provider?: AiProviderType;
  apiKey?: string;
  conditions?: ReactionConditions;
  reactantDetails?: ReactantDetailItem[];
}

interface RawAiReactionResponse {
  analysis?: {
    speciesIdentified?: string;
    reactionFeasibility?: string;
    reactionTypeAssessment?: string;
    atomConservationAudit?: string;
  };
  status: "REACTION" | "NO_REACTION";
  reactionType?: ReactionType;
  balancedEquation?: string;
  netIonicEquation?: string;
  reactants: {
    chemicalId?: string;
    formula: string;
    commonName?: string;
    coefficient?: number;
  }[];
  products: {
    chemicalId?: string;
    formula: string;
    commonName?: string;
    coefficient?: number;
    isByproduct?: boolean;
  }[];
  energyClassification?: EnergyClassification;
  enthalpyKjPerMol?: number;
  explanation: string;
  observableEffects?: {
    type: "color_change" | "precipitation" | "gas_evolution" | "temperature_increase" | "temperature_decrease" | "dissolution" | "phase_change" | "effervescence";
    description: string;
    colorFrom?: string;
    colorTo?: string;
  }[];
  processBreakdown?: {
    masterExplanation?: string;
    dimensions: {
      title: string;
      category: "atomic_bonding" | "concentrations" | "properties" | "observables" | "thermodynamics" | "conservation";
      description: string;
      details: string[];
    }[];
  };
  safetyNotes?: string;
}

const SYSTEM_INSTRUCTION = `You are a world-class chemistry research engine, computational physical chemist, and laboratory simulator.
Given a chemical reaction query, a mixture of reactants, and reaction conditions (temperature, pressure, solvent, catalyst), you must predict the authentic, literature-verified chemical reaction outcome.

You MUST reason scientifically first, evaluating thermodynamic driving force, redox potentials, activity series, and mass-charge conservation before determining the outcome.
Output ONLY a single valid JSON object matching the following schema without markdown formatting, code fences, backticks, or preamble:

{
  "analysis": {
    "speciesIdentified": "Detailed analysis of active chemical species, oxidation numbers of all atoms, physical states, and functional groups.",
    "reactionFeasibility": "Evaluation of thermodynamic driving force (Gibbs free energy ΔG°, standard cell potential E°cell, activity series, pKa differences, lattice vs hydration energy). Explicitly determine if a spontaneous reaction occurs or if the outcome is NO_REACTION.",
    "reactionTypeAssessment": "Mechanism classification (e.g. redox, acid_base_neutralization, precipitation, single_displacement, combustion, decomposition, etc.).",
    "atomConservationAudit": "Pre-check of element atom counts and net charges on both sides to guarantee exact conservation."
  },
  "status": "REACTION" or "NO_REACTION",
  "reactionType": "synthesis" | "decomposition" | "single_displacement" | "double_displacement" | "combustion" | "acid_base_neutralization" | "redox_other" | "precipitation" | "gas_evolution" | "dissolution" | "unclassified",
  "balancedEquation": "Formatted reaction equation with standard arrow (e.g. 2H2 + O2 -> 2H2O)",
  "netIonicEquation": "Net ionic equation if in aqueous solution or ionic context, else omit",
  "reactants": [
    { "chemicalId": "kmno4", "formula": "ExactChemicalFormula", "commonName": "Common Name", "coefficient": 1 }
  ],
  "products": [
    { "chemicalId": "k2so4", "formula": "ExactChemicalFormula", "commonName": "Common Name", "coefficient": 1, "isByproduct": false }
  ],
  "energyClassification": "exothermic" or "endothermic" or "unknown",
  "enthalpyKjPerMol": estimated standard enthalpy change ΔH° in kJ/mol (negative for exothermic, positive for endothermic),
  "explanation": "Clear, comprehensive scientific explanation of the reaction mechanism, electron transfer, and chemical pathway.",
  "observableEffects": [
    {
      "type": "color_change" | "precipitation" | "gas_evolution" | "temperature_increase" | "temperature_decrease" | "dissolution" | "phase_change" | "effervescence",
      "description": "Visual and physical sensory outcome observed in the vessel",
      "colorFrom": "#HEXCODE if color change occurs",
      "colorTo": "#HEXCODE"
    }
  ],
  "processBreakdown": {
    "masterExplanation": "Detailed multi-step breakdown overview",
    "dimensions": [
      {
        "title": "Reactant State & Activation",
        "category": "atomic_bonding",
        "description": "State of reactants, molecular/ionic species present, and initial bonds",
        "details": ["Detail 1", "Detail 2"]
      },
      {
        "title": "Collision & Transition State",
        "category": "observables",
        "description": "Molecular collision geometry, activation energy, and intermediate species",
        "details": ["Detail 1", "Detail 2"]
      },
      {
        "title": "Bond Reorganization & Product Formation",
        "category": "properties",
        "description": "Bonds broken vs bonds newly synthesized",
        "details": ["Detail 1", "Detail 2"]
      },
      {
        "title": "Thermodynamics & Energy Transfer",
        "category": "thermodynamics",
        "description": "Enthalpy, entropy, temperature shift, and driving force",
        "details": ["Detail 1", "Detail 2"]
      },
      {
        "title": "Fundamental Conservation Principles",
        "category": "conservation",
        "description": "Strict mass, atomic nuclei, and electric charge conservation",
        "details": ["Detail 1", "Detail 2"]
      }
    ]
  },
  "safetyNotes": "Crucial laboratory safety hazards (corrosive, toxic gas, exotherm, PPE requirements)."
}

CRITICAL SCIENTIFIC PRINCIPLES:
1. NO_REACTION ACCURACY:
   - Spectator ions: In aqueous mixtures where all cation-anion combinations remain soluble (e.g. NaCl + KNO3, KCl + Na2SO4), NO PRECIPITATE, NO GAS, and NO WEAK ELECTROLYTE form. The status MUST be "NO_REACTION", products: [], and explanation must explain why.
   - Activity series & reduction potentials: In single displacement (metal + acid or metal + salt), if the metal is less reactive than the displaced ion (e.g. Cu + HCl, Ag + FeSO4, Au + HNO3), the reaction cannot proceed spontaneously. Status MUST be "NO_REACTION".
   - Non-reactive mixtures: Mixtures of non-oxidizing acids and salts with common anions or inert mixtures at room temperature must be correctly identified as "NO_REACTION".
2. STOICHIOMETRIC ATOM CONSERVATION:
   - The reaction MUST be atom-balanced: for every element, the total atom count on the reactant side must exactly equal the total atom count on the product side.
   - For redox in aqueous solution, ensure proper inclusion of H2O and balancing of oxidation states.
   - Total electric charge on reactants must equal total electric charge on products.
3. CHEMICAL FORMULAS:
   - Provide standard pure chemical formulas in the "formula" field (e.g. "H2O", "KMnO4", "CuSO4", "CO2"). Do NOT include phase tags like "(aq)" or "(s)" inside the "formula" string.
4. OBSERVABLE EFFECTS & COLOR CODES:
   - Color hex codes MUST be authentic 6-digit hex values like #800080 (permanganate purple), #FFFFFF (colorless/white), #FFD700 (yellow), #0077BE (blue), #B22222 (brown/red), #FF4500 (orange).
   - Describe visible changes: effervescence / gas bubbles, precipitates (color, flocculent vs crystalline), temperature change.
5. ENERGETICS:
   - Enthalpy (enthalpyKjPerMol) must be scientifically realistic in kJ/mol. Exothermic reactions must have negative values; endothermic must have positive values.`;

export interface SanitizedFormulaResult {
  formula: string;
  coefficient?: number;
  physicalState?: PhysicalState;
}

/**
 * Strips phase suffixes like (s), (l), (g), (aq), handles leading coefficients,
 * removes hydrate dots, and standardizes charge signs.
 */
export function sanitizeChemicalFormula(rawFormula: string): SanitizedFormulaResult {
  let str = (rawFormula || "").trim();

  // 1. Extract trailing physical state like (s), (l), (g), (aq), (solid), (gas), (liquid), (aqueous), (ppt)
  let physicalState: PhysicalState | undefined;
  const stateMatch = str.match(/\s*\((s|l|g|aq|solid|liquid|gas|aqueous|ppt)\)\s*$/i);
  if (stateMatch) {
    const tag = stateMatch[1]!.toLowerCase();
    if (tag === "s" || tag === "solid" || tag === "ppt") physicalState = "solid";
    else if (tag === "l" || tag === "liquid") physicalState = "liquid";
    else if (tag === "g" || tag === "gas") physicalState = "gas";
    else if (tag === "aq" || tag === "aqueous") physicalState = "aqueous";
    str = str.slice(0, stateMatch.index).trim();
  }

  // 2. Normalize hydrate dots like CuSO4·5H2O or CuSO4.5H2O
  str = str.replace(/[·•*.]\s*\d*H2O/gi, "").trim();

  // 3. Strip leading coefficients if model included it, e.g. "2 H2O", "2H2O", "3 [Fe(CN)6]4-"
  let coefficient: number | undefined;
  const leadMatch = str.match(/^(\d+)\s*([A-Za-z\[][A-Za-z0-9().^+\-[\]\s]*)$/);
  if (leadMatch) {
    coefficient = parseInt(leadMatch[1]!, 10);
    str = leadMatch[2]!;
  }

  // Remove any remaining internal whitespace from formula (e.g. "Ca (OH)2" -> "Ca(OH)2")
  str = str.replace(/\s+/g, "");

  // 4. Normalize charge notation
  if (!str.includes("^")) {
    if (/([A-Za-z0-9\]])\+\+$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])\+\+$/, "$1^2+");
    } else if (/([A-Za-z0-9\]])--$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])--$/, "$1^2-");
    } else if (/([A-Za-z0-9\]])\+([0-9]+)$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])\+([0-9]+)$/, "$1^$2+");
    } else if (/([A-Za-z0-9\]])-([0-9]+)$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])-([0-9]+)$/, "$1^$2-");
    } else if (/([A-Za-z0-9\]])([0-9]+)\+$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])([0-9]+)\+$/, "$1^$2+");
    } else if (/([A-Za-z0-9\]])([0-9]+)-$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])([0-9]+)-$/, "$1^$2-");
    } else if (/([A-Za-z0-9\]])\+$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])\+$/, "$1^+");
    } else if (/([A-Za-z0-9\]])-$/.test(str)) {
      str = str.replace(/([A-Za-z0-9\]])-$/, "$1^-");
    }
  } else {
    str = str.replace(/\^\+([0-9]+)/, "^$1+").replace(/\^-([0-9]+)/, "^$1-");
  }

  return { formula: str, coefficient, physicalState };
}

function normalizeReactionType(rawType?: string): ReactionType {
  if (!rawType) return "redox_other";
  const t = rawType.toLowerCase().trim().replace(/[-\s]/g, "_");
  if (t === "acid_base_neutralization" || t === "neutralization" || t === "acid_base") return "acid_base_neutralization";
  if (t === "precipitation" || t === "precipitate" || t === "precipitation_reaction") return "precipitation";
  if (t === "single_displacement" || t === "single_replacement" || t === "displacement") return "single_displacement";
  if (t === "double_displacement" || t === "double_replacement" || t === "metathesis") return "double_displacement";
  if (t === "combustion" || t === "oxidation") return "combustion";
  if (t === "gas_evolution" || t === "effervescence") return "gas_evolution";
  if (t === "synthesis" || t === "combination" || t === "formation") return "synthesis";
  if (t === "decomposition" || t === "thermal_decomposition") return "decomposition";
  if (t === "dissolution") return "dissolution";
  if (t === "redox" || t === "redox_other") return "redox_other";
  if (t === "unclassified") return "unclassified";
  return "redox_other";
}

function normalizeEffectType(type?: string): ObservableEffect["type"] {
  if (!type) return "color_change";
  const t = type.toLowerCase().trim().replace(/[-\s]/g, "_");
  if (t === "precipitation" || t === "precipitate" || t === "solid_formation") return "precipitation";
  if (t === "gas_evolution" || t === "gas" || t === "bubbles") return "gas_evolution";
  if (t === "temperature_increase" || t === "exotherm" || t === "heat_release" || t === "warming") return "temperature_increase";
  if (t === "temperature_decrease" || t === "endotherm" || t === "cooling") return "temperature_decrease";
  if (t === "dissolution" || t === "dissolve") return "dissolution";
  if (t === "phase_change" || t === "boiling" || t === "melting") return "phase_change";
  if (t === "effervescence") return "effervescence";
  return "color_change";
}

function normalizeEnergyClass(val?: string, enthalpy?: number): EnergyClassification {
  if (val) {
    const v = val.toLowerCase().trim();
    if (v.includes("exo")) return "exothermic";
    if (v.includes("endo")) return "endothermic";
  }
  if (enthalpy !== undefined) {
    if (enthalpy < 0) return "exothermic";
    if (enthalpy > 0) return "endothermic";
  }
  return "unknown";
}

function parseEnthalpy(val: any): number | undefined {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    const num = parseFloat(val.replace(/[^\d.-]/g, ""));
    return isNaN(num) ? undefined : num;
  }
  return undefined;
}

function normalizeProcessCategory(cat?: string): "atomic_bonding" | "concentrations" | "properties" | "observables" | "thermodynamics" | "conservation" {
  const valid = new Set(["atomic_bonding", "concentrations", "properties", "observables", "thermodynamics", "conservation"]);
  if (cat && valid.has(cat)) return cat as any;
  if (cat?.includes("bond") || cat?.includes("atom")) return "atomic_bonding";
  if (cat?.includes("thermo") || cat?.includes("energy") || cat?.includes("heat")) return "thermodynamics";
  if (cat?.includes("conserv")) return "conservation";
  if (cat?.includes("conc")) return "concentrations";
  if (cat?.includes("obs") || cat?.includes("visual")) return "observables";
  return "properties";
}

export class AiReactionPredictor {
  /**
   * Resolves the API key and provider to use based on options and environment variables.
   */
  public resolveProviderAndKey(options?: PredictReactionOptions): { provider: AiProviderType; apiKey: string } {
    const config = getConfig();

    let provider: AiProviderType = options?.provider ?? config.defaultAiProvider ?? "groq";
    let apiKey = options?.apiKey?.trim();

    if (apiKey && apiKey.startsWith("gsk_")) {
      provider = "groq";
    }

    if (!apiKey) {
      if (provider === "groq" && config.groqApiKey) {
        apiKey = config.groqApiKey;
      } else if (provider === "gemini" && config.geminiApiKey) {
        apiKey = config.geminiApiKey;
      } else if (provider === "openai" && config.openaiApiKey) {
        apiKey = config.openaiApiKey;
      } else if (provider === "anthropic" && config.anthropicApiKey) {
        apiKey = config.anthropicApiKey;
      } else {
        // Fallback to any configured key
        if (config.groqApiKey) {
          provider = "groq";
          apiKey = config.groqApiKey;
        } else if (config.geminiApiKey) {
          provider = "gemini";
          apiKey = config.geminiApiKey;
        } else if (config.openaiApiKey) {
          provider = "openai";
          apiKey = config.openaiApiKey;
        } else if (config.anthropicApiKey) {
          provider = "anthropic";
          apiKey = config.anthropicApiKey;
        }
      }
    }

    if (!apiKey) {
      throw new Error(
        "NO_API_KEY: No AI API key is configured. Please provide your Groq, Google Gemini, OpenAI, or Anthropic API key in Settings, or set GROQ_API_KEY in the server .env file."
      );
    }

    return { provider, apiKey };
  }

  /**
   * Tests an API key against the provider by making a minimal request.
   */
  public async testApiKey(provider: AiProviderType, apiKey: string): Promise<{ valid: boolean; message: string }> {
    try {
      if (provider === "groq") {
        // Use verified Groq active production models
        const models = ["qwen/qwen3.8-27b", "openai/gpt-oss-120b", "llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
        let lastErr = "";
        for (const model of models) {
          try {
            const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model,
                messages: [{ role: "user", content: "Say OK" }],
                max_tokens: 50,
              }),
              signal: AbortSignal.timeout(10000),
            });
            if (res.ok) {
              return { valid: true, message: `Groq API key is valid and working (${model})!` };
            }
            const errData = await res.json().catch(() => ({}));
            lastErr = (errData as any)?.error?.message || `HTTP ${res.status}`;
          } catch (e: any) {
            lastErr = e.message;
          }
        }
        return { valid: false, message: `Groq API key verification failed: ${lastErr}` };
      }

      if (provider === "gemini") {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Respond with the word OK" }] }],
          }),
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg = (errData as any)?.error?.message || `HTTP ${res.status}`;
          return { valid: false, message: `Gemini API key verification failed: ${errMsg}` };
        }
        return { valid: true, message: "Google Gemini API key is valid and working!" };
      }

      if (provider === "openai") {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "Say OK" }],
            max_tokens: 5,
          }),
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg = (errData as any)?.error?.message || `HTTP ${res.status}`;
          return { valid: false, message: `OpenAI API key verification failed: ${errMsg}` };
        }
        return { valid: true, message: "OpenAI API key is valid and working!" };
      }

      if (provider === "anthropic") {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 10,
            messages: [{ role: "user", content: "Say OK" }],
          }),
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg = (errData as any)?.error?.message || `HTTP ${res.status}`;
          return { valid: false, message: `Anthropic API key verification failed: ${errMsg}` };
        }
        return { valid: true, message: "Anthropic API key is valid and working!" };
      }

      return { valid: false, message: `Unsupported provider: ${provider}` };
    } catch (err: any) {
      return { valid: false, message: `Connection error: ${err.message}` };
    }
  }

  /**
   * Assembles a rich scientific prompt including physical conditions and chemical characteristics.
   */
  public assemblePrompt(promptContext: string, options?: PredictReactionOptions): string {
    const parts: string[] = [];
    parts.push(`Chemical Query / Mixture:\n"${promptContext}"`);

    if (options?.reactantDetails && options.reactantDetails.length > 0) {
      const detailsText = options.reactantDetails
        .map(
          (r, i) =>
            `${i + 1}. ${r.name} [${r.formula}]${r.state ? ` (${r.state})` : ""}${r.amount ? ` - Amount: ${r.amount}` : ""}${r.class ? ` - Class: ${r.class}` : ""}`
        )
        .join("\n");
      parts.push(`Reactant Details:\n${detailsText}`);
    }

    const condParts: string[] = [];
    if (options?.conditions) {
      if (options.conditions.temperatureC !== undefined) {
        const tempDesc =
          options.conditions.temperatureC > 100
            ? " (elevated / heating applied)"
            : options.conditions.temperatureC < 15
            ? " (chilled / cold temperature)"
            : " (room temperature)";
        condParts.push(`Temperature: ${options.conditions.temperatureC} °C${tempDesc}`);
      }
      if (options.conditions.pressureAtm !== undefined) {
        condParts.push(`Pressure: ${options.conditions.pressureAtm} atm`);
      }
      if (options.conditions.solvent) {
        condParts.push(`Solvent: ${options.conditions.solvent}`);
      }
      if (options.conditions.catalystChemicalId) {
        condParts.push(`Catalyst: ${options.conditions.catalystChemicalId}`);
      }
    }

    if (condParts.length > 0) {
      parts.push(`Reaction Conditions:\n${condParts.join("\n")}`);
    } else {
      parts.push("Reaction Conditions: Standard ambient laboratory conditions (25 °C, 1 atm, aqueous solution if applicable).");
    }

    parts.push(
      "Perform a full mechanistic and thermodynamic evaluation. Predict whether a reaction occurs, products, exact stoichiometry, balanced equation, observable effects, and enthalpy."
    );

    return parts.join("\n\n");
  }

  /**
   * Predicts a reaction using the chosen LLM provider.
   */
  public async predict(
    promptContext: string,
    options?: PredictReactionOptions
  ): Promise<ReactionResolution> {
    const { provider, apiKey } = this.resolveProviderAndKey(options);
    logger.info("AI reaction prediction requested", { provider, promptContext: promptContext.slice(0, 100) });

    const fullPrompt = this.assemblePrompt(promptContext, options);
    const rawJson = await this.callProvider(provider, apiKey, fullPrompt);
    return this.postProcessResult(rawJson, provider);
  }

  /**
   * Dispatches the prompt to the specific provider REST endpoint.
   */
  private async callProvider(provider: AiProviderType, apiKey: string, fullUserPrompt: string): Promise<RawAiReactionResponse> {
    let responseText = "";

    if (provider === "gemini") {
      const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
      let lastErr = "";

      for (const model of models) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }],
              },
              contents: [{ role: "user", parts: [{ text: fullUserPrompt }] }],
              generationConfig: {
                temperature: 0.1,
                topP: 0.95,
                responseMimeType: "application/json",
              },
            }),
            signal: AbortSignal.timeout(35000),
          });

          if (res.ok) {
            const data = (await res.json()) as any;
            responseText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
            if (responseText) break;
          } else {
            const errData = await res.json().catch(() => ({}));
            lastErr = (errData as any)?.error?.message || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          lastErr = e.message;
        }
      }

      if (!responseText) {
        throw new Error(`Gemini API failed: ${lastErr}`);
      }
    } else if (provider === "groq") {
      const models = ["qwen/qwen3.8-27b", "openai/gpt-oss-120b", "llama-3.3-70b-versatile", "llama-3.1-8b-instant"];
      let lastErr = "";
      for (const model of models) {
        try {
          const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: SYSTEM_INSTRUCTION },
                { role: "user", content: fullUserPrompt },
              ],
              temperature: 0.1,
              response_format: { type: "json_object" },
            }),
            signal: AbortSignal.timeout(35000),
          });

          if (res.ok) {
            const data = (await res.json()) as any;
            responseText = data.choices?.[0]?.message?.content ?? "";
            if (responseText) break;
          } else {
            const errData = await res.json().catch(() => ({}));
            lastErr = (errData as any)?.error?.message || `HTTP ${res.status}`;
          }
        } catch (e: any) {
          lastErr = e.message;
        }
      }

      if (!responseText) {
        throw new Error(`Groq API failed: ${lastErr}`);
      }
    } else if (provider === "openai") {
      const models = ["gpt-4o-mini", "gpt-4o"];
      let lastErr = "";
      for (const model of models) {
        try {
          const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: [
                { role: "system", content: SYSTEM_INSTRUCTION },
                { role: "user", content: fullUserPrompt },
              ],
              temperature: 0.1,
              response_format: { type: "json_object" },
            }),
            signal: AbortSignal.timeout(35000),
          });

          if (res.ok) {
            const data = (await res.json()) as any;
            responseText = data.choices?.[0]?.message?.content ?? "";
            if (responseText) break;
          } else {
            const errData = await res.json().catch(() => ({}));
            lastErr = (errData as any)?.error?.message || res.statusText;
          }
        } catch (e: any) {
          lastErr = e.message;
        }
      }

      if (!responseText) {
        throw new Error(`OpenAI API failed: ${lastErr}`);
      }
    } else if (provider === "anthropic") {
      const models = ["claude-3-5-haiku-20241022", "claude-3-5-sonnet-20241022"];
      let lastErr = "";
      for (const model of models) {
        try {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model,
              max_tokens: 3500,
              system: SYSTEM_INSTRUCTION,
              messages: [{ role: "user", content: fullUserPrompt }],
            }),
            signal: AbortSignal.timeout(35000),
          });

          if (res.ok) {
            const data = (await res.json()) as any;
            responseText = data.content?.find((c: any) => c.type === "text")?.text ?? "";
            if (responseText) break;
          } else {
            const errData = await res.json().catch(() => ({}));
            lastErr = (errData as any)?.error?.message || res.statusText;
          }
        } catch (e: any) {
          lastErr = e.message;
        }
      }

      if (!responseText) {
        throw new Error(`Anthropic API failed: ${lastErr}`);
      }
    }

    // Clean any markdown formatting if present
    let cleanJson = responseText.replace(/```json\s*|```/g, "").trim();
    if (!cleanJson.startsWith("{") || !cleanJson.endsWith("}")) {
      const firstBrace = cleanJson.indexOf("{");
      const lastBrace = cleanJson.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        cleanJson = cleanJson.slice(firstBrace, lastBrace + 1);
      }
    }
    try {
      return JSON.parse(cleanJson) as RawAiReactionResponse;
    } catch (parseErr: any) {
      logger.error("Failed to parse AI reaction JSON", { responseText, err: parseErr.message });
      throw new Error(`The AI provider returned invalid JSON: ${parseErr.message}`);
    }
  }

  /**
   * Cross-references species against the local curated chemical repository to enrich IDs, names, and registered flags.
   */
  private enrichSpecies(
    rawList: { chemicalId?: string; formula: string; commonName?: string; coefficient?: number; isByproduct?: boolean }[],
    isProduct: boolean
  ): ResolvedSpecies[] {
    let db: any;
    try {
      db = getDb();
    } catch {
      db = undefined;
    }

    return rawList.map((item) => {
      const { formula: cleanForm, coefficient: extractedCoeff } = sanitizeChemicalFormula(item.formula);
      const coeff = item.coefficient || extractedCoeff || 1;
      let chemicalId: string =
        item.chemicalId && item.chemicalId !== "standard_lower_id" && item.chemicalId !== "standard_id"
          ? item.chemicalId
          : cleanForm.toLowerCase();
      let commonName = item.commonName || cleanForm;
      let isRegistered = false;

      if (db) {
        try {
          // 1. Direct match by id
          let row = db.prepare("SELECT id, common_name, formula, molar_mass FROM chemicals WHERE LOWER(id) = LOWER(?) LIMIT 1").get(chemicalId);
          // 2. Direct match by exact formula
          if (!row) {
            row = db.prepare("SELECT id, common_name, formula, molar_mass FROM chemicals WHERE LOWER(formula) = LOWER(?) LIMIT 1").get(cleanForm);
          }
          // 3. Match by common name
          if (!row && item.commonName) {
            row = db.prepare("SELECT id, common_name, formula, molar_mass FROM chemicals WHERE LOWER(common_name) = LOWER(?) LIMIT 1").get(item.commonName);
          }

          if (row) {
            chemicalId = row.id;
            commonName = row.common_name;
            isRegistered = true;
          }
        } catch {
          // Ignore DB query errors in test/fallback state
        }
      }

      return {
        chemicalId,
        formula: cleanForm,
        commonName,
        coefficient: coeff,
        isByproduct: isProduct ? !!item.isByproduct : undefined,
        isRegistered,
      };
    });
  }

  /**
   * Attempts exact chemical balancing using Gaussian elimination, and tests water completion
   * if hydrogen and oxygen are missing in aqueous redox outcomes.
   */
  private balanceReaction(
    reactants: ResolvedSpecies[],
    products: ResolvedSpecies[],
    originalEquation?: string
  ): {
    balancedEquation: string;
    reactants: ResolvedSpecies[];
    products: ResolvedSpecies[];
    isBalanced: boolean;
    notes?: string;
  } {
    const formatEquation = (rList: ResolvedSpecies[], pList: ResolvedSpecies[]): string => {
      const lhs = rList.map((r) => `${r.coefficient > 1 ? `${r.coefficient} ` : ""}${r.formula}`).join(" + ");
      const rhs = pList.map((p) => `${p.coefficient > 1 ? `${p.coefficient} ` : ""}${p.formula}`).join(" + ");
      return `${lhs} → ${rhs}`;
    };

    const computeDeficit = (rList: ResolvedSpecies[], pList: ResolvedSpecies[]) => {
      const rTotals: Record<string, number> = {};
      const pTotals: Record<string, number> = {};

      for (const r of rList) {
        try {
          const parsed = parseFormula(r.formula);
          const coeff = r.coefficient || 1;
          for (const [el, count] of Object.entries(parsed.composition)) {
            rTotals[el] = (rTotals[el] ?? 0) + count * coeff;
          }
        } catch {}
      }

      for (const p of pList) {
        try {
          const parsed = parseFormula(p.formula);
          const coeff = p.coefficient || 1;
          for (const [el, count] of Object.entries(parsed.composition)) {
            pTotals[el] = (pTotals[el] ?? 0) + count * coeff;
          }
        } catch {}
      }

      const allElements = new Set([...Object.keys(rTotals), ...Object.keys(pTotals)]);
      let allBalanced = allElements.size > 0;
      for (const el of allElements) {
        if ((rTotals[el] ?? 0) !== (pTotals[el] ?? 0)) {
          allBalanced = false;
          break;
        }
      }

      const deltaH = (rTotals["H"] ?? 0) - (pTotals["H"] ?? 0);
      const deltaO = (rTotals["O"] ?? 0) - (pTotals["O"] ?? 0);

      return { deltaH, deltaO, allBalanced };
    };

    // 1. Check if direct coefficients provided by model are already atom-balanced
    let initialDeficit = computeDeficit(reactants, products);
    if (initialDeficit.allBalanced) {
      return {
        balancedEquation: formatEquation(reactants, products),
        reactants,
        products,
        isBalanced: true,
      };
    }

    // 2. Check for missing stoichiometric water in aqueous redox or hydrolysis
    if (initialDeficit.deltaH > 0 && initialDeficit.deltaO > 0 && initialDeficit.deltaH === 2 * initialDeficit.deltaO) {
      const waterCoeff = initialDeficit.deltaO;
      const existingWaterIdx = products.findIndex((p) => p.formula === "H2O" || p.chemicalId === "water");
      let testProducts: ResolvedSpecies[];
      if (existingWaterIdx >= 0) {
        testProducts = products.map((p, idx) =>
          idx === existingWaterIdx ? { ...p, coefficient: (p.coefficient || 0) + waterCoeff } : p
        );
      } else {
        testProducts = [
          ...products,
          {
            chemicalId: "water",
            formula: "H2O",
            commonName: "Water",
            coefficient: waterCoeff,
            isByproduct: true,
            isRegistered: true,
          },
        ];
      }
      const checkAfterWater = computeDeficit(reactants, testProducts);
      if (checkAfterWater.allBalanced) {
        return {
          balancedEquation: formatEquation(reactants, testProducts),
          reactants,
          products: testProducts,
          isBalanced: true,
          notes: "Aqueous medium: balanced with water (H2O) produced.",
        };
      }
    } else if (initialDeficit.deltaH < 0 && initialDeficit.deltaO < 0 && -initialDeficit.deltaH === 2 * -initialDeficit.deltaO) {
      const waterCoeff = -initialDeficit.deltaO;
      const existingWaterIdx = reactants.findIndex((r) => r.formula === "H2O" || r.chemicalId === "water");
      let testReactants: ResolvedSpecies[];
      if (existingWaterIdx >= 0) {
        testReactants = reactants.map((r, idx) =>
          idx === existingWaterIdx ? { ...r, coefficient: (r.coefficient || 0) + waterCoeff } : r
        );
      } else {
        testReactants = [
          ...reactants,
          {
            chemicalId: "water",
            formula: "H2O",
            commonName: "Water",
            coefficient: waterCoeff,
            isRegistered: true,
          },
        ];
      }
      const checkAfterWater = computeDeficit(testReactants, products);
      if (checkAfterWater.allBalanced) {
        return {
          balancedEquation: formatEquation(testReactants, products),
          reactants: testReactants,
          products,
          isBalanced: true,
          notes: "Hydrolysis in aqueous solution: balanced with water (H2O) consumed.",
        };
      }
    }

    // 3. Attempt mathematical Gaussian balancing
    try {
      const rBal: BalancerSpecies[] = reactants.map((r) => {
        const parsed = parseFormula(r.formula);
        return { label: r.formula, formula: r.formula, composition: parsed.composition, charge: parsed.charge ?? 0 };
      });
      const pBal: BalancerSpecies[] = products.map((prod) => {
        const parsed = parseFormula(prod.formula);
        return { label: prod.formula, formula: prod.formula, composition: parsed.composition, charge: parsed.charge ?? 0 };
      });

      let balRes: ReturnType<typeof balanceEquation> | undefined;
      let finalBalReactants = reactants.map((r) => ({ ...r }));
      let finalBalProducts = products.map((p) => ({ ...p }));

      try {
        balRes = balanceEquation(rBal, pBal);
      } catch {
        // If element coverage failed because H is missing in products while H and O are in reactants
        const hasWaterInP = products.some((p) => p.formula === "H2O");
        const hasWaterInR = reactants.some((r) => r.formula === "H2O");
        const rElements = new Set(rBal.flatMap((b) => Object.keys(b.composition)));
        const pElements = new Set(pBal.flatMap((b) => Object.keys(b.composition)));

        if (!hasWaterInP && rElements.has("H") && rElements.has("O") && !pElements.has("H")) {
          try {
            const h2oSpecies: BalancerSpecies = {
              label: "H2O",
              formula: "H2O",
              composition: { H: 2, O: 1 },
              charge: 0,
            };
            balRes = balanceEquation(rBal, [...pBal, h2oSpecies]);
            finalBalProducts = [
              ...products.map((p) => ({ ...p })),
              {
                chemicalId: "water",
                formula: "H2O",
                commonName: "Water",
                coefficient: 1,
                isByproduct: true,
                isRegistered: true,
              },
            ];
          } catch {}
        } else if (!hasWaterInR && pElements.has("H") && pElements.has("O") && !rElements.has("H")) {
          try {
            const h2oSpecies: BalancerSpecies = {
              label: "H2O",
              formula: "H2O",
              composition: { H: 2, O: 1 },
              charge: 0,
            };
            balRes = balanceEquation([...rBal, h2oSpecies], pBal);
            finalBalReactants = [
              ...reactants.map((r) => ({ ...r })),
              {
                chemicalId: "water",
                formula: "H2O",
                commonName: "Water",
                coefficient: 1,
                isRegistered: true,
              },
            ];
          } catch {}
        }
      }

      if (balRes && balRes.balancedEquationText) {
        finalBalReactants.forEach((r, idx) => {
          if (balRes!.reactantCoefficients[idx]) r.coefficient = balRes!.reactantCoefficients[idx]!;
        });
        finalBalProducts.forEach((p, idx) => {
          if (balRes!.productCoefficients[idx]) p.coefficient = balRes!.productCoefficients[idx]!;
        });
        return {
          balancedEquation: balRes.balancedEquationText,
          reactants: finalBalReactants,
          products: finalBalProducts,
          isBalanced: true,
        };
      }
    } catch {
      // Gaussian balancer failed or threw under-constrained
    }

    const fallbackEquation = originalEquation || formatEquation(reactants, products);
    return {
      balancedEquation: fallbackEquation,
      reactants,
      products,
      isBalanced: false,
    };
  }

  /**
   * Post-processes and strictly validates the AI prediction:
   * 1. Sanitizes formulas and cross-references against local chemical database.
   * 2. Checks atomic balance via formula parser and Gaussian balancer.
   * 3. Normalizes reaction types and observable effects.
   * 4. Attaches rich 5-dimension process breakdown if missing.
   */
  private postProcessResult(raw: RawAiReactionResponse, provider: AiProviderType): ReactionResolution {
    const providerLabel =
      provider === "groq"
        ? "Groq (Llama 3.3)"
        : provider === "gemini"
        ? "Google Gemini"
        : provider === "openai"
        ? "OpenAI GPT-4"
        : "Anthropic Claude";

    const rawStatus = (raw.status || "").toUpperCase().trim().replace(/[-\s]/g, "_");
    const isNoReaction =
      rawStatus === "NO_REACTION" ||
      rawStatus === "NO" ||
      rawStatus === "NONE" ||
      rawStatus === "NO_CHANGE" ||
      !raw.products ||
      raw.products.length === 0;

    if (isNoReaction) {
      const enrichedReactants = this.enrichSpecies(raw.reactants || [], false);
      return {
        status: "NO_REACTION",
        confidenceTier: "PREDICTED",
        confidenceScore: 0.95,
        reactants: enrichedReactants,
        products: [],
        observableEffects: [],
        explanation: raw.explanation || "No reaction occurs between these species under specified conditions.",
        ruleApplied: `ai_predicted:${provider}`,
        warnings: [`Reaction outcome predicted by ${providerLabel}. No net reaction occurs under the specified conditions.`],
        aiProvider: providerLabel,
        isAiPredicted: true,
      };
    }

    // Enrich reactants and products with database references and cleaned formulas
    const reactants = this.enrichSpecies(raw.reactants || [], false);
    const products = this.enrichSpecies(raw.products || [], true);

    // Run stoichiometric balancing verification
    const { balancedEquation, reactants: finalReactants, products: finalProducts, isBalanced, notes: balanceNotes } =
      this.balanceReaction(reactants, products, raw.balancedEquation);

    const enthalpyKjPerMol = parseEnthalpy(raw.enthalpyKjPerMol);
    const energyClass = normalizeEnergyClass(raw.energyClassification, enthalpyKjPerMol);
    const reactionType = normalizeReactionType(raw.reactionType);

    const observableEffects: ObservableEffect[] = (raw.observableEffects || []).map((e) => ({
      type: normalizeEffectType(e.type),
      description: e.description || "",
      colorFrom: e.colorFrom,
      colorTo: e.colorTo,
    }));

    const warnings: string[] = [
      `Dynamically predicted by ${providerLabel}.${isBalanced ? " Outcome verified by chemical balancer." : " Approximate stoichiometry."}`,
    ];
    if (balanceNotes) warnings.push(balanceNotes);

    const rawDims = raw.processBreakdown?.dimensions;
    const dimensions =
      rawDims && Array.isArray(rawDims) && rawDims.length > 0
        ? rawDims.map((d) => ({
            title: d.title || "Reaction Stage",
            category: normalizeProcessCategory(d.category),
            description: d.description || "",
            details: Array.isArray(d.details) ? d.details : [],
          }))
        : [
            {
              title: "Reactant State & Chemical Environment",
              category: "atomic_bonding" as const,
              description: "Initial molecular/ionic structure and chemical bonds before reaction.",
              details: finalReactants.map((r) => `${r.coefficient} ${r.commonName} (${r.formula})`),
            },
            {
              title: "Transition State & Electron Transfer",
              category: "observables" as const,
              description: raw.explanation,
              details: ["Intermediate reorganization and kinetic pathway."],
            },
            {
              title: "Product Synthesis & Energy Balance",
              category: "thermodynamics" as const,
              description: `Energy classification: ${energyClass} (${enthalpyKjPerMol ? `${enthalpyKjPerMol} kJ/mol` : "thermodynamically favored"}).`,
              details: finalProducts.map((p) => `Generated ${p.coefficient} ${p.commonName} (${p.formula})`),
            },
          ];

    const processBreakdown: ChemicalProcessBreakdown = {
      masterExplanation: raw.processBreakdown?.masterExplanation || raw.explanation,
      dimensions,
    };

    return {
      status: "REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: isBalanced ? 0.98 : 0.88,
      reactionType,
      balancedEquation,
      netIonicEquation: raw.netIonicEquation,
      reactants: finalReactants,
      products: finalProducts,
      observableEffects,
      energyClassification: energyClass,
      enthalpyKjPerMol,
      explanation: raw.explanation,
      ruleApplied: `ai_predicted:${provider}`,
      safetyNotes: raw.safetyNotes,
      warnings,
      processExplanation: raw.explanation,
      processBreakdown,
      aiProvider: providerLabel,
      isAiPredicted: true,
    };
  }
}

export const aiReactionPredictor = new AiReactionPredictor();

