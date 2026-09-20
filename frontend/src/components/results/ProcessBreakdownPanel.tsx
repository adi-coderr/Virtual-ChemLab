import React, { useState } from "react";
import type { ReactionResolution, ProcessChangeDimension } from "../../types/chemistry";
import "./ProcessBreakdownPanel.css";

const DEFAULT_MASTER_EXPLANATION =
  "Explaining every change involved in a chemistry process.\n" +
  "When two chemicals react, their atoms are rearranged: bonds in the reactants break and new bonds form, so entirely new substances appear with different molecular structures, shapes, polarities, oxidation states, and electron distributions (electrons are shared, transferred, or redistributed), and the original substances are consumed while their concentrations fall and the products' concentrations rise until a limiting reactant runs out or an equilibrium is reached. Because the substances themselves change, nearly all their properties change too: color, odor, taste, texture, hardness, density, melting and boiling points, vapor pressure, solubility, viscosity, surface tension, refractive index, light absorption and emission spectra, magnetic behavior, electrical and thermal conductivity, acidity or basicity (pH), reactivity, flammability, stability, toxicity, and the physical state or crystal structure (solid, liquid, gas, dissolved, or precipitated). You may also notice fizzing or bubbles from gas release, a cloudy or solid precipitate forming in a clear liquid, a rise or drop in temperature, glowing, flames, or sparks, hissing or popping sounds, and changes in volume or pressure (especially in closed containers where gases form). Energetically, chemical potential energy is converted into heat, light, electricity, or mechanical work (exothermic) or absorbed from the surroundings (endothermic), so enthalpy, entropy, and Gibbs free energy change, and the activation energy barrier, reaction rate, and extent of reaction depend on temperature, concentration, surface area, pressure, and catalysts. Even the number of molecules can change (2H₂ + O₂ → 2H₂O turns three molecules into two). What does not change are the atoms themselves (their types and counts, nuclei, and identities), the total mass, the total electric charge, and the total energy, all of which are conserved and only rearranged, which is why the reaction is a chemical change rather than a nuclear one.";

interface ProcessBreakdownPanelProps {
  resolution: ReactionResolution;
}

const CATEGORY_ICONS: Record<ProcessChangeDimension["category"], string> = {
  atomic_bonding: "⚛️",
  concentrations: "📉",
  properties: "🧪",
  observables: "💥",
  thermodynamics: "🔥",
  conservation: "⚖️",
};

export function ProcessBreakdownPanel({ resolution }: ProcessBreakdownPanelProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [copied, setCopied] = useState(false);

  const breakdown = resolution.processBreakdown;
  const masterText = resolution.processExplanation || breakdown?.masterExplanation || DEFAULT_MASTER_EXPLANATION;

  const dimensions: ProcessChangeDimension[] = breakdown?.dimensions ?? [
    {
      title: "Atomic Rearrangement & Chemical Bonding",
      category: "atomic_bonding",
      description:
        "Bonds in reactants break and new bonds form, rearranging atoms into entirely new substances with altered molecular structures, shapes, polarities, oxidation states, and electron distributions.",
      details: [
        `Reactants: ${resolution.reactants.map((r) => `${r.coefficient > 1 ? r.coefficient : ""}${r.formula}`).join(" + ")}`,
        `Products: ${resolution.products.map((p) => `${p.coefficient > 1 ? p.coefficient : ""}${p.formula}`).join(" + ")}`,
        "Valence electrons are shared, transferred, or redistributed into new molecular geometries.",
      ],
    },
    {
      title: "Concentrations & Reaction Progress",
      category: "concentrations",
      description:
        "Original substances are consumed while concentrations fall, and products' concentrations rise until limiting reagent runs out or equilibrium is reached.",
      details: [
        "Reactants are progressively consumed in the forward reaction pathway.",
        "Product concentrations increase until the limiting reactant is depleted.",
        "Equilibrium or completion governs the final stoichiometric composition.",
      ],
    },
    {
      title: "Physical & Chemical Property Transformations",
      category: "properties",
      description:
        "Because the substances themselves change, nearly all properties change: color, odor, density, melting/boiling points, vapor pressure, solubility, pH, and conductivity.",
      details: [
        "State transitions (solid, liquid, gas, aqueous) alter phase behavior.",
        "Drastic shifts in acidity/basicity (pH), conductivity, and reactivity.",
        "Fundamental changes in melting point, boiling point, density, and solubility.",
      ],
    },
    {
      title: "Macroscopic Sensory Observations",
      category: "observables",
      description:
        "Visible and sensory clues provide empirical evidence of the chemical transformation taking place in the vessel.",
      details:
        resolution.observableEffects.length > 0
          ? resolution.observableEffects.map((e) => `${e.type.replace(/_/g, " ")}: ${e.description}`)
          : ["Fizzing/bubbles, precipitate cloudiness, temperature change, glowing/flames, sound, or volume/pressure changes."],
    },
    {
      title: "Thermodynamics & Energetics",
      category: "thermodynamics",
      description:
        "Chemical potential energy is converted into heat, light, electricity, or mechanical work (exothermic) or absorbed from surroundings (endothermic).",
      details: [
        `Thermal classification: ${resolution.energyClassification ? resolution.energyClassification.toUpperCase() : "Thermochemically active"}`,
        "Enthalpy (ΔH), entropy (ΔS), and Gibbs free energy (ΔG) change during the process.",
        "Activation energy barrier and reaction rate depend on temperature, concentration, and catalysts.",
      ],
    },
    {
      title: "Fundamental Conservation Principles",
      category: "conservation",
      description:
        "Atoms themselves (types, counts, nuclei, and identities), total mass, total electric charge, and total energy are conserved and only rearranged.",
      details: [
        "Conservation of mass: Total mass of reactants equals total mass of products.",
        "Conservation of charge: Net electrical charge is identical before and after reaction.",
        "Chemical change: Nuclei and atomic identities remain unchanged (not a nuclear reaction).",
      ],
    },
  ];

  const filteredDimensions = activeFilter === "all"
    ? dimensions
    : dimensions.filter((d) => d.category === activeFilter);

  const handleCopy = () => {
    navigator.clipboard.writeText(masterText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="process-breakdown" id="chemical-process-breakdown">
      <div className="process-breakdown__header">
        <div className="process-breakdown__title-wrap">
          <span className="process-breakdown__badge">Universal Process Framework</span>
          <h3 className="process-breakdown__title">Explaining Every Change Involved in This Chemistry Process</h3>
        </div>
        <button
          className="process-breakdown__copy-btn"
          onClick={handleCopy}
          title="Copy master chemical transformation explanation"
          id="copy-process-explanation-btn"
        >
          {copied ? "✓ Copied" : "Copy Statement"}
        </button>
      </div>

      <div className="process-breakdown__statement-card">
        <div className="process-breakdown__quote-bar" />
        <div className="process-breakdown__statement-content">
          <div className="process-breakdown__statement-heading">
            <span className="process-breakdown__sparkle">✨</span>
            <strong>Comprehensive Transformation Principle</strong>
          </div>
          <p className="process-breakdown__statement-text">{masterText}</p>
        </div>
      </div>

      <div className="process-breakdown__nav">
        <button
          className={`process-breakdown__filter-chip ${activeFilter === "all" ? "is-active" : ""}`}
          onClick={() => setActiveFilter("all")}
          id="filter-process-all"
        >
          All Dimensions ({dimensions.length})
        </button>
        {dimensions.map((d) => (
          <button
            key={d.category}
            className={`process-breakdown__filter-chip ${activeFilter === d.category ? "is-active" : ""}`}
            onClick={() => setActiveFilter(d.category)}
            id={`filter-process-${d.category}`}
          >
            <span className="chip-icon">{CATEGORY_ICONS[d.category]}</span>
            <span className="chip-label">{d.category.replace(/_/g, " ")}</span>
          </button>
        ))}
      </div>

      <div className="process-breakdown__grid">
        {filteredDimensions.map((dim) => (
          <div key={dim.category} className={`process-card process-card--${dim.category}`}>
            <div className="process-card__header">
              <span className="process-card__icon">{CATEGORY_ICONS[dim.category]}</span>
              <div className="process-card__titles">
                <span className="process-card__category-tag">{dim.category.replace(/_/g, " ")}</span>
                <h4 className="process-card__title">{dim.title}</h4>
              </div>
            </div>
            <p className="process-card__desc">{dim.description}</p>
            <ul className="process-card__details">
              {dim.details.map((detail, idx) => (
                <li key={idx} className="process-card__detail-item">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
