import type Database from "better-sqlite3";
import { ELEMENT_DATA } from "../../chemistry-engine/elementData.js";
import { parseFormula } from "../../chemistry-engine/formulaParser.js";
import { computeMolarMass } from "../../chemistry-engine/molarMass.js";
import { HAZARDS } from "./hazards.js";
import { SEED_CHEMICALS } from "./chemicals.js";
import { SEED_REACTIONS } from "./reactions.js";
import { logger } from "../../utils/logger.js";

function seedElements(db: Database.Database): void {
  const insert = db.prepare(
    `INSERT OR IGNORE INTO elements (symbol, name, atomic_number, atomic_mass, cpk_color, covalent_radius_pm, category)
     VALUES (@symbol, @name, @atomicNumber, @atomicMass, @cpkColor, @covalentRadiusPm, @category)`
  );
  const tx = db.transaction(() => {
    for (const el of ELEMENT_DATA.values()) {
      insert.run({
        symbol: el.symbol,
        name: el.name,
        atomicNumber: el.atomicNumber,
        atomicMass: el.atomicMass,
        cpkColor: el.cpkColor,
        covalentRadiusPm: el.covalentRadiusPm,
        category: el.category,
      });
    }
  });
  tx();
}

function seedHazards(db: Database.Database): void {
  const insert = db.prepare(
    `INSERT OR IGNORE INTO hazards (code, label, description, severity) VALUES (@code, @label, @description, @severity)`
  );
  const tx = db.transaction(() => {
    for (const h of HAZARDS) insert.run(h);
  });
  tx();
}

function seedChemicals(db: Database.Database): void {
  const insertChemical = db.prepare(`
    INSERT OR IGNORE INTO chemicals (
      id, common_name, iupac_name, formula, molar_mass, cas_number, smiles, inchi, inchi_key,
      physical_state, density, melting_point_c, boiling_point_c, solubility_notes,
      is_acid, is_base, acid_base_strength, pka, pkb, chemical_class, charge, substance_color,
      is_elemental, common_cation_charge, neutralization_produces_water,
      dissociation_cation_formula, dissociation_cation_charge, dissociation_anion_formula, dissociation_anion_charge,
      source, reference, last_verified_date, confidence, data_version, notes
    ) VALUES (
      @id, @commonName, @iupacName, @formula, @molarMass, @casNumber, @smiles, @inchi, @inchiKey,
      @physicalState, @density, @meltingPointC, @boilingPointC, @solubilityNotes,
      @isAcid, @isBase, @acidBaseStrength, @pKa, @pKb, @chemicalClass, @charge, @substanceColor,
      @isElemental, @commonCationCharge, @neutralizationProducesWater,
      @dissociationCationFormula, @dissociationCationCharge, @dissociationAnionFormula, @dissociationAnionCharge,
      @source, @reference, @lastVerifiedDate, @confidence, @dataVersion, @notes
    )
  `);
  const insertAlias = db.prepare(`INSERT OR IGNORE INTO chemical_aliases (chemical_id, alias) VALUES (?, ?)`);
  const insertElementComposition = db.prepare(
    `INSERT OR IGNORE INTO chemical_elements (chemical_id, element_symbol, count) VALUES (?, ?, ?)`
  );
  const insertHazardLink = db.prepare(`INSERT OR IGNORE INTO chemical_hazards (chemical_id, hazard_code) VALUES (?, ?)`);
  const insertAtom = db.prepare(`
    INSERT OR IGNORE INTO molecule_atoms (chemical_id, atom_index, element_symbol, x2d, y2d, x3d, y3d, z3d, formal_charge)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertBond = db.prepare(`
    INSERT OR IGNORE INTO molecule_bonds (chemical_id, atom_index_1, atom_index_2, bond_order, bond_type)
    VALUES (?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    for (const c of SEED_CHEMICALS) {
      const parsed = parseFormula(c.formula);
      const molarMass = computeMolarMass(parsed.composition);

      insertChemical.run({
        id: c.id,
        commonName: c.commonName,
        iupacName: c.iupacName ?? null,
        formula: c.formula,
        molarMass,
        casNumber: c.casNumber ?? null,
        smiles: c.smiles ?? null,
        inchi: null,
        inchiKey: c.inchiKey ?? null,
        physicalState: c.physicalState,
        density: c.density ?? null,
        meltingPointC: c.meltingPointC ?? null,
        boilingPointC: c.boilingPointC ?? null,
        solubilityNotes: c.solubilityNotes ?? null,
        isAcid: c.isAcid ? 1 : 0,
        isBase: c.isBase ? 1 : 0,
        acidBaseStrength: c.acidBaseStrength ?? "none",
        pKa: c.pKa ?? null,
        pKb: c.pKb ?? null,
        chemicalClass: c.chemicalClass,
        charge: c.charge ?? 0,
        substanceColor: c.substanceColor ?? null,
        isElemental: c.isElemental ? 1 : 0,
        commonCationCharge: c.commonCationCharge ?? null,
        neutralizationProducesWater: c.neutralizationProducesWater ? 1 : 0,
        dissociationCationFormula: c.dissociation?.cation.formula ?? null,
        dissociationCationCharge: c.dissociation?.cation.charge ?? null,
        dissociationAnionFormula: c.dissociation?.anion.formula ?? null,
        dissociationAnionCharge: c.dissociation?.anion.charge ?? null,
        source: c.source,
        reference: null,
        lastVerifiedDate: null,
        confidence: "high",
        dataVersion: "1.0",
        notes: c.notes ?? null,
      });

      for (const alias of c.aliases ?? []) insertAlias.run(c.id, alias);
      for (const [element, count] of Object.entries(parsed.composition)) {
        insertElementComposition.run(c.id, element, count);
      }
      for (const code of c.hazardCodes ?? []) insertHazardLink.run(c.id, code);

      if (c.structure) {
        c.structure.atoms.forEach((atom, index) => {
          insertAtom.run(c.id, index, atom.element, atom.x2d, atom.y2d, atom.x3d, atom.y3d, atom.z3d, atom.formalCharge ?? 0);
        });
        for (const bond of c.structure.bonds) {
          insertBond.run(c.id, bond.a, bond.b, bond.order, bond.type ?? "covalent");
        }
      }
    }
  });
  tx();
}

function seedReactions(db: Database.Database): void {
  const insertReaction = db.prepare(`
    INSERT OR IGNORE INTO reactions (
      id, name, reaction_type, equation_display, net_ionic_equation, confidence_score,
      energy_classification, temperature_min_c, temperature_max_c, solvent, catalyst_chemical_id,
      experimental_status, source, reference, safety_notes
    ) VALUES (
      @id, @name, @reactionType, @equationDisplay, @netIonicEquation, @confidenceScore,
      @energyClassification, @temperatureMinC, @temperatureMaxC, @solvent, @catalystChemicalId,
      @experimentalStatus, @source, @reference, @safetyNotes
    )
  `);
  const insertReactant = db.prepare(`INSERT OR IGNORE INTO reaction_reactants (reaction_id, chemical_id, coefficient) VALUES (?, ?, ?)`);
  const insertProduct = db.prepare(
    `INSERT OR IGNORE INTO reaction_products (reaction_id, chemical_id, coefficient, is_byproduct) VALUES (?, ?, ?, ?)`
  );
  const insertEffect = db.prepare(`
    INSERT OR IGNORE INTO reaction_observable_effects (reaction_id, effect_type, description, related_chemical_id, color_from, color_to)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    for (const r of SEED_REACTIONS) {
      insertReaction.run({
        id: r.id,
        name: r.name,
        reactionType: r.reactionType,
        equationDisplay: r.equationDisplay,
        netIonicEquation: r.netIonicEquation ?? null,
        confidenceScore: r.confidenceScore,
        energyClassification: r.energyClassification,
        temperatureMinC: r.temperatureMinC ?? null,
        temperatureMaxC: r.temperatureMaxC ?? null,
        solvent: r.solvent ?? null,
        catalystChemicalId: r.catalystChemicalId ?? null,
        experimentalStatus: r.experimentalStatus,
        source: r.source,
        reference: null,
        safetyNotes: r.safetyNotes ?? null,
      });
      for (const reactant of r.reactants) insertReactant.run(r.id, reactant.chemicalId, reactant.coefficient);
      for (const product of r.products) insertProduct.run(r.id, product.chemicalId, product.coefficient, product.isByproduct ? 1 : 0);
      for (const effect of r.observableEffects) {
        insertEffect.run(r.id, effect.type, effect.description, effect.relatedChemicalId ?? null, effect.colorFrom ?? null, effect.colorTo ?? null);
      }
    }
  });
  tx();
}

/** Idempotent: safe to call on every server start. Uses INSERT OR IGNORE keyed on primary keys throughout. */
export function seedDatabase(db: Database.Database): void {
  const chemicalCount = (db.prepare("SELECT COUNT(*) as n FROM chemicals").get() as { n: number }).n;
  if (chemicalCount > 0) {
    logger.info("Database already seeded, skipping", { chemicalCount });
    return;
  }
  logger.info("Seeding database...");
  seedElements(db);
  seedHazards(db);
  seedChemicals(db);
  seedReactions(db);
  logger.info("Seeding complete", {
    chemicals: SEED_CHEMICALS.length,
    reactions: SEED_REACTIONS.length,
  });
}
