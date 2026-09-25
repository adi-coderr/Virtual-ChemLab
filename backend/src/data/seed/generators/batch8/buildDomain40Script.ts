import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";

const allChems = new Map<string, any>();
for (const c of SEED_CHEMICALS) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) allChems.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) allChems.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) allChems.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) {
  existingKeys.add([...r.reactants].sort().join("+"));
}
for (const r of DOMAIN_39_REACTIONS) {
  existingKeys.add([...r.reactants].sort().join("+"));
}

function toBal(cid: string): BalancerSpecies {
  const chem = allChems.get(cid);
  if (!chem) throw new Error(`Unknown chemical ID: "${cid}"`);
  const parsed = parseFormula(chem.formula);
  return {
    label: cid,
    formula: chem.formula,
    composition: parsed.composition,
    charge: chem.charge ?? 0,
  };
}

interface ReactionDef {
  id: string;
  name: string;
  reactants: string[];
  products: string[];
  deltaH: number;
  description: string;
  reactionType: string;
  observableEffects: any[];
  safetyNotes?: string;
}

const reactions: any[] = [];
const localKeys = new Set<string>();

function add(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  deltaH: number,
  description: string,
  reactionType: string,
  observableEffects: any[],
  safetyNotes?: string
) {
  const rKey = [...reactants].sort().join("+");
  if (existingKeys.has(rKey)) {
    throw new Error(`Collision with existing reaction: [${id}] key: ${rKey}`);
  }
  if (localKeys.has(rKey)) {
    throw new Error(`Duplicate reaction key in Domain 40: [${id}] key: ${rKey}`);
  }
  localKeys.add(rKey);

  for (const cid of [...reactants, ...products]) {
    if (!allChems.has(cid)) {
      throw new Error(`Missing chemical ID in registry: [${cid}] in reaction [${id}]`);
    }
  }

  const rBal = reactants.map(toBal);
  const pBal = products.map(toBal);
  const balRes = balanceEquation(rBal, pBal);

  if (!balRes.balancedEquationText) {
    throw new Error(`Failed to balance reaction [${id}]: ${(balRes as any).error || "unknown"}`);
  }

  reactions.push({
    id,
    name,
    reactants,
    products,
    enthalpyKjPerMol: deltaH,
    description,
    reactionType,
    observableEffects,
  });
}

console.log("Building Domain 40: Astrochemistry, Planetary Geochemistry, Lunar/Mars ISRU & Prebiotic Models...");

// =========================================================================
// 1. Planetary Mineralogy, Serpentinization & Carbonation (001-020)
// =========================================================================

add("astro-001-forsterite-enstatite-serpentinization", "Hydrothermal serpentinization of olivine and pyroxene",
  ["forsterite", "enstatite", "water"],
  ["serpentine"],
  -65, "Hydrothermal hydration of ultramafic mantle peridotite on ocean worlds (Enceladus, Europa) forming serpentine.",
  "synthesis",
  [{ type: "phase_change", description: "Greenish serpentine phyllosilicate forms with swelling" }]);

add("astro-002-fayalite-magnetite-serpentinization", "Hydrothermal serpentinization of fayalite with molecular hydrogen generation",
  ["fayalite", "water"],
  ["fe3o4", "sio2", "h2"],
  -82, "Anaerobic serpentinization of iron-rich olivine releasing hydrogen fuel to power deep biosphere methanogenesis.",
  "redox_other",
  [{ type: "gas_evolution", description: "Evolution of molecular hydrogen gas" },
   { type: "color_change", colorFrom: "#7D6608", colorTo: "#1C2833", description: "Brown olivine darkens to magnetic black magnetite" }]);

add("astro-003-forsterite-carbonation-magnesite", "Direct dry planetary mineral carbonation of forsterite olivine",
  ["forsterite", "co2"],
  ["mgco3", "sio2"],
  -88, "Atmospheric sequestration of carbon dioxide into planetary mantle olivine crusts on Mars and Venus.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#A9DFBF", colorTo: "#FFFFFF", description: "Pale green olivine converts to white magnesite and silica" }]);

add("astro-004-forsterite-aqueous-carbonation", "Aqueous weathering carbonation of forsterite to serpentine and magnesite",
  ["forsterite", "co2", "water"],
  ["serpentine", "mgco3"],
  -110, "Simultaneous hydrothermal hydration and carbonation storing atmospheric greenhouse gases in ultramafic rocks.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#A9DFBF", colorTo: "#27AE60", description: "Formation of mixed green serpentine and white magnesite matrix" }]);

add("astro-005-fayalite-carbonation-siderite", "Dry carbonation of iron-rich olivine forming siderite",
  ["fayalite", "co2"],
  ["feco3", "sio2"],
  -76, "Dense exoplanet CO2 atmosphere interaction with fayalitic lavas trapping carbon as siderite.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#7D6608", colorTo: "#935116", description: "Formation of brown siderite and chalcedony silica" }]);

add("astro-006-enstatite-hydration-serpentine", "Direct hydrothermal hydration of enstatite pyroxene",
  ["enstatite", "water"],
  ["serpentine", "sio2"],
  -52, "Metamorphic hydration of magnesium orthopyroxene in chondritic asteroids releasing colloidal silica.",
  "synthesis",
  [{ type: "phase_change", description: "Transformation into fibrous chrysotile serpentine and quartz" }]);

add("astro-007-enstatite-carbonation-magnesite", "Planetary atmospheric carbonation of enstatite pyroxene",
  ["enstatite", "co2"],
  ["mgco3", "sio2"],
  -38, "In-situ carbon mineral trapping in pyroxene-rich basaltic crusts.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#D4EFDF", colorTo: "#FFFFFF", description: "Pyroxene bleached to white magnesite-silica composite" }]);

add("astro-008-anorthite-kaolinite-weathering", "Hydrothermal acid weathering of planetary anorthite plagioclase",
  ["anorthite", "co2", "water"],
  ["caco3", "al2si2o5oh4_kaolinite"],
  -95, "Aqueous alteration of primeval plagioclase feldspar crusts producing kaolinite clay and limestone.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Chalky white kaolinite clay and calcium carbonate precipitate" }]);

add("astro-009-diopside-carbonation", "High-pressure carbonation of diopside clinopyroxene",
  ["diopside", "co2"],
  ["caco3", "mgco3", "sio2"],
  -120, "Mantle metasomatism in carbonate-rich subduction zones trapping carbon in diopside.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#A2D9CE", colorTo: "#FFFFFF", description: "Green clinopyroxene decomposes into white carbonate-silica skarn" }]);

add("astro-010-siderite-thermal-decomposition", "Thermal vacuum decomposition of Martian siderite",
  ["feco3"],
  ["feo", "co2"],
  85, "Thermal calcination of iron carbonate in volcanic contact metamorphic aureoles.",
  "decomposition",
  [{ type: "gas_evolution", description: "Vigorous carbon dioxide outgassing" },
   { type: "color_change", colorFrom: "#935116", colorTo: "#1C2833", description: "Brown siderite turns black wüstite" }]);

add("astro-011-troilite-weathering-sulfate", "Oxidative weathering of meteoritic troilite",
  ["troilite", "o2"],
  ["feso4"],
  -820, "Dry and low-humidity oxidation of iron meteorites generating ferrous sulfate salts.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#B7950B", colorTo: "#A2D9CE", description: "Bronze troilite tarnishes to pale green melanterite sulfate" }]);

add("astro-012-goethite-hematite-dehydration", "Thermal dehydration of goethite to crystalline Martian hematite",
  ["goethite"],
  ["fe2o3", "water"],
  48, "Diagenetic desiccation of ferric oxyhydroxides forming Martian hematite spherules (blueberries).",
  "decomposition",
  [{ type: "color_change", colorFrom: "#B9770E", colorTo: "#7B241C", description: "Ochre-yellow goethite dehydrates to lustrous dark red-gray hematite" }]);

add("astro-013-magnetite-maghemite-oxidation", "Low-temperature surface oxidation of planetary magnetite to hematite",
  ["fe3o4", "o2"],
  ["fe2o3"],
  -495, "Photochemically driven slow oxidation causing the characteristic reddish hue of Mars.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#1C2833", colorTo: "#922B21", description: "Black ferromagnetic magnetite turns rust-red hematite dust" }]);

add("astro-014-schreibersite-aqueous-corrosion", "Corrosive aqueous alteration of meteoritic schreibersite",
  ["schreibersite", "water"],
  ["feo", "hypophosphorous_acid", "h2"],
  -145, "Hydrothermal corrosion of prebiotic iron-nickel phosphide releasing reactive phosphorus oxyacids and hydrogen gas.",
  "redox_other",
  [{ type: "gas_evolution", description: "Effervescence of hydrogen gas" },
   { type: "precipitation", colorTo: "#1C2833", description: "Black wüstite crust forms over meteoritic grain" }]);

add("astro-015-forsterite-silica-enstatite", "Subsolidus metamorphic reaction between olivine and silica",
  ["forsterite", "sio2"],
  ["enstatite"],
  -15, "Prograde metamorphism in planetary crusts reacting olivine with silica-saturated fluids to form pyroxene.",
  "synthesis",
  [{ type: "phase_change", description: "Recrystallization of granular olivine into prismatic pyroxene" }]);

add("astro-016-serpentine-thermal-dehydration", "Prograde thermal dehydration of subducting serpentine phyllosilicate",
  ["serpentine"],
  ["forsterite", "enstatite", "water"],
  165, "High-temperature devolatilization of serpentinized oceanic slab returning water to planetary mantles.",
  "decomposition",
  [{ type: "gas_evolution", description: "High-pressure superheated steam outgassing at 650 °C" }]);

add("astro-017-fayalite-reduction-co", "Carbon monoxide reduction of fayalite in protoplanetary nebular gas",
  ["fayalite", "co"],
  ["fe", "sio2", "co2"],
  -32, "High-temperature nebular reduction producing native iron beads in chondritic meteorites.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#7D6608", colorTo: "#7F8C8D", description: "Silicate turns to metallic iron grains embedded in silica glass" }]);

add("astro-018-forsterite-carbothermal-reduction", "Carbothermal reduction of olivine for planetary magnesium extraction",
  ["forsterite", "c"],
  ["mg", "sio2", "co"],
  480, "High-temperature electric arc furnace reduction of olivine regolith for extraterrestrial alloy manufacturing.",
  "redox_other",
  [{ type: "gas_evolution", description: "Carbon monoxide and magnesium vapor evolution at 1600 °C" }]);

add("astro-019-fayalite-hydrogen-reduction", "Hydrogen reduction of fayalite in planetary regolith",
  ["fayalite", "h2"],
  ["fe", "sio2", "water"],
  68, "High-temperature reduction of iron silicate extracting metallic iron and water on airless bodies.",
  "redox_other",
  [{ type: "gas_evolution", description: "Water vapor release" },
   { type: "color_change", colorFrom: "#7D6608", colorTo: "#717D7E", description: "Iron metal beads nucleate in silica matrix" }]);

add("astro-020-troilite-hydrogen-reduction", "Hydrogen reduction of meteoritic troilite mineral",
  ["troilite", "h2"],
  ["fe", "h2s"],
  72, "Desulfurization of meteoritic iron sulfide producing metallic iron and hydrogen sulfide gas.",
  "redox_other",
  [{ type: "gas_evolution", description: "Rotten-egg odor hydrogen sulfide gas evolution" },
   { type: "color_change", colorFrom: "#B7950B", colorTo: "#7F8C8D", description: "Bronze sulfide reduces to metallic gray iron" }]);

// =========================================================================
// 2. Lunar & Martian ISRU (In-Situ Resource Utilization) (021-040)
// =========================================================================

add("astro-021-ilmenite-hydrogen-reduction", "Hydrogen reduction of lunar ilmenite for oxygen and water production",
  ["ilmenite", "h2"],
  ["fe", "tio2", "water"],
  38, "Primary Lunar ISRU process (1000 °C fluidized bed) reducing mare basalt ilmenite to water and iron.",
  "redox_other",
  [{ type: "gas_evolution", description: "High-temperature steam generated for oxygen electrolysis" },
   { type: "color_change", colorFrom: "#1C2833", colorTo: "#FFFFFF", description: "Black ilmenite converts to white rutile and gray sponge iron" }]);

add("astro-022-ilmenite-carbothermal-reduction", "Carbothermal reduction of lunar ilmenite ore",
  ["ilmenite", "c"],
  ["fe", "tio2", "co"],
  180, "Carbon arc reduction of concentrated lunar ilmenite producing carbon monoxide and metallic iron.",
  "redox_other",
  [{ type: "gas_evolution", description: "Carbon monoxide outgassing at 1200 °C" }]);

add("astro-023-ilmenite-methane-reduction", "Methane-assisted reduction of lunar ilmenite in recycling loop",
  ["ilmenite", "ch4"],
  ["fe", "tio2", "co", "h2"],
  245, "Closed-loop gaseous hydrocarbon reduction extracting iron and synthesis gas from lunar mare ore.",
  "redox_other",
  [{ type: "gas_evolution", description: "Syngas (CO + H2) outgassing" }]);

add("astro-024-ilmenite-carbon-monoxide-reduction", "Carbon monoxide reduction of lunar ilmenite",
  ["ilmenite", "co"],
  ["fe", "tio2", "co2"],
  -12, "Recycled carbon monoxide reducing ilmenite to produce CO2 for subsequent oxygen reclamation.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#1C2833", colorTo: "#BDC3C7", description: "Black ilmenite turns light gray rutile and iron" }]);

add("astro-025-moxie-solid-oxide-co2-electrolysis", "High-temperature solid oxide electrolysis of Martian CO2 (MOXIE)",
  ["co2"],
  ["co", "o2"],
  283, "Electrocatalytic splitting of Martian atmospheric carbon dioxide at 800 °C producing breathable oxygen.",
  "decomposition",
  [{ type: "gas_evolution", description: "Pure oxygen gas separation at the zirconia anode" }]);

add("astro-026-magnesium-perchlorate-thermal-oxygen", "Thermal decomposition of Martian soil magnesium perchlorate for oxygen release",
  ["magnesium_perchlorate"],
  ["mgcl2", "o2"],
  115, "Low-energy thermal bakeout (350 °C) of deliquescent Martian soil perchlorate releasing breathable oxygen.",
  "decomposition",
  [{ type: "gas_evolution", description: "Vigorous pure oxygen evolution" },
   { type: "color_change", colorFrom: "#FFFFFF", colorTo: "#EAEDED", description: "White perchlorate turns to anhydrous magnesium chloride" }]);

add("astro-027-calcium-perchlorate-thermal-oxygen", "Thermal decomposition of Martian calcium perchlorate salts",
  ["calcium_perchlorate"],
  ["cacl2", "o2"],
  125, "Pyrolysis of Martian regolith calcium perchlorate generating oxygen and calcium chloride flux.",
  "decomposition",
  [{ type: "gas_evolution", description: "Oxygen gas release" }]);

add("astro-028-martian-perchlorate-ferrous-reduction", "Abiotic reduction of Martian perchlorate by ferrous iron in hydrothermal vents",
  ["magnesium_perchlorate", "feo"],
  ["mgcl2", "fe2o3"],
  -620, "Spontaneous low-temperature detoxification of perchlorate by ferrous basalt minerals in ancient Martian springs.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#1C2833", colorTo: "#922B21", description: "Black ferrous oxide oxidizes to dark red ferric oxide" }]);

add("astro-029-anorthite-carbothermal-reduction", "Carbothermal reduction of anorthite plagioclase for lunar aluminum extraction",
  ["anorthite", "c"],
  ["cao", "al", "sio2", "co"],
  1280, "Vacuum electric smelting of lunar highland regolith yielding structural aluminum and quicklime.",
  "redox_other",
  [{ type: "phase_change", description: "Molten aluminum separates from silicate slag at 1650 °C" }]);

add("astro-030-anorthite-hydrofluoric-acid-leaching", "Hydrofluoric acid digestion of lunar anorthite regolith",
  ["anorthite", "hf"],
  ["caf2", "alf3", "sif4", "water"],
  -450, "Fluoride acid leaching extraction separating volatile silicon tetrafluoride and aluminum fluoride.",
  "double_displacement",
  [{ type: "gas_evolution", description: "Volatile silicon tetrafluoride gas boils off" }]);

add("astro-031-lunar-calcium-oxide-chlorination", "Carbochlorination of quicklime from lunar regolith slag",
  ["cao", "c", "cl2"],
  ["cacl2", "co"],
  -195, "Chlorination of residual calcium oxide for molten salt electrolysis feedstock.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Lime converts to molten calcium chloride salt" }]);

add("astro-032-calcium-perchlorate-ferrous-reduction", "Reduction of calcium perchlorate by wüstite in Martian hydrothermal vents",
  ["calcium_perchlorate", "feo"],
  ["cacl2", "fe2o3"],
  -640, "Aqueous redox detoxification of perchlorates depositing rusty iron oxyhydroxide muds.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#1C2833", colorTo: "#7B241C", description: "Red hematite mud precipitates" }]);

add("astro-033-enstatite-carbothermal-reduction", "High-temperature carbothermal reduction of enstatite pyroxene",
  ["enstatite", "c"],
  ["mg", "sio2", "co"],
  580, "Lunar smelting of pyroxene minerals to recover magnesium metal vapor and carbon monoxide.",
  "redox_other",
  [{ type: "gas_evolution", description: "Magnesium metal vapor distills over at 1500 °C" }]);

add("astro-034-diopside-carbothermal-reduction", "Carbothermal reduction of lunar mare diopside pyroxene",
  ["diopside", "c"],
  ["cao", "mg", "sio2", "co"],
  620, "Comprehensive smelting of lunar clinopyroxene into lime, magnesium, and silica glass.",
  "redox_other",
  [{ type: "phase_change", description: "Vaporization of magnesium alongside carbon monoxide release" }]);

add("astro-035-schreibersite-oxidation-isru", "Thermal oxidation of meteoritic schreibersite for planetary fertilizer synthesis",
  ["schreibersite", "o2"],
  ["fe2o3", "p4o10"],
  -3150, "Controlled combustion of iron-nickel phosphide scrap yielding ferric oxide and phosphorus pentoxide.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white phosphorus pentoxide smoke condenses" }]);

add("astro-036-fayalite-methane-reduction", "Methane reduction of fayalitic olivine for planetary iron extraction",
  ["fayalite", "ch4"],
  ["fe", "sio2", "co", "h2"],
  280, "Natural gas or ISRU methane reduction of olivine-rich basalts yielding sponge iron.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#7D6608", colorTo: "#7F8C8D", description: "Silicate collapses into granular metallic iron" }]);

add("astro-037-forsterite-hydrogen-reduction", "Ultra-high-temperature hydrogen reduction of forsterite olivine",
  ["forsterite", "h2"],
  ["mg", "sio2", "water"],
  590, "Concentrated solar furnace thermal reduction of magnesium silicate regolith.",
  "redox_other",
  [{ type: "gas_evolution", description: "Magnesium vapor and steam evolved above 1700 °C" }]);

add("astro-038-troilite-carbothermal-reduction", "Carbothermal reduction of meteoritic troilite to metallic iron and carbon disulfide",
  ["troilite", "c"],
  ["fe", "cs2"],
  180, "High-temperature carbon reduction of asteroid-derived iron sulfide recovering structural iron and carbon disulfide solvent.",
  "redox_other",
  [{ type: "gas_evolution", description: "Volatile carbon disulfide vapor boils off" },
   { type: "color_change", colorFrom: "#B7950B", colorTo: "#7F8C8D", description: "Bronze troilite reduces to metallic gray sponge iron" }]);

add("astro-039-lunar-rutile-hydrogen-reduction", "Hydrogen reduction of titanium dioxide from lunar ilmenite tailings",
  ["tio2", "h2"],
  ["ti", "water"],
  280, "Reduction of purified titanium dioxide white pigment to structural titanium metal sponge.",
  "redox_other",
  [{ type: "gas_evolution", description: "Steam outgassing" },
   { type: "color_change", colorFrom: "#FFFFFF", colorTo: "#7F8C8D", description: "White titanium oxide turns metallic gray titanium sponge" }]);

add("astro-040-molten-regolith-iron-electrolysis", "Direct molten regolith electrolysis (MRE) iron oxide decomposition",
  ["feo"],
  ["fe", "o2"],
  544, "Electrolytic decomposition of dissolved ferrous oxide in molten lunar basalt (1450 °C) extracting metallic iron at cathode and oxygen gas at anode.",
  "decomposition",
  [{ type: "gas_evolution", description: "Oxygen gas bubbles evolve at inert anode" },
   { type: "phase_change", description: "Dense molten metallic iron pool collects at bottom" }]);

// =========================================================================
// 3. Interstellar Medium, Cometary Ices & Prebiotic Organics (041-060)
// =========================================================================

add("astro-041-formamide-interstellar-synthesis", "Condensation of hydrogen cyanide and water ice in interstellar grain mantles",
  ["hcn", "water"],
  ["formamide"],
  -62, "Surface cosmic-ray and UV-driven hydration of HCN in interstellar ice grains (e.g. Hale-Bopp comet).",
  "synthesis",
  [{ type: "phase_change", description: "Liquid formamide precursor matrix condenses in icy grain mantle" }]);

add("astro-042-formamide-thermal-decarbonylation", "Thermal vacuum decarbonylation of formamide on comet perihelion",
  ["formamide"],
  ["co", "ammonia"],
  42, "Pyrolysis of interstellar formamide replenishing cometary coma carbon monoxide and ammonia outgassing.",
  "decomposition",
  [{ type: "gas_evolution", description: "Evolution of carbon monoxide and ammonia gas" }]);

add("astro-043-glycolaldehyde-formaldehyde-dimerization", "Dimerization of formaldehyde in interstellar dust cloud grain mantles",
  ["hcho"],
  ["glycolaldehyde"],
  -125, "Non-enzymatic formose initiation reaction forming the simplest prebiotic sugar glycolaldehyde.",
  "synthesis",
  [{ type: "phase_change", description: "Volatile formaldehyde gas condenses into crystalline solid sugar" }]);

add("astro-044-glycolaldehyde-hydrogenation", "Catalytic surface hydrogenation of glycolaldehyde on cosmic dust grains",
  ["glycolaldehyde", "h2"],
  ["c2h6o2"],
  -88, "Grain surface H-atom addition converting glycolaldehyde to interstellar ethylene glycol.",
  "synthesis",
  [{ type: "phase_change", description: "Reduction to viscous ethylene glycol liquid" }]);

add("astro-045-aminoacetonitrile-strecker-synthesis", "Interstellar Strecker condensation forming aminoacetonitrile (glycine precursor)",
  ["hcho", "ammonia", "hcn"],
  ["aminoacetonitrile", "water"],
  -118, "Three-component cosmic synthesis detected in Sagittarius B2(N) hot molecular core.",
  "synthesis",
  [{ type: "phase_change", description: "Formation of aminoacetonitrile liquid precursor in grain ice" }]);

add("astro-046-aminoacetonitrile-hydrolysis-glycine", "Hydrothermal aqueous hydrolysis of aminoacetonitrile into glycine in carbonaceous chondrites",
  ["aminoacetonitrile", "water"],
  ["glycine", "ammonia"],
  -75, "Asteroidal aqueous parent-body alteration yielding racemic amino acids found in Murchison meteorite.",
  "double_displacement",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline glycine amino acid plates crystallize" }]);

add("astro-047-cyanoacetylene-synthesis", "Gas-phase reaction of acetylene and cyanide in dense molecular clouds (TMC-1)",
  ["c2h2", "hcn"],
  ["cyanoacetylene", "h2"],
  -45, "Radical-neutral addition reaction building extended linear polyynes in interstellar envelopes.",
  "synthesis",
  [{ type: "gas_evolution", description: "Hydrogen gas release alongside cyanoacetylene formation" }]);

add("astro-048-cyanogen-prebiotic-photolysis", "Cometary photolytic oxidation of hydrogen cyanide to cyanogen",
  ["hcn", "o2"],
  ["cyanogen", "water"],
  -410, "Photochemical generation of toxic cyanogen gas observed in cometary comae (e.g. Halley).",
  "redox_other",
  [{ type: "gas_evolution", description: "Evolution of cyanogen pseudohalogen gas" }]);

add("astro-049-carbon-suboxide-photochemical-formation", "Vacuum UV photolysis of cometary carbon monoxide ice",
  ["co"],
  ["carbon_suboxide", "co2"],
  -18, "Irradiation of pure CO ice matrices forming polymerized red-brown carbon suboxide cumulenes.",
  "decomposition",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#A93226", description: "Colorless ice turns distinctive reddish-brown cometary residue" }]);

add("astro-050-carbon-suboxide-hydration-malonic", "Hydration of cometary carbon suboxide in melting meteorite ice",
  ["carbon_suboxide", "water"],
  ["c3h4o4"],
  -140, "Prebiotic hydrolysis yielding dicarboxylic malonic acid observed in carbonaceous chondrites.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline malonic acid precipitates" }]);

add("astro-051-isocyanic-acid-synthesis", "Gas-phase synthesis of isocyanic acid from carbon monoxide and ammonia",
  ["ammonia", "isocyanic_acid"],
  ["ch4n2o"],
  -115, "Condensation of isocyanic acid and ammonia on interstellar dust grains producing primordial urea.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline urea coats grain surfaces" }]);

add("astro-052-formamide-methanol-transesterification", "Interstellar grain-surface synthesis of methyl formate from formamide and methanol",
  ["formamide", "ch3oh"],
  ["methyl_formate", "ammonia"],
  -22, "Prebiotic ester synthesis detected abundantly in Orion-KL and W51 hot molecular cores.",
  "double_displacement",
  [{ type: "phase_change", description: "Pleasant fruity-scented methyl formate forms" }]);

add("astro-053-methanethiol-interstellar-synthesis", "Cosmic grain-surface synthesis of methanethiol from methane and hydrogen sulfide",
  ["ch4", "h2s"],
  ["methanethiol", "h2"],
  25, "Radical-induced sulfur insertion under cosmic ray irradiation generating volatile prebiotic thiols.",
  "synthesis",
  [{ type: "gas_evolution", description: "Intensely pungent methanethiol and hydrogen gas evolved" }]);

add("astro-054-cyanamide-dimerization", "Prebiotic condensation dimerization of cyanamide to dicyandiamide",
  ["cyanamide"],
  ["dicyandiamide"],
  -78, "Interstellar and prebiotic concentration mechanism generating dicyandiamide phosphorylating reagent.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White microcrystalline dicyandiamide forms" }]);

add("astro-055-aminooxazoline-sutherland-synthesis", "Prebiotic ribonucleotide precursor condensation of glycolaldehyde with cyanamide",
  ["glycolaldehyde", "cyanamide"],
  ["aminooxazoline"],
  -95, "Pivotal step in the Sutherland prebiotic RNA synthesis crystallizing pure aminooxazoline from prebiotic mixtures.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Fine white crystals of 2-aminooxazoline separate cleanly" }]);

add("astro-056-titan-diacetylene-cyanodiacetylene", "Cyanopolyyne growth from diacetylene and HCN in Titan stratosphere",
  ["diacetylene", "hcn"],
  ["cyanodiacetylene", "h2"],
  -48, "Photochemical chain lengthening producing cyanodiacetylene mapped in cold dark interstellar clouds.",
  "synthesis",
  [{ type: "gas_evolution", description: "Molecular hydrogen evolution" }]);

add("astro-057-titan-cyanogen-diacetylene-ice", "Photochemical coupling of diacetylene and cyanogen in Titan polar clouds",
  ["diacetylene", "cyanogen"],
  ["dicyanodiacetylene", "h2"],
  -52, "Formation of solid dicyanodiacetylene crystalline ice observed by Cassini CIRS spectrometer.",
  "synthesis",
  [{ type: "phase_change", description: "Condensation into golden-yellow stratospheric ice particles" }]);

add("astro-058-carbonyl-sulfide-synthesis", "Direct synthesis of carbonyl sulfide from carbon monoxide and sulfur vapor",
  ["co", "s"],
  ["carbonyl_sulfide"],
  -35, "High-temperature thermochemical formation in the lower troposphere of Venus.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#F4D03F", colorTo: "#FFFFFF", description: "Yellow sulfur dissolves into gas-phase carbonyl sulfide" }]);

add("astro-059-carbonyl-sulfide-photolysis", "Atmospheric UV photodecomposition of carbonyl sulfide",
  ["carbonyl_sulfide"],
  ["co", "s"],
  35, "Photolysis in the upper clouds of Venus regenerating elemental sulfur haze particles.",
  "decomposition",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Precipitation of pale yellow sulfur aerosols" }]);

add("astro-060-jupiter-ammonium-hydrosulfide-clouds", "Condensation of ammonia and hydrogen sulfide forming Jupiter cloud deck",
  ["ammonia", "h2s"],
  ["ammonium_hydrosulfide"],
  -95, "Equilibrium condensation creating the dense intermediate cloud layer at 2 bar depth in Jupiter.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#F9E79F", description: "Dense yellowish-white ammonium hydrosulfide snow forms" }]);

// =========================================================================
// 4. Planetary Atmospheric Photochemistry (Titan, Venus, Gas Giants) (061-080)
// =========================================================================

add("astro-061-titan-methane-photolysis-acetylene", "Solar UV photolysis of methane in Titan upper atmosphere to acetylene",
  ["ch4", "ammonia"],
  ["methylamine", "h2"],
  58, "Upper atmospheric ionization discharge coupling nitrogen and methane into primary amines.",
  "synthesis",
  [{ type: "gas_evolution", description: "Evolution of fishy-scented methylamine and hydrogen gas" }]);

add("astro-062-titan-damn-hcn-tetramerization", "Tholin aerosol precursor tetramerization of hydrogen cyanide",
  ["hcn"],
  ["diaminomaleonitrile"],
  -165, "Base-catalyzed prebiotic condensation of 4 HCN molecules into crystalline diaminomaleonitrile (DAMN).",
  "synthesis",
  [{ type: "precipitation", colorTo: "#F5EEF8", description: "Pale yellow-brown DAMN crystals precipitate" }]);

add("astro-063-titan-adenine-formation-damn", "Polymerization of diaminomaleonitrile with HCN yielding adenine nucleobase",
  ["diaminomaleonitrile", "hcn"],
  ["adenine"],
  -98, "Photochemically driven ring-closure of DAMN with HCN building the adenine purine ring in planetary tholins.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Pure crystalline adenine nucleobase forms" }]);

add("astro-064-jupiter-disilane-oxidation", "Pyrophoric oxidation of disilane in planetary impact plumes",
  ["disilane", "o2"],
  ["sio2", "water"],
  -1480, "Hypergolic pyrophoric oxidation of disilane in impact plumes depositing amorphous silica nanoparticles and water.",
  "synthesis",
  [{ type: "temperature_increase", description: "Blinding white flash and combustion" },
   { type: "precipitation", colorTo: "#FFFFFF", description: "Dense white silica nanoparticle smoke condenses" }]);

add("astro-065-venus-carbonyl-sulfide-so3-reaction", "Reduction of sulfur trioxide by carbonyl sulfide in Venus lower clouds",
  ["carbonyl_sulfide", "so3"],
  ["co2", "so2", "s"],
  -85, "Catalytic sulfur cycling in the lower cloud deck of Venus maintaining elemental sulfur aerosols.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Precipitation of pale yellow sulfur aerosols" }]);

add("astro-066-venus-water-loss-wustite", "Catastrophic atmospheric water loss via wüstite oxidation on Venus surface",
  ["feo", "water"],
  ["fe3o4", "h2"],
  -42, "Basalt-water reaction oxidizing crustal wüstite to magnetite, releasing hydrogen for space escape.",
  "redox_other",
  [{ type: "gas_evolution", description: "Hydrogen gas evolved for hydrodynamic planetary escape" },
   { type: "color_change", colorFrom: "#1C2833", colorTo: "#1C2833", description: "Crustal iron oxidizes with water loss" }]);

add("astro-067-titan-acetonitrile-synthesis", "Photochemical coupling of acetylene and ammonia forming acetonitrile",
  ["c2h2", "ammonia"],
  ["c2h3n", "h2"],
  -35, "UV-driven ion-molecule synthesis of acetonitrile mapped by ALMA in Titan atmosphere.",
  "synthesis",
  [{ type: "gas_evolution", description: "Hydrogen gas release alongside volatile acetonitrile vapor" }]);

add("astro-068-venus-carbonyl-sulfide-so2-reduction", "Reduction of sulfur dioxide by carbonyl sulfide on Venus",
  ["carbonyl_sulfide", "so2"],
  ["co2", "s"],
  -115, "Catalytic sulfur cycling in the lower cloud deck of Venus maintaining elemental sulfur aerosols.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Precipitation of sulfur droplets and CO2" }]);

add("astro-069-jupiter-phosphine-water-hydrolysis", "Deep hydrothermal hydrolysis of phosphine in Jovian water cloud deck",
  ["ph3", "water"],
  ["h3po4", "h2"],
  -68, "Thermochemical oxidation of deep tropospheric phosphine into orthophosphoric acid in Jovian water clouds.",
  "redox_other",
  [{ type: "gas_evolution", description: "Hydrogen gas evolution" }]);

add("astro-070-planetary-methane-so2-reduction", "Thermochemical reduction of sulfur dioxide by methane in reducing planetary atmospheres",
  ["ch4", "so2"],
  ["co2", "s", "water"],
  -165, "High-temperature gas-phase reduction of volcanic sulfur dioxide by atmospheric methane depositing elemental sulfur.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F4D03F", description: "Yellow sulfur aerosol fog condenses alongside water vapor" }]);

add("astro-071-titan-nitrogen-methane-hcn", "Corona discharge synthesis of hydrogen cyanide in Titan nitrogen-methane atmosphere",
  ["n2", "c2h2"],
  ["hcn"],
  -12, "Energetic electron and UV flux coupling molecular nitrogen and acetylene into hydrogen cyanide.",
  "synthesis",
  [{ type: "gas_evolution", description: "Formation of gas-phase hydrogen cyanide" }]);

add("astro-072-titan-toluene-formation", "Photochemical alkylation of benzene by methane yielding toluene in Titan smog",
  ["c6h6", "ch4"],
  ["c7h8", "h2"],
  48, "Solar UV and cosmic-ray driven alkylation building methyl-substituted aromatics in Titan orange organic haze.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#D4AC0D", description: "Clear aromatic vapors condense into amber-hued aerosol droplets" }]);

add("astro-073-mars-perchlorate-uv-photolysis", "Photochemical vacuum UV reduction of Martian surface perchlorates",
  ["magnesium_perchlorate", "h2o2"],
  ["mgcl2", "o2", "water"],
  -380, "Peroxide-accelerated decomposition of perchlorates under intense Martian surface UV radiation.",
  "redox_other",
  [{ type: "gas_evolution", description: "Vigorous oxygen gas evolution" }]);

add("astro-074-mars-fumarolic-feso4-calcination", "Thermal roasting decomposition of ferrous sulfate in Martian fumaroles",
  ["feso4"],
  ["fe2o3", "so2", "so3"],
  245, "Volcanic fumarolic desulfurization of ferrous sulfate depositing red hematite crust and releasing SO2 and SO3 gases.",
  "decomposition",
  [{ type: "gas_evolution", description: "Evolution of sulfur dioxide and sulfur trioxide fumes" },
   { type: "color_change", colorFrom: "#A2D9CE", colorTo: "#7B241C", description: "Pale green vitriol decomposes to dark red hematite" }]);

add("astro-075-mercury-enstatite-solar-wind-reduction", "Solar wind proton reduction of surface enstatite pyroxene on Mercury",
  ["enstatite", "h2"],
  ["mg", "sio2", "water"],
  410, "Space weathering reduction of rocky regolith by solar wind hydrogen creating submicroscopic metallic magnesium blebs.",
  "redox_other",
  [{ type: "gas_evolution", description: "Water vapor outgassing into Mercury exosphere" }]);

add("astro-076-io-pyrite-thermal-desulfurization", "Thermal pyrolytic desulfurization of pyrite on Io and hot rocky exoplanets",
  ["fes2"],
  ["troilite", "s"],
  135, "Vacuum thermal desulfurization of pyrite mineral at 700 °C releasing yellow elemental sulfur vapor and leaving stoichiometric troilite.",
  "decomposition",
  [{ type: "phase_change", description: "Yellow elemental sulfur vapor outgasses and condenses into bright frost" },
   { type: "color_change", colorFrom: "#B7950B", colorTo: "#7D6608", description: "Golden pyrite turns to bronze troilite" }]);

add("astro-077-triton-methane-nitrogen-radiolysis", "Solar wind and cosmic ray radiolysis of nitrogen-methane ices on Neptune moon Triton",
  ["n2", "ch4"],
  ["hcn", "ammonia"],
  65, "Cryogenic surface radiolysis generating reddish organic tholin stains on nitrogen polar caps.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#BA4A00", description: "Colorless ices turn pinkish-red tholin polymer" }]);

add("astro-078-pluto-carbon-monoxide-methane-tholin", "Solar UV photolysis of Pluto nitrogen-methane-CO atmosphere",
  ["co", "ch4"],
  ["hcho", "c2h2"],
  85, "Far-UV atmospheric synthesis building complex smog particles settling onto Pluto Cthulhu Macula.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#6E2C00", description: "Dark brown-red tholin particles rain onto nitrogen glacier" }]);

add("astro-079-europa-radiolytic-hydrogen-peroxide", "Charged particle radiolysis of Europa surface water ice",
  ["water", "o2"],
  ["h2o2"],
  188, "Magnetospheric sulfur and electron bombardment creating surface hydrogen peroxide oxidants.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Hydrogen peroxide hydrates trapped in surface ice" }]);

add("astro-080-enceladus-methanogenesis-equilibrium", "Deep hydrothermal methanogenesis equilibrium in Enceladus core",
  ["co2", "h2s"],
  ["carbonyl_sulfide", "water"],
  28, "Equilibrium coupling of carbon dioxide and hydrothermal sulfide in alkaline ocean vents.",
  "double_displacement",
  [{ type: "phase_change", description: "Trace carbonyl sulfide outgasses in south polar plumes" }]);

// =========================================================================
// 5. Hydrothermal Abiogenesis, Prebiotic Mineral Catalysis & Ribose (081-100)
// =========================================================================

add("astro-081-wachtershauser-iron-sulfur-formate", "Wächtershäuser iron-sulfur world primordial carbon fixation",
  ["co2", "fes", "h2s"],
  ["fes2", "hcooh"],
  -48, "Chemoautotrophic reduction of CO2 coupled to the exergonic oxidation of FeS to pyrite in primordial hydrothermal vents.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#1C2833", colorTo: "#B7950B", description: "Black troilite transforms into golden metallic pyrite crystals" }]);

add("astro-082-wachtershauser-pyrite-hydrogen", "Primordial pyrite-pulled electron generation from troilite and hydrogen sulfide",
  ["fes", "h2s"],
  ["fes2", "h2"],
  -38, "Fundamental geochemical energy source generating high-potential reducing equivalents on early Earth and Enceladus.",
  "redox_other",
  [{ type: "gas_evolution", description: "Evolution of molecular hydrogen gas" },
   { type: "color_change", colorFrom: "#1C2833", colorTo: "#B7950B", description: "Golden pyrite flakes crystallize" }]);

add("astro-083-formose-glycolaldehyde-dimerization-erythrose", "Formose condensation of two glycolaldehyde molecules yielding erythrose",
  ["glycolaldehyde"],
  ["erythrose"],
  -115, "Non-enzymatic aldol self-condensation building 4-carbon tetrose sugars in warm alkaline springs.",
  "synthesis",
  [{ type: "phase_change", description: "Formation of viscous tetrose sugar syrup" }]);

add("astro-084-formose-ribose-pentose-synthesis", "Formose cross-aldol condensation of glycolaldehyde and triose to ribose",
  ["glycolaldehyde", "c3h6o3_gap"],
  ["ribose"],
  -98, "Prebiotic synthesis of D-ribose sugar forming the backbone of prebiotic RNA.",
  "synthesis",
  [{ type: "phase_change", description: "Viscous syrup yields crystalline D-ribose" }]);

add("astro-085-pyrophosphate-prebiotic-condensation", "Thermal mineral condensation of orthophosphate to pyrophosphate on volcanic basalt",
  ["na2hpo4"],
  ["na4p2o7", "water"],
  38, "Dry-heating evaporation of prebiotic puddles condensing orthophosphate into energy-rich pyrophosphate.",
  "decomposition",
  [{ type: "phase_change", description: "Dehydration yielding anhydrous crystalline sodium pyrophosphate" }]);

add("astro-086-trimetaphosphate-thermal-condensation", "Volcanic mineral-mediated cyclic condensation yielding sodium trimetaphosphate",
  ["nah2po4"],
  ["sodium_trimetaphosphate", "water"],
  78, "High-temperature volcanic fumarole dehydration producing cyclic trimetaphosphate phosphorylating agent.",
  "decomposition",
  [{ type: "phase_change", description: "White microcrystalline ring metaphosphate forms" }]);

add("astro-087-strecker-alanine-synthesis", "Prebiotic Strecker synthesis of alanine from acetaldehyde, HCN, and water",
  ["ch3cho", "hcn", "water"],
  ["alanine"],
  -120, "Single-pot hydrothermal condensation and hydrolysis yielding racemic alanine amino acid.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "White crystalline alanine amino acid precipitates" }]);

add("astro-088-prebiotic-pyruvate-synthesis", "Hydrothermal carbonylation of acetic acid on iron-nickel catalysts",
  ["ch3cooh", "co"],
  ["c3h4o3_pyruvate"],
  -32, "Primordial carbon-chain elongation building pyruvic acid central to the reverse Krebs cycle.",
  "synthesis",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FAFAFA", description: "Clear solution turns pale yellowish pyruvic acid" }]);

add("astro-089-pyruvate-alanine-reductive-amination", "Primordial reductive amination of pyruvate to alanine in hydrothermal vents",
  ["ammonia", "c3h4o3_pyruvate", "h2"],
  ["alanine", "water"],
  -88, "Geochemical prebiotic amino acid synthesis coupling pyruvate, ammonia, and hydrogen on iron-sulfide surfaces.",
  "redox_other",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Precipitation of alanine amino acid" }]);

add("astro-090-hadean-iron-co2-reduction", "Direct carbon dioxide reduction by native iron in Hadean hydrothermal systems",
  ["co2", "fe"],
  ["feo", "co"],
  18, "Exergonic reduction of dissolved oceanic CO2 by meteoritic or native iron depositing wüstite and releasing carbon monoxide.",
  "redox_other",
  [{ type: "color_change", colorFrom: "#7F8C8D", colorTo: "#1C2833", description: "Metallic iron turns black wüstite crust" }]);

add("astro-091-meteoritic-schreibersite-acid-corrosion", "Acidic weathering dissolution of meteoritic schreibersite releasing phosphine",
  ["schreibersite", "hcl"],
  ["fecl2", "ph3", "h2"],
  -310, "Acid digestion of extraterrestrial iron phosphide by primordial volcanic hydrochloric acid generating phosphine gas and hydrogen.",
  "redox_other",
  [{ type: "gas_evolution", description: "Pungent garlic-like phosphine gas and hydrogen effervesce" },
   { type: "color_change", colorFrom: "#7B7D7D", colorTo: "#A2D9CE", description: "Dark meteoritic mineral dissolves into pale green ferrous chloride" }]);

add("astro-092-formate-ferric-reduction", "Abiotic reduction of hydrothermal ferric iron by primordial formate",
  ["fecl3", "hcooh"],
  ["fecl2", "co2", "hcl"],
  -68, "Electron-transfer coupling between organic acids and mineral iron in early alkaline vent systems.",
  "redox_other",
  [{ type: "gas_evolution", description: "Carbon dioxide effervescence" },
   { type: "color_change", colorFrom: "#B03A2E", colorTo: "#A2D9CE", description: "Rust-red ferric solution clarifies to pale green ferrous" }]);

add("astro-093-meteoritic-phosphite-oxidation", "Photochemical oxidation of prebiotic phosphorous acid to orthophosphoric acid",
  ["h3po3", "o2"],
  ["h3po4"],
  -310, "UV-driven atmospheric oxidation converting soluble phosphite into structural phosphate for nucleic acids.",
  "synthesis",
  [{ type: "temperature_increase", description: "Strong exothermic oxidation" }]);

add("astro-094-meteoritic-hypophosphorous-oxidation", "Stepwise oxidation of meteoritic hypophosphorous acid to phosphorous acid",
  ["hypophosphorous_acid", "o2"],
  ["h3po3"],
  -380, "Atmospheric oxidation of reduced phosphorus released by schreibersite weathering.",
  "synthesis",
  [{ type: "temperature_increase", description: "Exothermic oxidation" }]);

add("astro-095-ribose-furfural-dehydration", "Prebiotic acid-catalyzed dehydration of D-ribose to furfural",
  ["ribose"],
  ["furfural", "water"],
  28, "Thermal decomposition pathway of unprotected pentoses in the absence of mineral borate stabilizers.",
  "decomposition",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#F5B041", description: "White sugar turns into golden-amber oily furfural liquid with almond aroma" }]);

add("astro-096-glycine-dimerization-peptide-bond", "Primordial peptide bond condensation of glycine to glycylglycine",
  ["glycine", "carbonyl_sulfide"],
  ["glycylglycine", "co2", "h2s"],
  -48, "Carbonyl sulfide-promoted prebiotic polymerization of amino acids into peptides under volcanic conditions.",
  "synthesis",
  [{ type: "gas_evolution", description: "Evolution of carbon dioxide and hydrogen sulfide" },
   { type: "precipitation", colorTo: "#FFFFFF", description: "White dipeptide glycylglycine precipitates" }]);

add("astro-097-alanine-glycine-peptide-condensation", "Abiotic dipeptide formation between alanine and glycine mediated by COS",
  ["alanine", "glycine", "carbonyl_sulfide"],
  ["c5h10n2o3_alanylglycine", "co2", "h2s"],
  -52, "Volcanic gas-mediated non-ribosomal peptide bond formation yielding mixed alanylglycine dipeptide.",
  "synthesis",
  [{ type: "gas_evolution", description: "Carbon dioxide and hydrogen sulfide gas release" },
   { type: "precipitation", colorTo: "#FFFFFF", description: "Mixed dipeptide crystallizes from warm aqueous solution" }]);

add("astro-098-alanine-homodipeptide-condensation", "Prebiotic volcanic condensation of alanine to alanylalanine",
  ["alanine", "carbonyl_sulfide"],
  ["c6h12n2o3_alanylalanine", "co2", "h2s"],
  -50, "Direct COS-activated peptide coupling of two alanine molecules without modern ribosome machinery.",
  "synthesis",
  [{ type: "gas_evolution", description: "Pungent hydrogen sulfide and carbon dioxide effervescence" },
   { type: "precipitation", colorTo: "#FFFFFF", description: "Crystalline alanylalanine precipitates" }]);

add("astro-099-methanethiol-acetate-thioester-coupling", "Primordial thioester synthesis from methanethiol and acetic acid",
  ["methanethiol", "ch3cooh"],
  ["methyl_thioacetate", "water"],
  -12, "Prebiotic formation of energy-rich high-energy thioester bonds central to the origin of metabolism.",
  "double_displacement",
  [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Condensation into distinct organic ester phase" }]);

add("astro-100-saladino-formamide-adenine-synthesis", "Saladino prebiotic purine synthesis of adenine from formamide and HCN",
  ["formamide", "hcn"],
  ["adenine", "water"],
  -85, "Mineral-catalyzed prebiotic condensation of formamide with four HCN molecules yielding adenine and water.",
  "synthesis",
  [{ type: "precipitation", colorTo: "#FFFFFF", description: "Dense white microcrystalline adenine precipitates" }]);

console.log(`Domain 40 successfully constructed with ${reactions.length} reactions!`);

// Write domain40AstrochemPlanetaryGeochem.ts
const outputPath = path.resolve(__dirname, "domain40AstrochemPlanetaryGeochem.ts");
const code = `// Domain 40: Astrochemistry, Planetary Geochemistry, Lunar/Mars ISRU & Prebiotic Models (${reactions.length} reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_40_REACTIONS: ReactionDefinition[] = ${JSON.stringify(reactions, null, 2)};
`;

fs.writeFileSync(outputPath, code, "utf8");
console.log(`✓ Wrote ${reactions.length} reactions to domain40AstrochemPlanetaryGeochem.ts`);
