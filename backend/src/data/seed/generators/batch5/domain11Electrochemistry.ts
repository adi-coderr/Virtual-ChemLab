import { addReaction } from "./generateBatch5.js";

export function buildDomain11Electrochemistry(): void {
  // Domain 11: 100 Electrochemistry, Battery Chemistry & Redox Half-Cell Reactions
  const reactions = [
    // 1. Lead-Acid Battery Systems (Discharge & Charge) (6)
    {
      id: "electro-lead-acid-discharge",
      name: "Lead-acid battery discharge reaction",
      reactants: ["pb", "pbo2", "h2so4"],
      products: ["pbso4", "water"],
      enthalpy: -361.0,
      desc: "Spontaneous galvanic discharge in a lead-acid car battery; sponge lead and brown lead dioxide convert into white lead sulfate crystals.",
      net: "Pb + PbO2 + 2H2SO4 → 2PbSO4 + 2H2O"
    },
    {
      id: "electro-lead-acid-charge",
      name: "Lead-acid battery electrolytic recharging",
      reactants: ["pbso4", "water"],
      products: ["pb", "pbo2", "h2so4"],
      enthalpy: 361.0,
      desc: "Electrolytic charging regenerates grey sponge lead at the negative plate and dark chocolate-brown PbO2 at the positive plate.",
      net: "2PbSO4 + 2H2O → Pb + PbO2 + 2H2SO4"
    },
    {
      id: "electro-pbo2-hcl-redox",
      name: "Oxidation of hydrochloric acid by lead(IV) oxide",
      reactants: ["pbo2", "hcl"],
      products: ["pbcl2", "cl2", "water"],
      enthalpy: -65.0,
      desc: "Brown PbO2 dissolves upon heating in concentrated HCl, evolving greenish-yellow toxic chlorine gas.",
      net: "PbO2 + 4HCl → PbCl2 + Cl2 + 2H2O"
    },
    {
      id: "electro-pbo2-hno3-nano2",
      name: "Reduction of lead(IV) oxide by sodium nitrite in nitric acid",
      reactants: ["pbo2", "nano2", "hno3"],
      products: ["pbno32", "nano3", "water"],
      enthalpy: -165.0,
      desc: "Dark brown insoluble PbO2 powder rapidly dissolves in warm dilute nitric acid containing sodium nitrite.",
      net: "PbO2 + NO2- + 2H+ → Pb2+ + NO3- + H2O"
    },
    {
      id: "electro-pbo2-so2",
      name: "Dry absorption of sulfur dioxide by lead(IV) oxide",
      reactants: ["pbo2", "so2"],
      products: ["pbso4"],
      enthalpy: -355.0,
      desc: "Glowing brown PbO2 rapidly absorbs sulfur dioxide gas, turning into white lead(II) sulfate.",
      net: "PbO2 + SO2 → PbSO4"
    },
    {
      id: "electro-pb-sulfate-c-reduction",
      name: "Smelting reduction of lead(II) sulfate with carbon",
      reactants: ["pbso4", "c"],
      products: ["pb", "so2", "co2"],
      enthalpy: 220.0,
      desc: "High-temperature carbon reduction yields dense molten lead metal with evolution of SO2 and CO2 gases.",
      net: "2PbSO4 + C → 2Pb + 2SO2 + CO2"
    },

    // 2. Nickel-Cadmium & Alkaline Battery Chemistry (10)
    {
      id: "electro-nicad-discharge",
      name: "Nickel-cadmium secondary cell discharge",
      reactants: ["cd", "niooh", "water"],
      products: ["cd-oh-2", "nioh2"],
      enthalpy: -285.0,
      desc: "Discharge of NiCd cell: metallic cadmium anode and black NiOOH cathode convert to white and pale green hydroxides.",
      net: "Cd + 2NiOOH + 2H2O → Cd(OH)2 + 2Ni(OH)2"
    },
    {
      id: "electro-nicad-recharge",
      name: "Nickel-cadmium cell electrolytic recharge",
      reactants: ["cd-oh-2", "nioh2"],
      products: ["cd", "niooh", "water"],
      enthalpy: 285.0,
      desc: "Applied charging potential reverses the cell chemistry, regenerating active cadmium and nickel oxyhydroxide.",
      net: "Cd(OH)2 + 2Ni(OH)2 → Cd + 2NiOOH + 2H2O"
    },
    {
      id: "electro-niooh-hcl",
      name: "Reduction of nickel(III) oxyhydroxide by hydrochloric acid",
      reactants: ["niooh", "hcl"],
      products: ["nicl2", "cl2", "water"],
      enthalpy: -72.0,
      desc: "Black NiOOH solid dissolves into emerald-green NiCl2 solution, releasing pungent chlorine gas.",
      net: "2NiOOH + 6HCl → 2NiCl2 + Cl2 + 4H2O"
    },
    {
      id: "electro-alkaline-cell-discharge",
      name: "Alkaline manganese battery discharge",
      reactants: ["zn", "mno2"],
      products: ["zno", "mn2o3"],
      enthalpy: -264.0,
      desc: "Primary alkaline battery reaction: zinc gel oxidizes at the anode while electrolytic manganese dioxide is reduced.",
      net: "Zn + 2MnO2 → ZnO + Mn2O3"
    },
    {
      id: "electro-alkaline-mg-mno2",
      name: "Magnesium-manganese dioxide reserve battery discharge",
      reactants: ["mg", "mno2", "water"],
      products: ["mgoh2", "mn2o3"],
      enthalpy: -540.0,
      desc: "Reserve battery discharge: magnesium anode oxidizes in aqueous electrolyte while manganese dioxide reduces to manganese(III) oxyhydroxide.",
      net: "Mg + 2MnO2 + 2H2O → Mg(OH)2 + 2MnOOH"
    },
    {
      id: "electro-licoo2-delithiation",
      name: "Lithium cobalt oxide chemical delithiation with bromine",
      reactants: ["licoo2", "br2"],
      products: ["coo2", "libr"],
      enthalpy: -45.0,
      desc: "Chemical extraction of lithium from layered LiCoO2 cathode material using elemental bromine.",
      net: "2LiCoO2 + Br2 → 2CoO2 + 2LiBr"
    },
    {
      id: "electro-licoo2-delithiation-cl2",
      name: "Chemical delithiation of lithium cobalt oxide with chlorine",
      reactants: ["licoo2", "cl2"],
      products: ["coo2", "licl"],
      enthalpy: -88.0,
      desc: "Chlorine gas oxidizes LiCoO2 into black delithiated CoO2 host structure and soluble lithium chloride.",
      net: "2LiCoO2 + Cl2 → 2CoO2 + 2LiCl"
    },
    {
      id: "electro-zn-air-cell",
      name: "Zinc-air battery cell discharge",
      reactants: ["zn", "o2"],
      products: ["zno"],
      enthalpy: -348.0,
      desc: "Atmospheric oxygen enters through gas-diffusion cathode, reacting with zinc to produce white zinc oxide.",
      net: "2Zn + O2 → 2ZnO"
    },
    {
      id: "electro-al-air-cell",
      name: "Aluminium-air battery overall discharge",
      reactants: ["al", "o2", "water"],
      products: ["al-oh-3"],
      enthalpy: -1050.0,
      desc: "High-capacity metal-air battery reaction precipitating white gelatinous aluminium hydroxide.",
      net: "4Al + 3O2 + 6H2O → 4Al(OH)3"
    },
    {
      id: "electro-fe-air-cell",
      name: "Iron-air grid storage battery discharge",
      reactants: ["fe", "o2", "water"],
      products: ["feoh2"],
      enthalpy: -540.0,
      desc: "Grid-scale long-duration energy storage cell discharge producing iron(II) hydroxide.",
      net: "2Fe + O2 + 2H2O → 2Fe(OH)2"
    },

    // 3. Vanadium Redox Flow Battery Systems (10)
    {
      id: "electro-vrb-v4-v2-comproportionation",
      name: "Vanadium(IV) and vanadium(II) comproportionation to vanadium(III) chloride",
      reactants: ["vcl4", "vcl2"],
      products: ["vcl3"],
      enthalpy: -75.0,
      desc: "Reddish-brown vanadium tetrachloride comproportionates with violet vanadium dichloride to yield green vanadium trichloride.",
      net: "VCl4 + VCl2 → 2VCl3"
    },
    {
      id: "electro-vrb-reduction-v5-to-v4-so2",
      name: "Synthesis of vanadyl sulfate electrolyte via sulfur dioxide reduction",
      reactants: ["v2o5", "so2", "h2so4"],
      products: ["voso4", "water"],
      enthalpy: -130.0,
      desc: "Industrial synthesis of VRFB electrolyte: insoluble yellow V2O5 dissolves upon reduction with SO2 to yield deep blue VOSO4.",
      net: "V2O5 + SO2 + H2SO4 → 2VOSO4 + H2O"
    },
    {
      id: "electro-vrb-reduction-v4-to-v3-zn",
      name: "Reduction of vanadyl chloride by zinc in acid",
      reactants: ["vocl2", "zn", "hcl"],
      products: ["vcl3", "zncl2", "water"],
      enthalpy: -195.0,
      desc: "Vibrant royal blue VO2+ solution turns rich emerald-green as vanadium is reduced from V(IV) to V(III).",
      net: "2VOCl2 + Zn + 4HCl → 2VCl3 + ZnCl2 + 2H2O"
    },
    {
      id: "electro-vrb-reduction-v3-to-v2-zn",
      name: "Reduction of vanadium(III) to vanadium(II) by zinc metal",
      reactants: ["vcl3", "zn"],
      products: ["vcl2", "zncl2"],
      enthalpy: -140.0,
      desc: "Green vanadium(III) solution turns into a striking deep purple/lavender vanadium(II) state under inert gas.",
      net: "2VCl3 + Zn → 2VCl2 + ZnCl2"
    },
    {
      id: "electro-vrb-reduction-v3-to-v2-mg",
      name: "Magnesium reduction of vanadium(III) chloride",
      reactants: ["vcl3", "mg"],
      products: ["vcl2", "mgcl2"],
      enthalpy: -310.0,
      desc: "Active magnesium ribbon reduces emerald-green V(III) solution to violet V(II) with slight effervescence.",
      net: "2VCl3 + Mg → 2VCl2 + MgCl2"
    },
    {
      id: "electro-vrb-reduction-v3-to-v2-al",
      name: "Aluminium reduction of vanadium(III) chloride",
      reactants: ["vcl3", "al"],
      products: ["vcl2", "alcl3"],
      enthalpy: -220.0,
      desc: "Aluminium foil smoothly reduces trivalent green vanadium ions to divalent lavender ions.",
      net: "3VCl3 + Al → 3VCl2 + AlCl3"
    },
    {
      id: "electro-v2o5-reduction-hcl",
      name: "Reduction of vanadium pentoxide by concentrated hydrochloric acid",
      reactants: ["v2o5", "hcl"],
      products: ["vocl2", "cl2", "water"],
      enthalpy: -145.0,
      desc: "Orange V2O5 dissolves in hot concentrated HCl with evolution of chlorine gas, yielding dark blue vanadyl chloride solution.",
      net: "V2O5 + 6HCl → 2VOCl2 + Cl2 + 3H2O"
    },
    {
      id: "electro-v2o5-reduction-oxalic",
      name: "Reduction of vanadium pentoxide by oxalic acid",
      reactants: ["v2o5", "h2c2o4", "h2so4"],
      products: ["voso4", "co2", "water"],
      enthalpy: -260.0,
      desc: "V2O5 reacts with oxalic acid, vigorously bubbling carbon dioxide while developing a brilliant sky-blue color.",
      net: "V2O5 + H2C2O4 + 2H2SO4 → 2VOSO4 + 2CO2 + 3H2O"
    },
    {
      id: "electro-vcl2-air-oxidation",
      name: "Spontaneous aerial oxidation of vanadium(II) chloride",
      reactants: ["vcl2", "o2", "hcl"],
      products: ["vcl3", "water"],
      enthalpy: -290.0,
      desc: "Air-sensitive lavender V(II) solution oxidizes almost instantly on exposure to air back to grass-green V(III).",
      net: "4VCl2 + O2 + 4HCl → 4VCl3 + 2H2O"
    },
    {
      id: "electro-vcl3-h2o2-oxidation",
      name: "Rapid oxidation of vanadium(III) by hydrogen peroxide",
      reactants: ["vcl3", "h2o2"],
      products: ["vo2cl", "hcl"],
      enthalpy: -180.0,
      desc: "Green vanadium(III) solution flashes golden yellow as H2O2 oxidizes it to pervanadyl VO2+ ions.",
      net: "VCl3 + H2O2 → VO2Cl + 2HCl"
    },

    // 4. Chlor-Alkali & Halide Electrolysis Reactions (14)
    {
      id: "electro-nacl-electrolysis-brine",
      name: "Chlor-alkali industrial electrolysis of aqueous brine",
      reactants: ["nacl", "water"],
      products: ["naoh", "cl2", "h2"],
      enthalpy: 446.0,
      desc: "Industrial diaphragm/membrane cell process: brine splits into caustic soda, chlorine gas, and hydrogen gas.",
      net: "2NaCl + 2H2O → 2NaOH + Cl2 + H2"
    },
    {
      id: "electro-kcl-electrolysis-molten",
      name: "Molten salt electrolysis of potassium chloride",
      reactants: ["kcl"],
      products: ["k", "cl2"],
      enthalpy: 873.0,
      desc: "High-temperature electrolysis of molten KCl yields lustrous liquid potassium metal and chlorine gas.",
      net: "2KCl → 2K + Cl2"
    },
    {
      id: "electro-licl-electrolysis-brine",
      name: "Electrolysis of aqueous lithium chloride",
      reactants: ["licl", "water"],
      products: ["lioh", "cl2", "h2"],
      enthalpy: 442.0,
      desc: "Electrolytic conversion of lithium chloride to lithium hydroxide monohydrate precursor.",
      net: "2LiCl + 2H2O → 2LiOH + Cl2 + H2"
    },
    {
      id: "electro-nabr-electrolysis",
      name: "Electrolysis of aqueous sodium bromide",
      reactants: ["nabr", "water"],
      products: ["naoh", "br2", "h2"],
      enthalpy: 390.0,
      desc: "Electrolytic oxidation yields dense red-brown liquid bromine droplets and caustic soda.",
      net: "2NaBr + 2H2O → 2NaOH + Br2 + H2"
    },
    {
      id: "electro-kbr-electrolysis",
      name: "Electrolysis of aqueous potassium bromide",
      reactants: ["kbr", "water"],
      products: ["koh", "br2", "h2"],
      enthalpy: 392.0,
      desc: "Electrolysis producing red elemental bromine vapor and alkaline KOH solution.",
      net: "2KBr + 2H2O → 2KOH + Br2 + H2"
    },
    {
      id: "electro-nai-electrolysis",
      name: "Electrolysis of aqueous sodium iodide",
      reactants: ["nai", "water"],
      products: ["naoh", "i2", "h2"],
      enthalpy: 310.0,
      desc: "Colorless NaI solution rapidly deposits dark purple-black iodine crystals at the anode.",
      net: "2NaI + 2H2O → 2NaOH + I2 + H2"
    },
    {
      id: "electro-ki-electrolysis",
      name: "Electrolysis of aqueous potassium iodide",
      reactants: ["ki", "water"],
      products: ["koh", "i2", "h2"],
      enthalpy: 312.0,
      desc: "Anode turns deep amber-brown as triiodide and crystalline iodine form during electrolysis.",
      net: "2KI + 2H2O → 2KOH + I2 + H2"
    },
    {
      id: "electro-water-splitting",
      name: "Electrolytic water splitting (alkaline or PEM)",
      reactants: ["water"],
      products: ["h2", "o2"],
      enthalpy: 285.8,
      desc: "Clean hydrogen generation: 2:1 stoichiometric volume ratio of hydrogen and oxygen bubbles evolved at electrodes.",
      net: "2H2O → 2H2 + O2"
    },
    {
      id: "electro-cucl2-electrolysis",
      name: "Electrolytic decomposition of copper(II) chloride",
      reactants: ["cucl2"],
      products: ["cu", "cl2"],
      enthalpy: 220.0,
      desc: "Electrolysis of copper(II) chloride yields salmon-pink metallic copper plated on the cathode and chlorine gas at the anode.",
      net: "CuCl2 → Cu + Cl2"
    },
    {
      id: "electro-znso4-electrowinning",
      name: "Electrowinning of metallic zinc from zinc sulfate",
      reactants: ["znso4", "water"],
      products: ["zn", "h2so4", "o2"],
      enthalpy: 450.0,
      desc: "Industrial electrowinning: silvery-grey metallic zinc deposits on cathode with oxygen evolution.",
      net: "2ZnSO4 + 2H2O → 2Zn + 2H2SO4 + O2"
    },
    {
      id: "electro-agno3-electrolysis",
      name: "Electrolytic silver refining from silver nitrate",
      reactants: ["agno3", "water"],
      products: ["ag", "hno3", "o2"],
      enthalpy: 220.0,
      desc: "Moebius electrolytic cell: brilliant shimmering silver dendritic needles grow outwards from cathode.",
      net: "4AgNO3 + 2H2O → 4Ag + 4HNO3 + O2"
    },
    {
      id: "electro-pbno32-electrolysis",
      name: "Electrolysis of aqueous lead(II) nitrate",
      reactants: ["pbno32", "water"],
      products: ["pb", "pbo2", "hno3"],
      enthalpy: 295.0,
      desc: "Simultaneous deposition of metallic lead at cathode and dark brown lead dioxide at anode.",
      net: "2Pb(NO3)2 + 2H2O → Pb + PbO2 + 4HNO3"
    },
    {
      id: "electro-sncl2-electrolysis",
      name: "Electrolysis of tin(II) chloride solution",
      reactants: ["sncl2", "water"],
      products: ["sn", "cl2", "water"],
      enthalpy: 325.0,
      desc: "Growing tin 'Arbor Dianae' dendrites at cathode and chlorine gas evolution at anode.",
      net: "SnCl2 → Sn + Cl2"
    },
    {
      id: "electro-cdcl2-electrolysis",
      name: "Electrolytic deposition of cadmium metal",
      reactants: ["cdcl2"],
      products: ["cd", "cl2"],
      enthalpy: 391.0,
      desc: "Silvery metallic cadmium plates out smoothly on cathode from cadmium chloride electrolyte.",
      net: "CdCl2 → Cd + Cl2"
    },

    // 5. Thiosulfate, Persulfate & Quantitative Iodometric Couples (20)
    {
      id: "electro-iodometry-na2s2o3-i2",
      name: "Quantitative iodometric titration of iodine with sodium thiosulfate",
      reactants: ["i2", "na2s2o3"],
      products: ["nai", "na2s4o6"],
      enthalpy: -55.0,
      desc: "Deep brown iodine / blue starch indicator instantly decolorizes completely clear at titration endpoint.",
      net: "I2 + 2Na2S2O3 → 2NaI + Na2S4O6"
    },
    {
      id: "electro-iodometry-na2s2o3-br2",
      name: "Reduction of bromine by sodium thiosulfate",
      reactants: ["br2", "na2s2o3", "water"],
      products: ["na2so4", "h2so4", "hbr"],
      enthalpy: -310.0,
      desc: "Pungent red-brown liquid bromine discharges rapidly into colorless aqueous sulfate.",
      net: "4Br2 + Na2S2O3 + 5H2O → Na2SO4 + H2SO4 + 8HBr"
    },
    {
      id: "electro-na2s2o3-cl2-dechlorination",
      name: "Dechlorination of chlorine water by sodium thiosulfate",
      reactants: ["cl2", "na2s2o3", "water"],
      products: ["na2so4", "h2so4", "hcl"],
      enthalpy: -580.0,
      desc: "Greenish chlorine water is completely neutralized and odor eliminated by thiosulfate anti-chlor.",
      net: "4Cl2 + Na2S2O3 + 5H2O → Na2SO4 + H2SO4 + 8HCl"
    },
    {
      id: "electro-na2s2o3-acid-disproportionation",
      name: "Acid-catalyzed clock disproportionation of sodium thiosulfate",
      reactants: ["na2s2o3", "hcl"],
      products: ["nacl", "so2", "s", "water"],
      enthalpy: -16.0,
      desc: "Clear solution turns progressively turbid milky-yellow as colloidal sulfur particles scatter light.",
      net: "Na2S2O3 + 2HCl → 2NaCl + SO2 + S + H2O"
    },
    {
      id: "electro-na2s2o3-h2so4-disproportionation",
      name: "Sulfuric acid disproportionation of sodium thiosulfate",
      reactants: ["na2s2o3", "h2so4"],
      products: ["na2so4", "so2", "s", "water"],
      enthalpy: -18.0,
      desc: "Classic chemical kinetics clock reaction: cloudy sulfur precipitate forms after a temperature-dependent delay.",
      net: "Na2S2O3 + H2SO4 → Na2SO4 + SO2 + S + H2O"
    },
    {
      id: "electro-k2s2o8-ki-kinetics",
      name: "Persulfate-iodide clock reaction",
      reactants: ["k2s2o8", "ki"],
      products: ["k2so4", "i2"],
      enthalpy: -140.0,
      desc: "Colorless mixture turns steadily brown as persulfate oxidizes iodide ions to triiodide / iodine.",
      net: "K2S2O8 + 2KI → 2K2SO4 + I2"
    },
    {
      id: "electro-k2s2o8-feso4-oxidation",
      name: "Oxidation of iron(II) sulfate by potassium persulfate",
      reactants: ["k2s2o8", "feso4"],
      products: ["k2so4", "fe2-so4-3"],
      enthalpy: -185.0,
      desc: "Pale sea-green ferrous solution oxidizes rapidly to deep amber-yellow ferric sulfate.",
      net: "K2S2O8 + 2FeSO4 → K2SO4 + Fe2(SO4)3"
    },
    {
      id: "electro-k2s2o8-mnso4-oxidation",
      name: "Oxidation of manganese(II) to manganese dioxide by persulfate",
      reactants: ["k2s2o8", "mnso4", "water"],
      products: ["k2so4", "mno2", "h2so4"],
      enthalpy: -210.0,
      desc: "Clear Mn2+ solution deposits dense velvety brown-black MnO2 precipitate.",
      net: "K2S2O8 + MnSO4 + 2H2O → K2SO4 + MnO2 + 2H2SO4"
    },
    {
      id: "electro-k2s2o8-agno3-catalyst",
      name: "Silver-catalyzed persulfate oxidation of water",
      reactants: ["k2s2o8", "water"],
      products: ["k2so4", "h2so4", "o2"],
      enthalpy: -110.0,
      desc: "In the presence of catalytic Ag+, persulfate oxidizes water, evolving steady bubbles of oxygen gas.",
      net: "2K2S2O8 + 2H2O → 2K2SO4 + 2H2SO4 + O2"
    },
    {
      id: "electro-k2mno4-disproportionation-acid",
      name: "Acid disproportionation of potassium manganate",
      reactants: ["k2mno4", "h2so4"],
      products: ["kmno4", "mno2", "k2so4", "water"],
      enthalpy: -125.0,
      desc: "Forest-green manganate solution flashes intensely purple (KMnO4) and throws down dark MnO2 solid.",
      net: "3K2MnO4 + 2H2SO4 → 2KMnO4 + MnO2 + 2K2SO4 + 2H2O"
    },
    {
      id: "electro-k2mno4-chlorine-oxidation",
      name: "Industrial synthesis of potassium permanganate via chlorine oxidation",
      reactants: ["k2mno4", "cl2"],
      products: ["kmno4", "kcl"],
      enthalpy: -160.0,
      desc: "Green solution of K2MnO4 turns into brilliant royal deep violet KMnO4 upon bubbling chlorine gas.",
      net: "2K2MnO4 + Cl2 → 2KMnO4 + 2KCl"
    },
    {
      id: "electro-k2mno4-co2-disproportionation",
      name: "Carbon dioxide-mediated disproportionation of potassium manganate",
      reactants: ["k2mno4", "co2", "water"],
      products: ["kmno4", "mno2", "khco3"],
      enthalpy: -95.0,
      desc: "Bubbling CO2 through green manganate converts it cleanly to rich purple permanganate and KHCO3.",
      net: "3K2MnO4 + 4CO2 + 2H2O → 2KMnO4 + MnO2 + 4KHCO3"
    },
    {
      id: "electro-na2c2o4-kmno4-standardization",
      name: "Primary standard titration of permanganate with sodium oxalate",
      reactants: ["kmno4", "na2c2o4", "h2so4"],
      products: ["k2so4", "na2so4", "mnso4", "co2", "water"],
      enthalpy: -940.0,
      desc: "Warm acidic oxalate solution quantitatively discharges purple permanganate with steady bubbling of CO2.",
      net: "2KMnO4 + 5Na2C2O4 + 8H2SO4 → K2SO4 + 5Na2SO4 + 2MnSO4 + 10CO2 + 8H2O"
    },
    {
      id: "electro-h2s-kmno4-redox",
      name: "Redox oxidation of hydrogen sulfide by neutral potassium permanganate",
      reactants: ["kmno4", "h2s"],
      products: ["koh", "mno2", "s", "water"],
      enthalpy: -520.0,
      desc: "Hydrogen sulfide gas decolorizes purple permanganate, precipitating dark brown manganese dioxide and yellow colloidal sulfur.",
      net: "2KMnO4 + 3H2S → 2KOH + 2MnO2 + 3S + 2H2O"
    },
    {
      id: "electro-nano2-kmno4-redox",
      name: "Oxidation of sodium nitrite by potassium permanganate in acid",
      reactants: ["kmno4", "nano2", "h2so4"],
      products: ["k2so4", "nano3", "mnso4", "water"],
      enthalpy: -520.0,
      desc: "Nitrite quantitatively reduces purple permanganate to colorless manganese(II) sulfate.",
      net: "2KMnO4 + 5NaNO2 + 3H2SO4 → K2SO4 + 5NaNO3 + 2MnSO4 + 3H2O"
    },
    {
      id: "electro-k2cr2o7-ki-acid",
      name: "Oxidation of potassium iodide by potassium dichromate in acid",
      reactants: ["k2cr2o7", "ki", "h2so4"],
      products: ["k2so4", "cr2-so4-3", "i2", "water"],
      enthalpy: -510.0,
      desc: "Bright orange dichromate solution turns dark brown-violet from liberated iodine and green Cr(III).",
      net: "K2Cr2O7 + 6KI + 7H2SO4 → 4K2SO4 + Cr2(SO4)3 + 3I2 + 7H2O"
    },
    {
      id: "electro-k2cr2o7-nano2-redox",
      name: "Reduction of acidified potassium dichromate by sodium nitrite",
      reactants: ["k2cr2o7", "nano2", "h2so4"],
      products: ["k2so4", "cr2-so4-3", "nano3", "water"],
      enthalpy: -480.0,
      desc: "Orange dichromate is smoothly reduced to emerald-green chromium(III) sulfate as nitrite oxidizes to nitrate.",
      net: "K2Cr2O7 + 3NaNO2 + 4H2SO4 → K2SO4 + Cr2(SO4)3 + 3NaNO3 + 4H2O"
    },
    {
      id: "electro-fecl3-ki-redox",
      name: "Reduction of iron(III) chloride by potassium iodide",
      reactants: ["fecl3", "ki"],
      products: ["fecl2", "kcl", "i2"],
      enthalpy: -78.0,
      desc: "Yellow-brown ferric solution darkens intensely into dark red-brown as iodine crystals precipitate.",
      net: "2FeCl3 + 2KI → 2FeCl2 + 2KCl + I2"
    },
    {
      id: "electro-cuso4-ki-precipitation-redox",
      name: "Redox precipitation of copper(I) iodide by potassium iodide",
      reactants: ["cuso4", "ki"],
      products: ["cui", "k2so4", "i2"],
      enthalpy: -125.0,
      desc: "Blue Cu2+ solution instantly deposits off-white CuI precipitate in a dense brown iodine solution.",
      net: "2CuSO4 + 4KI → 2CuI + 2K2SO4 + I2"
    },
    {
      id: "electro-cucl2-ki-redox",
      name: "Reduction of copper(II) chloride by potassium iodide",
      reactants: ["cucl2", "ki"],
      products: ["cui", "kcl", "i2"],
      enthalpy: -122.0,
      desc: "Green copper(II) chloride precipitates off-white copper(I) iodide with liberation of iodine.",
      net: "2CuCl2 + 4KI → 2CuI + 4KCl + I2"
    },

    // 6. Advanced Battery Chemistries, ZEBRA Cells & Alkali Metallothermic Reductions (40)
    {
      id: "electro-li-o2-peroxide",
      name: "Lithium-air secondary battery discharge to peroxide",
      reactants: ["li", "o2"],
      products: ["li2o2"],
      enthalpy: -633.0,
      desc: "Lithium anode oxidizes upon oxygen reduction at the porous carbon cathode forming solid Li2O2.",
      net: "2Li + O2 → Li2O2"
    },
    {
      id: "electro-li-li2o2-deep-discharge",
      name: "Deep discharge of lithium-air cell forming monoxide",
      reactants: ["li", "li2o2"],
      products: ["li2o"],
      enthalpy: -562.0,
      desc: "Further reduction during deep overdischarge converts lithium peroxide into crystalline lithium oxide.",
      net: "2Li + Li2O2 → 2Li2O"
    },
    {
      id: "electro-li-i2-pacemaker",
      name: "Solid-state lithium-iodine cardiac pacemaker cell discharge",
      reactants: ["li", "i2"],
      products: ["lii"],
      enthalpy: -540.0,
      desc: "Solid-state cell reaction: lithium metal anode directly reacts with iodine-PVP cathode forming LiI electrolyte layer.",
      net: "2Li + I2 → 2LiI"
    },
    {
      id: "electro-li-br2-cell",
      name: "Lithium-bromine high-voltage reserve battery discharge",
      reactants: ["li", "br2"],
      products: ["libr"],
      enthalpy: -702.0,
      desc: "High energy density electrochemical reaction generating lithium bromide.",
      net: "2Li + Br2 → 2LiBr"
    },
    {
      id: "electro-li-cl2-cell",
      name: "Lithium-chlorine high-temperature reserve cell discharge",
      reactants: ["li", "cl2"],
      products: ["licl"],
      enthalpy: -816.0,
      desc: "Molten salt cell reaction producing lithium chloride with high specific energy.",
      net: "2Li + Cl2 → 2LiCl"
    },
    {
      id: "electro-na-o2-peroxide",
      name: "Sodium-air battery discharge yielding sodium peroxide",
      reactants: ["na", "o2"],
      products: ["na2o2"],
      enthalpy: -510.9,
      desc: "Sodium-oxygen cell discharge forming sodium peroxide cathode deposit.",
      net: "2Na + O2 → Na2O2"
    },
    {
      id: "electro-na-cl2-downs",
      name: "Recombination reaction in molten sodium-chlorine system",
      reactants: ["na", "cl2"],
      products: ["nacl"],
      enthalpy: -822.0,
      desc: "Spontaneous highly exothermic galvanic recombination of sodium metal and chlorine gas.",
      net: "2Na + Cl2 → 2NaCl"
    },
    {
      id: "electro-na-br2-cell",
      name: "Sodium-bromine electrochemical cell discharge",
      reactants: ["na", "br2"],
      products: ["nabr"],
      enthalpy: -722.0,
      desc: "Discharge of sodium anode against liquid bromine cathode producing sodium bromide.",
      net: "2Na + Br2 → 2NaBr"
    },
    {
      id: "electro-na-i2-cell",
      name: "Sodium-iodine galvanic cell discharge",
      reactants: ["na", "i2"],
      products: ["nai"],
      enthalpy: -576.0,
      desc: "Galvanic reaction between metallic sodium and elemental iodine forming sodium iodide.",
      net: "2Na + I2 → 2NaI"
    },
    {
      id: "electro-k-cl2-synthesis",
      name: "Direct combination in molten potassium-chlorine cell",
      reactants: ["k", "cl2"],
      products: ["kcl"],
      enthalpy: -873.0,
      desc: "Potassium metal burns vigorously in chlorine vapor yielding crystalline potassium chloride.",
      net: "2K + Cl2 → 2KCl"
    },
    {
      id: "electro-k-br2-cell",
      name: "Potassium-bromine electrochemical couple",
      reactants: ["k", "br2"],
      products: ["kbr"],
      enthalpy: -788.0,
      desc: "Violent exothermic reaction of liquid bromine with metallic potassium.",
      net: "2K + Br2 → 2KBr"
    },
    {
      id: "electro-k-i2-cell",
      name: "Potassium-iodine galvanic cell discharge",
      reactants: ["k", "i2"],
      products: ["ki"],
      enthalpy: -656.0,
      desc: "Galvanic discharge of potassium metal with iodine forming potassium iodide.",
      net: "2K + I2 → 2KI"
    },
    {
      id: "electro-zebra-na-nicl2",
      name: "ZEBRA high-temperature molten salt battery discharge",
      reactants: ["na", "nicl2"],
      products: ["nacl", "ni"],
      enthalpy: -518.0,
      desc: "Discharge of sodium-nickel chloride cell at 300 °C: sodium anode oxidizes while NiCl2 reduces to metallic nickel.",
      net: "2Na + NiCl2 → 2NaCl + Ni"
    },
    {
      id: "electro-zebra-na-fecl2",
      name: "Sodium-iron chloride molten battery discharge",
      reactants: ["na", "fecl2"],
      products: ["nacl", "fe"],
      enthalpy: -482.0,
      desc: "Secondary ZEBRA battery discharge reaction forming iron metal and molten sodium chloride.",
      net: "2Na + FeCl2 → 2NaCl + Fe"
    },
    {
      id: "electro-zebra-na-cocl2",
      name: "Sodium-cobalt chloride molten cell discharge",
      reactants: ["na", "cocl2"],
      products: ["nacl", "cobalt-metal"],
      enthalpy: -510.0,
      desc: "High-temperature discharge reaction depositing cobalt metal powder.",
      net: "2Na + CoCl2 → 2NaCl + Co"
    },
    {
      id: "electro-zebra-na-cucl2",
      name: "Sodium-copper chloride high-energy discharge",
      reactants: ["na", "cucl2"],
      products: ["nacl", "cu"],
      enthalpy: -602.0,
      desc: "Cathode reduction of copper(II) chloride by sodium yielding copper metal.",
      net: "2Na + CuCl2 → 2NaCl + Cu"
    },
    {
      id: "electro-zebra-na-zncl2",
      name: "Sodium-zinc chloride electrochemical reduction",
      reactants: ["na", "zncl2"],
      products: ["nacl", "zn"],
      enthalpy: -406.0,
      desc: "Molten sodium reduces anhydrous zinc chloride into molten zinc droplets.",
      net: "2Na + ZnCl2 → 2NaCl + Zn"
    },
    {
      id: "electro-zebra-na-pbcl2",
      name: "Molten sodium-lead chloride galvanic couple",
      reactants: ["na", "pbcl2"],
      products: ["nacl", "pb"],
      enthalpy: -464.0,
      desc: "High-temperature displacement of lead metal from lead chloride by sodium.",
      net: "2Na + PbCl2 → 2NaCl + Pb"
    },
    {
      id: "electro-zebra-na-sncl2",
      name: "Sodium displacement of tin in molten chloride",
      reactants: ["na", "sncl2"],
      products: ["nacl", "sn"],
      enthalpy: -496.0,
      desc: "Sodium reduces stannous chloride yielding molten tin and sodium chloride.",
      net: "2Na + SnCl2 → 2NaCl + Sn"
    },
    {
      id: "electro-hunter-na-ticl4",
      name: "Hunter process industrial titanium reduction",
      reactants: ["na", "ticl4"],
      products: ["nacl", "ti"],
      enthalpy: -840.0,
      desc: "Industrial metallurgical reduction of titanium tetrachloride by sodium metal producing titanium sponge.",
      net: "4Na + TiCl4 → 4NaCl + Ti"
    },
    {
      id: "electro-hunter-na-sicl4",
      name: "Sodium reduction of silicon tetrachloride to silicon",
      reactants: ["na", "sicl4"],
      products: ["nacl", "si"],
      enthalpy: -980.0,
      desc: "Pyrochemical reduction of silicon tetrachloride by sodium producing brown amorphous silicon powder.",
      net: "4Na + SiCl4 → 4NaCl + Si"
    },
    {
      id: "electro-hunter-na-alcl3",
      name: "Deville process historical aluminium production",
      reactants: ["na", "alcl3"],
      products: ["nacl", "al"],
      enthalpy: -528.0,
      desc: "Historical nineteenth-century industrial production of aluminium metal via sodium reduction.",
      net: "3Na + AlCl3 → 3NaCl + Al"
    },
    {
      id: "electro-hunter-na-vcl3",
      name: "Pyrochemical sodium reduction of vanadium trichloride",
      reactants: ["na", "vcl3"],
      products: ["nacl", "v"],
      enthalpy: -650.0,
      desc: "Molten sodium reduces green vanadium trichloride into metallic vanadium powder.",
      net: "3Na + VCl3 → 3NaCl + V"
    },
    {
      id: "electro-hunter-na-crcl3",
      name: "Sodium reduction of anhydrous chromium(III) chloride",
      reactants: ["na", "crcl3"],
      products: ["nacl", "cr"],
      enthalpy: -668.0,
      desc: "Sodium vapor reduces chromium(III) chloride producing high-purity chromium metal.",
      net: "3Na + CrCl3 → 3NaCl + Cr"
    },
    {
      id: "electro-li-nicl2-battery",
      name: "Lithium-metal nickel chloride primary cell discharge",
      reactants: ["li", "nicl2"],
      products: ["licl", "ni"],
      enthalpy: -512.0,
      desc: "High energy density non-aqueous cell discharge depositing nickel metal.",
      net: "2Li + NiCl2 → 2LiCl + Ni"
    },
    {
      id: "electro-li-fecl2-battery",
      name: "Lithium-iron chloride high-temperature battery discharge",
      reactants: ["li", "fecl2"],
      products: ["licl", "fe"],
      enthalpy: -476.0,
      desc: "Lithium anode displaces iron from iron(II) chloride cathode.",
      net: "2Li + FeCl2 → 2LiCl + Fe"
    },
    {
      id: "electro-li-cucl2-battery",
      name: "Lithium-copper(II) chloride primary reserve cell",
      reactants: ["li", "cucl2"],
      products: ["licl", "cu"],
      enthalpy: -596.0,
      desc: "Rapid galvanic reduction of copper(II) chloride cathode forming salmon-red copper.",
      net: "2Li + CuCl2 → 2LiCl + Cu"
    },
    {
      id: "electro-li-cocl2-battery",
      name: "Lithium-cobalt chloride high-voltage cell discharge",
      reactants: ["li", "cocl2"],
      products: ["licl", "cobalt-metal"],
      enthalpy: -504.0,
      desc: "Non-aqueous cell reduction of cobalt chloride yielding cobalt metal.",
      net: "2Li + CoCl2 → 2LiCl + Co"
    },
    {
      id: "electro-li-zncl2-battery",
      name: "Lithium displacement of zinc in molten eutectic",
      reactants: ["li", "zncl2"],
      products: ["licl", "zn"],
      enthalpy: -400.0,
      desc: "Molten salt cell reaction reducing zinc chloride to zinc metal.",
      net: "2Li + ZnCl2 → 2LiCl + Zn"
    },
    {
      id: "electro-li-pbcl2-battery",
      name: "Lithium-lead chloride thermal battery discharge",
      reactants: ["li", "pbcl2"],
      products: ["licl", "pb"],
      enthalpy: -458.0,
      desc: "Thermal battery activation: molten lithium reduces lead chloride cathode to lead metal.",
      net: "2Li + PbCl2 → 2LiCl + Pb"
    },
    {
      id: "electro-li-sncl2-battery",
      name: "Lithium displacement of tin from stannous chloride",
      reactants: ["li", "sncl2"],
      products: ["licl", "sn"],
      enthalpy: -490.0,
      desc: "Lithium anode reduces tin(II) chloride into silvery droplets of tin.",
      net: "2Li + SnCl2 → 2LiCl + Sn"
    },
    {
      id: "electro-li-ticl4-reduction",
      name: "Lithium reduction of titanium tetrachloride",
      reactants: ["li", "ticl4"],
      products: ["licl", "ti"],
      enthalpy: -834.0,
      desc: "Pyrochemical reduction of liquid TiCl4 by lithium forming titanium metal sponge.",
      net: "4Li + TiCl4 → 4LiCl + Ti"
    },
    {
      id: "electro-li-sicl4-reduction",
      name: "Lithium pyrochemical reduction to silicon powder",
      reactants: ["li", "sicl4"],
      products: ["licl", "si"],
      enthalpy: -974.0,
      desc: "Lithium reduction of silicon tetrachloride producing elemental silicon nanoparticles.",
      net: "4Li + SiCl4 → 4LiCl + Si"
    },
    {
      id: "electro-li-alcl3-reduction",
      name: "Lithium reduction of anhydrous aluminium chloride",
      reactants: ["li", "alcl3"],
      products: ["licl", "al"],
      enthalpy: -522.0,
      desc: "Lithium metal displaces aluminium from molten aluminium chloride.",
      net: "3Li + AlCl3 → 3LiCl + Al"
    },
    {
      id: "electro-li-vcl3-reduction",
      name: "Lithium metallothermic reduction of vanadium trichloride",
      reactants: ["li", "vcl3"],
      products: ["licl", "v"],
      enthalpy: -644.0,
      desc: "Lithium reduces green vanadium trichloride to metallic vanadium.",
      net: "3Li + VCl3 → 3LiCl + V"
    },
    {
      id: "electro-k-alcl3-oeersted",
      name: "Oersted-Wöhler historical first isolation of aluminium metal",
      reactants: ["k", "alcl3"],
      products: ["kcl", "al"],
      enthalpy: -585.0,
      desc: "First isolation of elemental aluminium (1825): potassium amalgam reacts with anhydrous AlCl3.",
      net: "3K + AlCl3 → 3KCl + Al"
    },
    {
      id: "electro-k-sicl4-berzelius",
      name: "Berzelius historical isolation of elemental silicon",
      reactants: ["k", "sicl4"],
      products: ["kcl", "si"],
      enthalpy: -1080.0,
      desc: "First preparation of pure silicon (1824): potassium metal vigorously reduces SiCl4 vapor.",
      net: "4K + SiCl4 → 4KCl + Si"
    },
    {
      id: "electro-k-ticl4-reduction",
      name: "Potassium reduction of liquid titanium tetrachloride",
      reactants: ["k", "ticl4"],
      products: ["kcl", "ti"],
      enthalpy: -940.0,
      desc: "Molten potassium reduces volatile TiCl4 forming crystalline titanium metal and KCl.",
      net: "4K + TiCl4 → 4KCl + Ti"
    },
    {
      id: "electro-k-nicl2-reduction",
      name: "Potassium displacement of nickel in non-aqueous medium",
      reactants: ["k", "nicl2"],
      products: ["kcl", "ni"],
      enthalpy: -568.0,
      desc: "Potassium metal reduces nickel(II) chloride into fine black pyrophoric nickel powder.",
      net: "2K + NiCl2 → 2KCl + Ni"
    },
    {
      id: "electro-k-cucl2-reduction",
      name: "Potassium reduction of anhydrous copper(II) chloride",
      reactants: ["k", "cucl2"],
      products: ["kcl", "cu"],
      enthalpy: -652.0,
      desc: "Intensely exothermic reduction of anhydrous CuCl2 by potassium producing copper flakes.",
      net: "2K + CuCl2 → 2KCl + Cu"
    }
  ];

  for (const r of reactions) {
    addReaction({
      id: r.id,
      name: r.name,
      reactionType: "redox_other",
      reactants: r.reactants,
      products: r.products,
      netIonicEquation: r.net,
      enthalpyKjPerMol: r.enthalpy,
      temperatureMinC: 15,
      temperatureMaxC: 90,
      solvent: "water",
      observableEffects: [
        {
          type: "color_change",
          description: r.desc,
        }
      ],
      safetyNotes: "Electrochemical / redox reaction. Handle evolved gases (H2, Cl2, O2, SO2) with adequate ventilation and standard eye protection."
    });
  }
}
