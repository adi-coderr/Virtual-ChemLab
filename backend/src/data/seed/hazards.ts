export interface SeedHazard {
  code: string;
  label: string;
  description: string;
  severity: "low" | "medium" | "high" | "extreme";
}

export const HAZARDS: SeedHazard[] = [
  { code: "CORROSIVE", label: "Corrosive", description: "Causes severe skin burns and eye damage on contact.", severity: "high" },
  { code: "TOXIC", label: "Toxic", description: "Harmful if swallowed, inhaled, or absorbed through skin.", severity: "high" },
  { code: "FLAMMABLE", label: "Flammable", description: "Can ignite readily; keep away from open flame or sparks.", severity: "high" },
  { code: "OXIDIZING", label: "Oxidizing", description: "May intensify fire or react violently with combustible/reducing materials.", severity: "medium" },
  { code: "IRRITANT", label: "Irritant", description: "Causes irritation to skin, eyes, or respiratory tract.", severity: "low" },
  { code: "ENVIRONMENTAL_HAZARD", label: "Environmental hazard", description: "Toxic to aquatic life; avoid environmental release.", severity: "medium" },
  { code: "HEALTH_HAZARD", label: "Health hazard", description: "May cause longer-term health effects with repeated or chronic exposure.", severity: "medium" },
  { code: "COMPRESSED_GAS", label: "Compressed gas", description: "Contains gas under pressure; may explode if heated or physically damaged.", severity: "medium" },
];
