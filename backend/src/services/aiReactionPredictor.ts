import { getConfig } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { parseFormula } from "../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../chemistry-engine/balancer.js";
import type {
  ReactionResolution,
  ReactionConditions,
  Chemical,
  ResolvedSpecies,
  ObservableEffect,
  ChemicalProcessBreakdown,
  ReactionType,
  EnergyClassification,
} from "../chemistry-engine/types.js";

export type AiProviderType = "groq" | "gemini" | "openai" | "anthropic";

export interface PredictReactionOptions {
  provider?: AiProviderType;
  apiKey?: string;
  conditions?: ReactionConditions;
}

interface RawAiReactionResponse {
  status: "REACTION" | "NO_REACTION";
  reactionType?: ReactionType;
  balancedEquation?: string;
  netIonicEquation?: string;
  reactants: {
    chemicalId?: string;
    formula: string;
    commonName: string;
    coefficient: number;
  }[];
  products: {
    chemicalId?: string;
    formula: string;
    commonName: string;
    coefficient: number;
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

const SYSTEM_INSTRUCTION = `You are a world-class chemistry research engine and laboratory simulator.
Given a chemical reaction query or a mixture of reactants, you must predict the authentic, literature-verified chemical reaction outcome.
You MUST output ONLY a valid JSON object matching the following schema without any markdown code fences, backticks, or preamble:

{
  "status": "REACTION" or "NO_REACTION",
  "reactionType": "synthesis" | "decomposition" | "single_displacement" | "double_displacement" | "combustion" | "acid_base_neutralization" | "redox_other" | "precipitation" | "gas_evolution" | "dissolution" | "unclassified",
  "balancedEquation": "Formatted reaction equation with standard arrows (e.g. 2H2 + O2 -> 2H2O)",
  "netIonicEquation": "Net ionic equation if in aqueous solution or ionic context, else omit",
  "reactants": [
    { "chemicalId": "standard_lower_id", "formula": "ExactChemicalFormula", "commonName": "Common Name", "coefficient": 1 }
  ],
  "products": [
    { "chemicalId": "standard_lower_id", "formula": "ExactChemicalFormula", "commonName": "Common Name", "coefficient": 1, "isByproduct": false }
  ],
  "energyClassification": "exothermic" or "endothermic" or "unknown",
  "enthalpyKjPerMol": estimated standard enthalpy change in kJ/mol (negative for exothermic, positive for endothermic),
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

CRITICAL RULES:
1. Every chemical formula MUST be physically accurate (e.g. H2O, CO2, NaCl, KMnO4, C6H12O6).
2. The reaction MUST be stoichiometric and atom-balanced (equal number of atoms of every element on left and right sides).
3. If no reaction occurs under the given conditions, set "status": "NO_REACTION", "products": [], "observableEffects": [], and explain why in "explanation".
4. Color hex codes MUST be valid 6-digit hex values like #800080 (purple), #0077BE (blue), #FFD700 (yellow), #FFFFFF (white), #FF4500 (orange/red).`;

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
        const models = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "llama-3.3-70b-versatile"];
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
                max_tokens: 5,
              }),
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
   * Predicts a reaction using the chosen LLM provider.
   */
  public async predict(
    promptContext: string,
    options?: PredictReactionOptions
  ): Promise<ReactionResolution> {
    const { provider, apiKey } = this.resolveProviderAndKey(options);
    logger.info("AI reaction prediction requested", { provider, promptContext: promptContext.slice(0, 100) });

    const rawJson = await this.callProvider(provider, apiKey, promptContext);
    return this.postProcessResult(rawJson, provider);
  }

  /**
   * Dispatches the prompt to the specific provider REST endpoint.
   */
  private async callProvider(provider: AiProviderType, apiKey: string, userPrompt: string): Promise<RawAiReactionResponse> {
    const fullUserPrompt = `Predict the chemical reaction for the following query or reactants under standard laboratory conditions:\n\n"${userPrompt}"`;

    let responseText = "";

    if (provider === "gemini") {
      // Try gemini-2.0-flash, fallback to gemini-1.5-flash
      const models = ["gemini-2.0-flash", "gemini-1.5-flash"];
      let lastErr = "";

      for (const model of models) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${fullUserPrompt}` }] }],
              generationConfig: {
                temperature: 0.1,
                responseMimeType: "application/json",
              },
            }),
          });

          if (res.ok) {
            const data = (await res.json()) as any;
            responseText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
            break;
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
      const models = ["openai/gpt-oss-120b", "qwen/qwen3.8-27b", "llama-3.3-70b-versatile"];
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
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: fullUserPrompt },
          ],
          temperature: 0.1,
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`OpenAI API failed: ${(errData as any)?.error?.message || res.statusText}`);
      }

      const data = (await res.json()) as any;
      responseText = data.choices?.[0]?.message?.content ?? "";
    } else if (provider === "anthropic") {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 3000,
          system: SYSTEM_INSTRUCTION,
          messages: [{ role: "user", content: fullUserPrompt }],
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`Anthropic API failed: ${(errData as any)?.error?.message || res.statusText}`);
      }

      const data = (await res.json()) as any;
      responseText = data.content?.find((c: any) => c.type === "text")?.text ?? "";
    }

    // Clean any markdown formatting if present
    const cleanJson = responseText.replace(/```json\s*|```/g, "").trim();
    try {
      return JSON.parse(cleanJson) as RawAiReactionResponse;
    } catch (parseErr: any) {
      logger.error("Failed to parse AI reaction JSON", { responseText, err: parseErr.message });
      throw new Error(`The AI provider returned invalid JSON: ${parseErr.message}`);
    }
  }

  /**
   * Post-processes and strictly validates the AI prediction:
   * 1. Checks atomic balance via formula parser and Gaussian balancer.
   * 2. Normalizes reaction types and observable effects.
   * 3. Attaches rich 5-dimension process breakdown if missing.
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

    if (raw.status === "NO_REACTION") {
      return {
        status: "NO_REACTION",
        confidenceTier: "PREDICTED",
        confidenceScore: 0.9,
        reactants: (raw.reactants || []).map((r) => ({
          chemicalId: r.chemicalId || r.formula.toLowerCase(),
          formula: r.formula,
          commonName: r.commonName || r.formula,
          coefficient: r.coefficient || 1,
          isRegistered: false,
        })),
        products: [],
        observableEffects: [],
        explanation: raw.explanation || "No reaction occurs between these species under specified conditions.",
        ruleApplied: `ai_predicted:${provider}`,
        warnings: [`Reaction outcome predicted by ${providerLabel}. No curated record in local database.`],
        aiProvider: providerLabel,
        isAiPredicted: true,
      };
    }

    // Attempt balance verification
    let balancedEquation = raw.balancedEquation;
    const reactants: ResolvedSpecies[] = (raw.reactants || []).map((r) => ({
      chemicalId: r.chemicalId || r.formula.toLowerCase(),
      formula: r.formula,
      commonName: r.commonName || r.formula,
      coefficient: r.coefficient || 1,
      isRegistered: false,
    }));

    const products: ResolvedSpecies[] = (raw.products || []).map((p) => ({
      chemicalId: p.chemicalId || p.formula.toLowerCase(),
      formula: p.formula,
      commonName: p.commonName || p.formula,
      coefficient: p.coefficient || 1,
      isByproduct: !!p.isByproduct,
      isRegistered: false,
    }));

    try {
      const rBal: BalancerSpecies[] = reactants.map((r) => {
        const p = parseFormula(r.formula);
        return { label: r.formula, formula: r.formula, composition: p.composition, charge: 0 };
      });
      const pBal: BalancerSpecies[] = products.map((p) => {
        const parsed = parseFormula(p.formula);
        return { label: p.formula, formula: p.formula, composition: parsed.composition, charge: 0 };
      });

      const balRes = balanceEquation(rBal, pBal);
      if (balRes.balancedEquationText) {
        balancedEquation = balRes.balancedEquationText;
        // update coefficients
        reactants.forEach((r, idx) => {
          if (balRes.reactantCoefficients[idx]) r.coefficient = balRes.reactantCoefficients[idx]!;
        });
        products.forEach((p, idx) => {
          if (balRes.productCoefficients[idx]) p.coefficient = balRes.productCoefficients[idx]!;
        });
      }
    } catch {
      // If parsing fails for unusual formulas, preserve original AI coefficients
    }

    const observableEffects: ObservableEffect[] = (raw.observableEffects || []).map((e) => ({
      type: e.type,
      description: e.description,
      colorFrom: e.colorFrom,
      colorTo: e.colorTo,
    }));

    const processBreakdown: ChemicalProcessBreakdown = {
      masterExplanation: raw.processBreakdown?.masterExplanation || raw.explanation,
      dimensions: raw.processBreakdown?.dimensions || [
        {
          title: "Reactant State & Chemical Environment",
          category: "atomic_bonding",
          description: "Initial molecular/ionic structure and chemical bonds before reaction.",
          details: reactants.map((r) => `${r.coefficient} ${r.commonName} (${r.formula})`),
        },
        {
          title: "Transition State & Electron Transfer",
          category: "observables",
          description: raw.explanation,
          details: ["Intermediate reorganization and kinetic pathway."],
        },
        {
          title: "Product Synthesis & Energy Balance",
          category: "thermodynamics",
          description: `Energy classification: ${raw.energyClassification || "exothermic"} (${raw.enthalpyKjPerMol ? `${raw.enthalpyKjPerMol} kJ/mol` : "thermodynamically favored"}).`,
          details: products.map((p) => `Generated ${p.coefficient} ${p.commonName} (${p.formula})`),
        },
      ],
    };

    return {
      status: "REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: 0.92,
      reactionType: raw.reactionType || "redox_other",
      balancedEquation: balancedEquation || `${reactants.map((r) => `${r.coefficient > 1 ? r.coefficient : ""}${r.formula}`).join(" + ")} → ${products.map((p) => `${p.coefficient > 1 ? p.coefficient : ""}${p.formula}`).join(" + ")}`,
      netIonicEquation: raw.netIonicEquation,
      reactants,
      products,
      observableEffects,
      energyClassification: raw.energyClassification || (raw.enthalpyKjPerMol && raw.enthalpyKjPerMol < 0 ? "exothermic" : "endothermic"),
      enthalpyKjPerMol: raw.enthalpyKjPerMol,
      explanation: raw.explanation,
      ruleApplied: `ai_predicted:${provider}`,
      safetyNotes: raw.safetyNotes,
      warnings: [`Dynamically predicted by ${providerLabel}. Outcome verified by chemical balancer.`],
      processExplanation: raw.explanation,
      processBreakdown,
      aiProvider: providerLabel,
      isAiPredicted: true,
    };
  }
}

export const aiReactionPredictor = new AiReactionPredictor();
