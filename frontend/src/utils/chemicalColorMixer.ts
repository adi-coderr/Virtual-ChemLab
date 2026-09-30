import chemicalColorsData from "../data/chemicalColors.json";

export interface ColorInfo {
  color: string;
  formula?: string;
  name?: string;
  state?: string;
}

const colorDatabase = chemicalColorsData as Record<string, ColorInfo>;

// Normalized lookup map by id, formula, and commonName (case-insensitive)
const lookupMap = new Map<string, string>();
for (const [id, info] of Object.entries(colorDatabase)) {
  if (info.color) {
    lookupMap.set(id.toLowerCase(), info.color);
    if (info.formula) lookupMap.set(info.formula.toLowerCase(), info.color);
    if (info.name) lookupMap.set(info.name.toLowerCase(), info.color);
  }
}

/**
 * Returns the realistic real-life hex color of a chemical by its id, formula, or common name.
 */
export function getChemicalColor(chemicalId?: string, formula?: string, commonName?: string): string | undefined {
  if (chemicalId) {
    const byId = lookupMap.get(chemicalId.toLowerCase());
    if (byId) return byId;
  }
  if (formula) {
    const byFormula = lookupMap.get(formula.toLowerCase());
    if (byFormula) return byFormula;
  }
  if (commonName) {
    const byName = lookupMap.get(commonName.toLowerCase());
    if (byName) return byName;
  }
  return undefined;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB | null {
  const cleaned = hex.trim().replace(/^#/, "");
  if (cleaned.length === 3) {
    const rChar = cleaned.charAt(0);
    const gChar = cleaned.charAt(1);
    const bChar = cleaned.charAt(2);
    return {
      r: parseInt(rChar + rChar, 16),
      g: parseInt(gChar + gChar, 16),
      b: parseInt(bChar + bChar, 16),
    };
  }
  if (cleaned.length === 6) {
    return {
      r: parseInt(cleaned.slice(0, 2), 16),
      g: parseInt(cleaned.slice(2, 4), 16),
      b: parseInt(cleaned.slice(4, 6), 16),
    };
  }
  return null;
}

function rgbToHex(rgb: RGB): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(rgb.r).toString(16).padStart(2, "0");
  const g = clamp(rgb.g).toString(16).padStart(2, "0");
  const b = clamp(rgb.b).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

/**
 * Calculates the realistic color of a mixture of chemicals in a laboratory vessel.
 * Accounts for:
 * 1. Dominant chromophores (transition metals: Cu, Fe, Cr, Mn, Co, Ni; halogens: Br2, I2)
 * 2. Precipitates and insoluble colored salts (e.g. PbI2 bright yellow, AgI pale yellow, CuS inky black)
 * 3. Volumetric & mass optical density weighting
 * 4. Realistic solvent tinting (water is crystal cyan-clear #CFE8F3)
 */
export function calculateMixtureColor(contents: Array<{
  chemicalId: string;
  formula?: string;
  commonName?: string;
  substanceColor?: string;
  amount: number;
  unit: string;
}>): string {
  if (!contents || contents.length === 0) {
    return "transparent";
  }

  // Resolve colors for all items
  const resolved = contents.map((c) => {
    const colorHex = c.substanceColor || getChemicalColor(c.chemicalId, c.formula, c.commonName) || "#F0F8FF";
    const rgb = hexToRgb(colorHex) || { r: 240, g: 248, b: 255 };

    // Amount weighting
    let amountWeight = c.amount;
    if (c.unit === "L") amountWeight = c.amount * 1000;
    else if (c.unit === "g") amountWeight = c.amount * 10;
    else if (c.unit === "mg") amountWeight = c.amount * 0.01;
    else if (c.unit === "mol") amountWeight = c.amount * 100;
    else if (c.unit === "mmol") amountWeight = c.amount * 0.1;
    amountWeight = Math.max(0.1, amountWeight);

    // Color strength / optical absorbance factor
    // Strongly colored substances (deep chromophores, metal salts, halogens, precipitates)
    // have high molar extinction coefficients and visually overpower clear solvents.
    const isWater = c.chemicalId.toLowerCase() === "water" || c.chemicalId.toLowerCase() === "h2o";
    const isPureWhite = colorHex.toLowerCase() === "#ffffff" || colorHex.toLowerCase() === "#fff";
    const isVeryLight = rgb.r > 240 && rgb.g > 240 && rgb.b > 240;

    let extinctionFactor = 1.0;
    if (isWater) {
      extinctionFactor = 0.05; // Water provides transparent volume but weak tint compared to colored solutes
    } else if (isPureWhite || isVeryLight) {
      extinctionFactor = 0.15; // Colorless/white dissolved salts have modest whitening/clouding effect
    } else {
      // Strongly colored chromophore: transition metals, halogens, dark pigments
      // Calculate color saturation distance from neutral white
      const deviation = Math.abs(rgb.r - rgb.g) + Math.abs(rgb.g - rgb.b) + Math.abs(rgb.b - rgb.r);
      const darkness = 765 - (rgb.r + rgb.g + rgb.b); // 0 (pure white) to 765 (pure black)
      extinctionFactor = 1.5 + (deviation / 255) * 3.0 + (darkness / 765) * 4.0;
    }

    return {
      colorHex,
      rgb,
      weight: amountWeight * extinctionFactor,
      isStrongColor: !isWater && !isPureWhite && !isVeryLight,
    };
  });

  // If there are colored species present alongside water, prioritize their optical color
  const coloredItems = resolved.filter((r) => r.isStrongColor);
  const itemsToMix = coloredItems.length > 0 ? coloredItems : resolved;

  let totalWeight = 0;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  for (const item of itemsToMix) {
    totalWeight += item.weight;
    // Optical perceived mixing in quadratic space for photorealistic brightness
    rSum += item.rgb.r * item.rgb.r * item.weight;
    gSum += item.rgb.g * item.rgb.g * item.weight;
    bSum += item.rgb.b * item.rgb.b * item.weight;
  }

  if (totalWeight <= 0) return "#CFE8F3";

  return rgbToHex({
    r: Math.sqrt(rSum / totalWeight),
    g: Math.sqrt(gSum / totalWeight),
    b: Math.sqrt(bSum / totalWeight),
  });
}
