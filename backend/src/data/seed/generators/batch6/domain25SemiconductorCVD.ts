import type { ReactionDefinition } from "./types.js";

// Domain 25: Semiconductor Materials & CVD Precursors (100 reactions)
export const DOMAIN_25_SEMICONDUCTOR_REACTIONS: ReactionDefinition[] = [
  {
    "id": "semi-silane-pyrolysis-polysilicon",
    "name": "LPCVD pyrolysis of silane: chemical vapor deposition of polysilicon gate electrodes",
    "reactants": [
      "sih4"
    ],
    "products": [
      "si",
      "h2"
    ],
    "enthalpy": 34,
    "desc": "Low-pressure chemical vapor deposition at 600-650°C forming polycrystalline silicon films for MOS gates.",
    "type": "decomposition",
    "effects": [],
    "net": "SiH4 → Si + 2 H2"
  },
  {
    "id": "semi-silane-lto-oxidation",
    "name": "Low Temperature Oxide (LTO): atmospheric CVD oxidation of silane by oxygen",
    "reactants": [
      "sih4",
      "o2"
    ],
    "products": [
      "sio2",
      "h2"
    ],
    "enthalpy": -420,
    "desc": "Low-temperature dielectric deposition at 400°C for interlayer passivation before aluminum metallization.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH4 + O2 → SiO2 + 2 H2"
  },
  {
    "id": "semi-silane-no-pecvd-oxide",
    "name": "PECVD silicon dioxide deposition from silane and nitrogen monoxide",
    "reactants": [
      "sih4",
      "no"
    ],
    "products": [
      "sio2",
      "n2",
      "h2"
    ],
    "enthalpy": -680,
    "desc": "Plasma-enhanced chemical vapor deposition using nitric oxide oxidant.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH4 + 2 NO → SiO2 + N2 + 2 H2"
  },
  {
    "id": "semi-silane-n2o-pecvd-oxide",
    "name": "PECVD silicon dioxide: plasma-enhanced deposition from silane and nitrous oxide",
    "reactants": [
      "sih4",
      "n2o"
    ],
    "products": [
      "sio2",
      "n2",
      "h2"
    ],
    "enthalpy": -710,
    "desc": "Plasma CVD at 300-350°C depositing high-conformality dielectric layers on temperature-sensitive substrates.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH4 + 2 N2O → SiO2 + 2 N2 + 2 H2"
  },
  {
    "id": "semi-silane-pecvd-silicon-nitride",
    "name": "PECVD silicon nitride: plasma deposition from silane and ammonia",
    "reactants": [
      "sih4",
      "ammonia"
    ],
    "products": [
      "si3n4",
      "h2"
    ],
    "enthalpy": -180,
    "desc": "Hydrogenated silicon nitride (SiNx:H) deposition serving as antireflective coating in solar cells and IC moisture barrier.",
    "type": "synthesis",
    "effects": [],
    "net": "3 SiH4 + 4 NH3 → Si3N4 + 12 H2"
  },
  {
    "id": "semi-silane-chlorination-sicl4",
    "name": "Direct gas-phase chlorination of silane to silicon tetrachloride",
    "reactants": [
      "sih4",
      "cl2"
    ],
    "products": [
      "sicl4",
      "hcl"
    ],
    "enthalpy": -620,
    "desc": "Exothermic vapor-phase chlorination synthesizing high-purity SiCl4 precursor.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH4 + 4 Cl2 → SiCl4 + 4 HCl"
  },
  {
    "id": "semi-dcs-pyrolysis-epitaxy",
    "name": "Dichlorosilane (DCS) epitaxial silicon deposition in high-throughput barrel reactors",
    "reactants": [
      "sih2cl2"
    ],
    "products": [
      "si",
      "hcl"
    ],
    "enthalpy": 140,
    "desc": "High-temperature vapor phase epitaxy (VPE) at 1050°C depositing defect-free single crystal silicon layers.",
    "type": "decomposition",
    "effects": [],
    "net": "SiH2Cl2 → Si + 2 HCl"
  },
  {
    "id": "semi-dcs-chlorination-sicl4",
    "name": "Gas-phase chlorination of dichlorosilane to silicon tetrachloride",
    "reactants": [
      "sih2cl2",
      "cl2"
    ],
    "products": [
      "sicl4",
      "hcl"
    ],
    "enthalpy": -310,
    "desc": "Vapor chlorination balancing chlorosilane plant inventory.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH2Cl2 + 2 Cl2 → SiCl4 + 2 HCl"
  },
  {
    "id": "semi-dcs-lpcvd-silicon-nitride",
    "name": "LPCVD stoichiometric silicon nitride: hot-wall furnace deposition from DCS and ammonia",
    "reactants": [
      "sih2cl2",
      "ammonia"
    ],
    "products": [
      "si3n4",
      "hcl",
      "h2"
    ],
    "enthalpy": -260,
    "desc": "Furnace deposition at 750-800°C producing dense, stoichiometric Si3N4 hard masks for LOCOS oxidation isolation.",
    "type": "synthesis",
    "effects": [],
    "net": "3 SiH2Cl2 + 4 NH3 → Si3N4 + 6 HCl + 6 H2"
  },
  {
    "id": "semi-dcs-n2o-hld-oxide",
    "name": "High Temperature Oxide (HLD): LPCVD dielectric deposition from DCS and nitrous oxide",
    "reactants": [
      "sih2cl2",
      "n2o"
    ],
    "products": [
      "sio2",
      "n2",
      "hcl"
    ],
    "enthalpy": -540,
    "desc": "LPCVD furnace process at 900°C depositing excellent step-coverage gate sidewall spacer oxides.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH2Cl2 + 2 N2O → SiO2 + 2 N2 + 2 HCl"
  },
  {
    "id": "semi-tcs-siemens-polysilicon",
    "name": "Siemens process: high-purity polysilicon deposition from trichlorosilane and hydrogen",
    "reactants": [
      "sihcl3",
      "h2"
    ],
    "products": [
      "si",
      "hcl"
    ],
    "enthalpy": 220,
    "desc": "Core industrial Siemens reactor process at 1100°C producing 9N-11N electronic grade silicon rods.",
    "type": "synthesis",
    "effects": [],
    "net": "SiHCl3 + H2 → Si + 3 HCl"
  },
  {
    "id": "semi-tcs-chlorination-sicl4",
    "name": "Vapor-phase chlorination of trichlorosilane to silicon tetrachloride",
    "reactants": [
      "sihcl3",
      "cl2"
    ],
    "products": [
      "sicl4",
      "hcl"
    ],
    "enthalpy": -160,
    "desc": "Chlorination step during chlorosilane purification.",
    "type": "synthesis",
    "effects": [],
    "net": "SiHCl3 + Cl2 → SiCl4 + HCl"
  },
  {
    "id": "semi-tcs-fluidized-bed-synthesis",
    "name": "Fluidized bed synthesis of trichlorosilane from metallurgical silicon and anhydrous HCl",
    "reactants": [
      "si",
      "hcl"
    ],
    "products": [
      "sihcl3",
      "h2"
    ],
    "enthalpy": -218,
    "desc": "Direct chlorination of metallurgical silicon at 300°C generating crude trichlorosilane.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 3 HCl → SiHCl3 + H2"
  },
  {
    "id": "semi-tcs-disproportionation-dcs",
    "name": "Catalytic disproportionation of trichlorosilane to dichlorosilane and silicon tetrachloride",
    "reactants": [
      "sihcl3"
    ],
    "products": [
      "sih2cl2",
      "sicl4"
    ],
    "enthalpy": 15,
    "desc": "Tertiary amine resin catalyzed redistribution in distillation columns generating volatile DCS.",
    "type": "decomposition",
    "effects": [],
    "net": "2 SiHCl3 → SiH2Cl2 + SiCl4"
  },
  {
    "id": "semi-tcs-hydrolysis-waste",
    "name": "Scrubber neutralization: complete hydrolysis of trichlorosilane by water",
    "reactants": [
      "sihcl3",
      "water"
    ],
    "products": [
      "sio2",
      "hcl",
      "h2"
    ],
    "enthalpy": -310,
    "desc": "Vent gas scrubber hydrolysis converting hazardous chlorosilane vapors into silica gel and hydrochloric acid.",
    "type": "metathesis",
    "effects": [],
    "net": "SiHCl3 + 2 H2O → SiO2 + 3 HCl + H2"
  },
  {
    "id": "semi-teos-lpcvd-pyrolysis",
    "name": "TEOS LPCVD: thermal pyrolysis of tetraethyl orthosilicate depositing conformal silicon dioxide",
    "reactants": [
      "teos"
    ],
    "products": [
      "sio2",
      "c2h4",
      "water"
    ],
    "enthalpy": 190,
    "desc": "Low-pressure CVD at 680-720°C delivering outstanding conformal step coverage over deep trenches.",
    "type": "decomposition",
    "effects": [],
    "net": "C8H20O4Si → SiO2 + 4 C2H4 + 2 H2O"
  },
  {
    "id": "semi-teos-combustion-oxidation",
    "name": "Complete oxidative combustion of TEOS precursor vapor in burn boxes",
    "reactants": [
      "teos",
      "o2"
    ],
    "products": [
      "sio2",
      "co2",
      "water"
    ],
    "enthalpy": -4950,
    "desc": "Thermal point-of-use abatement decomposing organosilicon exhaust gases.",
    "type": "synthesis",
    "effects": [],
    "net": "C8H20O4Si + 12 O2 → SiO2 + 8 CO2 + 10 H2O"
  },
  {
    "id": "semi-tma-water-ald-alumina",
    "name": "Atomic Layer Deposition (ALD): self-limiting deposition of Al2O3 from TMA and water",
    "reactants": [
      "al-ch3-3",
      "water"
    ],
    "products": [
      "al2o3",
      "ch4"
    ],
    "enthalpy": -760,
    "desc": "Canonical ALD reaction at 200-300°C depositing angstrom-level pinhole-free alumina barrier and passivation films.",
    "type": "synthesis",
    "effects": [],
    "net": "2 AlC3H9 + 3 H2O → Al2O3 + 6 CH4"
  },
  {
    "id": "semi-tma-peroxide-ald-alumina",
    "name": "Ozone / peroxide enhanced ALD of aluminum oxide using trimethylaluminum",
    "reactants": [
      "al-ch3-3",
      "h2o2"
    ],
    "products": [
      "al2o3",
      "ch4",
      "o2"
    ],
    "enthalpy": -910,
    "desc": "Low-temperature ALD process using hydrogen peroxide coreactant for organic electronic encapsulation.",
    "type": "synthesis",
    "effects": [],
    "net": "4 AlC3H9 + 6 H2O2 → 2 Al2O3 + 12 CH4 + 3 O2"
  },
  {
    "id": "semi-ticl4-ammonia-ald-tin",
    "name": "ALD titanium nitride: atomic layer deposition of conformal diffusion barrier from TiCl4 and NH3",
    "reactants": [
      "ticl4",
      "ammonia"
    ],
    "products": [
      "tin",
      "hcl",
      "n2"
    ],
    "enthalpy": -120,
    "desc": "Thermal ALD at 350-450°C forming ultra-thin conformal TiN barrier layers in high-aspect-ratio DRAM contact holes.",
    "type": "synthesis",
    "effects": [],
    "net": "6 TiCl4 + 8 NH3 → 6 TiN + 24 HCl + N2"
  },
  {
    "id": "semi-ticl4-caustic-scrubber",
    "name": "Alkaline scrubber neutralization of titanium tetrachloride vapor",
    "reactants": [
      "ticl4",
      "naoh"
    ],
    "products": [
      "tio2",
      "nacl",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Scrubber absorption of TiCl4 in caustic soda preventing emission of corrosive fumes.",
    "type": "metathesis",
    "effects": [],
    "net": "TiCl4 + 4 NaOH → TiO2 + 4 NaCl + 2 H2O"
  },
  {
    "id": "semi-zrcl4-water-ald-zirconia",
    "name": "ALD zirconium dioxide: deposition of high-k gate dielectric from ZrCl4 and water",
    "reactants": [
      "zrcl4",
      "water"
    ],
    "products": [
      "zro2",
      "hcl"
    ],
    "enthalpy": -85,
    "desc": "ALD growth of ultrathin ZrO2 dielectric layers for DRAM trench capacitors.",
    "type": "metathesis",
    "effects": [],
    "net": "ZrCl4 + 2 H2O → ZrO2 + 4 HCl"
  },
  {
    "id": "semi-wf6-silane-ald-nucleation",
    "name": "WF6 silane reduction: rapid ALD nucleation layer for tungsten plug fill",
    "reactants": [
      "wf6",
      "sih4"
    ],
    "products": [
      "w",
      "sif4",
      "h2"
    ],
    "enthalpy": -480,
    "desc": "Pulsed nucleation layer (PNL) process establishing thin seed layer to prevent WF6 substrate encroachment.",
    "type": "synthesis",
    "effects": [],
    "net": "2 WF6 + 3 SiH4 → 2 W + 3 SiF4 + 6 H2"
  },
  {
    "id": "semi-wf6-dcs-ald-nucleation",
    "name": "WF6 dichlorosilane reduction: ALD deposition of fluorine-free tungsten seeds",
    "reactants": [
      "wf6",
      "sih2cl2"
    ],
    "products": [
      "w",
      "sif4",
      "hcl"
    ],
    "enthalpy": -510,
    "desc": "Low-temperature seed layer deposition in advanced metallization schemes.",
    "type": "synthesis",
    "effects": [],
    "net": "2 WF6 + 3 SiH2Cl2 → 2 W + 3 SiF4 + 6 HCl"
  },
  {
    "id": "semi-silane-co2-pecvd",
    "name": "PECVD silicon dioxide deposition using silane and carbon dioxide",
    "reactants": [
      "sih4",
      "co2"
    ],
    "products": [
      "sio2",
      "co",
      "h2"
    ],
    "enthalpy": -180,
    "desc": "Alternative oxidant chemistry avoiding gas-phase particle nucleation in plasma CVD.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH4 + 2 CO2 → SiO2 + 2 CO + 2 H2"
  },
  {
    "id": "semi-dcs-co2-pecvd",
    "name": "Plasma CVD of silicon dioxide from dichlorosilane and carbon dioxide",
    "reactants": [
      "sih2cl2",
      "co2"
    ],
    "products": [
      "sio2",
      "co",
      "hcl"
    ],
    "enthalpy": -120,
    "desc": "High-rate plasma oxide deposition with tight refractive index control.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH2Cl2 + 2 CO2 → SiO2 + 2 CO + 2 HCl"
  },
  {
    "id": "semi-teos-sol-gel-hydrolysis",
    "name": "Sol-gel process: acid-catalyzed hydrolysis of TEOS generating orthosilicic acid and ethanol",
    "reactants": [
      "teos",
      "water"
    ],
    "products": [
      "h4sio4_orthosilicic",
      "c2h5oh"
    ],
    "enthalpy": -45,
    "desc": "Liquid-phase sol-gel hydrolysis producing optical silica coatings and low-k aerogel dielectrics.",
    "type": "metathesis",
    "effects": [],
    "net": "C8H20O4Si + 4 H2O → H4SiO4 + 4 C2H5OH"
  },
  {
    "id": "semi-sicl4-hydrogen-reduction",
    "name": "Hydrogen reduction of silicon tetrachloride to polycrystalline silicon",
    "reactants": [
      "sicl4",
      "h2"
    ],
    "products": [
      "si",
      "hcl"
    ],
    "enthalpy": 240,
    "desc": "High-temperature vapor phase reduction in Siemens deposition reactors.",
    "type": "synthesis",
    "effects": [],
    "net": "SiCl4 + 2 H2 → Si + 4 HCl"
  },
  {
    "id": "semi-sicl4-caustic-scrubber",
    "name": "Caustic scrubber neutralization of silicon tetrachloride exhaust fumes",
    "reactants": [
      "sicl4",
      "naoh"
    ],
    "products": [
      "sio2",
      "nacl",
      "water"
    ],
    "enthalpy": -340,
    "desc": "Emergency scrubber absorption of SiCl4 fumes producing colloidal silica and brine.",
    "type": "metathesis",
    "effects": [],
    "net": "SiCl4 + 4 NaOH → SiO2 + 4 NaCl + 2 H2O"
  },
  {
    "id": "semi-mocvd-gaas-growth",
    "name": "Gallium arsenide MOCVD: metalorganic epitaxy from trimethylgallium and arsine",
    "reactants": [
      "ga-ch3-3",
      "ash3"
    ],
    "products": [
      "gaas",
      "ch4"
    ],
    "enthalpy": -315,
    "desc": "Epitaxial growth at 650°C in hydrogen carrier gas fabricating high-mobility GaAs HEMT and laser structures.",
    "type": "synthesis",
    "effects": [],
    "net": "GaC3H9 + AsH3 → GaAs + 3 CH4"
  },
  {
    "id": "semi-mocvd-inp-growth",
    "name": "Indium phosphide MOCVD: epitaxial growth from trimethylindium and phosphine",
    "reactants": [
      "in-ch3-3",
      "ph3"
    ],
    "products": [
      "inp",
      "ch4"
    ],
    "enthalpy": -285,
    "desc": "Metalorganic vapor phase epitaxy (MOVPE) at 600°C producing telecommunications photonic laser diodes.",
    "type": "synthesis",
    "effects": [],
    "net": "InC3H9 + PH3 → InP + 3 CH4"
  },
  {
    "id": "semi-mocvd-gan-growth",
    "name": "Gallium nitride MOCVD: high-temperature epitaxy from trimethylgallium and ammonia",
    "reactants": [
      "ga-ch3-3",
      "ammonia"
    ],
    "products": [
      "gan",
      "ch4"
    ],
    "enthalpy": -265,
    "desc": "MOCVD growth at 1050°C on sapphire or SiC substrates manufacturing blue LEDs and power GaN HEMTs.",
    "type": "synthesis",
    "effects": [],
    "net": "GaC3H9 + NH3 → GaN + 3 CH4"
  },
  {
    "id": "semi-cvd-germane-epitaxy",
    "name": "Germane CVD epitaxy: low-temperature chemical vapor deposition of pure germanium",
    "reactants": [
      "geh4"
    ],
    "products": [
      "ge",
      "h2"
    ],
    "enthalpy": 90,
    "desc": "Low-temperature epitaxy at 350-450°C depositing germanium buffers for multijunction solar cells.",
    "type": "decomposition",
    "effects": [],
    "net": "GeH4 → Ge + 2 H2"
  },
  {
    "id": "semi-germane-oxidation-geo2",
    "name": "Gas-phase oxidation of germane precursor to germanium dioxide",
    "reactants": [
      "geh4",
      "o2"
    ],
    "products": [
      "geo2",
      "water"
    ],
    "enthalpy": -1180,
    "desc": "Controlled vapor oxidation for optical waveguide core doping.",
    "type": "synthesis",
    "effects": [],
    "net": "GeH4 + 2 O2 → GeO2 + 2 H2O"
  },
  {
    "id": "semi-germane-n2o-pecvd",
    "name": "PECVD deposition of GeO2 dielectric from germane and nitrous oxide",
    "reactants": [
      "geh4",
      "n2o"
    ],
    "products": [
      "geo2",
      "n2",
      "h2"
    ],
    "enthalpy": -590,
    "desc": "Plasma-enhanced dielectric deposition on compound semiconductors.",
    "type": "synthesis",
    "effects": [],
    "net": "GeH4 + 2 N2O → GeO2 + 2 N2 + 2 H2"
  },
  {
    "id": "semi-germane-chlorination",
    "name": "Direct gas-phase chlorination of germane to germanium tetrachloride",
    "reactants": [
      "geh4",
      "cl2"
    ],
    "products": [
      "gecl4",
      "hcl"
    ],
    "enthalpy": -540,
    "desc": "Vapor-phase chlorination synthesizing optical fiber grade GeCl4.",
    "type": "synthesis",
    "effects": [],
    "net": "GeH4 + 4 Cl2 → GeCl4 + 4 HCl"
  },
  {
    "id": "semi-arsine-thermal-cracking",
    "name": "Hydride VPE: thermal cracking of arsine gas into elemental arsenic and hydrogen",
    "reactants": [
      "ash3"
    ],
    "products": [
      "as",
      "h2"
    ],
    "enthalpy": 66,
    "desc": "High-temperature pre-cracking furnace generating As2/As4 flux for molecular beam epitaxy (MBE).",
    "type": "decomposition",
    "effects": [],
    "net": "2 AsH3 → 2 As + 3 H2"
  },
  {
    "id": "semi-phosphine-thermal-cracking",
    "name": "Thermal pyrolysis of phosphine gas yielding elemental white phosphorus and hydrogen",
    "reactants": [
      "ph3"
    ],
    "products": [
      "p4",
      "h2"
    ],
    "enthalpy": 22,
    "desc": "Cracker cell decomposition in gas-source MBE growing InP/InGaAsP quantum wells.",
    "type": "decomposition",
    "effects": [],
    "net": "4 PH3 → P4 + 6 H2"
  },
  {
    "id": "semi-arsine-oxidation-abatement",
    "name": "Thermal abatement: catalytic oxidation of toxic arsine offgas to arsenic trioxide",
    "reactants": [
      "ash3",
      "o2"
    ],
    "products": [
      "as2o3",
      "water"
    ],
    "enthalpy": -1220,
    "desc": "Burn-box scrubber oxidation capturing hazardous arsenic effluent as solid arsenic trioxide dust.",
    "type": "synthesis",
    "effects": [],
    "net": "2 AsH3 + 3 O2 → As2O3 + 3 H2O"
  },
  {
    "id": "semi-phosphine-combustion-abatement",
    "name": "Complete combustion of phosphine effluent gas into phosphorus pentoxide and steam",
    "reactants": [
      "ph3",
      "o2"
    ],
    "products": [
      "p4o10",
      "water"
    ],
    "enthalpy": -2440,
    "desc": "MOCVD exhaust incinerator converting pyrophoric PH3 into solid P4O10 scrubber residue.",
    "type": "synthesis",
    "effects": [],
    "net": "4 PH3 + 8 O2 → P4O10 + 6 H2O"
  },
  {
    "id": "semi-phosphine-chlorination-pcl3",
    "name": "Vapor-phase chlorination of phosphine to phosphorus trichloride",
    "reactants": [
      "ph3",
      "cl2"
    ],
    "products": [
      "pcl3",
      "hcl"
    ],
    "enthalpy": -410,
    "desc": "Controlled chlorination neutralizing phosphine offgases.",
    "type": "synthesis",
    "effects": [],
    "net": "PH3 + 3 Cl2 → PCl3 + 3 HCl"
  },
  {
    "id": "semi-geo2-hcl-leaching",
    "name": "Hydrochloric acid leaching of germanium dioxide generating volatile GeCl4",
    "reactants": [
      "geo2",
      "hcl"
    ],
    "products": [
      "gecl4",
      "water"
    ],
    "enthalpy": -65,
    "desc": "Industrial germanium recovery process generating GeCl4 for fractional distillation.",
    "type": "metathesis",
    "effects": [],
    "net": "GeO2 + 4 HCl → GeCl4 + 2 H2O"
  },
  {
    "id": "semi-gecl4-hydrolysis-geo2",
    "name": "High-purity hydrolysis of distilled germanium tetrachloride to optical-grade GeO2",
    "reactants": [
      "gecl4",
      "water"
    ],
    "products": [
      "geo2",
      "hcl"
    ],
    "enthalpy": 65,
    "desc": "Aqueous hydrolysis precipitating electronic grade germanium dioxide powder.",
    "type": "metathesis",
    "effects": [],
    "net": "GeCl4 + 2 H2O → GeO2 + 4 HCl"
  },
  {
    "id": "semi-diborane-pyrolysis-doping",
    "name": "Thermal decomposition of diborane: p-type boron doping in silicon epitaxy",
    "reactants": [
      "b2h6"
    ],
    "products": [
      "b",
      "h2"
    ],
    "enthalpy": 36,
    "desc": "Gas-phase dopant incorporation in silicon epitaxial reactors controlling acceptor carrier concentration.",
    "type": "decomposition",
    "effects": [],
    "net": "B2H6 → 2 B + 3 H2"
  },
  {
    "id": "semi-diborane-oxidation-bsg",
    "name": "Borosilicate Glass (BSG) CVD: co-oxidation of diborane forming boron-doped oxide",
    "reactants": [
      "b2h6",
      "o2"
    ],
    "products": [
      "b2o3",
      "water"
    ],
    "enthalpy": -2030,
    "desc": "CVD deposition of BSG glass used as solid-state boron diffusion source for p+ shallow junctions.",
    "type": "synthesis",
    "effects": [],
    "net": "B2H6 + 3 O2 → B2O3 + 3 H2O"
  },
  {
    "id": "semi-diborane-chlorination-bcl3",
    "name": "Direct vapor-phase chlorination of diborane to boron trichloride",
    "reactants": [
      "b2h6",
      "cl2"
    ],
    "products": [
      "bcl3",
      "hcl"
    ],
    "enthalpy": -720,
    "desc": "Chlorination conversion generating pure BCl3 dopant gas.",
    "type": "synthesis",
    "effects": [],
    "net": "B2H6 + 6 Cl2 → 2 BCl3 + 6 HCl"
  },
  {
    "id": "semi-diborane-co2-oxidation",
    "name": "Diborane oxidation by carbon dioxide in plasma CVD",
    "reactants": [
      "b2h6",
      "co2"
    ],
    "products": [
      "b2o3",
      "co",
      "h2"
    ],
    "enthalpy": -480,
    "desc": "Plasma co-deposition of boron-doped silicon oxide films.",
    "type": "synthesis",
    "effects": [],
    "net": "B2H6 + 3 CO2 → B2O3 + 3 CO + 3 H2"
  },
  {
    "id": "semi-diborane-hydrolysis-scrubber",
    "name": "Aqueous scrubber destruction of pyrophoric diborane gas to boric acid",
    "reactants": [
      "b2h6",
      "water"
    ],
    "products": [
      "h3bo3",
      "h2"
    ],
    "enthalpy": -440,
    "desc": "Wet scrubber neutralization converting toxic B2H6 effluent into benign boric acid solution.",
    "type": "metathesis",
    "effects": [],
    "net": "B2H6 + 6 H2O → 2 H3BO3 + 6 H2"
  },
  {
    "id": "semi-bcl3-hydrogen-reduction",
    "name": "Hydrogen reduction of boron trichloride: chemical vapor deposition of elemental boron",
    "reactants": [
      "bcl3",
      "h2"
    ],
    "products": [
      "b",
      "hcl"
    ],
    "enthalpy": 185,
    "desc": "High-temperature CVD at 1000°C for boron filament synthesis and vapor doping.",
    "type": "synthesis",
    "effects": [],
    "net": "2 BCl3 + 3 H2 → 2 B + 6 HCl"
  },
  {
    "id": "semi-bcl3-hydrolysis-scrubber",
    "name": "Aqueous scrubber hydrolysis of boron trichloride exhaust fumes",
    "reactants": [
      "bcl3",
      "water"
    ],
    "products": [
      "h3bo3",
      "hcl"
    ],
    "enthalpy": -285,
    "desc": "Scrubber absorption of BCl3 offgas generating boric and hydrochloric acids.",
    "type": "metathesis",
    "effects": [],
    "net": "BCl3 + 3 H2O → H3BO3 + 3 HCl"
  },
  {
    "id": "semi-bcl3-caustic-scrubber",
    "name": "Caustic scrubber absorption of boron trichloride fumes",
    "reactants": [
      "bcl3",
      "naoh"
    ],
    "products": [
      "h3bo3",
      "nacl"
    ],
    "enthalpy": -395,
    "desc": "Alkaline scrubber neutralization generating sodium chloride and sodium borate buffer.",
    "type": "metathesis",
    "effects": [],
    "net": "BCl3 + 3 NaOH → H3BO3 + 3 NaCl"
  },
  {
    "id": "semi-bf3-hydrolysis-fluoroboric",
    "name": "Exothermic hydrolysis of boron trifluoride generating boric and fluoroboric acids",
    "reactants": [
      "bf3",
      "water"
    ],
    "products": [
      "h3bo3",
      "hbf4"
    ],
    "enthalpy": -170,
    "desc": "Scrubber neutralization of BF3 ion implanter exhaust streams.",
    "type": "metathesis",
    "effects": [],
    "net": "4 BF3 + 3 H2O → H3BO3 + 3 HBF4"
  },
  {
    "id": "semi-pocl3-oxygen-doping-drivein",
    "name": "POCl3 liquid bubbler doping: oxidation generating phosphorus pentoxide dopant glass",
    "reactants": [
      "pocl3",
      "o2"
    ],
    "products": [
      "p4o10",
      "cl2"
    ],
    "enthalpy": -310,
    "desc": "Furnace bubbler oxidation at 900°C depositing PSG dopant glass on silicon wafers for n+ emitter diffusion.",
    "type": "synthesis",
    "effects": [],
    "net": "4 POCl3 + 3 O2 → P4O10 + 6 Cl2"
  },
  {
    "id": "semi-as2o3-c-reduction-doping",
    "name": "Carbothermic reduction of arsenic trioxide dopant source to elemental arsenic",
    "reactants": [
      "as2o3",
      "c"
    ],
    "products": [
      "as",
      "co"
    ],
    "enthalpy": 310,
    "desc": "High-temperature sublimation and reduction generating arsenic vapor for capsule diffusion.",
    "type": "synthesis",
    "effects": [],
    "net": "As2O3 + 3 C → 2 As + 3 CO"
  },
  {
    "id": "semi-as2o3-h2-reduction-doping",
    "name": "Hydrogen reduction of arsenic trioxide",
    "reactants": [
      "as2o3",
      "h2"
    ],
    "products": [
      "as",
      "water"
    ],
    "enthalpy": 140,
    "desc": "Gas-phase reduction generating arsenic dopant vapor.",
    "type": "synthesis",
    "effects": [],
    "net": "As2O3 + 3 H2 → 2 As + 3 H2O"
  },
  {
    "id": "semi-as2o3-co-reduction-doping",
    "name": "Carbon monoxide reduction of arsenic trioxide to elemental arsenic",
    "reactants": [
      "as2o3",
      "co"
    ],
    "products": [
      "as",
      "co2"
    ],
    "enthalpy": -60,
    "desc": "Vapor-phase reduction generating arsenic dopant.",
    "type": "synthesis",
    "effects": [],
    "net": "As2O3 + 3 CO → 2 As + 3 CO2"
  },
  {
    "id": "semi-b2o3-mg-reduction-moissan",
    "name": "Moissan process: magnesiothermic reduction of boron trioxide to crystalline boron",
    "reactants": [
      "b2o3",
      "mg"
    ],
    "products": [
      "b",
      "mgo"
    ],
    "enthalpy": -530,
    "desc": "Exothermic magnesiothermic synthesis of elemental amorphous and crystalline boron.",
    "type": "synthesis",
    "effects": [],
    "net": "B2O3 + 3 Mg → 2 B + 3 MgO"
  },
  {
    "id": "semi-wet-etch-boe-silica",
    "name": "Buffered Oxide Etch (BOE): dissolution of silicon dioxide in hydrofluoric acid",
    "reactants": [
      "sio2",
      "hf"
    ],
    "products": [
      "h2sif6",
      "water"
    ],
    "enthalpy": -135,
    "desc": "Isotropic wet etching of thermal and LPCVD silicon dioxide at controlled etch rates.",
    "type": "metathesis",
    "effects": [],
    "net": "SiO2 + 6 HF → H2SiF6 + 2 H2O"
  },
  {
    "id": "semi-wet-etch-hna-silicon",
    "name": "HNA isotropic silicon etching: redox dissolution of silicon in HF and nitric acid",
    "reactants": [
      "si",
      "hno3",
      "hf"
    ],
    "products": [
      "h2sif6",
      "no",
      "water"
    ],
    "enthalpy": -1480,
    "desc": "High-rate isotropic wet etching of silicon wafers and MEMS diaphragm micromachining.",
    "type": "synthesis",
    "effects": [],
    "net": "3 Si + 4 HNO3 + 18 HF → 3 H2SiF6 + 4 NO + 8 H2O"
  },
  {
    "id": "semi-anisotropic-etch-koh-silicon",
    "name": "Anisotropic silicon micromachining: crystallographic etching of Si(100) by potassium hydroxide",
    "reactants": [
      "si",
      "koh",
      "water"
    ],
    "products": [
      "k2sio3",
      "h2"
    ],
    "enthalpy": -340,
    "desc": "Crystallographic anisotropic wet etch terminating on Si(111) planes to form pyramidal V-grooves.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 2 KOH + H2O → K2SiO3 + 2 H2"
  },
  {
    "id": "semi-anisotropic-etch-naoh-silicon",
    "name": "Alkaline anisotropic silicon etching in hot sodium hydroxide bath",
    "reactants": [
      "si",
      "naoh",
      "water"
    ],
    "products": [
      "na2sio3",
      "h2"
    ],
    "enthalpy": -335,
    "desc": "Solar cell wafer texturization creating light-trapping random surface micro-pyramids.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 2 NaOH + H2O → Na2SiO3 + 2 H2"
  },
  {
    "id": "semi-wet-etch-pan-aluminum",
    "name": "PAN etch: phosphoric-nitric acid wet pattern etching of aluminum metallization",
    "reactants": [
      "al",
      "h3po4"
    ],
    "products": [
      "alpo4",
      "h2"
    ],
    "enthalpy": -510,
    "desc": "Standard chemical wet etching of aluminum interconnect lines and bond pads.",
    "type": "synthesis",
    "effects": [],
    "net": "2 Al + 2 H3PO4 → 2 AlPO4 + 3 H2"
  },
  {
    "id": "semi-wet-etch-germanium-peroxide",
    "name": "Chemical dissolution and oxidation of germanium wafers in hydrogen peroxide",
    "reactants": [
      "ge",
      "h2o2"
    ],
    "products": [
      "geo2",
      "water"
    ],
    "enthalpy": -460,
    "desc": "Isotropic chemical polishing of germanium surfaces prior to molecular beam epitaxy.",
    "type": "synthesis",
    "effects": [],
    "net": "Ge + 2 H2O2 → GeO2 + 2 H2O"
  },
  {
    "id": "semi-germanium-nitric-etch",
    "name": "Nitric acid oxidation and wet chemical etching of germanium wafers",
    "reactants": [
      "ge",
      "hno3"
    ],
    "products": [
      "geo2",
      "no2",
      "water"
    ],
    "enthalpy": -280,
    "desc": "Controlled chemical etching of germanium p-channel devices.",
    "type": "synthesis",
    "effects": [],
    "net": "Ge + 4 HNO3 → GeO2 + 4 NO2 + 2 H2O"
  },
  {
    "id": "semi-germanium-sulfuric-etch",
    "name": "Hot sulfuric acid chemical oxidation of germanium",
    "reactants": [
      "ge",
      "h2so4"
    ],
    "products": [
      "geo2",
      "so2",
      "water"
    ],
    "enthalpy": -190,
    "desc": "Sulfuric acid chemical surface treatment.",
    "type": "synthesis",
    "effects": [],
    "net": "Ge + 2 H2SO4 → GeO2 + 2 SO2 + 2 H2O"
  },
  {
    "id": "semi-rca-sc1-clean-peroxide",
    "name": "RCA Standard Clean 1 (SC-1): peroxide oxidation of silicon wafer surface",
    "reactants": [
      "si",
      "h2o2"
    ],
    "products": [
      "sio2",
      "water"
    ],
    "enthalpy": -480,
    "desc": "Peroxide oxidation removing metallic and organic contaminants during RCA SC-1 clean.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 2 H2O2 → SiO2 + 2 H2O"
  },
  {
    "id": "semi-piranha-organic-strip",
    "name": "Piranha etch / SPM clean: complete wet oxidation of organic photoresist residues",
    "reactants": [
      "c",
      "h2o2"
    ],
    "products": [
      "co2",
      "water"
    ],
    "enthalpy": -540,
    "desc": "Sulfuric-peroxide mixture (SPM) aggressively burning stubborn crosslinked photoresist polymers.",
    "type": "synthesis",
    "effects": [],
    "net": "C + 2 H2O2 → CO2 + 2 H2O"
  },
  {
    "id": "semi-silicon-nitride-steam-oxidation",
    "name": "Steam oxidation of silicon nitride masking films during LOCOS process",
    "reactants": [
      "si3n4",
      "water"
    ],
    "products": [
      "sio2",
      "ammonia"
    ],
    "enthalpy": -140,
    "desc": "Slow hydrothermal oxidation of silicon nitride barrier in LOCOS oxidation furnaces.",
    "type": "synthesis",
    "effects": [],
    "net": "Si3N4 + 6 H2O → 3 SiO2 + 4 NH3"
  },
  {
    "id": "semi-silicon-nitride-hf-etch",
    "name": "Hydrofluoric acid dissolution of silicon nitride thin films",
    "reactants": [
      "si3n4",
      "hf"
    ],
    "products": [
      "h2sif6",
      "ammonia"
    ],
    "enthalpy": -390,
    "desc": "Slow isotropic wet etching of silicon nitride in concentrated HF baths.",
    "type": "metathesis",
    "effects": [],
    "net": "Si3N4 + 18 HF → 3 H2SiF6 + 4 NH3"
  },
  {
    "id": "semi-silicon-nitride-hcl-decomposition",
    "name": "High-temperature anhydrous HCl vapor etching of silicon nitride",
    "reactants": [
      "si3n4",
      "hcl"
    ],
    "products": [
      "sicl4",
      "ammonia"
    ],
    "enthalpy": -210,
    "desc": "Gas-phase etching and reactor cleaning stripping residual silicon nitride coatings.",
    "type": "synthesis",
    "effects": [],
    "net": "Si3N4 + 12 HCl → 3 SiCl4 + 4 NH3"
  },
  {
    "id": "semi-copper-cmp-slurry-etch",
    "name": "Copper chemical mechanical planarization (CMP): etching in acidic peroxide slurry",
    "reactants": [
      "cu",
      "h2o2",
      "hcl"
    ],
    "products": [
      "cucl2",
      "water"
    ],
    "enthalpy": -320,
    "desc": "Dual-damascene slurry etching converting metallic copper overburden into soluble cupric chloride.",
    "type": "synthesis",
    "effects": [],
    "net": "Cu + H2O2 + 2 HCl → CuCl2 + 2 H2O"
  },
  {
    "id": "semi-rie-silicon-chlorine",
    "name": "Reactive Ion Etching (RIE): anisotropic plasma etching of silicon by chlorine radicals",
    "reactants": [
      "si",
      "cl2"
    ],
    "products": [
      "sicl4"
    ],
    "enthalpy": -660,
    "desc": "High-density inductively coupled plasma (ICP) etching of deep silicon trenches and STI isolation.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 2 Cl2 → SiCl4"
  },
  {
    "id": "semi-rie-silicon-fluorine",
    "name": "Plasma etching of silicon by atomic fluorine radicals",
    "reactants": [
      "si",
      "f2"
    ],
    "products": [
      "sif4"
    ],
    "enthalpy": -1610,
    "desc": "Ultra-fast spontaneous chemical etching of silicon in SF6/NF3 downstream plasma.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 2 F2 → SiF4"
  },
  {
    "id": "semi-rie-silica-fluorine",
    "name": "Plasma reactive ion etching of silicon dioxide by fluorine radicals",
    "reactants": [
      "sio2",
      "f2"
    ],
    "products": [
      "sif4",
      "o2"
    ],
    "enthalpy": -700,
    "desc": "Fluorocarbon plasma etching of contact contact vias through interlevel dielectric oxides.",
    "type": "synthesis",
    "effects": [],
    "net": "SiO2 + 2 F2 → SiF4 + O2"
  },
  {
    "id": "semi-rie-nitride-fluorine",
    "name": "Plasma etching of silicon nitride in fluorine plasma",
    "reactants": [
      "si3n4",
      "f2"
    ],
    "products": [
      "sif4",
      "n2"
    ],
    "enthalpy": -3100,
    "desc": "Selective plasma etching of silicon nitride masking layers in CF4/O2 discharges.",
    "type": "synthesis",
    "effects": [],
    "net": "Si3N4 + 6 F2 → 3 SiF4 + 2 N2"
  },
  {
    "id": "semi-rie-tin-chlorine",
    "name": "Chlorine RIE plasma etching of titanium nitride diffusion barrier",
    "reactants": [
      "tin",
      "cl2"
    ],
    "products": [
      "ticl4",
      "n2"
    ],
    "enthalpy": -466,
    "desc": "Plasma etching of TiN hard masks and capacitor electrode layers in BCl3/Cl2 plasma.",
    "type": "synthesis",
    "effects": [],
    "net": "2 TiN + 4 Cl2 → 2 TiCl4 + N2"
  },
  {
    "id": "semi-rie-tungsten-fluorine",
    "name": "Fluorine plasma etching of tungsten interconnect plugs and vias",
    "reactants": [
      "w",
      "f2"
    ],
    "products": [
      "wf6"
    ],
    "enthalpy": -1720,
    "desc": "Chemical etching of tungsten in SF6 plasma during chemical-mechanical recess polish.",
    "type": "synthesis",
    "effects": [],
    "net": "W + 3 F2 → WF6"
  },
  {
    "id": "semi-rie-bcl3-aluminum-clean",
    "name": "BCl3 plasma reactive ion etching of aluminum: native oxide reduction",
    "reactants": [
      "al",
      "bcl3"
    ],
    "products": [
      "alcl3",
      "b"
    ],
    "enthalpy": -195,
    "desc": "Addition of BCl3 to break native Al2O3 film allowing rapid anisotropic aluminum line etching.",
    "type": "synthesis",
    "effects": [],
    "net": "Al + BCl3 → AlCl3 + B"
  },
  {
    "id": "semi-bcl3-plasma-dissociation",
    "name": "Plasma dissociation of boron trichloride generating active chlorine radicals",
    "reactants": [
      "bcl3"
    ],
    "products": [
      "b",
      "cl2"
    ],
    "enthalpy": 405,
    "desc": "RF plasma cracking in RIE chambers generating directional reactive etching radicals.",
    "type": "decomposition",
    "effects": [],
    "net": "2 BCl3 → 2 B + 3 Cl2"
  },
  {
    "id": "semi-germanium-chlorine-rie",
    "name": "Chlorine plasma reactive ion etching of germanium channels",
    "reactants": [
      "ge",
      "cl2"
    ],
    "products": [
      "gecl4"
    ],
    "enthalpy": -530,
    "desc": "Anisotropic ICP etching of high-mobility Ge p-MOSFET fin structures.",
    "type": "synthesis",
    "effects": [],
    "net": "Ge + 2 Cl2 → GeCl4"
  },
  {
    "id": "semi-germanium-oxidation-plasma",
    "name": "Oxygen plasma ashing: surface re-oxidation of germanium",
    "reactants": [
      "ge",
      "o2"
    ],
    "products": [
      "geo2"
    ],
    "enthalpy": -580,
    "desc": "Downstream oxygen plasma oxidation and stripping.",
    "type": "synthesis",
    "effects": [],
    "net": "Ge + O2 → GeO2"
  },
  {
    "id": "semi-silicon-carbide-chlorine-rie",
    "name": "High-temperature chlorine ICP etching of silicon carbide power devices",
    "reactants": [
      "sic",
      "cl2"
    ],
    "products": [
      "sicl4",
      "c"
    ],
    "enthalpy": -380,
    "desc": "Plasma trench etching of SiC power MOSFETs using Cl2/BCl3 chemistry.",
    "type": "synthesis",
    "effects": [],
    "net": "SiC + 2 Cl2 → SiCl4 + C"
  },
  {
    "id": "semi-tin-nitric-stripping",
    "name": "Chemical stripping of titanium nitride hard masks in hot nitric acid",
    "reactants": [
      "tin",
      "hno3"
    ],
    "products": [
      "tio2",
      "no2",
      "water"
    ],
    "enthalpy": -680,
    "desc": "Selective wet chemical strip removing TiN barrier films without etching oxide.",
    "type": "synthesis",
    "effects": [],
    "net": "TiN + 8 HNO3 → TiO2 + 9 NO2 + 4 H2O"
  },
  {
    "id": "semi-silicon-nitride-nitric-etch",
    "name": "High-temperature wet oxidation and digestion of silicon nitride by nitric acid",
    "reactants": [
      "si3n4",
      "hno3"
    ],
    "products": [
      "sio2",
      "no2",
      "water",
      "n2"
    ],
    "enthalpy": -920,
    "desc": "Chemical digestion and cleaning of silicon nitride residues.",
    "type": "synthesis",
    "effects": [],
    "net": "5 Si3N4 + 28 HNO3 → 15 SiO2 + 20 NO2 + 14 H2O + 14 N2"
  },
  {
    "id": "semi-b2o3-carbothermic-reduction",
    "name": "Carbothermic reduction of boron trioxide in arc furnace",
    "reactants": [
      "b2o3",
      "c"
    ],
    "products": [
      "b",
      "co"
    ],
    "enthalpy": 780,
    "desc": "High-temperature carbothermic reduction synthesizing technical grade boron.",
    "type": "synthesis",
    "effects": [],
    "net": "B2O3 + 3 C → 2 B + 3 CO"
  },
  {
    "id": "semi-b2o3-aluminothermic-reduction",
    "name": "Aluminothermic reduction of boron trioxide to elemental boron",
    "reactants": [
      "b2o3",
      "al"
    ],
    "products": [
      "b",
      "al2o3"
    ],
    "enthalpy": -510,
    "desc": "Aluminothermic synthesis of pure boron.",
    "type": "synthesis",
    "effects": [],
    "net": "B2O3 + 2 Al → 2 B + Al2O3"
  },
  {
    "id": "semi-silicon-carbide-cvd-methane",
    "name": "CVD epitaxy of 4H/6H silicon carbide from silane and propane/methane",
    "reactants": [
      "sih4",
      "ch4"
    ],
    "products": [
      "sic",
      "h2"
    ],
    "enthalpy": 120,
    "desc": "High-temperature MOCVD at 1600°C growing wide bandgap SiC epilayers for electric vehicle inverters.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH4 + CH4 → SiC + 4 H2"
  },
  {
    "id": "semi-silicon-carbide-dcs-methane",
    "name": "Silicon carbide CVD deposition from dichlorosilane and methane",
    "reactants": [
      "sih2cl2",
      "ch4"
    ],
    "products": [
      "sic",
      "hcl",
      "h2"
    ],
    "enthalpy": 85,
    "desc": "Chlorine-enhanced CVD growth of thick SiC epitaxial layers with high growth rates.",
    "type": "synthesis",
    "effects": [],
    "net": "SiH2Cl2 + CH4 → SiC + 2 HCl + 2 H2"
  },
  {
    "id": "semi-silicon-carbide-oxidation",
    "name": "Thermal gate oxidation of silicon carbide in pure oxygen",
    "reactants": [
      "sic",
      "o2"
    ],
    "products": [
      "sio2",
      "co"
    ],
    "enthalpy": -940,
    "desc": "High-temperature furnace oxidation at 1200°C growing SiO2 gate dielectric on SiC MOSFETs.",
    "type": "synthesis",
    "effects": [],
    "net": "2 SiC + 3 O2 → 2 SiO2 + 2 CO"
  },
  {
    "id": "semi-silicon-carbide-steam-oxidation",
    "name": "Pyrogenic steam oxidation of silicon carbide",
    "reactants": [
      "sic",
      "water"
    ],
    "products": [
      "sio2",
      "co",
      "h2"
    ],
    "enthalpy": -460,
    "desc": "Wet oxidation of SiC power device wafers.",
    "type": "synthesis",
    "effects": [],
    "net": "SiC + 3 H2O → SiO2 + CO + 3 H2"
  },
  {
    "id": "semi-tin-oxidation-barrier",
    "name": "Thermal oxidation of titanium nitride barrier layer in oxygen atmosphere",
    "reactants": [
      "tin",
      "o2"
    ],
    "products": [
      "tio2",
      "n2"
    ],
    "enthalpy": -750,
    "desc": "Thermal stability degradation of TiN barriers under oxidizing anneals converting to TiO2.",
    "type": "synthesis",
    "effects": [],
    "net": "2 TiN + 2 O2 → 2 TiO2 + N2"
  },
  {
    "id": "semi-tin-steam-oxidation",
    "name": "Steam oxidation of titanium nitride films",
    "reactants": [
      "tin",
      "water"
    ],
    "products": [
      "tio2",
      "n2",
      "h2"
    ],
    "enthalpy": -310,
    "desc": "Corrosion and hydrothermal oxidation of TiN coatings.",
    "type": "synthesis",
    "effects": [],
    "net": "2 TiN + 4 H2O → 2 TiO2 + N2 + 4 H2"
  },
  {
    "id": "semi-silicon-nitride-thermal-oxidation",
    "name": "Thermal oxidation of silicon nitride masking films during LOCOS process",
    "reactants": [
      "si3n4",
      "o2"
    ],
    "products": [
      "sio2",
      "n2"
    ],
    "enthalpy": -1980,
    "desc": "Local Oxidation of Silicon (LOCOS): slow oxidation of silicon nitride mask in high-temperature steam.",
    "type": "synthesis",
    "effects": [],
    "net": "Si3N4 + 3 O2 → 3 SiO2 + 2 N2"
  },
  {
    "id": "semi-silicon-thermal-dry-oxidation-rapid",
    "name": "Rapid thermal oxidation (RTO): ultra-thin gate oxide growth",
    "reactants": [
      "si",
      "o2"
    ],
    "products": [
      "sio2"
    ],
    "enthalpy": -910,
    "desc": "Rapid thermal processing (RTP) forming 1-2 nm gate dielectrics.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + O2 → SiO2"
  },
  {
    "id": "semi-silicon-thermal-wet-oxidation-pyro",
    "name": "Pyrogenic steam torch oxidation of silicon wafers",
    "reactants": [
      "si",
      "water"
    ],
    "products": [
      "sio2",
      "h2"
    ],
    "enthalpy": -430,
    "desc": "Wet thermal field oxide growth.",
    "type": "synthesis",
    "effects": [],
    "net": "Si + 2 H2O → SiO2 + 2 H2"
  },
  {
    "id": "semi-silicon-ammonia-direct-nitridation",
    "name": "Direct thermal nitridation: synthesis of ultrathin silicon nitride dielectric",
    "reactants": [
      "si",
      "ammonia"
    ],
    "products": [
      "si3n4",
      "h2"
    ],
    "enthalpy": -490,
    "desc": "Rapid thermal processing (RTP) at 1000°C growing ultrathin Si3N4 gate dielectric.",
    "type": "synthesis",
    "effects": [],
    "net": "3 Si + 4 NH3 → Si3N4 + 6 H2"
  },
  {
    "id": "semi-silicon-nitrogen-nitridation",
    "name": "Direct high-temperature nitridation of silicon by nitrogen plasma",
    "reactants": [
      "si",
      "n2"
    ],
    "products": [
      "si3n4"
    ],
    "enthalpy": -745,
    "desc": "Thermal nitridation forming stoichiometric silicon nitride ceramic.",
    "type": "synthesis",
    "effects": [],
    "net": "3 Si + 2 N2 → Si3N4"
  },
  {
    "id": "semi-bf3-silicon-plasma-etch",
    "name": "Boron trifluoride plasma etching of silicon with simultaneous p-type doping",
    "reactants": [
      "si",
      "bf3"
    ],
    "products": [
      "sif4",
      "b"
    ],
    "enthalpy": -380,
    "desc": "Plasma doping and reactive etching creating shallow p+ source/drain extensions.",
    "type": "synthesis",
    "effects": [],
    "net": "3 Si + 4 BF3 → 3 SiF4 + 4 B"
  },
  {
    "id": "semi-dcs-hydrolysis-scrubber-waste",
    "name": "Scrubber hydrolysis of dichlorosilane fumes",
    "reactants": [
      "sih2cl2",
      "water"
    ],
    "products": [
      "sio2",
      "hcl",
      "h2"
    ],
    "enthalpy": -280,
    "desc": "Emergency scrubbing of DCS leaks preventing toxic chlorosilane release.",
    "type": "metathesis",
    "effects": [],
    "net": "SiH2Cl2 + 2 H2O → SiO2 + 2 HCl + 2 H2"
  },
  {
    "id": "semi-tcs-caustic-scrubber",
    "name": "Alkaline scrubber neutralization of trichlorosilane fumes by caustic soda",
    "reactants": [
      "sihcl3",
      "naoh"
    ],
    "products": [
      "sio2",
      "nacl",
      "water",
      "h2"
    ],
    "enthalpy": -380,
    "desc": "Emergency scrubber absorption of TCS vapor generating sodium chloride, hydrated silica, and hydrogen gas.",
    "type": "metathesis",
    "effects": [],
    "net": "SiHCl3 + 3 NaOH → SiO2 + 3 NaCl + H2O + H2"
  }
];
