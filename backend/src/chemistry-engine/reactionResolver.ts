import type {
  Chemical,
  ReactionConditions,
  ReactionResolution,
  ResolvedSpecies,
  CuratedReaction,
  ObservableEffect,
  ElementComposition,
  ChemicalProcessBreakdown,
} from "./types.js";
import { balanceEquation, type BalancerSpecies } from "./balancer.js";
import { composeNeutralFormula, ion, type IonSpec } from "./ions.js";
import { predictSolubility } from "./solubility.js";
import { isMoreReactive, canDisplaceHydrogenFromAcid } from "./activitySeries.js";
import { describeElementTransfer } from "./oxidationState.js";
import { isFreeElement, soleElementOf, REACTION_TYPE_LABELS } from "./classifier.js";

/** Converts the plain {formula, charge} stored on a Chemical's `dissociation` into a full IonSpec with parsed composition. */
function toIonSpec(spec: { formula: string; charge: number }): IonSpec {
  return ion(spec.formula, spec.charge);
}

export interface ChemicalLookupPort {
  getById(id: string): Chemical | undefined;
  findByComposition(composition: ElementComposition, charge: number): Chemical | undefined;
  /** All curated reactions whose reactant chemical-id multiset exactly equals the given set (order independent). */
  findCuratedReactionsByReactantSet(chemicalIds: string[]): CuratedReaction[];
}

function toSpecies(chem: Chemical, coefficient: number, isByproduct = false): ResolvedSpecies {
  return {
    chemicalId: chem.id,
    formula: chem.formula,
    commonName: chem.commonName,
    coefficient,
    isByproduct,
    isRegistered: true,
  };
}

function unregisteredSpecies(formula: string, coefficient: number): ResolvedSpecies {
  return { chemicalId: `unregistered:${formula}`, formula, commonName: formula, coefficient, isRegistered: false };
}

function toBalancerSpecies(chem: Chemical): BalancerSpecies {
  return { label: chem.id, formula: chem.formula, composition: chem.composition, charge: chem.charge };
}

function conditionsCompatible(reaction: CuratedReaction, conditions: ReactionConditions): boolean {
  if (
    conditions.temperatureC !== undefined &&
    reaction.temperatureMinC !== undefined &&
    conditions.temperatureC < reaction.temperatureMinC
  ) {
    return false;
  }
  if (
    conditions.temperatureC !== undefined &&
    reaction.temperatureMaxC !== undefined &&
    conditions.temperatureC > reaction.temperatureMaxC
  ) {
    return false;
  }
  if (conditions.solvent && reaction.solvent && conditions.solvent.toLowerCase() !== reaction.solvent.toLowerCase()) {
    return false;
  }
  return true;
}

function buildResultFromCurated(reaction: CuratedReaction, lookup: ChemicalLookupPort): ReactionResolution {
  const reactants = reaction.reactants.map((r) => {
    const chem = lookup.getById(r.chemicalId);
    if (!chem) throw new Error(`Curated reaction "${reaction.id}" references unknown chemical "${r.chemicalId}"`);
    return toSpecies(chem, r.coefficient);
  });
  const products = reaction.products.map((p) => {
    const chem = lookup.getById(p.chemicalId);
    if (!chem) throw new Error(`Curated reaction "${reaction.id}" references unknown chemical "${p.chemicalId}"`);
    return toSpecies(chem, p.coefficient, p.isByproduct);
  });

  return {
    status: "REACTION",
    confidenceTier: "SUPPORTED",
    confidenceScore: reaction.confidenceScore,
    reactionType: reaction.reactionType,
    balancedEquation: reaction.equationDisplay,
    netIonicEquation: reaction.netIonicEquation,
    reactants,
    products,
    observableEffects: reaction.observableEffects,
    energyClassification: reaction.energyClassification,
    explanation:
      `This is a curated, experimentally-grounded reaction record (${REACTION_TYPE_LABELS[reaction.reactionType].label.toLowerCase()}). ` +
      (reaction.reference ? `Reference: ${reaction.reference}.` : ""),
    ruleApplied: `curated_reaction:${reaction.id}`,
    reference: reaction.reference,
    safetyNotes: reaction.safetyNotes,
    warnings: [],
  };
}

function unsupportedResult(reactants: Chemical[], note?: string): ReactionResolution {
  const names = reactants.map((r) => `${r.commonName} (${r.formula})`).join(" + ");
  return {
    status: "UNSUPPORTED",
    confidenceTier: "UNKNOWN",
    confidenceScore: 0,
    reactants: reactants.map((r) => toSpecies(r, 1)),
    products: [],
    observableEffects: [],
    explanation:
      `Reaction not confidently supported. Reactants identified: ${names}. ` +
      `No curated reaction record and no applicable general rule (acid-base, precipitation/solubility, ` +
      `single displacement, combustion, or carbonate/bicarbonate gas evolution) matched this combination. ` +
      (note ? note + " " : "") +
      `Adding a curated reaction record, or the missing dissociation/reactivity data, would let the engine ` +
      `resolve this combination -- see docs/ADDING_NEW_REACTIONS.md.`,
    ruleApplied: "none",
    warnings: [],
    missingInfo: ["No matching curated reaction or general rule for this reactant combination."],
  };
}

// ---------------------------------------------------------------------------
// Rule: acid + carbonate/bicarbonate -> salt + water + CO2 (gas evolution)
// ---------------------------------------------------------------------------
function tryGasEvolution(a: Chemical, b: Chemical, lookup: ChemicalLookupPort): ReactionResolution | null {
  const [acid, carbonateLike] = a.isAcid ? [a, b] : b.isAcid ? [b, a] : [undefined, undefined];
  if (!acid || !carbonateLike || !carbonateLike.dissociation) return null;
  const anionFormula = carbonateLike.dissociation.anion.formula;
  if (anionFormula !== "CO3" && anionFormula !== "HCO3") return null;
  if (!acid.dissociation) return null;

  const co2 = lookup.getById("co2");
  const water = lookup.getById("water");
  if (!co2 || !water) return null;

  const saltIon = composeNeutralFormula(toIonSpec(carbonateLike.dissociation.cation), toIonSpec(acid.dissociation.anion));
  const saltChem = lookup.findByComposition(saltIon.composition, 0);

  let balance;
  try {
    balance = balanceEquation(
      [toBalancerSpecies(acid), toBalancerSpecies(carbonateLike)],
      [
        saltChem
          ? toBalancerSpecies(saltChem)
          : { label: "salt", formula: saltIon.formula, composition: saltIon.composition, charge: 0 },
        toBalancerSpecies(water),
        toBalancerSpecies(co2),
      ]
    );
  } catch {
    return null;
  }

  const products: ResolvedSpecies[] = [
    saltChem
      ? toSpecies(saltChem, balance.productCoefficients[0] as number)
      : unregisteredSpecies(saltIon.formula, balance.productCoefficients[0] as number),
    toSpecies(water, balance.productCoefficients[1] as number, true),
    toSpecies(co2, balance.productCoefficients[2] as number, true),
  ];

  const effects: ObservableEffect[] = [
    {
      type: "gas_evolution",
      description: "Carbon dioxide gas bubbles out of solution (effervescence).",
      relatedChemicalId: co2.id,
    },
  ];

  return {
    status: "REACTION",
    confidenceTier: "PREDICTED",
    confidenceScore: 0.85,
    reactionType: "gas_evolution",
    balancedEquation: balance.balancedEquationText,
    reactants: [toSpecies(acid, balance.reactantCoefficients[a.isAcid ? 0 : 1] as number), toSpecies(carbonateLike, balance.reactantCoefficients[a.isAcid ? 1 : 0] as number)],
    products,
    observableEffects: effects,
    energyClassification: "unknown",
    explanation:
      `Applied the general rule "acid + carbonate/bicarbonate \u2192 salt + water + carbon dioxide" and balanced ` +
      `the resulting equation from element conservation. This rule is well established in general chemistry ` +
      `but this specific pairing is not individually curated in the database.` +
      (saltChem ? "" : ` The predicted salt (${saltIon.formula}) is not yet a registered chemical, so its properties are unavailable.`),
    ruleApplied: "rule:acid_plus_carbonate_gas_evolution",
    warnings: balance.warnings,
    safetyNotes: acid.hazards.length > 0 ? "Handle the acid with standard corrosive-chemical precautions." : undefined,
  };
}

// ---------------------------------------------------------------------------
// Rule: acid + base -> salt (+ water if the base is a hydroxide)
// ---------------------------------------------------------------------------
function tryAcidBase(a: Chemical, b: Chemical, lookup: ChemicalLookupPort): ReactionResolution | null {
  const [acid, base] = a.isAcid && b.isBase ? [a, b] : b.isAcid && a.isBase ? [b, a] : [undefined, undefined];
  if (!acid || !base || !acid.dissociation || !base.dissociation) return null;

  const water = lookup.getById("water");
  const isHydroxideBase = base.neutralizationProducesWater === true;
  if (isHydroxideBase && !water) return null;

  const saltIon = composeNeutralFormula(toIonSpec(base.dissociation.cation), toIonSpec(acid.dissociation.anion));
  const saltChem = lookup.findByComposition(saltIon.composition, 0);

  const productBalancerSpecies: BalancerSpecies[] = [
    saltChem
      ? toBalancerSpecies(saltChem)
      : { label: "salt", formula: saltIon.formula, composition: saltIon.composition, charge: 0 },
  ];
  if (isHydroxideBase && water) productBalancerSpecies.push(toBalancerSpecies(water));

  let balance;
  try {
    balance = balanceEquation([toBalancerSpecies(acid), toBalancerSpecies(base)], productBalancerSpecies);
  } catch {
    return null;
  }

  const products: ResolvedSpecies[] = [
    saltChem
      ? toSpecies(saltChem, balance.productCoefficients[0] as number)
      : unregisteredSpecies(saltIon.formula, balance.productCoefficients[0] as number),
  ];
  if (isHydroxideBase && water) {
    products.push(toSpecies(water, balance.productCoefficients[1] as number, true));
  }

  const bothStrong = acid.acidBaseStrength === "strong" && base.acidBaseStrength === "strong";
  const tier = bothStrong ? "PREDICTED" : "APPROXIMATE";
  const explanation = bothStrong
    ? "Applied the general strong-acid/strong-base neutralization rule (acid + base \u2192 salt + water) and " +
      "balanced the equation from element conservation. This specific pair is not individually curated."
    : "At least one of the acid/base is weak, so this reaction proceeds to an equilibrium position rather " +
      "than going to completion. The molecular identity of the product shown is correct, but the actual pH " +
      "and the exact extent of reaction depend on equilibrium constants (Ka/Kb) that this engine does not " +
      "currently model -- treat the quantities as an idealized upper bound, not a precise prediction.";

  return {
    status: "REACTION",
    confidenceTier: tier,
    confidenceScore: bothStrong ? 0.85 : 0.55,
    reactionType: "acid_base_neutralization",
    balancedEquation: balance.balancedEquationText,
    reactants: [toSpecies(acid, balance.reactantCoefficients[0] as number), toSpecies(base, balance.reactantCoefficients[1] as number)],
    products,
    observableEffects: bothStrong ? [{ type: "temperature_increase", description: "Neutralization releases heat (exothermic)." }] : [],
    energyClassification: bothStrong ? "exothermic" : "unknown",
    explanation,
    ruleApplied: bothStrong ? "rule:strong_acid_strong_base_neutralization" : "rule:weak_acid_or_base_neutralization_approximate",
    warnings: balance.warnings,
  };
}

// ---------------------------------------------------------------------------
// Rule: metal + acid -> salt + H2, gated by the activity series
// ---------------------------------------------------------------------------
function tryMetalPlusAcid(a: Chemical, b: Chemical, lookup: ChemicalLookupPort): ReactionResolution | null {
  const [metal, acid] = isFreeElement(a.composition) && b.isAcid ? [a, b] : isFreeElement(b.composition) && a.isAcid ? [b, a] : [undefined, undefined];
  if (!metal || !acid || !acid.dissociation) return null;
  const metalSymbol = soleElementOf(metal.composition);
  if (!metalSymbol || metal.commonCationCharge === undefined) return null;

  const canReact = canDisplaceHydrogenFromAcid(metalSymbol);
  if (canReact === undefined) return null; // metal reactivity unknown -- don't guess

  const h2 = lookup.getById("h2");
  if (!h2) return null;

  if (!canReact) {
    return {
      status: "NO_REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: 0.8,
      reactants: [toSpecies(metal, 1), toSpecies(acid, 1)],
      products: [],
      observableEffects: [],
      explanation:
        `${metal.commonName} sits below hydrogen in the standard reactivity series, so it does not displace ` +
        `hydrogen from ${acid.commonName}. No reaction is predicted under normal conditions.`,
      ruleApplied: "rule:activity_series_metal_plus_acid",
      warnings: [],
      reactionType: "single_displacement",
    };
  }

  const saltIon = composeNeutralFormula(ion(metalSymbol, metal.commonCationCharge), toIonSpec(acid.dissociation.anion));
  const saltChem = lookup.findByComposition(saltIon.composition, 0);

  let balance;
  try {
    balance = balanceEquation(
      [toBalancerSpecies(metal), toBalancerSpecies(acid)],
      [
        saltChem
          ? toBalancerSpecies(saltChem)
          : { label: "salt", formula: saltIon.formula, composition: saltIon.composition, charge: 0 },
        toBalancerSpecies(h2),
      ]
    );
  } catch {
    return null;
  }

  const transfer = describeElementTransfer(metalSymbol, true, metal.commonCationCharge);

  return {
    status: "REACTION",
    confidenceTier: "PREDICTED",
    confidenceScore: 0.85,
    reactionType: "single_displacement",
    balancedEquation: balance.balancedEquationText,
    reactants: [toSpecies(metal, balance.reactantCoefficients[0] as number), toSpecies(acid, balance.reactantCoefficients[1] as number)],
    products: [
      saltChem
        ? toSpecies(saltChem, balance.productCoefficients[0] as number)
        : unregisteredSpecies(saltIon.formula, balance.productCoefficients[0] as number),
      toSpecies(h2, balance.productCoefficients[1] as number, true),
    ],
    observableEffects: [
      { type: "gas_evolution", description: `Hydrogen gas bubbles form as ${metal.commonName} dissolves.`, relatedChemicalId: h2.id },
    ],
    energyClassification: "exothermic",
    explanation:
      `${metal.commonName} is above hydrogen in the reactivity series (${transfer ? `oxidation state ${transfer.fromOxidationState} \u2192 ${transfer.toOxidationState}` : "oxidized"}), ` +
      `so it displaces H2 from ${acid.commonName}. Applied the general metal-activity-series rule and balanced ` +
      `the equation from element conservation; this specific pairing is not individually curated.`,
    ruleApplied: "rule:activity_series_metal_plus_acid",
    warnings: balance.warnings,
  };
}

// ---------------------------------------------------------------------------
// Rule: metal + metal-salt -> new metal-salt + displaced metal (activity series)
// ---------------------------------------------------------------------------
function trySingleDisplacement(a: Chemical, b: Chemical, lookup: ChemicalLookupPort): ReactionResolution | null {
  const [metal, salt] = isFreeElement(a.composition) && b.dissociation ? [a, b] : isFreeElement(b.composition) && a.dissociation ? [b, a] : [undefined, undefined];
  if (!metal || !salt || !salt.dissociation) return null;
  const metalSymbol = soleElementOf(metal.composition);
  if (!metalSymbol || metal.commonCationCharge === undefined) return null;
  const saltCation = salt.dissociation.cation;
  if (saltCation.formula === "H" || saltCation.formula === "NH4") return null; // handled by other rules

  const moreReactive = isMoreReactive(metalSymbol, saltCation.formula);
  if (moreReactive === undefined) return null;

  const displacedMetalChem = lookup.findByComposition({ [saltCation.formula]: 1 }, 0);
  if (!displacedMetalChem) return null; // can't report a metal we don't have a registered record for

  if (!moreReactive) {
    return {
      status: "NO_REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: 0.8,
      reactants: [toSpecies(metal, 1), toSpecies(salt, 1)],
      products: [],
      observableEffects: [],
      explanation:
        `${metal.commonName} is not more reactive than ${displacedMetalChem.commonName} in the standard ` +
        `activity series, so it cannot displace it from ${salt.commonName}. No reaction is predicted.`,
      ruleApplied: "rule:activity_series_single_displacement",
      warnings: [],
      reactionType: "single_displacement",
    };
  }

  const newSaltIon = composeNeutralFormula(ion(metalSymbol, metal.commonCationCharge), toIonSpec(salt.dissociation.anion));
  const newSaltChem = lookup.findByComposition(newSaltIon.composition, 0);

  let balance;
  try {
    balance = balanceEquation(
      [toBalancerSpecies(metal), toBalancerSpecies(salt)],
      [
        newSaltChem
          ? toBalancerSpecies(newSaltChem)
          : { label: "salt", formula: newSaltIon.formula, composition: newSaltIon.composition, charge: 0 },
        toBalancerSpecies(displacedMetalChem),
      ]
    );
  } catch {
    return null;
  }

  return {
    status: "REACTION",
    confidenceTier: "PREDICTED",
    confidenceScore: 0.85,
    reactionType: "single_displacement",
    balancedEquation: balance.balancedEquationText,
    reactants: [toSpecies(metal, balance.reactantCoefficients[0] as number), toSpecies(salt, balance.reactantCoefficients[1] as number)],
    products: [
      newSaltChem
        ? toSpecies(newSaltChem, balance.productCoefficients[0] as number)
        : unregisteredSpecies(newSaltIon.formula, balance.productCoefficients[0] as number),
      toSpecies(displacedMetalChem, balance.productCoefficients[1] as number),
    ],
    observableEffects: [
      {
        type: "color_change",
        description: `${displacedMetalChem.commonName} deposits out of solution as ${metal.commonName} dissolves.`,
        relatedChemicalId: displacedMetalChem.id,
      },
    ],
    energyClassification: "exothermic",
    explanation:
      `${metal.commonName} is more reactive than ${displacedMetalChem.commonName} in the standard activity ` +
      `series, so it displaces it from ${salt.commonName}. Applied the general activity-series rule and balanced ` +
      `the equation from element conservation; this specific pairing is not individually curated.`,
    ruleApplied: "rule:activity_series_single_displacement",
    warnings: balance.warnings,
  };
}

// ---------------------------------------------------------------------------
// Rule: two ionic salts -> double displacement, precipitate if a product is insoluble
// ---------------------------------------------------------------------------
function tryPrecipitation(a: Chemical, b: Chemical, lookup: ChemicalLookupPort): ReactionResolution | null {
  if (a.isAcid || a.isBase || b.isAcid || b.isBase) return null;
  if (isFreeElement(a.composition) || isFreeElement(b.composition)) return null;
  if (!a.dissociation || !b.dissociation) return null;

  const productOneIon = composeNeutralFormula(toIonSpec(a.dissociation.cation), toIonSpec(b.dissociation.anion));
  const productTwoIon = composeNeutralFormula(toIonSpec(b.dissociation.cation), toIonSpec(a.dissociation.anion));
  const solOne = predictSolubility(toIonSpec(a.dissociation.cation), toIonSpec(b.dissociation.anion));
  const solTwo = predictSolubility(toIonSpec(b.dissociation.cation), toIonSpec(a.dissociation.anion));
  if (!solOne || !solTwo) return null; // insufficient rule coverage -- don't guess

  const productOneChem = lookup.findByComposition(productOneIon.composition, 0);
  const productTwoChem = lookup.findByComposition(productTwoIon.composition, 0);

  const bothSoluble = solOne.tier === "soluble" && solTwo.tier === "soluble";

  let balance;
  try {
    balance = balanceEquation(
      [toBalancerSpecies(a), toBalancerSpecies(b)],
      [
        productOneChem ? toBalancerSpecies(productOneChem) : { label: "p1", formula: productOneIon.formula, composition: productOneIon.composition, charge: 0 },
        productTwoChem ? toBalancerSpecies(productTwoChem) : { label: "p2", formula: productTwoIon.formula, composition: productTwoIon.composition, charge: 0 },
      ]
    );
  } catch {
    return null;
  }

  const reactants = [toSpecies(a, balance.reactantCoefficients[0] as number), toSpecies(b, balance.reactantCoefficients[1] as number)];

  if (bothSoluble) {
    return {
      status: "NO_REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: 0.8,
      reactionType: "double_displacement",
      reactants,
      products: [],
      observableEffects: [],
      explanation:
        `Checked the double-displacement products ${productOneIon.formula} and ${productTwoIon.formula} against ` +
        `standard solubility rules: both are soluble in water (${solOne.rule} / ${solTwo.rule}). With no ` +
        `insoluble product, no precipitate or other driving force is identified, so no net reaction is predicted.`,
      ruleApplied: "rule:solubility_double_displacement",
      warnings: balance.warnings,
    };
  }

  const precipitateIsOne = solOne.tier !== "soluble";
  const precipitateIon = precipitateIsOne ? productOneIon : productTwoIon;
  const precipitateChem = precipitateIsOne ? productOneChem : productTwoChem;
  const precipitateRule = precipitateIsOne ? solOne.rule : solTwo.rule;
  const precipitateTier = precipitateIsOne ? solOne.tier : solTwo.tier;

  const products = [
    productOneChem
      ? toSpecies(productOneChem, balance.productCoefficients[0] as number)
      : unregisteredSpecies(productOneIon.formula, balance.productCoefficients[0] as number),
    productTwoChem
      ? toSpecies(productTwoChem, balance.productCoefficients[1] as number)
      : unregisteredSpecies(productTwoIon.formula, balance.productCoefficients[1] as number),
  ];

  return {
    status: "REACTION",
    confidenceTier: "PREDICTED",
    confidenceScore: 0.85,
    reactionType: "precipitation",
    balancedEquation: balance.balancedEquationText,
    reactants,
    products,
    observableEffects: [
      {
        type: "precipitation",
        description: `${precipitateChem?.commonName ?? precipitateIon.formula} forms as a ${precipitateTier === "slightly_soluble" ? "faint" : ""} precipitate.`.replace("  ", " "),
        relatedChemicalId: precipitateChem?.id,
      },
    ],
    energyClassification: "unknown",
    explanation:
      `Checked the double-displacement products against standard solubility rules: ${precipitateIon.formula} is ` +
      `${precipitateTier.replace("_", " ")} (${precipitateRule}), so it precipitates. Applied the general ` +
      `solubility-rule double-displacement pattern and balanced the equation from element conservation; this ` +
      `specific pairing is not individually curated.` +
      (precipitateChem ? "" : ` The precipitate (${precipitateIon.formula}) is not yet a registered chemical, so its properties are unavailable.`),
    ruleApplied: "rule:solubility_double_displacement",
    warnings: balance.warnings,
  };
}

// ---------------------------------------------------------------------------
// Rule: hydrocarbon/fuel + O2 -> CO2 + H2O (complete combustion)
// ---------------------------------------------------------------------------
function tryCombustion(a: Chemical, b: Chemical, lookup: ChemicalLookupPort): ReactionResolution | null {
  const [fuel, oxidizer] = a.id === "o2" ? [b, a] : b.id === "o2" ? [a, b] : [undefined, undefined];
  if (!fuel || !oxidizer) return null;
  const elementsUsed = Object.keys(fuel.composition);
  const isHydrocarbonLike = elementsUsed.every((e) => e === "C" || e === "H" || e === "O") && fuel.composition["C"] && fuel.composition["H"];
  if (!isHydrocarbonLike) return null;

  const co2 = lookup.getById("co2");
  const water = lookup.getById("water");
  if (!co2 || !water) return null;

  let balance;
  try {
    balance = balanceEquation([toBalancerSpecies(fuel), toBalancerSpecies(oxidizer)], [toBalancerSpecies(co2), toBalancerSpecies(water)]);
  } catch {
    return null;
  }

  return {
    status: "REACTION",
    confidenceTier: "PREDICTED",
    confidenceScore: 0.85,
    reactionType: "combustion",
    balancedEquation: balance.balancedEquationText,
    reactants: [toSpecies(fuel, balance.reactantCoefficients[0] as number), toSpecies(oxidizer, balance.reactantCoefficients[1] as number)],
    products: [toSpecies(co2, balance.productCoefficients[0] as number), toSpecies(water, balance.productCoefficients[1] as number)],
    observableEffects: [
      { type: "temperature_increase", description: "Combustion releases substantial heat and (with a real flame) light." },
    ],
    energyClassification: "exothermic",
    explanation:
      `Applied the general complete-combustion rule (hydrocarbon + O2 \u2192 CO2 + H2O) and balanced the equation ` +
      `from element conservation. This assumes complete combustion with excess oxygen; incomplete combustion ` +
      `(producing CO or soot) is not modeled. This specific fuel is not individually curated.`,
    ruleApplied: "rule:complete_combustion",
    warnings: balance.warnings,
  };
}

function tryResolvePair(
  a: Chemical,
  b: Chemical,
  conditions: ReactionConditions,
  lookup: ChemicalLookupPort
): ReactionResolution | null {
  const curated = lookup.findCuratedReactionsByReactantSet([a.id, b.id]).filter((r) => conditionsCompatible(r, conditions));
  if (curated.length === 1) {
    return buildResultFromCurated(curated[0] as CuratedReaction, lookup);
  }
  const attempts = [tryGasEvolution, tryAcidBase, tryMetalPlusAcid, trySingleDisplacement, tryPrecipitation, tryCombustion];
  for (const attempt of attempts) {
    const res = attempt(a, b, lookup);
    if (res) return res;
  }
  return null;
}

export const CHEMISTRY_PROCESS_EXPLANATION =
  "Explaining every change involved in a chemistry process.\n" +
  "When two chemicals react, their atoms are rearranged: bonds in the reactants break and new bonds form, so entirely new substances appear with different molecular structures, shapes, polarities, oxidation states, and electron distributions (electrons are shared, transferred, or redistributed), and the original substances are consumed while their concentrations fall and the products' concentrations rise until a limiting reactant runs out or an equilibrium is reached. Because the substances themselves change, nearly all their properties change too: color, odor, taste, texture, hardness, density, melting and boiling points, vapor pressure, solubility, viscosity, surface tension, refractive index, light absorption and emission spectra, magnetic behavior, electrical and thermal conductivity, acidity or basicity (pH), reactivity, flammability, stability, toxicity, and the physical state or crystal structure (solid, liquid, gas, dissolved, or precipitated). You may also notice fizzing or bubbles from gas release, a cloudy or solid precipitate forming in a clear liquid, a rise or drop in temperature, glowing, flames, or sparks, hissing or popping sounds, and changes in volume or pressure (especially in closed containers where gases form). Energetically, chemical potential energy is converted into heat, light, electricity, or mechanical work (exothermic) or absorbed from the surroundings (endothermic), so enthalpy, entropy, and Gibbs free energy change, and the activation energy barrier, reaction rate, and extent of reaction depend on temperature, concentration, surface area, pressure, and catalysts. Even the number of molecules can change (2H₂ + O₂ → 2H₂O turns three molecules into two). What does not change are the atoms themselves (their types and counts, nuclei, and identities), the total mass, the total electric charge, and the total energy, all of which are conserved and only rearranged, which is why the reaction is a chemical change rather than a nuclear one.";

export function generateProcessBreakdown(resolution: ReactionResolution): ChemicalProcessBreakdown {
  const reactantCount = resolution.reactants.reduce((sum, r) => sum + (r.coefficient || 1), 0);
  const productCount = resolution.products.reduce((sum, p) => sum + (p.coefficient || 1), 0);
  const reactantNames = resolution.reactants
    .map((r) => `${r.coefficient > 1 ? r.coefficient : ""}${r.formula} (${r.commonName})`)
    .join(" + ");
  const productNames =
    resolution.products.length > 0
      ? resolution.products.map((p) => `${p.coefficient > 1 ? p.coefficient : ""}${p.formula} (${p.commonName})`).join(" + ")
      : "Transformed products";

  const observableDetails =
    resolution.observableEffects.length > 0
      ? resolution.observableEffects.map((e) => `${e.type.replace(/_/g, " ")}: ${e.description}`)
      : ["No extreme macroscopic signs observed; species participate in dissolved or subtle transformation."];

  return {
    masterExplanation: CHEMISTRY_PROCESS_EXPLANATION,
    dimensions: [
      {
        title: "Atomic Rearrangement & Chemical Bonding",
        category: "atomic_bonding",
        description:
          "Reactant bonds break and new chemical bonds form. Atoms are rearranged into entirely new chemical substances with altered molecular structures, shapes, polarities, oxidation states, and electron distributions.",
        details: [
          `Reactant initial configuration: ${reactantNames}`,
          `Product synthesized configuration: ${productNames}`,
          `Stoichiometric unit change: ${reactantCount} reactant unit(s) reorganize into ${productCount} product unit(s).`,
          "Electrons are shared, transferred, or redistributed into new valence orbitals, generating completely different molecular geometries and dipole moments.",
        ],
      },
      {
        title: "Concentrations & Reaction Progress",
        category: "concentrations",
        description:
          "Original substances are consumed and their concentrations fall, while products' concentrations rise until the limiting reactant is exhausted or chemical equilibrium is reached.",
        details: [
          "Reactants are consumed as the forward transformation advances.",
          "Products accumulate over time until the limiting reagent is depleted or a dynamic equilibrium state is achieved.",
          "Reaction extent and final concentrations follow stoichiometric ratios governed by the balanced chemical equation.",
        ],
      },
      {
        title: "Physical & Chemical Property Transformations",
        category: "properties",
        description:
          "Because the chemical substances themselves change, nearly all physical and chemical properties shift.",
        details: [
          "States of matter & phase: Transformations between solid, liquid, gas, or aqueous states occur.",
          "Thermodynamic constants: Melting points, boiling points, densities, and vapor pressures alter fundamentally.",
          "Solution behavior: Changes in solubility, viscosity, surface tension, and refractive index.",
          "Chemical reactivity: Drastic changes in pH (acidity/basicity), electrical/thermal conductivity, flammability, and chemical stability.",
        ],
      },
      {
        title: "Macroscopic Sensory Observations",
        category: "observables",
        description:
          "Macroscopic phenomena provide visible and sensory evidence of atomic and electronic rearrangements.",
        details: [
          ...observableDetails,
          "Common experimental indicators: Gas bubbles/fizzing, precipitate formation (solid forming in liquid), temperature shifts, luminescence, sounds, or pressure/volume changes.",
        ],
      },
      {
        title: "Thermodynamics & Energetics",
        category: "thermodynamics",
        description:
          "Chemical potential energy stored in reactant bonds is converted into heat, light, electricity, or mechanical work, or absorbed from the surroundings.",
        details: [
          `Thermochemical nature: ${resolution.energyClassification ? resolution.energyClassification.toUpperCase() : "Energetically active"}`,
          "Enthalpy (ΔH), entropy (ΔS), and Gibbs free energy (ΔG) change throughout the reaction.",
          "Reaction rates and activation energy barriers depend on temperature, concentration, surface area, pressure, and the presence of catalysts.",
        ],
      },
      {
        title: "Fundamental Conservation Principles",
        category: "conservation",
        description:
          "Atoms (their types, counts, nuclei, and identities), total mass, total electric charge, and total energy are strictly conserved.",
        details: [
          "Conservation of atoms: Every atomic nucleus is preserved identically; none are created or destroyed.",
          "Conservation of mass & charge: Total mass and net electric charge before and after the reaction remain strictly identical.",
          "Chemical vs Nuclear: This is a chemical change involving electron and bond rearrangements, not a nuclear transformation.",
        ],
      },
    ],
  };
}

function resolveReactionInternal(
  reactantChemicals: Chemical[],
  conditions: ReactionConditions,
  lookup: ChemicalLookupPort
): ReactionResolution {
  if (reactantChemicals.length < 1) {
    throw new Error("resolveReaction requires at least one reactant chemical.");
  }

  // Deduplicate by chemical id so repeated species in a merged container don't distort matching
  const uniqueChemicals = Array.from(new Map(reactantChemicals.map((c) => [c.id, c])).values());
  const ids = uniqueChemicals.map((c) => c.id);

  const curatedMatches = lookup.findCuratedReactionsByReactantSet(ids);
  const compatible = curatedMatches.filter((r) => conditionsCompatible(r, conditions));

  if (compatible.length === 1) {
    return buildResultFromCurated(compatible[0] as CuratedReaction, lookup);
  }
  if (compatible.length > 1) {
    // Multiple curated outcomes match these reactants under the given conditions: be explicit
    // about the ambiguity rather than silently picking one (see product brief section 9).
    const options = compatible.map((r) => `${r.name} (${r.equationDisplay})`).join("; ");
    return {
      status: "REACTION",
      confidenceTier: "PREDICTED",
      confidenceScore: 0.5,
      reactants: uniqueChemicals.map((c) => toSpecies(c, 1)),
      products: [],
      observableEffects: [],
      explanation:
        `Multiple curated outcomes are recorded for these reactants depending on conditions: ${options}. ` +
        `Provide a more specific temperature or solvent to disambiguate which applies.`,
      ruleApplied: "curated_reaction:ambiguous",
      warnings: ["Multiple condition-dependent curated outcomes matched; none was uniquely selected."],
    };
  }

  if (uniqueChemicals.length === 2) {
    const [a, b] = uniqueChemicals as [Chemical, Chemical];
    const attempts = [tryGasEvolution, tryAcidBase, tryMetalPlusAcid, trySingleDisplacement, tryPrecipitation, tryCombustion];
    for (const attempt of attempts) {
      const result = attempt(a, b, lookup);
      if (result) return result;
    }
  }

  // Multi-chemical mixtures (e.g. after pouring multiple containers together or adding solvent)
  // Check subsets of chemicals for an active reaction and treat remaining species as spectators.
  if (uniqueChemicals.length > 2) {
    let bestResult: { resolution: ReactionResolution; activeIds: Set<string> } | null = null;
    for (let i = 0; i < uniqueChemicals.length; i++) {
      for (let j = i + 1; j < uniqueChemicals.length; j++) {
        const a = uniqueChemicals[i] as Chemical;
        const b = uniqueChemicals[j] as Chemical;
        const res = tryResolvePair(a, b, conditions, lookup);
        if (res && res.status === "REACTION") {
          if (!bestResult || res.confidenceScore > bestResult.resolution.confidenceScore) {
            bestResult = { resolution: res, activeIds: new Set([a.id, b.id]) };
          }
        }
      }
    }

    if (bestResult) {
      const spectators = uniqueChemicals.filter((c) => !bestResult!.activeIds.has(c.id));
      const spectatorNames = spectators.map((s) => `${s.commonName} (${s.formula})`).join(", ");
      return {
        ...bestResult.resolution,
        explanation:
          bestResult.resolution.explanation +
          ` In this mixture, ${bestResult.resolution.reactants.map((r) => r.commonName).join(" and ")} react while ` +
          `spectator species (${spectatorNames}) remain unreacted in the mixture.`,
        warnings: [
          ...bestResult.resolution.warnings,
          `Spectator species present in mixture: ${spectatorNames}. They do not participate in the primary reaction.`,
        ],
      };
    }
  }

  const note =
    curatedMatches.length > 0
      ? "These exact chemicals do have a curated reaction on file, but not under the conditions provided (e.g. temperature or solvent out of range)."
      : undefined;
  return unsupportedResult(uniqueChemicals, note);
}

export function resolveReaction(
  reactantChemicals: Chemical[],
  conditions: ReactionConditions,
  lookup: ChemicalLookupPort
): ReactionResolution {
  const result = resolveReactionInternal(reactantChemicals, conditions, lookup);
  if (result.status === "REACTION") {
    return {
      ...result,
      processExplanation: CHEMISTRY_PROCESS_EXPLANATION,
      processBreakdown: generateProcessBreakdown(result),
    };
  }
  return result;
}
