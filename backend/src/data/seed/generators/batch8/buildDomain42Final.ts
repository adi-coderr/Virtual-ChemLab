import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { parseFormula } from "../../../../chemistry-engine/formulaParser.js";
import { balanceEquation, type BalancerSpecies } from "../../../../chemistry-engine/balancer.js";
import { SEED_CHEMICALS } from "../../chemicals.js";
import { CHEMICALS_BATCH_5 } from "../../chemicalsBatch5.js";
import { CHEMICALS_BATCH_6 } from "../../chemicalsBatch6.js";
import { CHEMICALS_BATCH_7 } from "../../chemicalsBatch7.js";
import { RAW_BATCH_8_CHEMICALS } from "./chemicalDefinitionsBatch8.js";
import { getExistingKeys } from "./inspectCollisions.js";
import { DOMAIN_38_REACTIONS } from "./domain38TotalSynthesisNamedRxns.js";
import { DOMAIN_39_REACTIONS } from "./domain39AgrochemPesticidesFertilizers.js";
import { DOMAIN_40_REACTIONS } from "./domain40AstrochemPlanetaryGeochem.js";
import { DOMAIN_41_REACTIONS } from "./domain41ClinicalDiagnosticsBiosensors.js";
import type { ReactionDefinition } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const all = new Map<string, any>();
for (const c of SEED_CHEMICALS) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_5) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_6) if (c && c.id) all.set(c.id, c);
for (const c of CHEMICALS_BATCH_7) if (c && c.id) all.set(c.id, c);
for (const c of RAW_BATCH_8_CHEMICALS) if (c && c.id) all.set(c.id, c);

const existingKeys = getExistingKeys();
for (const r of DOMAIN_38_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_39_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_40_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));
for (const r of DOMAIN_41_REACTIONS) existingKeys.add([...r.reactants].sort().join("+"));

console.log("Total existing keys loaded:", existingKeys.size);

const reactions: ReactionDefinition[] = [];
const localKeys = new Set<string>();

function add(
  id: string,
  name: string,
  reactants: string[],
  products: string[],
  enthalpy: number,
  desc: string,
  type: string,
  effects: any[]
) {
  const rKey = [...reactants].sort().join("+");
  if (existingKeys.has(rKey)) {
    throw new Error(`Collision with existing reaction: [${id}] key: ${rKey}`);
  }
  if (localKeys.has(rKey)) {
    throw new Error(`Duplicate local reaction key: [${id}] key: ${rKey}`);
  }
  localKeys.add(rKey);

  const missing: string[] = [];
  for (const cid of [...reactants, ...products]) {
    if (!all.has(cid)) missing.push(cid);
  }
  if (missing.length > 0) {
    throw new Error(`[${id}] Missing chemical IDs: ${missing.join(", ")}`);
  }

  const rs: BalancerSpecies[] = reactants.map(cid => {
    const chem = all.get(cid)!;
    return { label: cid, formula: chem.formula, composition: parseFormula(chem.formula).composition, charge: 0 };
  });
  const ps: BalancerSpecies[] = products.map(cid => {
    const chem = all.get(cid)!;
    return { label: cid, formula: chem.formula, composition: parseFormula(chem.formula).composition, charge: 0 };
  });

  const res = balanceEquation(rs, ps);
  if (!res.balancedEquationText) {
    throw new Error(`[${id}] Failed to balance: ${reactants.join("+")} -> ${products.join("+")}`);
  }

  reactions.push({
    id,
    name,
    reactants,
    products,
    enthalpyKjPerMol: enthalpy,
    description: desc,
    reactionType: type as any,
    observableEffects: effects
  });
  console.log(`✓ [${id}] ${res.balancedEquationText}`);
}

console.log("Building Domain 42: Semiconductor CVD, ALD, Etch & Microelectronics...");

// =========================================================================
// 1. Silicon, Polysilicon, Epitaxy & LPCVD/PECVD Dielectrics (001-020)
// =========================================================================

add("semi-001-disilane-high-rate-polysilicon", "Disilane pyrolytic CVD of polycrystalline silicon thin films",
  ["si2h6"], ["si", "h2"],
  185, "High-rate low-temperature (500-550 °C) chemical vapor deposition of polycrystalline silicon thin films.",
  "decomposition", [{ type: "temperature_increase", description: "Pyrolytic decomposition depositing silicon film with hydrogen gas release" }]);

add("semi-002-trisilane-low-temp-epitaxy", "Trisilane low-temperature chemical vapor deposition of amorphous silicon",
  ["si3h8"], ["si", "h2"],
  240, "Fast deposition of conformal amorphous silicon gates and FinFET channel sacrificial layers at temperatures down to 450 °C.",
  "decomposition", [{ type: "temperature_increase", description: "Ultra-low temperature pyrolytic silicon thin-film deposition" }]);

add("semi-003-dcs-low-temp-oxide", "Dichlorosilane low-temperature oxidation (LTO) spacer oxide CVD",
  ["sih2cl2", "o2"], ["sio2", "hcl"],
  -820, "Low-temperature oxidation of dichlorosilane at 400-450 °C depositing conformal gate spacer silicon dioxide dielectric.",
  "redox_other", [{ type: "temperature_increase", description: "Exothermic vapor-phase reaction depositing conformal dielectric oxide" }]);

add("semi-004-stc-zinc-reduction", "Silicon tetrachloride reduction by zinc vapor for semiconductor polysilicon",
  ["sicl4", "zn"], ["si", "zncl2"],
  -380, "Historical DuPont process reducing STC with molten zinc vapor at 950 °C to produce high-purity semiconductor silicon needles.",
  "single_displacement", [{ type: "temperature_increase", description: "Exothermic metal vapor reduction depositing elemental silicon crystals" }]);

add("semi-005-stc-calcium-reduction", "Silicon tetrachloride metallothermic reduction by calcium vapor",
  ["sicl4", "ca"], ["si", "cacl2"],
  -590, "High-temperature metallothermic reduction producing high-purity polycrystalline silicon with calcium chloride slag.",
  "single_displacement", [{ type: "temperature_increase", description: "Intense exothermic reduction yielding crystalline silicon" }]);

add("semi-006-tcs-zinc-reduction", "Trichlorosilane reduction by zinc vapor in polycrystalline silicon growth",
  ["sihcl3", "zn"], ["si", "zncl2", "h2"],
  -240, "Zinc reduction variant producing silicon rods at reduced furnace operating temperatures.",
  "redox_other", [{ type: "temperature_increase", description: "Deposition of polycrystalline silicon with zinc chloride subliming off" }]);

add("semi-007-digermane-low-temp-epitaxy", "Digermane pyrolytic low-temperature chemical vapor deposition of germanium",
  ["ge2h6"], ["ge", "h2"],
  165, "Decomposition of digermane at 350-450 °C to deposit pure germanium channel layers for high-hole-mobility pFETs.",
  "decomposition", [{ type: "temperature_increase", description: "Low-temperature deposition of mirror-smooth metallic germanium thin film" }]);

add("semi-008-digermane-n2o-gate-oxide", "Digermane nitrous oxide chemical vapor deposition of germanium dioxide gate dielectric",
  ["ge2h6", "n2o"], ["geo2", "n2", "water"],
  -1650, "Low-temperature CVD oxidation of digermane by nitrous oxide depositing passivation GeO2 gate oxide for high-mobility Ge channels.",
  "redox_other", [{ type: "temperature_increase", description: "Vigorous oxidation depositing dielectric GeO2 thin film" }]);

add("semi-009-phosphine-scrubber-oxidation", "Phosphine gas scrubber decontamination via hypochlorite oxidation",
  ["ph3", "naocl"], ["h3po4", "nacl"],
  -1180, "Point-of-use scrubber wet chemical oxidation neutralizing lethal phosphine exhaust from doping chambers into safe phosphate.",
  "redox_other", [{ type: "temperature_increase", description: "Exothermic wet oxidation neutralizing toxic hydride gas into clear solution" }]);

add("semi-010-diborane-scrubber-oxidation", "Diborane semiconductor exhaust scrubber hypochlorite oxidation",
  ["b2h6", "naocl"], ["h3bo3", "nacl"],
  -1420, "Effluent gas scrubber oxidation converting toxic diborane exhaust into soluble boric acid and sodium chloride.",
  "redox_other", [{ type: "temperature_increase", description: "Rapid chemical decontamination of toxic boron dopant gas" }]);

add("semi-011-silane-nitrogen-pecvd-nitride", "Plasma-enhanced CVD (PECVD) of silicon nitride from silane and nitrogen",
  ["sih4", "n2"], ["si3n4", "h2"],
  -280, "RF plasma cracking of molecular nitrogen and silane at 300 °C depositing passivation and moisture-barrier Si3N4 films.",
  "synthesis", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#2E4053", description: "Deposition of hard, scratch-resistant dielectric silicon nitride film" }]);

add("semi-012-teos-ozone-sacvd", "Sub-atmospheric CVD (SACVD) of silicon dioxide from TEOS and ozone",
  ["teos", "o3"], ["sio2", "ch3cho", "water"],
  -1450, "Ozone-activated decomposition of TEOS providing flow-like gap fill in sub-20nm shallow trench isolation (STI) structures.",
  "redox_other", [{ type: "temperature_increase", description: "Exothermic ozone-catalyzed deposition of dielectric silicon dioxide" }]);

add("semi-013-mts-sic-power-cvd", "Methyltrichlorosilane (MTS) single-source chemical vapor deposition of silicon carbide",
  ["ch3sicl3"], ["sic", "hcl"],
  -110, "High-temperature (1350 °C) pyrolysis of stoichiometric organosilane precursor depositing 4H-SiC power semiconductor epitaxial layers.",
  "decomposition", [{ type: "temperature_increase", description: "Deposition of transparent, ultra-hard silicon carbide semiconductor layer" }]);

add("semi-014-silicon-tetrachloride-ammonia-nitride", "Silicon tetrachloride LPCVD of silicon nitride at high temperature",
  ["sicl4", "ammonia"], ["si3n4", "hcl"],
  -420, "Reaction of STC with ammonia at 850 °C producing high-density, hydrogen-free silicon nitride gate dielectric layers.",
  "double_displacement", [{ type: "temperature_increase", description: "Deposition of dense silicon nitride film with HCl evolution" }]);

add("semi-015-disilane-nitrous-oxide-oxide", "Disilane nitrous oxide chemical vapor deposition of silicon dioxide",
  ["si2h6", "n2o"], ["sio2", "n2", "water"],
  -1820, "Rapid low-temperature deposition of gate spacer silicon dioxide films from reactive disilane and nitrous oxide.",
  "redox_other", [{ type: "temperature_increase", description: "Vigorous oxidation depositing dielectric SiO2 film" }]);

add("semi-016-silicon-tetrabromide-hydrogen-epitaxy", "Silicon tetrabromide hydrogen reduction for low-defect silicon epitaxy",
  ["sibr4", "h2"], ["si", "hbr"],
  135, "Bromide-based vapor phase epitaxy providing reduced autodoping and sharp dopant transition profiles.",
  "redox_other", [{ type: "temperature_increase", description: "Epitaxial deposition of pure silicon with volatile HBr exhaust" }]);

add("semi-017-germane-ozone-ald-oxide", "Ozone-assisted low-temperature CVD of germanium dioxide gate dielectric",
  ["geh4", "o3"], ["geo2", "water"],
  -790, "Ozone oxidation of germane at 250 °C passivating high-mobility germanium pFET channel interfaces.",
  "redox_other", [{ type: "temperature_increase", description: "Deposition of clear germanium dioxide dielectric thin film" }]);

add("semi-018-digermane-oxygen-oxidation", "Digermane thermal oxidation for high-dielectric GeO2 gate oxide",
  ["ge2h6", "o2"], ["geo2", "water"],
  -1410, "Direct thermal oxidation of digermane depositing conformal germanium dioxide for high-mobility device isolation.",
  "combustion", [{ type: "temperature_increase", description: "Exothermic vapor-phase oxidation depositing GeO2 dielectric" }]);

add("semi-019-silane-ethylene-sic-cvd", "Silane and ethylene co-deposition of cubic silicon carbide (3C-SiC)",
  ["sih4", "c2h4"], ["sic", "ch4", "h2"],
  -310, "LPCVD heteroepitaxial growth of silicon carbide thin films on silicon wafers at 900-1100 °C.",
  "redox_other", [{ type: "temperature_increase", description: "Heteroepitaxial growth of durable SiC ceramic semiconductor film" }]);

add("semi-020-silicon-tetrafluoride-hydrogen-plasma", "Silicon tetrafluoride reduction in hydrogen plasma for microcrystalline silicon",
  ["sif4", "h2"], ["si", "hf"],
  280, "Plasma-enhanced chemical vapor deposition using SiF4 and H2 to grow microcrystalline silicon thin-film transistors (TFTs).",
  "redox_other", [{ type: "temperature_increase", description: "Plasma deposition of microcrystalline silicon film with HF release" }]);

// =========================================================================
// 2. High-k Dielectrics, Barrier Metals & Via CVD/ALD (021-040)
// =========================================================================

add("semi-021-hfo2-ald-hfcl4-water", "Atomic layer deposition (ALD) of hafnium dioxide high-k gate dielectric",
  ["hfcl4", "water"], ["hfo2", "hcl"],
  -195, "Self-limiting binary half-reactions of HfCl4 and H2O vapor pulses depositing sub-nanometer HfO2 (k ~ 25) gate oxide.",
  "double_displacement", [{ type: "temperature_increase", description: "Layer-by-layer atomic growth of amorphous high-k HfO2 film" }]);

add("semi-022-zro2-ald-zrcl4-ozone", "Ozone-based atomic layer deposition of zirconium dioxide (ZrO2)",
  ["zrcl4", "o3"], ["zro2", "cl2", "o2"],
  -260, "Ozone ALD of tetragonal ZrO2 in deep DRAM storage capacitors providing high dielectric constant without residual hydrogen.",
  "redox_other", [{ type: "temperature_increase", description: "Layer-by-layer growth of high-capacitance ZrO2 dielectric with chlorine release" }]);

add("semi-023-tio2-ald-ticl4-ozone", "Ozone atomic layer deposition of titanium dioxide (TiO2)",
  ["ticl4", "o3"], ["tio2", "cl2", "o2"],
  -220, "Ozone ALD of high-permittivity rutile TiO2 thin films for MIM capacitors and work-function tuning.",
  "redox_other", [{ type: "temperature_increase", description: "Atomic layer growth of high-k TiO2 dielectric thin film" }]);

add("semi-024-ttip-tio2-thermal-cvd", "Titanium tetraisopropoxide (TTIP) pyrolytic CVD of titanium dioxide",
  ["ttip"], ["tio2", "c3h6", "water"],
  115, "Metalorganic chemical vapor deposition of conformal optical and dielectric TiO2 films at 350-450 °C releasing propene.",
  "decomposition", [{ type: "temperature_increase", description: "Endothermic precursor pyrolysis depositing refractive TiO2 coating" }]);

add("semi-025-tma-pyrolysis-aluminum-metal", "Trimethylaluminum (TMA) pyrolytic CVD of metallic aluminum interconnects",
  ["al-ch3-3"], ["al", "c2h6"],
  140, "Thermal pyrolysis of TMA at 300-400 °C depositing pure metallic aluminum for interconnect vias and contact plugs.",
  "decomposition", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#BDC3C7", description: "Thermal decomposition depositing mirror-bright metallic aluminum film" }]);

add("semi-026-tma-ozone-al2o3-ald", "Trimethylaluminum ozone ALD for hydrogen-free alumina dielectric barriers",
  ["al-ch3-3", "o3"], ["al2o3", "co2", "water"],
  -1850, "Ozone-based ALD of Al2O3 eliminating OH trapping defects in flash memory charge trap layers and OLED encapsulation.",
  "redox_other", [{ type: "temperature_increase", description: "Vigorous surface oxidation depositing dense Al2O3 dielectric" }]);

add("semi-027-ta2o5-ald-tacl5-water", "Tantalum pentachloride ALD of tantalum pentoxide high-k capacitor dielectric",
  ["tacl5", "water"], ["ta2o5", "hcl"],
  -310, "Surface saturated ALD reaction depositing conformal Ta2O5 dielectric films (k ~ 25) with low leakage current.",
  "double_displacement", [{ type: "temperature_increase", description: "Atomic layer growth of amorphous Ta2O5 capacitor dielectric" }]);

add("semi-028-tin-cvd-ticl4-nitrogen-hydrogen", "Titanium nitride (TiN) metal gate CVD from TiCl4, N2, and H2",
  ["ticl4", "n2", "h2"], ["tin", "hcl"],
  -360, "High-temperature reduction CVD producing golden-yellow refractory TiN barrier layers against copper and tungsten diffusion.",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#F4D03F", description: "Deposition of brilliant metallic golden-yellow TiN diffusion barrier" }]);

add("semi-029-tan-ald-tacl5-ammonia", "Tantalum nitride (TaN) ALD copper diffusion barrier from TaCl5 and ammonia",
  ["tacl5", "ammonia"], ["tan", "n2", "hcl"],
  -380, "Atomic layer deposition of ultra-thin, highly conformal TaN barriers preventing copper electromigration in dual-damascene vias.",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#7F8C8D", description: "Atomic deposition of dense metallic tantalum nitride barrier layer" }]);

add("semi-030-tungsten-disilane-reduction", "Tungsten contact plug CVD via disilane reduction of WF6",
  ["wf6", "si2h6"], ["w", "sif4", "h2"],
  -890, "Disilane reduction of WF6 providing high-speed vertical plug fill without encroaching or etching underlying gate oxide.",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#566573", description: "Dense tungsten metal completely fills high-aspect-ratio vertical contact vias" }]);

add("semi-031-tungsten-zinc-reduction", "Tungsten hexafluoride metallothermic reduction by zinc vapor",
  ["wf6", "zn"], ["w", "znf2"],
  -620, "Metallothermic reduction depositing high-purity refractory tungsten powder and films with volatile zinc fluoride byproduct.",
  "single_displacement", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#566573", description: "Rapid metal vapor reduction depositing dense refractory tungsten metal" }]);

add("semi-032-wsi2-trisilane-polycide", "Tungsten disilicide (WSi2) polycide deposition from WF6 and trisilane",
  ["wf6", "si3h8"], ["wsi2", "sif4", "hf"],
  -1240, "Low-temperature CVD synthesis of low-resistivity refractory tungsten disilicide polycide over polysilicon gate lines.",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#34495E", description: "Formation of low-resistivity metallic tungsten silicide film" }]);

add("semi-033-cobalt-cvd-dicobalt-octacarbonyl", "Cobalt metal barrier and capping layer CVD from dicobalt octacarbonyl",
  ["co2-co-8"], ["cobalt-metal", "co"],
  145, "Low-temperature thermal CVD of cobalt metal capping layers suppressing copper surface electromigration in sub-10nm interconnects.",
  "decomposition", [{ type: "color_change", colorFrom: "#E74C3C", colorTo: "#5D6D7E", description: "Sublimed precursor decomposes depositing silvery metallic cobalt barrier" }]);

add("semi-034-copper-chloride-zinc-reduction", "Cuprous chloride vapor reduction by zinc for copper metallization seed",
  ["cucl", "zn"], ["cu", "zncl2"],
  -110, "Metallothermic reduction of cuprous chloride vapor depositing continuous, highly conductive copper seed layers.",
  "single_displacement", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#BA4A00", description: "Reduction deposits brilliant reddish-metallic copper film" }]);

add("semi-035-bn-ald-bcl3-ammonia", "Atomic layer deposition of hexagonal boron nitride from BCl3 and ammonia",
  ["bcl3", "ammonia"], ["bn", "hcl"],
  -290, "Cyclic ALD synthesis of atomically thin, wide-bandgap (5.9 eV) hexagonal boron nitride (h-BN) 2D dielectric layers.",
  "double_displacement", [{ type: "temperature_increase", description: "Layer-by-layer growth of atomically flat dielectric h-BN film" }]);

add("semi-036-aln-piezo-ald-tma-ammonia", "Aluminum nitride (AlN) piezoelectric thin-film ALD from TMA and ammonia",
  ["al-ch3-3", "ammonia"], ["aln", "ch4"],
  -320, "Atomic layer deposition of highly oriented c-axis AlN thin films for 5G bulk acoustic wave (BAW) RF resonator filters.",
  "double_displacement", [{ type: "temperature_increase", description: "Deposition of transparent, highly piezoelectric AlN ceramic layer" }]);

add("semi-037-gan-hvpe-gacl3-ammonia", "Gallium nitride (GaN) HVPE epitaxy from gallium trichloride and ammonia",
  ["gacl3", "ammonia"], ["gan", "hcl"],
  -310, "Hydride vapor phase epitaxy (HVPE) rapid growth of thick, free-standing GaN power substrate wafers.",
  "double_displacement", [{ type: "temperature_increase", description: "High-rate epitaxial deposition of crystalline GaN wide-bandgap semiconductor" }]);

add("semi-038-inp-hvpe-incl3-phosphine", "Indium phosphide (InP) HVPE epitaxy from indium trichloride and phosphine",
  ["incl3", "ph3"], ["inp", "hcl"],
  -295, "Hydride vapor phase epitaxy of indium phosphide wafers for telecom laser diodes and photonic integrated circuits.",
  "double_displacement", [{ type: "temperature_increase", description: "Epitaxial deposition of mirror-smooth optoelectronic InP layer" }]);

add("semi-039-gaas-hvpe-gacl3-arsine", "Gallium arsenide (GaAs) HVPE epitaxy from gallium trichloride and arsine",
  ["gacl3", "ash3"], ["gaas", "hcl"],
  -330, "Vapor phase epitaxial synthesis of high-purity GaAs single-crystal wafers for high-efficiency multi-junction solar cells.",
  "double_displacement", [{ type: "temperature_increase", description: "Epitaxial growth of compound semiconductor GaAs single-crystal film" }]);

add("semi-040-molybdenum-cvd-mocl5-hydrogen", "Molybdenum interconnect gate CVD via hydrogen reduction of MoCl5",
  ["mocl5", "h2"], ["mo", "hcl"],
  -115, "CVD of low-resistivity, high-work-function refractory molybdenum wordlines for 3D NAND flash memory arrays.",
  "single_displacement", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#34495E", description: "Deposition of dense, silvery metallic molybdenum conductor" }]);

// =========================================================================
// 3. Wet Chemical Etching, BOE & Surface Cleaning (041-060)
// =========================================================================

add("semi-041-piranha-caros-acid-generation", "Piranha solution generation of peroxymonosulfuric acid (Caro's acid)",
  ["h2so4", "h2o2"], ["h2so5", "water"],
  -82, "Mixing 3:1 concentrated sulfuric acid and 30% hydrogen peroxide creating aggressive Caro's acid for wafer organic stripping.",
  "synthesis", [{ type: "temperature_increase", description: "Violent exotherm heating solution above 120 °C" }]);

add("semi-042-piranha-photoresist-strip", "Piranha solution oxidative mineralization of organic photoresist carbon",
  ["c", "h2so5"], ["co2", "h2so4"],
  -520, "Complete wet chemical oxidation of baked cross-linked polymer photoresist residues into gaseous carbon dioxide.",
  "redox_other", [{ type: "gas_evolution", description: "Vigorous effervescence of carbon dioxide as photoresist dissolves" }]);

add("semi-043-sio2-nh4f-etching", "Ammonium fluoride aqueous etching of silicon dioxide",
  ["sio2", "nh4f"], ["nh42sif6", "ammonia", "water"],
  -95, "Alkaline-buffered fluoride dissolution of silicon dioxide minimizing metallic ion contamination and gate undercutting.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Controlled dissolution of silicon dioxide into soluble fluorosilicate" }]);

add("semi-044-sio2-buffered-fluoride-etch", "Buffered oxide etching of thermal silicon dioxide",
  ["sio2", "hf", "nh4f"], ["nh42sif6", "water"],
  -160, "Equilibrated buffered oxide etching providing highly stable and reproducible SiO2 pattern etching.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Smooth, residue-free dissolution of silicon dioxide" }]);

add("semi-045-boe-buffer-equilibrium", "Buffered Oxide Etch (BOE) ammonium bifluoride formation",
  ["nh4f", "hf"], ["nh4hf2"],
  -24, "Buffering HF with ammonium fluoride maintaining a constant HF2- ion activity and uniform SiO2 etch rate across wafer batches.",
  "synthesis", [{ type: "temperature_increase", description: "Mild buffering neutralization" }]);

add("semi-046-boe-sio2-dissolution", "Buffered Oxide Etch (BOE) dissolution of SiO2 forming ammonium fluorosilicate",
  ["sio2", "nh4hf2"], ["nh42sif6", "nh4f", "water"],
  -128, "Isotropic oxide wet etching without attacking photoresist adhesion or inducing mask undercutting.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Smooth, residue-free dissolution of silicon dioxide" }]);

add("semi-047-silicon-nitride-hot-phosphoric-strip", "Hot phosphoric acid selective wet etching of silicon nitride",
  ["si3n4", "h3po4", "water"], ["sio2", "monoammonium_phosphate"],
  -340, "Refluxing 85% H3PO4 at 160 °C selectively stripping Si3N4 masks with high selectivity (>50:1) over underlying SiO2 pad oxide.",
  "redox_other", [{ type: "temperature_increase", description: "Selective chemical stripping converting silicon nitride into soluble phosphate" }]);

add("semi-048-anisotropic-silicon-etch-csoh", "Anisotropic crystallographic etching of Si(100) by cesium hydroxide",
  ["si", "csoh", "water"], ["cs2sio3", "h2"],
  -355, "Cesium hydroxide crystallographic wet etching creating precise MEMS microstructures with smooth sidewall morphology.",
  "redox_other", [{ type: "gas_evolution", description: "Steady bubbling of hydrogen gas from etching silicon surfaces" }]);

add("semi-049-anisotropic-silicon-etch-tmah", "Metal-ion-free anisotropic etching of silicon by TMAH",
  ["si", "tmah", "water"], ["tmah_silicate", "h2"],
  -310, "CMOS-compatible anisotropic etching of silicon MEMS cantilevers without mobile alkali ion (Na+/K+) contamination.",
  "redox_other", [{ type: "gas_evolution", description: "Vigorous hydrogen gas bubbling forming crystallographic inverted pyramids" }]);

add("semi-050-hna-isotropic-silicon-oxidation", "HNA wet chemical isotropic etching of silicon: nitric acid oxidation",
  ["si", "hno3"], ["sio2", "no2", "water"],
  -380, "First step of isotropic silicon etching: nitric acid oxidizes silicon surface to silicon dioxide while releasing NO2.",
  "redox_other", [{ type: "gas_evolution", description: "Evolution of reddish-brown nitrogen dioxide gas fumes" }]);

add("semi-051-titanium-wet-etch-piranha", "Titanium metal barrier wet etching in dilute piranha solution",
  ["ti", "h2so4", "h2o2"], ["tiso4", "water"],
  -410, "Rapid oxidation and complexation of residual titanium barrier metal without etching underlying dielectric trenches.",
  "redox_other", [{ type: "color_change", colorFrom: "#5D6D7E", colorTo: "#EAEDED", description: "Metallic titanium dissolves into clear solution" }]);

add("semi-052-aluminum-nitric-etch", "Aluminum pattern etching in electronic-grade nitric acid",
  ["al", "hno3"], ["al-no3-3", "no2", "water"],
  -790, "Controlled wet chemical etching and stripping of aluminum bonding pads releasing nitrogen dioxide fumes.",
  "redox_other", [{ type: "gas_evolution", description: "Dissolution of aluminum metal with brown NO2 fuming" }]);

add("semi-053-tungsten-cmp-peroxide-oxidation", "Tungsten chemical mechanical planarization (CMP): surface oxidation by peroxide",
  ["w", "h2o2"], ["wo3", "water"],
  -510, "Chemical component of tungsten CMP: acidic slurry containing H2O2 oxidizes metal plug surface to brittle WO3.",
  "redox_other", [{ type: "color_change", colorFrom: "#566573", colorTo: "#D4AC0D", description: "Silvery tungsten surface passivates with yellow tungsten trioxide layer" }]);

add("semi-054-tungsten-oxide-cmp-dissolution", "Alkaline slurry chemical dissolution of tungsten trioxide in CMP polishing",
  ["wo3", "koh"], ["k2wo4", "water"],
  -88, "Rapid dissolution of mechanically abraded WO3 surface into soluble potassium tungstate preventing wafer defects.",
  "acid_base", [{ type: "color_change", colorFrom: "#D4AC0D", colorTo: "#EAEDED", description: "Yellow tungsten oxide dissolves into clear soluble tungstate" }]);

add("semi-055-copper-cmp-peroxide-oxidation", "Copper interconnect CMP chemical oxidation by hydrogen peroxide",
  ["cu", "h2o2"], ["cuo", "water"],
  -195, "Chemical passivation forming cupric oxide film on high-topography copper lines before mechanical polishing.",
  "redox_other", [{ type: "color_change", colorFrom: "#BA4A00", colorTo: "#2C3E50", description: "Reddish copper metal oxidizes to black cupric oxide surface skin" }]);

add("semi-056-copper-cmp-glycine-dissolution", "Copper CMP complexation and dissolution of copper oxide by glycine",
  ["cuo", "glycine"], ["c4h8cun2o4", "water"],
  -82, "Chelating agent in CMP slurry converting abraded copper oxide into soluble deep blue copper bis-glycinate complex.",
  "synthesis", [{ type: "color_change", colorFrom: "#2C3E50", colorTo: "#1B4F72", description: "Black copper oxide skin dissolves into deep blue soluble chelate" }]);

add("semi-057-rca-sc1-methanol-oxidation", "RCA Standard Clean 1 (SC-1) peroxide oxidation of solvent residues",
  ["ch3oh", "h2o2"], ["co2", "water"],
  -590, "Alkaline peroxide clean destroying trace solvent and organic alcohol contaminants from wafer surfaces.",
  "combustion", [{ type: "gas_evolution", description: "Effervescence of carbon dioxide as organic alcohol residue is mineralized" }]);

add("semi-058-rca-sc2-metallic-iron-stripping", "RCA Standard Clean 2 (SC-2) hydrochloric acid stripping of trace iron contamination",
  ["fe", "h2o2", "hcl"], ["fecl3", "water"],
  -590, "Acidic peroxide clean (HCl + H2O2 + H2O at 75 °C) solubilizing alkali and transition metal contaminants as stable chlorides.",
  "redox_other", [{ type: "color_change", colorFrom: "#5D6D7E", colorTo: "#F4D03F", description: "Dissolution of trace metallic iron into soluble ferric chloride" }]);

add("semi-059-csoh-silicon-dioxide-dissolution", "Cesium hydroxide chemical dissolution of silicon dioxide",
  ["sio2", "csoh"], ["cs2sio3", "water"],
  -160, "Alkaline dissolution of thermal silicon dioxide in cesium hydroxide forming soluble cesium metasilicate.",
  "double_displacement", [{ type: "color_change", colorFrom: "#FFFFFF", colorTo: "#FFFFFF", description: "Smooth dissolution of sacrificial silicon dioxide dielectric" }]);

add("semi-060-silicon-peroxide-hf-etching", "Metal-assisted chemical etching (MacEtch) of silicon in HF/H2O2",
  ["si", "hf", "h2o2"], ["h2sif6", "water"],
  -840, "Catalytic etching beneath noble metal nanoparticles creating ultra-high-aspect-ratio vertical silicon nanowire arrays.",
  "redox_other", [{ type: "temperature_increase", description: "High-aspect-ratio vertical porous silicon nanostructure formation" }]);

// =========================================================================
// 4. Dry Plasma Etching & Reactive Ion Etching (RIE) (061-080)
// =========================================================================

add("semi-061-ti-xef2-dry-etch", "Titanium liner chemical dry etching by xenon difluoride vapor",
  ["ti", "xef2"], ["tif4", "xe"],
  -920, "Spontaneous gas-phase etching of titanium barrier and adhesion layers in XeF2 without plasma damage.",
  "single_displacement", [{ type: "gas_evolution", description: "Spontaneous chemical vapor gasification of titanium into TiF4 and xenon gas" }]);

add("semi-062-silicon-bcl3-plasma-etching", "Silicon reactive ion etching in pure boron trichloride plasma",
  ["si", "bcl3"], ["sicl4", "b"],
  -380, "Anisotropic plasma etching of silicon trenches using boron trichloride producing volatile silicon tetrachloride and boron.",
  "single_displacement", [{ type: "temperature_increase", description: "Directional etching of silicon trenches with volatile SiCl4 exhaust" }]);

add("semi-063-silicon-bromine-high-selectivity-rie", "Silicon deep trench RIE in bromine plasma for extreme gate oxide selectivity",
  ["si", "br2"], ["sibr4"],
  -460, "HBr/Br2 plasma etching providing silicon-to-oxide selectivity >150:1 due to zero spontaneous chemical etching without ion bombardment.",
  "synthesis", [{ type: "temperature_increase", description: "Vertical anisotropic silicon etching with desorbing SiBr4 gas" }]);

add("semi-064-sio2-cf4-plasma-etching", "Silicon dioxide plasma reactive ion etching in carbon tetrafluoride (CF4)",
  ["sio2", "cf4"], ["sif4", "co2"],
  -240, "RF plasma breakdown of CF4 creating CF3+ ions and F radicals that volatilize SiO2 as SiF4 and CO2.",
  "double_displacement", [{ type: "gas_evolution", description: "Plasma gasification of dielectric oxide into volatile SiF4 and CO2" }]);

add("semi-065-sio2-chf3-selective-rie", "Selective oxide reactive ion etching over silicon in trifluoromethane (CHF3)",
  ["sio2", "chf3"], ["sif4", "co", "water"],
  -310, "High C:F ratio promotes fluorocarbon polymer passivation on bare silicon while ion bombardment continues etching oxide.",
  "double_displacement", [{ type: "temperature_increase", description: "Directional oxide contact hole etching with selective polymer sidewall protection" }]);

add("semi-066-si3n4-sf6-plasma-etching", "Silicon nitride plasma dry etching in sulfur hexafluoride (SF6)",
  ["si3n4", "sf6"], ["sif4", "sf4", "n2"],
  -820, "Fast, high-selectivity plasma etching of silicon nitride films in SF6/O2 discharge producing volatile SiF4 and SF4 gases.",
  "redox_other", [{ type: "gas_evolution", description: "Rapid dry stripping of silicon nitride dielectric in glowing RF plasma" }]);

add("semi-067-tungsten-sf6-plasma-etch", "Tungsten metal contact plug dry etching in sulfur hexafluoride plasma",
  ["w", "sf6"], ["wf6", "s"],
  -490, "Reactive ion etchback of overburden tungsten metal following via hole filling, desorbing volatile WF6 gas.",
  "single_displacement", [{ type: "gas_evolution", description: "Etchback clearing tungsten overburden into volatile WF6 gas" }]);

add("semi-068-tungsten-xef2-chemical-dry-etch", "Tungsten chemical dry etching in xenon difluoride vapor",
  ["w", "xef2"], ["wf6", "xe"],
  -1410, "Spontaneous gas-phase isotropic etching of tungsten sacrificial layers during MEMS release processing.",
  "single_displacement", [{ type: "gas_evolution", description: "Rapid spontaneous dry gasification of tungsten metal into WF6 and xenon gas" }]);

add("semi-069-tin-bcl3-cl2-metal-gate-rie", "Titanium nitride (TiN) gate RIE in BCl3 and chlorine plasma",
  ["tin", "bcl3", "cl2"], ["ticl4", "bn"],
  -460, "Anisotropic pattern etching of TiN metal gates with in situ boron nitride sidewall passivation.",
  "double_displacement", [{ type: "temperature_increase", description: "Anisotropic pattern etching of work-function metal gate lines" }]);

add("semi-070-ti-bcl3-plasma-etch", "Titanium adhesion layer dry etching in boron trichloride plasma",
  ["ti", "bcl3"], ["ticl4", "b"],
  -240, "BCl3 plasma scavenges moisture and attacks titanium liner films forming volatile TiCl4 at low wafer temperatures.",
  "single_displacement", [{ type: "temperature_increase", description: "Plasma removal of titanium liner metallization" }]);

add("semi-071-al2o3-bcl3-native-oxide-breakthrough", "Native alumina breakthrough on aluminum interconnects in BCl3 plasma",
  ["al2o3", "bcl3"], ["alcl3", "b2o3"],
  -190, "Essential initiation step in aluminum RIE: BCl3 reduces tough native Al2O3 skin before chlorine plasma can etch underlying aluminum.",
  "double_displacement", [{ type: "temperature_increase", description: "Breakthrough of passivation oxide allowing rapid metal etching" }]);

add("semi-072-aluminum-hf-vapor-cleaning", "Hydrofluoric acid cleaning of aluminum metallization forming passivating AlF3",
  ["al", "hf"], ["alf3", "h2"],
  -690, "Controlled etching and self-limiting passivation of aluminum interconnects in anhydrous HF vapor forming protective AlF3 skin.",
  "single_displacement", [{ type: "gas_evolution", description: "Evolution of hydrogen gas as aluminum surface forms thin protective AlF3 passivation" }]);

add("semi-073-c4f8-plasma-polymer-deposition", "Octafluorocyclobutane plasma dissociation in Bosch DRIE process",
  ["c4f8"], ["cf4", "c"],
  110, "Plasma dissociation of C4F8 depositing protective Teflon-like fluorocarbon (CF2)n polymer on silicon trench sidewalls.",
  "decomposition", [{ type: "temperature_increase", description: "Deposition of protective fluoropolymer passivation skin in DRIE cycle" }]);

add("semi-074-ozone-plasma-photoresist-ashing", "Ozone plasma photoresist ashing and stripping",
  ["c", "o3"], ["co2"],
  -620, "Downstream atomic oxygen and ozone plasma stripping baked ion-implanted photoresist masks without substrate damage.",
  "combustion", [{ type: "gas_evolution", description: "Clean dry mineralization of photoresist carbon into carbon dioxide" }]);

add("semi-075-gaas-chlorine-plasma-etching", "Gallium arsenide compound semiconductor mesa etching in chlorine plasma",
  ["gaas", "cl2"], ["gacl3", "as"],
  -310, "High-density plasma etching of GaAs laser facets and HEMT mesas with volatile GaCl3 desorbing above 100 °C.",
  "single_displacement", [{ type: "temperature_increase", description: "Directional etching of smooth vertical GaAs semiconductor facets" }]);

add("semi-076-inp-chlorine-plasma-etching", "Indium phosphide dry etching in high-temperature chlorine plasma",
  ["inp", "cl2"], ["incl3", "pcl3"],
  -440, "Substrate heated to 200 °C to desorb low-volatility InCl3 etch product for smooth vertical waveguide sidewalls.",
  "double_displacement", [{ type: "temperature_increase", description: "Elevated temperature plasma etching of InP optical waveguides" }]);

add("semi-077-molybdenum-cf4-o2-rie", "Molybdenum plasma reactive ion etching in CF4 and oxygen mixture",
  ["mo", "cf4", "o2"], ["mof6", "co2"],
  -680, "Dry pattern definition of molybdenum metal wordlines in 3D NAND flash memory chips.",
  "redox_other", [{ type: "gas_evolution", description: "Volatilization of metallic molybdenum into MoF6 and CO2 gases" }]);

add("semi-078-tantalum-sf6-plasma-etch", "Tantalum capacitor plate and barrier dry etching in SF6 plasma",
  ["ta", "sf6"], ["taf5", "s"],
  -580, "Plasma pattern transfer into tantalum metal layers releasing volatile tantalum pentafluoride.",
  "single_displacement", [{ type: "gas_evolution", description: "Anisotropic etching of tantalum film into desorbing TaF5 vapor" }]);

add("semi-079-silicon-hbr-oxygen-trench-etching", "Polysilicon gate deep trench etching in HBr and oxygen plasma",
  ["si", "hbr", "o2"], ["sibr4", "sio2", "water"],
  -710, "Simultaneous trench etching and in situ SiOxBr-y sidewall passivation providing perfectly vertical 90° gate profiles.",
  "redox_other", [{ type: "temperature_increase", description: "Vertical gate profile etching with in situ oxide passivation" }]);

add("semi-080-sicl4-methane-sic-plasma", "Silicon tetrachloride and methane plasma synthesis of silicon carbide passivation",
  ["sicl4", "ch4"], ["sic", "hcl"],
  -140, "Plasma-enhanced CVD from STC and methane depositing hermetic SiC barrier coatings on microelectronic assemblies.",
  "double_displacement", [{ type: "temperature_increase", description: "Plasma deposition of durable silicon carbide protective thin film" }]);

// =========================================================================
// 5. Thermal Oxidation, Doping, Silicidation & Packaging (081-100)
// =========================================================================

add("semi-081-n2o-rapid-thermal-oxidation", "Nitrous oxide rapid thermal oxidation (RTO) of silicon for oxynitride dielectrics",
  ["si", "n2o"], ["sio2", "n2"],
  -680, "RTO in N2O incorporating nitrogen at the Si/SiO2 interface to block boron dopant penetration from p+ gates.",
  "redox_other", [{ type: "temperature_increase", description: "High-temperature growth of nitrogen-passivated gate oxynitride dielectric" }]);

add("semi-082-hcl-chlorinated-dry-oxidation", "Chlorine-enhanced thermal oxidation of silicon with HCl addition",
  ["si", "o2", "hcl"], ["sio2", "cl2", "water"],
  -890, "Adding 1-3% HCl during dry oxidation passivates mobile sodium ions and reduces interface state density.",
  "redox_other", [{ type: "temperature_increase", description: "Thermal oxidation with in situ mobile ion getter cleaning" }]);

add("semi-083-ozone-low-temp-silicon-oxidation", "Ozone-assisted low-temperature thermal oxidation of silicon",
  ["si", "o3"], ["sio2", "o2"],
  -740, "Ozone oxidation producing ultra-thin, low-defect gate oxides at 400-600 °C for low-thermal-budget 3D monolithic integration.",
  "redox_other", [{ type: "temperature_increase", description: "Low-temperature thermal growth of high-purity silicon dioxide" }]);

add("semi-084-bbr3-p-type-predeposition", "Boron tribromide (BBr3) p-type dopant predeposition oxidation",
  ["bbr3", "o2"], ["b2o3", "br2"],
  -520, "Liquid bubbler source vaporizes BBr3 which oxidizes on silicon wafers forming a borosilicate glass (BSG) dopant source.",
  "double_displacement", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#BA4A00", description: "Deposition of glassy BSG film with release of red-brown bromine vapor" }]);

add("semi-085-boron-oxide-silicon-drive-in", "Boron drive-in diffusion from borosilicate glass into silicon lattice",
  ["b2o3", "si"], ["b", "sio2"],
  -180, "High-temperature (1050 °C) diffusion anneal where B2O3 reacts with silicon, releasing elemental boron into lattice substitution sites.",
  "single_displacement", [{ type: "temperature_increase", description: "Dopant diffusion into silicon forming shallow p-type junctions" }]);

add("semi-086-pocl3-cao-scrubber-abatement", "Phosphorus oxychloride scrubber abatement by calcium oxide",
  ["pocl3", "cao"], ["ca3po42", "cacl2"],
  -1150, "Dry scrubber canister packed with calcium oxide pellets neutralizing toxic POCl3 doping effluent into inert calcium phosphate.",
  "double_displacement", [{ type: "temperature_increase", description: "Exothermic dry chemisorption trapping toxic phosphorus oxychloride effluent" }]);

add("semi-087-phosphorus-pentoxide-silicon-drive-in", "Phosphorus drive-in diffusion from phosphosilicate glass into silicon",
  ["p4o10", "si"], ["p", "sio2"],
  -440, "High-temperature solid-state diffusion reducing P4O10 to dope silicon n-type for emitter and source/drain junctions.",
  "single_displacement", [{ type: "temperature_increase", description: "Solid-state diffusion forming n+ deep well and emitter junctions" }]);

add("semi-088-arsenic-trioxide-buried-layer-diffusion", "Arsenic trioxide predeposition for n+ sub-collector buried layer diffusion",
  ["as2o3", "si"], ["as", "sio2"],
  -195, "Predeposition reduction forming heavily doped n+ buried layers in bipolar and BiCMOS technology with low auto-doping.",
  "single_displacement", [{ type: "temperature_increase", description: "Solid-state diffusion of arsenic dopants into silicon lattice" }]);

add("semi-089-antimony-trioxide-buried-layer-diffusion", "Antimony trioxide thermal reduction for low-diffusion sub-collector junctions",
  ["sb2o3", "si"], ["sb", "sio2"],
  -160, "Antimony doping provides minimal outward diffusion during subsequent epitaxial growth due to very low diffusion coefficient.",
  "single_displacement", [{ type: "temperature_increase", description: "Diffusion creating sharp n+ buried layer boundaries" }]);

add("semi-090-titanium-salicide-formation", "Titanium self-aligned silicidation (salicide) forming low-resistivity TiSi2",
  ["ti", "si"], ["tisi2"],
  -134, "Thermal reaction of sputtered titanium with source/drain and poly-gate silicon forming C54-TiSi2 contacts (15 micro-ohm cm).",
  "synthesis", [{ type: "color_change", colorFrom: "#5D6D7E", colorTo: "#34495E", description: "Formation of low-resistivity metallic titanium silicide contact" }]);

add("semi-091-cobalt-monosilicide-phase1", "Cobalt silicidation phase 1: formation of cobalt monosilicide (CoSi)",
  ["cobalt-metal", "si"], ["cosi"],
  -100, "First rapid thermal anneal (RTA 1 at 450-550 °C) forming high-resistivity CoSi phase without bridging spacers.",
  "synthesis", [{ type: "temperature_increase", description: "Solid-state reaction forming intermediate monosilicide phase" }]);

add("semi-092-cobalt-disilicide-phase2", "Cobalt salicide phase 2: transformation to low-resistivity CoSi2",
  ["cosi", "si"], ["cosi2"],
  -82, "Second rapid thermal anneal (RTA 2 at 750-850 °C) converting CoSi to low-resistivity fluorite CoSi2 (14-18 micro-ohm cm).",
  "synthesis", [{ type: "temperature_increase", description: "Phase transformation yielding low-resistance cubic cobalt disilicide" }]);

add("semi-093-nickel-salicide-nisi-formation", "Nickel salicide (NiSi) formation for advanced node CMOS source/drain contacts",
  ["ni", "si"], ["nisi"],
  -86, "Single low-temperature anneal (400 °C) forming NiSi: minimal silicon consumption, no narrow-line degradation down to sub-10nm.",
  "synthesis", [{ type: "temperature_increase", description: "Low-temperature silicidation forming ultra-shallow contact silicide" }]);

add("semi-094-platinum-silicidation-phase1", "Platinum silicide phase 1: formation of diplatinum silicide (Pt2Si)",
  ["pt", "si"], ["pt2si"],
  -105, "Low-temperature (200-300 °C) annealing of platinum thin film on silicon initiating silicide formation.",
  "synthesis", [{ type: "temperature_increase", description: "Solid-state diffusion forming initial Pt2Si phase" }]);

add("semi-095-platinum-silicide-schottky-barrier", "Platinum monosilicide (PtSi) formation for infrared detectors and Schottky diodes",
  ["pt2si", "si"], ["ptsi"],
  -67, "High-temperature anneal (400-500 °C) yielding stable PtSi Schottky contacts with high barrier height (0.85 eV) on n-Si.",
  "synthesis", [{ type: "temperature_increase", description: "Formation of high-barrier Schottky silicide contact" }]);

add("semi-096-gold-aluminum-intermetallic-au2al", "Gold-aluminum wire bond intermetallic diffusion: Au2Al phase formation",
  ["au", "al"], ["au2al"],
  -82, "Interdiffusion at thermosonic gold ball wire bond interfaces with aluminum bond pads at 200 °C.",
  "synthesis", [{ type: "temperature_increase", description: "Solid-state intermetallic growth at wire bond interface" }]);

add("semi-097-purple-plague-aual2-formation", "Purple plague (AuAl2) catastrophic brittle intermetallic failure",
  ["au2al", "al"], ["aual2"],
  -78, "Formation of highly brittle, vibrant purple AuAl2 accompanied by Kirkendall microvoiding causing wire bond detachment.",
  "synthesis", [{ type: "color_change", colorFrom: "#D4AC0D", colorTo: "#7D3C98", description: "Formation of notorious vibrant purple, brittle intermetallic plague" }]);

add("semi-098-copper-wire-bonding-ammonia-reduction", "Ammonia reducing atmosphere reduction of copper oxide for wire bonding",
  ["cuo", "ammonia"], ["cu", "n2", "water"],
  -280, "Reduction of surface copper oxide in ammonia forming gas ensuring clean, defect-free thermosonic copper ball bonds.",
  "redox_other", [{ type: "color_change", colorFrom: "#2C3E50", colorTo: "#BA4A00", description: "Reduction of oxidized surface skin restoring bright metallic copper" }]);

add("semi-099-solder-reflow-ammonia-reduction", "Ammonia gas reduction of tin oxide in fluxless flip-chip solder reflow",
  ["sno2", "ammonia"], ["sn", "n2", "water"],
  -260, "Reduction of surface tin oxide in reducing atmosphere enabling void-free wetting of SAC solder micro-bumps in 2.5D/3D packaging.",
  "redox_other", [{ type: "color_change", colorFrom: "#EAEDED", colorTo: "#BDC3C7", description: "Oxide clears allowing molten solder ball to reflow into perfect sphere" }]);

add("semi-100-iron-silicide-wafer-gettering", "Backside polysilicon gettering of fast-diffusing iron impurities into FeSi2",
  ["fe", "si"], ["fesi2"],
  -81, "Trapping of lethal transition metal impurities into backside polysilicon grain boundary sinks during thermal processing.",
  "synthesis", [{ type: "temperature_increase", description: "Precipitation of iron impurities as inactive iron disilicide gettering sites" }]);

console.log(`Domain 42 successfully constructed with ${reactions.length} reactions!`);

// Write domain42SemiconductorCVDMicroelectronics.ts
const outputPath = path.resolve(__dirname, "domain42SemiconductorCVDMicroelectronics.ts");
const code = `// Domain 42: Semiconductor CVD, ALD, Etch & Microelectronics (${reactions.length} reactions)
import type { ReactionDefinition } from "./types.js";

export const DOMAIN_42_REACTIONS: ReactionDefinition[] = ${JSON.stringify(reactions, null, 2)};
`;

fs.writeFileSync(outputPath, code, "utf8");
console.log(`✓ Wrote ${reactions.length} reactions to domain42SemiconductorCVDMicroelectronics.ts`);
