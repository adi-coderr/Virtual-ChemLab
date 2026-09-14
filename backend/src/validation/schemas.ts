import { z } from "zod";

export const unitSchema = z.enum(["g", "kg", "mg", "mol", "mmol", "mL", "L"]);

export const reactionInputSpeciesSchema = z.object({
  chemicalId: z.string().min(1),
  amount: z.number().positive(),
  unit: unitSchema,
  concentrationMolar: z.number().positive().optional(),
});

export const reactionConditionsSchema = z
  .object({
    temperatureC: z.number().min(-273.15).max(3000).optional(),
    pressureAtm: z.number().positive().optional(),
    solvent: z.string().max(100).optional(),
    catalystChemicalId: z.string().optional(),
  })
  .optional();

export const chemicalSearchQuerySchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

export const chemicalListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
  chemicalClass: z.string().optional(),
});

export const simulateReactionSchema = z.object({
  reactants: z.array(reactionInputSpeciesSchema).min(1).max(50),
  conditions: reactionConditionsSchema,
});

export const balanceEquationRequestSchema = z.object({
  reactants: z.array(z.string().min(1)).min(1).max(10),
  products: z.array(z.string().min(1)).min(1).max(10),
});

export const stoichiometryRequestSchema = z.object({
  reactionId: z.string().min(1),
  reactantAmounts: z.array(reactionInputSpeciesSchema).min(1).max(50),
  actualYieldMassGrams: z.number().positive().optional(),
});

export const createExperimentSchema = z.object({
  name: z.string().max(200).optional(),
});

const addChemicalPayloadSchema = z.object({
  chemicalId: z.string().min(1),
  amount: z.number().positive(),
  unit: unitSchema,
  concentrationMolar: z.number().positive().optional(),
  containerId: z.string().optional(),
});
const mixPayloadSchema = z.object({ containerId: z.string().optional() });
const heatPayloadSchema = z.object({ targetTemperatureC: z.number().min(-273.15).max(3000), containerId: z.string().optional() });
const coolPayloadSchema = z.object({ targetTemperatureC: z.number().min(-273.15).max(3000), containerId: z.string().optional() });
const removePayloadSchema = z.object({ chemicalId: z.string().min(1), containerId: z.string().optional() });
const measurePayloadSchema = z.object({ containerId: z.string().optional(), note: z.string().max(300).optional() });
const runReactionPayloadSchema = z.object({
  reactants: z.array(reactionInputSpeciesSchema).min(1).max(50),
  conditions: reactionConditionsSchema,
  containerId: z.string().optional(),
});
const resetPayloadSchema = z.object({});

/** Discriminated union: the allowlisted operation set (see docs/API.md). Anything outside this union is rejected before it reaches a service. */
export const experimentActionSchema = z.discriminatedUnion("actionType", [
  z.object({ actionType: z.literal("ADD_CHEMICAL"), payload: addChemicalPayloadSchema }),
  z.object({ actionType: z.literal("MIX"), payload: mixPayloadSchema }),
  z.object({ actionType: z.literal("HEAT"), payload: heatPayloadSchema }),
  z.object({ actionType: z.literal("COOL"), payload: coolPayloadSchema }),
  z.object({ actionType: z.literal("REMOVE"), payload: removePayloadSchema }),
  z.object({ actionType: z.literal("MEASURE"), payload: measurePayloadSchema }),
  z.object({ actionType: z.literal("RUN_REACTION"), payload: runReactionPayloadSchema }),
  z.object({ actionType: z.literal("RESET"), payload: resetPayloadSchema }),
]);

export const assistantParseSchema = z.object({
  text: z.string().min(1).max(2000),
  experimentId: z.string().optional(),
});
