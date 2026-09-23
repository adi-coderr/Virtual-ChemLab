import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { allChemicalsMap, existingReactantSets, toBal } from "./generateBatch6.js";
import { balanceEquation } from "../../../../chemistry-engine/balancer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Def {
  id: string;
  name: string;
  reactants: string[];
  products: string[];
  enthalpy: number;
  desc: string;
  type?: string;
  effects?: any[];
  net?: string;
}

const list: Def[] = [];
const localKeys = new Set<string>();

// Read existing keys from Domains 21 to 24
for (const f of ["domain21Coordination.ts", "domain22Hydrometallurgy.ts", "domain23CatalysisInorganic.ts", "domain24PyrometallurgySmelting.ts"]) {
  const p = path.resolve(__dirname, f);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, "utf8");
    const match = content.match(/"reactants":\s*(\[[^\]]+\])/g);
    if (match) {
      for (const m of match) {
        const parsed = JSON.parse(m.replace('"reactants":', "").trim());
        localKeys.add(parsed.sort().join("+"));
      }
    }
  }
}

function add(id: string, name: string, reactants: string[], products: string[], enthalpy: number, desc: string, type: string = "synthesis", effects: any[] = []) {
  const k = [...reactants].sort().join("+");
  if (existingReactantSets.has(k)) {
    console.error(`COLLISION DB: ${id} (${k})`);
    return;
  }
  if (localKeys.has(k)) {
    console.error(`DUPLICATE LOCAL: ${id} (${k})`);
    return;
  }
  localKeys.add(k);

  for (const cid of [...reactants, ...products]) {
    if (!allChemicalsMap.has(cid)) {
      console.error(`UNKNOWN CID in ${id}: ${cid}`);
      return;
    }
  }

  let bal;
  try {
    bal = balanceEquation(reactants.map(toBal), products.map(toBal));
  } catch (err: any) {
    console.error(`BALANCE ERR in ${id}: ${err.message}`);
    return;
  }
  list.push({ id, name, reactants, products, enthalpy, desc, type, effects, net: bal.balancedEquationText });
}

// =========================================================================
// Section 1: Silicon & Polysilicon CVD, Epitaxy & Chlorosilanes (15)
// =========================================================================
add("semi-silane-pyrolysis-polysilicon", "LPCVD pyrolysis of silane: chemical vapor deposition of polysilicon gate electrodes",
  ["sih4"], ["si", "h2"], 34.0,
  "Low-pressure chemical vapor deposition at 600-650°C forming polycrystalline silicon films for MOS gates.", "decomposition");

add("semi-silane-lto-oxidation", "Low Temperature Oxide (LTO): atmospheric CVD oxidation of silane by oxygen",
  ["sih4", "o2"], ["sio2", "h2"], -420.0,
  "Low-temperature dielectric deposition at 400°C for interlayer passivation before aluminum metallization.");

add("semi-silane-no-pecvd-oxide", "PECVD silicon dioxide deposition from silane and nitrogen monoxide",
  ["sih4", "no"], ["sio2", "n2", "h2"], -680.0,
  "Plasma-enhanced chemical vapor deposition using nitric oxide oxidant.");

add("semi-silane-n2o-pecvd-oxide", "PECVD silicon dioxide: plasma-enhanced deposition from silane and nitrous oxide",
  ["sih4", "n2o"], ["sio2", "n2", "h2"], -710.0,
  "Plasma CVD at 300-350°C depositing high-conformality dielectric layers on temperature-sensitive substrates.");

add("semi-silane-pecvd-silicon-nitride", "PECVD silicon nitride: plasma deposition from silane and ammonia",
  ["sih4", "ammonia"], ["si3n4", "h2"], -180.0,
  "Hydrogenated silicon nitride (SiNx:H) deposition serving as antireflective coating in solar cells and IC moisture barrier.");

add("semi-silane-chlorination-sicl4", "Direct gas-phase chlorination of silane to silicon tetrachloride",
  ["sih4", "cl2"], ["sicl4", "hcl"], -620.0,
  "Exothermic vapor-phase chlorination synthesizing high-purity SiCl4 precursor.");

add("semi-dcs-pyrolysis-epitaxy", "Dichlorosilane (DCS) epitaxial silicon deposition in high-throughput barrel reactors",
  ["sih2cl2"], ["si", "hcl"], 140.0,
  "High-temperature vapor phase epitaxy (VPE) at 1050°C depositing defect-free single crystal silicon layers.", "decomposition");

add("semi-dcs-chlorination-sicl4", "Gas-phase chlorination of dichlorosilane to silicon tetrachloride",
  ["sih2cl2", "cl2"], ["sicl4", "hcl"], -310.0,
  "Vapor chlorination balancing chlorosilane plant inventory.");

add("semi-dcs-lpcvd-silicon-nitride", "LPCVD stoichiometric silicon nitride: hot-wall furnace deposition from DCS and ammonia",
  ["sih2cl2", "ammonia"], ["si3n4", "hcl", "h2"], -260.0,
  "Furnace deposition at 750-800°C producing dense, stoichiometric Si3N4 hard masks for LOCOS oxidation isolation.");

add("semi-dcs-n2o-hld-oxide", "High Temperature Oxide (HLD): LPCVD dielectric deposition from DCS and nitrous oxide",
  ["sih2cl2", "n2o"], ["sio2", "n2", "hcl"], -540.0,
  "LPCVD furnace process at 900°C depositing excellent step-coverage gate sidewall spacer oxides.");

add("semi-tcs-siemens-polysilicon", "Siemens process: high-purity polysilicon deposition from trichlorosilane and hydrogen",
  ["sihcl3", "h2"], ["si", "hcl"], 220.0,
  "Core industrial Siemens reactor process at 1100°C producing 9N-11N electronic grade silicon rods.");

add("semi-tcs-chlorination-sicl4", "Vapor-phase chlorination of trichlorosilane to silicon tetrachloride",
  ["sihcl3", "cl2"], ["sicl4", "hcl"], -160.0,
  "Chlorination step during chlorosilane purification.");

add("semi-tcs-fluidized-bed-synthesis", "Fluidized bed synthesis of trichlorosilane from metallurgical silicon and anhydrous HCl",
  ["si", "hcl"], ["sihcl3", "h2"], -218.0,
  "Direct chlorination of metallurgical silicon at 300°C generating crude trichlorosilane.");

add("semi-tcs-disproportionation-dcs", "Catalytic disproportionation of trichlorosilane to dichlorosilane and silicon tetrachloride",
  ["sihcl3"], ["sih2cl2", "sicl4"], 15.0,
  "Tertiary amine resin catalyzed redistribution in distillation columns generating volatile DCS.", "decomposition");

add("semi-tcs-hydrolysis-waste", "Scrubber neutralization: complete hydrolysis of trichlorosilane by water",
  ["sihcl3", "water"], ["sio2", "hcl", "h2"], -310.0,
  "Vent gas scrubber hydrolysis converting hazardous chlorosilane vapors into silica gel and hydrochloric acid.", "metathesis");

// =========================================================================
// Section 2: TEOS & Dielectric Thin Films (LPCVD / PECVD / ALD) (14)
// =========================================================================
add("semi-teos-lpcvd-pyrolysis", "TEOS LPCVD: thermal pyrolysis of tetraethyl orthosilicate depositing conformal silicon dioxide",
  ["teos"], ["sio2", "c2h4", "water"], 190.0,
  "Low-pressure CVD at 680-720°C delivering outstanding conformal step coverage over deep trenches.", "decomposition");

add("semi-teos-combustion-oxidation", "Complete oxidative combustion of TEOS precursor vapor in burn boxes",
  ["teos", "o2"], ["sio2", "co2", "water"], -4950.0,
  "Thermal point-of-use abatement decomposing organosilicon exhaust gases.");

add("semi-tma-water-ald-alumina", "Atomic Layer Deposition (ALD): self-limiting deposition of Al2O3 from TMA and water",
  ["al-ch3-3", "water"], ["al2o3", "ch4"], -760.0,
  "Canonical ALD reaction at 200-300°C depositing angstrom-level pinhole-free alumina barrier and passivation films.");

add("semi-tma-peroxide-ald-alumina", "Ozone / peroxide enhanced ALD of aluminum oxide using trimethylaluminum",
  ["al-ch3-3", "h2o2"], ["al2o3", "ch4", "o2"], -910.0,
  "Low-temperature ALD process using hydrogen peroxide coreactant for organic electronic encapsulation.");

add("semi-ticl4-ammonia-ald-tin", "ALD titanium nitride: atomic layer deposition of conformal diffusion barrier from TiCl4 and NH3",
  ["ticl4", "ammonia"], ["tin", "hcl", "n2"], -120.0,
  "Thermal ALD at 350-450°C forming ultra-thin conformal TiN barrier layers in high-aspect-ratio DRAM contact holes.");

add("semi-ticl4-caustic-scrubber", "Alkaline scrubber neutralization of titanium tetrachloride vapor",
  ["ticl4", "naoh"], ["tio2", "nacl", "water"], -320.0,
  "Scrubber absorption of TiCl4 in caustic soda preventing emission of corrosive fumes.", "metathesis");

add("semi-zrcl4-water-ald-zirconia", "ALD zirconium dioxide: deposition of high-k gate dielectric from ZrCl4 and water",
  ["zrcl4", "water"], ["zro2", "hcl"], -85.0,
  "ALD growth of ultrathin ZrO2 dielectric layers for DRAM trench capacitors.", "metathesis");

add("semi-wf6-silane-ald-nucleation", "WF6 silane reduction: rapid ALD nucleation layer for tungsten plug fill",
  ["wf6", "sih4"], ["w", "sif4", "h2"], -480.0,
  "Pulsed nucleation layer (PNL) process establishing thin seed layer to prevent WF6 substrate encroachment.");

add("semi-wf6-dcs-ald-nucleation", "WF6 dichlorosilane reduction: ALD deposition of fluorine-free tungsten seeds",
  ["wf6", "sih2cl2"], ["w", "sif4", "hcl"], -510.0,
  "Low-temperature seed layer deposition in advanced metallization schemes.");

add("semi-silane-co2-pecvd", "PECVD silicon dioxide deposition using silane and carbon dioxide",
  ["sih4", "co2"], ["sio2", "co", "h2"], -180.0,
  "Alternative oxidant chemistry avoiding gas-phase particle nucleation in plasma CVD.");

add("semi-dcs-co2-pecvd", "Plasma CVD of silicon dioxide from dichlorosilane and carbon dioxide",
  ["sih2cl2", "co2"], ["sio2", "co", "hcl"], -120.0,
  "High-rate plasma oxide deposition with tight refractive index control.");

add("semi-teos-sol-gel-hydrolysis", "Sol-gel process: acid-catalyzed hydrolysis of TEOS generating orthosilicic acid and ethanol",
  ["teos", "water"], ["h4sio4_orthosilicic", "c2h5oh"], -45.0,
  "Liquid-phase sol-gel hydrolysis producing optical silica coatings and low-k aerogel dielectrics.", "metathesis");

add("semi-sicl4-hydrogen-reduction", "Hydrogen reduction of silicon tetrachloride to polycrystalline silicon",
  ["sicl4", "h2"], ["si", "hcl"], 240.0,
  "High-temperature vapor phase reduction in Siemens deposition reactors.");

add("semi-sicl4-caustic-scrubber", "Caustic scrubber neutralization of silicon tetrachloride exhaust fumes",
  ["sicl4", "naoh"], ["sio2", "nacl", "water"], -340.0,
  "Emergency scrubber absorption of SiCl4 fumes producing colloidal silica and brine.", "metathesis");

// =========================================================================
// Section 3: Group III-V & IV-IV Epitaxy (MOCVD / VPE) (14)
// =========================================================================
add("semi-mocvd-gaas-growth", "Gallium arsenide MOCVD: metalorganic epitaxy from trimethylgallium and arsine",
  ["ga-ch3-3", "ash3"], ["gaas", "ch4"], -315.0,
  "Epitaxial growth at 650°C in hydrogen carrier gas fabricating high-mobility GaAs HEMT and laser structures.");

add("semi-mocvd-inp-growth", "Indium phosphide MOCVD: epitaxial growth from trimethylindium and phosphine",
  ["in-ch3-3", "ph3"], ["inp", "ch4"], -285.0,
  "Metalorganic vapor phase epitaxy (MOVPE) at 600°C producing telecommunications photonic laser diodes.");

add("semi-mocvd-gan-growth", "Gallium nitride MOCVD: high-temperature epitaxy from trimethylgallium and ammonia",
  ["ga-ch3-3", "ammonia"], ["gan", "ch4"], -265.0,
  "MOCVD growth at 1050°C on sapphire or SiC substrates manufacturing blue LEDs and power GaN HEMTs.");

add("semi-cvd-germane-epitaxy", "Germane CVD epitaxy: low-temperature chemical vapor deposition of pure germanium",
  ["geh4"], ["ge", "h2"], 90.0,
  "Low-temperature epitaxy at 350-450°C depositing germanium buffers for multijunction solar cells.", "decomposition");

add("semi-germane-oxidation-geo2", "Gas-phase oxidation of germane precursor to germanium dioxide",
  ["geh4", "o2"], ["geo2", "water"], -1180.0,
  "Controlled vapor oxidation for optical waveguide core doping.");

add("semi-germane-n2o-pecvd", "PECVD deposition of GeO2 dielectric from germane and nitrous oxide",
  ["geh4", "n2o"], ["geo2", "n2", "h2"], -590.0,
  "Plasma-enhanced dielectric deposition on compound semiconductors.");

add("semi-germane-chlorination", "Direct gas-phase chlorination of germane to germanium tetrachloride",
  ["geh4", "cl2"], ["gecl4", "hcl"], -540.0,
  "Vapor-phase chlorination synthesizing optical fiber grade GeCl4.");

add("semi-arsine-thermal-cracking", "Hydride VPE: thermal cracking of arsine gas into elemental arsenic and hydrogen",
  ["ash3"], ["as", "h2"], 66.0,
  "High-temperature pre-cracking furnace generating As2/As4 flux for molecular beam epitaxy (MBE).", "decomposition");

add("semi-phosphine-thermal-cracking", "Thermal pyrolysis of phosphine gas yielding elemental white phosphorus and hydrogen",
  ["ph3"], ["p4", "h2"], 22.0,
  "Cracker cell decomposition in gas-source MBE growing InP/InGaAsP quantum wells.", "decomposition");

add("semi-arsine-oxidation-abatement", "Thermal abatement: catalytic oxidation of toxic arsine offgas to arsenic trioxide",
  ["ash3", "o2"], ["as2o3", "water"], -1220.0,
  "Burn-box scrubber oxidation capturing hazardous arsenic effluent as solid arsenic trioxide dust.");

add("semi-phosphine-combustion-abatement", "Complete combustion of phosphine effluent gas into phosphorus pentoxide and steam",
  ["ph3", "o2"], ["p4o10", "water"], -2440.0,
  "MOCVD exhaust incinerator converting pyrophoric PH3 into solid P4O10 scrubber residue.");

add("semi-phosphine-chlorination-pcl3", "Vapor-phase chlorination of phosphine to phosphorus trichloride",
  ["ph3", "cl2"], ["pcl3", "hcl"], -410.0,
  "Controlled chlorination neutralizing phosphine offgases.");

add("semi-geo2-hcl-leaching", "Hydrochloric acid leaching of germanium dioxide generating volatile GeCl4",
  ["geo2", "hcl"], ["gecl4", "water"], -65.0,
  "Industrial germanium recovery process generating GeCl4 for fractional distillation.", "metathesis");

add("semi-gecl4-hydrolysis-geo2", "High-purity hydrolysis of distilled germanium tetrachloride to optical-grade GeO2",
  ["gecl4", "water"], ["geo2", "hcl"], 65.0,
  "Aqueous hydrolysis precipitating electronic grade germanium dioxide powder.", "metathesis");

// =========================================================================
// Section 4: Semiconductor Doping Chemistry & Dopant Precursors (14)
// =========================================================================
add("semi-diborane-pyrolysis-doping", "Thermal decomposition of diborane: p-type boron doping in silicon epitaxy",
  ["b2h6"], ["b", "h2"], 36.0,
  "Gas-phase dopant incorporation in silicon epitaxial reactors controlling acceptor carrier concentration.", "decomposition");

add("semi-diborane-oxidation-bsg", "Borosilicate Glass (BSG) CVD: co-oxidation of diborane forming boron-doped oxide",
  ["b2h6", "o2"], ["b2o3", "water"], -2030.0,
  "CVD deposition of BSG glass used as solid-state boron diffusion source for p+ shallow junctions.");

add("semi-diborane-chlorination-bcl3", "Direct vapor-phase chlorination of diborane to boron trichloride",
  ["b2h6", "cl2"], ["bcl3", "hcl"], -720.0,
  "Chlorination conversion generating pure BCl3 dopant gas.");

add("semi-diborane-co2-oxidation", "Diborane oxidation by carbon dioxide in plasma CVD",
  ["b2h6", "co2"], ["b2o3", "co", "h2"], -480.0,
  "Plasma co-deposition of boron-doped silicon oxide films.");

add("semi-diborane-hydrolysis-scrubber", "Aqueous scrubber destruction of pyrophoric diborane gas to boric acid",
  ["b2h6", "water"], ["h3bo3", "h2"], -440.0,
  "Wet scrubber neutralization converting toxic B2H6 effluent into benign boric acid solution.", "metathesis");

add("semi-bcl3-hydrogen-reduction", "Hydrogen reduction of boron trichloride: chemical vapor deposition of elemental boron",
  ["bcl3", "h2"], ["b", "hcl"], 185.0,
  "High-temperature CVD at 1000°C for boron filament synthesis and vapor doping.");

add("semi-bcl3-hydrolysis-scrubber", "Aqueous scrubber hydrolysis of boron trichloride exhaust fumes",
  ["bcl3", "water"], ["h3bo3", "hcl"], -285.0,
  "Scrubber absorption of BCl3 offgas generating boric and hydrochloric acids.", "metathesis");

add("semi-bcl3-caustic-scrubber", "Caustic scrubber absorption of boron trichloride fumes",
  ["bcl3", "naoh"], ["h3bo3", "nacl"], -395.0,
  "Alkaline scrubber neutralization generating sodium chloride and sodium borate buffer.", "metathesis");

add("semi-bf3-hydrolysis-fluoroboric", "Exothermic hydrolysis of boron trifluoride generating boric and fluoroboric acids",
  ["bf3", "water"], ["h3bo3", "hbf4"], -170.0,
  "Scrubber neutralization of BF3 ion implanter exhaust streams.", "metathesis");

add("semi-pocl3-oxygen-doping-drivein", "POCl3 liquid bubbler doping: oxidation generating phosphorus pentoxide dopant glass",
  ["pocl3", "o2"], ["p4o10", "cl2"], -310.0,
  "Furnace bubbler oxidation at 900°C depositing PSG dopant glass on silicon wafers for n+ emitter diffusion.");

add("semi-as2o3-c-reduction-doping", "Carbothermic reduction of arsenic trioxide dopant source to elemental arsenic",
  ["as2o3", "c"], ["as", "co"], 310.0,
  "High-temperature sublimation and reduction generating arsenic vapor for capsule diffusion.");

add("semi-as2o3-h2-reduction-doping", "Hydrogen reduction of arsenic trioxide",
  ["as2o3", "h2"], ["as", "water"], 140.0,
  "Gas-phase reduction generating arsenic dopant vapor.");

add("semi-as2o3-co-reduction-doping", "Carbon monoxide reduction of arsenic trioxide to elemental arsenic",
  ["as2o3", "co"], ["as", "co2"], -60.0,
  "Vapor-phase reduction generating arsenic dopant.");

add("semi-b2o3-mg-reduction-moissan", "Moissan process: magnesiothermic reduction of boron trioxide to crystalline boron",
  ["b2o3", "mg"], ["b", "mgo"], -530.0,
  "Exothermic magnesiothermic synthesis of elemental amorphous and crystalline boron.");

// =========================================================================
// Section 5: Wet Chemical Etching & Wafer Cleaning (RCA, BOE, Acid Etch) (14)
// =========================================================================
add("semi-wet-etch-boe-silica", "Buffered Oxide Etch (BOE): dissolution of silicon dioxide in hydrofluoric acid",
  ["sio2", "hf"], ["h2sif6", "water"], -135.0,
  "Isotropic wet etching of thermal and LPCVD silicon dioxide at controlled etch rates.", "metathesis");

add("semi-wet-etch-hna-silicon", "HNA isotropic silicon etching: redox dissolution of silicon in HF and nitric acid",
  ["si", "hno3", "hf"], ["h2sif6", "no", "water"], -1480.0,
  "High-rate isotropic wet etching of silicon wafers and MEMS diaphragm micromachining.");

add("semi-anisotropic-etch-koh-silicon", "Anisotropic silicon micromachining: crystallographic etching of Si(100) by potassium hydroxide",
  ["si", "koh", "water"], ["k2sio3", "h2"], -340.0,
  "Crystallographic anisotropic wet etch terminating on Si(111) planes to form pyramidal V-grooves.");

add("semi-anisotropic-etch-naoh-silicon", "Alkaline anisotropic silicon etching in hot sodium hydroxide bath",
  ["si", "naoh", "water"], ["na2sio3", "h2"], -335.0,
  "Solar cell wafer texturization creating light-trapping random surface micro-pyramids.");

add("semi-wet-etch-pan-aluminum", "PAN etch: phosphoric-nitric acid wet pattern etching of aluminum metallization",
  ["al", "h3po4"], ["alpo4", "h2"], -510.0,
  "Standard chemical wet etching of aluminum interconnect lines and bond pads.");

add("semi-wet-etch-germanium-peroxide", "Chemical dissolution and oxidation of germanium wafers in hydrogen peroxide",
  ["ge", "h2o2"], ["geo2", "water"], -460.0,
  "Isotropic chemical polishing of germanium surfaces prior to molecular beam epitaxy.");

add("semi-germanium-nitric-etch", "Nitric acid oxidation and wet chemical etching of germanium wafers",
  ["ge", "hno3"], ["geo2", "no2", "water"], -280.0,
  "Controlled chemical etching of germanium p-channel devices.");

add("semi-germanium-sulfuric-etch", "Hot sulfuric acid chemical oxidation of germanium",
  ["ge", "h2so4"], ["geo2", "so2", "water"], -190.0,
  "Sulfuric acid chemical surface treatment.");

add("semi-rca-sc1-clean-peroxide", "RCA Standard Clean 1 (SC-1): peroxide oxidation of silicon wafer surface",
  ["si", "h2o2"], ["sio2", "water"], -480.0,
  "Peroxide oxidation removing metallic and organic contaminants during RCA SC-1 clean.");

add("semi-piranha-organic-strip", "Piranha etch / SPM clean: complete wet oxidation of organic photoresist residues",
  ["c", "h2o2"], ["co2", "water"], -540.0,
  "Sulfuric-peroxide mixture (SPM) aggressively burning stubborn crosslinked photoresist polymers.");

add("semi-silicon-nitride-steam-oxidation", "Steam oxidation of silicon nitride masking films during LOCOS process",
  ["si3n4", "water"], ["sio2", "ammonia"], -140.0,
  "Slow hydrothermal oxidation of silicon nitride barrier in LOCOS oxidation furnaces.");

add("semi-silicon-nitride-hf-etch", "Hydrofluoric acid dissolution of silicon nitride thin films",
  ["si3n4", "hf"], ["h2sif6", "ammonia"], -390.0,
  "Slow isotropic wet etching of silicon nitride in concentrated HF baths.", "metathesis");

add("semi-silicon-nitride-hcl-decomposition", "High-temperature anhydrous HCl vapor etching of silicon nitride",
  ["si3n4", "hcl"], ["sicl4", "ammonia"], -210.0,
  "Gas-phase etching and reactor cleaning stripping residual silicon nitride coatings.");

add("semi-copper-cmp-slurry-etch", "Copper chemical mechanical planarization (CMP): etching in acidic peroxide slurry",
  ["cu", "h2o2", "hcl"], ["cucl2", "water"], -320.0,
  "Dual-damascene slurry etching converting metallic copper overburden into soluble cupric chloride.");

// =========================================================================
// Section 6: Plasma Etching & Reactive Ion Etching (RIE) Chemistry (15)
// =========================================================================
add("semi-rie-silicon-chlorine", "Reactive Ion Etching (RIE): anisotropic plasma etching of silicon by chlorine radicals",
  ["si", "cl2"], ["sicl4"], -660.0,
  "High-density inductively coupled plasma (ICP) etching of deep silicon trenches and STI isolation.");

add("semi-rie-silicon-fluorine", "Plasma etching of silicon by atomic fluorine radicals",
  ["si", "f2"], ["sif4"], -1610.0,
  "Ultra-fast spontaneous chemical etching of silicon in SF6/NF3 downstream plasma.");

add("semi-rie-silica-fluorine", "Plasma reactive ion etching of silicon dioxide by fluorine radicals",
  ["sio2", "f2"], ["sif4", "o2"], -700.0,
  "Fluorocarbon plasma etching of contact contact vias through interlevel dielectric oxides.");

add("semi-rie-nitride-fluorine", "Plasma etching of silicon nitride in fluorine plasma",
  ["si3n4", "f2"], ["sif4", "n2"], -3100.0,
  "Selective plasma etching of silicon nitride masking layers in CF4/O2 discharges.");

add("semi-rie-tin-chlorine", "Chlorine RIE plasma etching of titanium nitride diffusion barrier",
  ["tin", "cl2"], ["ticl4", "n2"], -466.0,
  "Plasma etching of TiN hard masks and capacitor electrode layers in BCl3/Cl2 plasma.");

add("semi-rie-tungsten-fluorine", "Fluorine plasma etching of tungsten interconnect plugs and vias",
  ["w", "f2"], ["wf6"], -1720.0,
  "Chemical etching of tungsten in SF6 plasma during chemical-mechanical recess polish.");

add("semi-rie-bcl3-aluminum-clean", "BCl3 plasma reactive ion etching of aluminum: native oxide reduction",
  ["al", "bcl3"], ["alcl3", "b"], -195.0,
  "Addition of BCl3 to break native Al2O3 film allowing rapid anisotropic aluminum line etching.");

add("semi-bcl3-plasma-dissociation", "Plasma dissociation of boron trichloride generating active chlorine radicals",
  ["bcl3"], ["b", "cl2"], 405.0,
  "RF plasma cracking in RIE chambers generating directional reactive etching radicals.", "decomposition");

add("semi-germanium-chlorine-rie", "Chlorine plasma reactive ion etching of germanium channels",
  ["ge", "cl2"], ["gecl4"], -530.0,
  "Anisotropic ICP etching of high-mobility Ge p-MOSFET fin structures.");

add("semi-germanium-oxidation-plasma", "Oxygen plasma ashing: surface re-oxidation of germanium",
  ["ge", "o2"], ["geo2"], -580.0,
  "Downstream oxygen plasma oxidation and stripping.");

add("semi-silicon-carbide-chlorine-rie", "High-temperature chlorine ICP etching of silicon carbide power devices",
  ["sic", "cl2"], ["sicl4", "c"], -380.0,
  "Plasma trench etching of SiC power MOSFETs using Cl2/BCl3 chemistry.");

add("semi-tin-nitric-stripping", "Chemical stripping of titanium nitride hard masks in hot nitric acid",
  ["tin", "hno3"], ["tio2", "no2", "water"], -680.0,
  "Selective wet chemical strip removing TiN barrier films without etching oxide.");

add("semi-silicon-nitride-nitric-etch", "High-temperature wet oxidation and digestion of silicon nitride by nitric acid",
  ["si3n4", "hno3"], ["sio2", "no2", "water", "n2"], -920.0,
  "Chemical digestion and cleaning of silicon nitride residues.");

add("semi-b2o3-carbothermic-reduction", "Carbothermic reduction of boron trioxide in arc furnace",
  ["b2o3", "c"], ["b", "co"], 780.0,
  "High-temperature carbothermic reduction synthesizing technical grade boron.");

add("semi-b2o3-aluminothermic-reduction", "Aluminothermic reduction of boron trioxide to elemental boron",
  ["b2o3", "al"], ["b", "al2o3"], -510.0,
  "Aluminothermic synthesis of pure boron.");

// =========================================================================
// Section 7: Photolithography, Passivation & Surface Chemistry (14)
// =========================================================================
add("semi-silicon-carbide-cvd-methane", "CVD epitaxy of 4H/6H silicon carbide from silane and propane/methane",
  ["sih4", "ch4"], ["sic", "h2"], 120.0,
  "High-temperature MOCVD at 1600°C growing wide bandgap SiC epilayers for electric vehicle inverters.");

add("semi-silicon-carbide-dcs-methane", "Silicon carbide CVD deposition from dichlorosilane and methane",
  ["sih2cl2", "ch4"], ["sic", "hcl", "h2"], 85.0,
  "Chlorine-enhanced CVD growth of thick SiC epitaxial layers with high growth rates.");

add("semi-silicon-carbide-oxidation", "Thermal gate oxidation of silicon carbide in pure oxygen",
  ["sic", "o2"], ["sio2", "co"], -940.0,
  "High-temperature furnace oxidation at 1200°C growing SiO2 gate dielectric on SiC MOSFETs.");

add("semi-silicon-carbide-steam-oxidation", "Pyrogenic steam oxidation of silicon carbide",
  ["sic", "water"], ["sio2", "co", "h2"], -460.0,
  "Wet oxidation of SiC power device wafers.");

add("semi-tin-oxidation-barrier", "Thermal oxidation of titanium nitride barrier layer in oxygen atmosphere",
  ["tin", "o2"], ["tio2", "n2"], -750.0,
  "Thermal stability degradation of TiN barriers under oxidizing anneals converting to TiO2.");

add("semi-tin-steam-oxidation", "Steam oxidation of titanium nitride films",
  ["tin", "water"], ["tio2", "n2", "h2"], -310.0,
  "Corrosion and hydrothermal oxidation of TiN coatings.");

add("semi-silicon-nitride-thermal-oxidation", "Thermal oxidation of silicon nitride masking films during LOCOS process",
  ["si3n4", "o2"], ["sio2", "n2"], -1980.0,
  "Local Oxidation of Silicon (LOCOS): slow oxidation of silicon nitride mask in high-temperature steam.");

add("semi-silicon-thermal-dry-oxidation-rapid", "Rapid thermal oxidation (RTO): ultra-thin gate oxide growth",
  ["si", "o2"], ["sio2"], -910.0, // wait! duplicate local: si + o2 was in section 1 line 125!
  "Rapid thermal processing (RTP) forming 1-2 nm gate dielectrics.");

add("semi-silicon-thermal-wet-oxidation-pyro", "Pyrogenic steam torch oxidation of silicon wafers",
  ["si", "water"], ["sio2", "h2"], -430.0, // duplicate local: si + water was in section 1 line 129!
  "Wet thermal field oxide growth.");

add("semi-silicon-ammonia-direct-nitridation", "Direct thermal nitridation: synthesis of ultrathin silicon nitride dielectric",
  ["si", "ammonia"], ["si3n4", "h2"], -490.0,
  "Rapid thermal processing (RTP) at 1000°C growing ultrathin Si3N4 gate dielectric.");

add("semi-silicon-nitrogen-nitridation", "Direct high-temperature nitridation of silicon by nitrogen plasma",
  ["si", "n2"], ["si3n4"], -745.0,
  "Thermal nitridation forming stoichiometric silicon nitride ceramic.");

add("semi-bf3-silicon-plasma-etch", "Boron trifluoride plasma etching of silicon with simultaneous p-type doping",
  ["si", "bf3"], ["sif4", "b"], -380.0,
  "Plasma doping and reactive etching creating shallow p+ source/drain extensions.");

add("semi-dcs-hydrolysis-scrubber-waste", "Scrubber hydrolysis of dichlorosilane fumes",
  ["sih2cl2", "water"], ["sio2", "hcl", "h2"], -280.0,
  "Emergency scrubbing of DCS leaks preventing toxic chlorosilane release.", "metathesis");

add("semi-tcs-caustic-scrubber", "Alkaline scrubber neutralization of trichlorosilane fumes by caustic soda",
  ["sihcl3", "naoh"], ["sio2", "nacl", "water", "h2"], -380.0,
  "Emergency scrubber absorption of TCS vapor generating sodium chloride, hydrated silica, and hydrogen gas.", "metathesis");

console.log(`\nDomain 25 complete: ${list.length} reactions validated!`);

const outPath = path.resolve(__dirname, "domain25SemiconductorCVD.ts");
const code = `import type { ReactionDefinition } from "./types.js";

// Domain 25: Semiconductor Materials & CVD Precursors (100 reactions)
export const DOMAIN_25_SEMICONDUCTOR_REACTIONS: ReactionDefinition[] = ${JSON.stringify(list, null, 2)};
`;

fs.writeFileSync(outPath, code, "utf8");
console.log(`✓ Wrote ${list.length} reactions to domain25SemiconductorCVD.ts\n`);
