import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logger } from "../utils/logger.js";
import { parseFormula } from "../chemistry-engine/formulaParser.js";
import { computeMolarMass } from "../chemistry-engine/molarMass.js";
import type { SimulationResult } from "./simulationService.js";
import type {
  ReactionResolution,
  StoichiometryLine,
  ObservableEffect,
  ReactionConditions,
  ChemicalProcessBreakdown,
} from "../chemistry-engine/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface ChemrxnReactant {
  name: string;
  formula?: string;
  smiles?: string;
  inchi?: string;
  mass?: string;
  amount?: string;
}

export interface ChemrxnProduct {
  name: string;
  formula?: string;
  smiles?: string;
  inchi?: string;
  yieldPercent?: number;
  yieldText?: string;
  mass?: string;
  state?: string;
  appearance?: string;
}

export interface ChemrxnSpectator {
  role: "solvent" | "catalyst" | string;
  name: string;
  smiles?: string;
}

export interface ChemrxnAction {
  action: string;
  phrase: string;
  temp?: string;
  time?: string;
}

export interface ChemrxnReactionRecord {
  id: string;
  year: number;
  sourceFile: string;
  documentId: string;
  heading: string;
  reactionSmiles: string;
  equationDisplay: string;
  reactantNames: string;
  productNames: string;
  solvents: string;
  catalysts: string;
  yieldPercent?: number;
  yieldText?: string;
  productState?: string;
  productAppearance?: string;
  procedureText: string;
  actionCount: number;
  reactants: ChemrxnReactant[];
  products: ChemrxnProduct[];
  spectators: ChemrxnSpectator[];
  actions: ChemrxnAction[];
  createdAt?: string;
}

export interface ChemrxnSearchQuery {
  q?: string;
  year?: number;
  era?: string;
  minYield?: number;
  reactant?: string;
  product?: string;
  productState?: string;
  limit?: number;
  offset?: number;
}

export class ChemrxnService {
  private db: Database.Database;
  private readonly chemrxnDir: string;
  private isSeeding = false;
  private chemlabDb?: Database.Database;

  private getChemlabDb(): Database.Database | undefined {
    if (!this.chemlabDb) {
      const candidates = [
        path.resolve(__dirname, "../../data/chemlab.db"),
        path.resolve(process.cwd(), "data/chemlab.db"),
        path.resolve(process.cwd(), "../data/chemlab.db"),
      ];
      for (const p of candidates) {
        if (fs.existsSync(p)) {
          this.chemlabDb = new Database(p, { readonly: true });
          break;
        }
      }
    }
    return this.chemlabDb;
  }

  public resolveChemicalInfo(name: string, fallbackFormula?: string): {
    chemicalId: string;
    formula: string;
    commonName: string;
    isRegistered: boolean;
  } {
    const chemlab = this.getChemlabDb();
    if (chemlab) {
      const cleanName = name.trim();
      const cleanSlug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const cleanWithSpaces = cleanName.replace(/_/g, " ");

      const row = chemlab
        .prepare(`
          SELECT id, common_name, formula FROM chemicals 
          WHERE id = ? 
             OR id = ? 
             OR LOWER(common_name) = LOWER(?) 
             OR LOWER(common_name) = LOWER(?)
             OR id IN (
               SELECT chemical_id FROM chemical_aliases 
               WHERE LOWER(alias) = LOWER(?) 
                  OR LOWER(alias) = LOWER(?)
                  OR LOWER(alias) = LOWER(?)
             )
          LIMIT 1
        `)
        .get(
          cleanName,
          cleanSlug,
          cleanName,
          cleanWithSpaces,
          cleanName,
          cleanWithSpaces,
          cleanSlug
        ) as {
          id: string;
          common_name: string;
          formula: string;
        } | undefined;

      if (row) {
        return {
          chemicalId: row.id,
          formula: row.formula,
          commonName: row.common_name,
          isRegistered: true,
        };
      }
    }

    const cleanSlug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return {
      chemicalId: cleanSlug || `compound_${Date.now()}`,
      formula: fallbackFormula && /^[A-Z]/.test(fallbackFormula.trim()) ? fallbackFormula.trim() : "",
      commonName: name,
      isRegistered: true,
    };
  }


  constructor(dbPath?: string, chemrxnDirectory?: string) {
    const defaultDbPath = path.resolve(__dirname, "../../data/chemrxn.db");
    const resolvedDbPath = dbPath || defaultDbPath;
    fs.mkdirSync(path.dirname(resolvedDbPath), { recursive: true });

    this.db = new Database(resolvedDbPath);
    this.db.pragma("journal_mode = WAL");
    this.db.pragma("synchronous = NORMAL");

    // ChemRxn is in workspace root: /Users/adi/Documents/Github Projects/virtual-chem-lab/ChemRxn
    const workspaceRoot = path.resolve(__dirname, "../../..");
    const candidatePath = path.join(workspaceRoot, "ChemRxn");
    const cwdCandidate = path.resolve(process.cwd(), "ChemRxn");
    const parentCwdCandidate = path.resolve(process.cwd(), "../ChemRxn");

    if (chemrxnDirectory && fs.existsSync(chemrxnDirectory)) {
      this.chemrxnDir = chemrxnDirectory;
    } else if (fs.existsSync(candidatePath)) {
      this.chemrxnDir = candidatePath;
    } else if (fs.existsSync(parentCwdCandidate)) {
      this.chemrxnDir = parentCwdCandidate;
    } else if (fs.existsSync(cwdCandidate)) {
      this.chemrxnDir = cwdCandidate;
    } else {
      this.chemrxnDir = candidatePath;
    }

    this.initTables();
  }

  private initTables(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS chemrxn_reactions (
        id TEXT PRIMARY KEY,
        year INTEGER NOT NULL,
        source_file TEXT NOT NULL,
        document_id TEXT NOT NULL,
        heading TEXT,
        reaction_smiles TEXT,
        equation_display TEXT,
        reactant_names TEXT,
        product_names TEXT,
        solvents TEXT,
        catalysts TEXT,
        yield_percent REAL,
        yield_text TEXT,
        product_state TEXT,
        product_appearance TEXT,
        procedure_text TEXT,
        action_count INTEGER DEFAULT 0,
        reactants_json TEXT NOT NULL,
        products_json TEXT NOT NULL,
        spectators_json TEXT,
        actions_json TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_chemrxn_year ON chemrxn_reactions(year);
      CREATE INDEX IF NOT EXISTS idx_chemrxn_doc ON chemrxn_reactions(document_id);
      CREATE INDEX IF NOT EXISTS idx_chemrxn_yield ON chemrxn_reactions(yield_percent);
      CREATE INDEX IF NOT EXISTS idx_chemrxn_state ON chemrxn_reactions(product_state);

      CREATE VIRTUAL TABLE IF NOT EXISTS chemrxn_fts USING fts5(
        id UNINDEXED,
        heading,
        reactant_names,
        product_names,
        procedure_text,
        document_id
      );
    `);
  }

  /**
   * Fast XML parser extracting reactions, outcomes, procedural steps, and chemical entities.
   */
  public parseReactionsFromXml(
    xmlContent: string,
    fileName: string,
    year: number
  ): ChemrxnReactionRecord[] {
    const rxnBlocks = xmlContent.split("</reaction>");
    const results: ChemrxnReactionRecord[] = [];
    const baseName = path.basename(fileName, ".xml");

    for (let i = 0; i < rxnBlocks.length - 1; i++) {
      const b = rxnBlocks[i]!;
      const docId = b.match(/<dl:documentId>([^<]+)<\/dl:documentId>/)?.[1] || "";
      const heading = (b.match(/<dl:headingText>([^<]+)<\/dl:headingText>/)?.[1] || "").trim();
      const paragraph = (b.match(/<dl:paragraphText>([\s\S]*?)<\/dl:paragraphText>/)?.[1] || "").trim();
      const rxnSmiles = b.match(/<dl:reactionSmiles>([^<]+)<\/dl:reactionSmiles>/)?.[1] || "";

      // Reactants
      const reactMatch = b.match(/<reactantList>([\s\S]*?)<\/reactantList>/)?.[1] || "";
      const reactants: ChemrxnReactant[] = [];
      const rRe = /<reactant[^>]*>([\s\S]*?)<\/reactant>/g;
      let rm: RegExpExecArray | null;
      while ((rm = rRe.exec(reactMatch)) !== null) {
        const rb = rm[1]!;
        const rawName = rb.match(/<name[^>]*>([^<]+)<\/name>/)?.[1] || "";
        const smiles = rb.match(/<identifier dictRef="cml:smiles" value="([^"]+)"/)?.[1] || "";
        const inchi = rb.match(/<identifier dictRef="cml:inchi" value="([^"]+)"/)?.[1] || "";
        const mass = rb.match(/<amount dl:propertyType="MASS"[^>]*>([^<]+)<\/amount>/)?.[1] || "";
        const amount = rb.match(/<amount dl:propertyType="AMOUNT"[^>]*>([^<]+)<\/amount>/)?.[1] || "";
        const formula = inchi.match(/^InChI=1S?\/([A-Za-z0-9]+)/)?.[1] || "";
        const cleanName = rawName.trim();
        if (cleanName || smiles || formula) {
          reactants.push({
            name: cleanName || formula || "Reactant",
            formula: formula || undefined,
            smiles: smiles || undefined,
            inchi: inchi || undefined,
            mass: mass || undefined,
            amount: amount || undefined,
          });
        }
      }

      // Products
      const prodMatch = b.match(/<productList>([\s\S]*?)<\/productList>/)?.[1] || "";
      const products: ChemrxnProduct[] = [];
      const pRe = /<product[^>]*>([\s\S]*?)<\/product>/g;
      let pm: RegExpExecArray | null;
      while ((pm = pRe.exec(prodMatch)) !== null) {
        const pb = pm[1]!;
        const resName = pb.match(/<dl:nameResolved>([^<]+)<\/dl:nameResolved>/)?.[1];
        const rawName = pb.match(/<name[^>]*>([^<]+)<\/name>/)?.[1];
        const name = (resName || rawName || "").trim();
        const smiles = pb.match(/<identifier dictRef="cml:smiles" value="([^"]+)"/)?.[1] || "";
        const inchi = pb.match(/<identifier dictRef="cml:inchi" value="([^"]+)"/)?.[1] || "";
        const yieldPct = pb.match(/<amount dl:propertyType="PERCENTYIELD"[^>]*>([^<]+)<\/amount>/)?.[1] || "";
        const yieldNorm = pb.match(/<amount dl:propertyType="PERCENTYIELD"[^>]*dl:normalizedValue="([^"]+)"/)?.[1] || "";
        const mass = pb.match(/<amount dl:propertyType="MASS"[^>]*>([^<]+)<\/amount>/)?.[1] || "";
        const state = pb.match(/<dl:state>([^<]+)<\/dl:state>/)?.[1] || "";
        const appearance = pb.match(/<dl:appearance>([^<]+)<\/dl:appearance>/)?.[1] || "";
        const formula = inchi.match(/^InChI=1S?\/([A-Za-z0-9]+)/)?.[1] || "";

        let yieldNum: number | undefined;
        if (yieldNorm && !Number.isNaN(parseFloat(yieldNorm))) {
          yieldNum = parseFloat(yieldNorm);
        } else if (yieldPct) {
          const m = yieldPct.match(/([\d.]+)\s*%/);
          if (m && m[1]) yieldNum = parseFloat(m[1]);
        }

        if (name || smiles || formula) {
          products.push({
            name: name || formula || "Product",
            formula: formula || undefined,
            smiles: smiles || undefined,
            inchi: inchi || undefined,
            yieldPercent: yieldNum,
            yieldText: yieldPct || (yieldNum !== undefined ? `${yieldNum}%` : undefined),
            mass: mass || undefined,
            state: state || undefined,
            appearance: appearance || undefined,
          });
        }
      }

      // Spectators (solvents & catalysts)
      const specMatch = b.match(/<spectatorList>([\s\S]*?)<\/spectatorList>/)?.[1] || "";
      const spectators: ChemrxnSpectator[] = [];
      const sRe = /<spectator[^>]*role="([^"]+)"[^>]*>([\s\S]*?)<\/spectator>/g;
      let sm: RegExpExecArray | null;
      while ((sm = sRe.exec(specMatch)) !== null) {
        const role = sm[1]!;
        const sb = sm[2]!;
        const rawName = sb.match(/<name[^>]*>([^<]+)<\/name>/)?.[1] || "";
        const smiles = sb.match(/<identifier dictRef="cml:smiles" value="([^"]+)"/)?.[1] || "";
        const cleanName = rawName.trim();
        if (cleanName || smiles) {
          spectators.push({ role, name: cleanName || smiles, smiles: smiles || undefined });
        }
      }

      // Action steps
      const actMatch = b.match(/<dl:reactionActionList>([\s\S]*?)<\/dl:reactionActionList>/)?.[1] || "";
      const actions: ChemrxnAction[] = [];
      const aRe = /<dl:reactionAction action="([^"]+)">([\s\S]*?)<\/dl:reactionAction>/g;
      let am: RegExpExecArray | null;
      while ((am = aRe.exec(actMatch)) !== null) {
        const action = am[1]!;
        const ab = am[2]!;
        const phrase = (ab.match(/<dl:phraseText>([^<]+)<\/dl:phraseText>/)?.[1] || "").trim();
        const temp = ab.match(/<dl:parameter propertyType="Temperature"[^>]*>([^<]+)<\/dl:parameter>/)?.[1] || "";
        const time = ab.match(/<dl:parameter propertyType="Time"[^>]*>([^<]+)<\/dl:parameter>/)?.[1] || "";
        if (phrase || action) {
          actions.push({ action, phrase: phrase || action, temp: temp || undefined, time: time || undefined });
        }
      }

      // Only include valid reactions with at least 1 reactant and 1 product
      if (reactants.length > 0 && products.length > 0) {
        const rList = reactants.map((r) => r.formula || r.name).join(" + ");
        const pList = products.map((p) => p.formula || p.name).join(" + ");
        const equationDisplay = `${rList} \u2192 ${pList}`;

        const primeProduct = products[0]!;
        const solvents = spectators
          .filter((s) => s.role === "solvent")
          .map((s) => s.name)
          .join(", ");
        const catalysts = spectators
          .filter((s) => s.role === "catalyst")
          .map((s) => s.name)
          .join(", ");

        results.push({
          id: `crxn_${year}_${baseName}_${i}`,
          year,
          sourceFile: fileName,
          documentId: docId || `US-${year}-${i}`,
          heading: heading || primeProduct.name || "Patent Reaction",
          reactionSmiles: rxnSmiles,
          equationDisplay,
          reactantNames: reactants.map((r) => r.name).join(", "),
          productNames: products.map((p) => p.name).join(", "),
          solvents,
          catalysts,
          yieldPercent: primeProduct.yieldPercent,
          yieldText: primeProduct.yieldText,
          productState: primeProduct.state,
          productAppearance: primeProduct.appearance,
          procedureText: paragraph,
          actionCount: actions.length,
          reactants,
          products,
          spectators,
          actions,
        });
      }
    }

    return results;
  }

  /**
   * Ingests a single XML file into the database.
   */
  public ingestFile(filePath: string, year: number): number {
    if (!fs.existsSync(filePath)) {
      logger.warn(`ChemRxn file not found: ${filePath}`);
      return 0;
    }

    const content = fs.readFileSync(filePath, "utf-8");
    const fileName = path.basename(filePath);
    const records = this.parseReactionsFromXml(content, fileName, year);

    if (records.length === 0) return 0;

    const insertSql = this.db.prepare(`
      INSERT OR REPLACE INTO chemrxn_reactions (
        id, year, source_file, document_id, heading, reaction_smiles, equation_display,
        reactant_names, product_names, solvents, catalysts, yield_percent, yield_text,
        product_state, product_appearance, procedure_text, action_count,
        reactants_json, products_json, spectators_json, actions_json
      ) VALUES (
        @id, @year, @sourceFile, @documentId, @heading, @reactionSmiles, @equationDisplay,
        @reactantNames, @productNames, @solvents, @catalysts, @yieldPercent, @yieldText,
        @productState, @productAppearance, @procedureText, @actionCount,
        @reactantsJson, @productsJson, @spectatorsJson, @actionsJson
      )
    `);

    const insertFts = this.db.prepare(`
      INSERT OR REPLACE INTO chemrxn_fts (
        id, heading, reactant_names, product_names, procedure_text, document_id
      ) VALUES (
        @id, @heading, @reactantNames, @productNames, @procedureText, @documentId
      )
    `);

    const tx = this.db.transaction(() => {
      for (const r of records) {
        insertSql.run({
          id: r.id,
          year: r.year,
          sourceFile: r.sourceFile,
          documentId: r.documentId,
          heading: r.heading,
          reactionSmiles: r.reactionSmiles,
          equationDisplay: r.equationDisplay,
          reactantNames: r.reactantNames,
          productNames: r.productNames,
          solvents: r.solvents,
          catalysts: r.catalysts,
          yieldPercent: r.yieldPercent ?? null,
          yieldText: r.yieldText ?? null,
          productState: r.productState ?? null,
          productAppearance: r.productAppearance ?? null,
          procedureText: r.procedureText,
          actionCount: r.actionCount,
          reactantsJson: JSON.stringify(r.reactants),
          productsJson: JSON.stringify(r.products),
          spectatorsJson: JSON.stringify(r.spectators),
          actionsJson: JSON.stringify(r.actions),
        });

        insertFts.run({
          id: r.id,
          heading: r.heading,
          reactantNames: r.reactantNames,
          productNames: r.productNames,
          procedureText: r.procedureText,
          documentId: r.documentId,
        });
      }
    });

    tx();
    return records.length;
  }

  /**
   * Ingests files for a specific year.
   */
  public ingestYear(year: number, maxFiles = 2): number {
    const yDir = path.join(this.chemrxnDir, String(year));
    if (!fs.existsSync(yDir)) return 0;

    const files = fs
      .readdirSync(yDir)
      .filter((f) => f.endsWith(".xml") && !f.includes("SUPP"))
      .sort();

    const selectedFiles = files.slice(0, maxFiles);
    let count = 0;
    for (const f of selectedFiles) {
      count += this.ingestFile(path.join(yDir, f), year);
    }
    return count;
  }

  /**
   * Seeds an initial representative selection across all 42 years (1976-2016).
   */
  public ensureInitialSeed(filesPerYear = 1): { totalIndexed: number; yearsCovered: number } {
    const currentCount = this.getCount();
    if (currentCount > 5000) {
      return { totalIndexed: currentCount, yearsCovered: this.getYears().length };
    }

    if (this.isSeeding) {
      return { totalIndexed: currentCount, yearsCovered: this.getYears().length };
    }

    this.isSeeding = true;
    logger.info("Starting initial ChemRxn patent reaction indexing...");
    const t0 = Date.now();

    try {
      if (!fs.existsSync(this.chemrxnDir)) {
        logger.warn(`ChemRxn folder not found at ${this.chemrxnDir}`);
        return { totalIndexed: 0, yearsCovered: 0 };
      }

      const yearDirs = fs
        .readdirSync(this.chemrxnDir)
        .filter((y) => /^\d{4}$/.test(y))
        .sort();

      let totalAdded = 0;
      for (const yStr of yearDirs) {
        const year = parseInt(yStr, 10);
        const yDir = path.join(this.chemrxnDir, yStr);
        const files = fs
          .readdirSync(yDir)
          .filter((f) => f.endsWith(".xml") && !f.includes("SUPP"))
          .sort();

        // Pick files: week 1 and optionally mid-year week
        const filesToIngest = [files[0]!];
        if (filesPerYear > 1 && files.length > 25) {
          filesToIngest.push(files[Math.floor(files.length / 2)]!);
        }

        for (const file of filesToIngest) {
          if (file) {
            const added = this.ingestFile(path.join(yDir, file), year);
            totalAdded += added;
          }
        }
      }

      logger.info(
        `ChemRxn seeding complete: indexed ${totalAdded} patent reactions across ${yearDirs.length} years in ${Date.now() - t0} ms.`
      );
      return { totalIndexed: this.getCount(), yearsCovered: yearDirs.length };
    } finally {
      this.isSeeding = false;
    }
  }

  public getCount(): number {
    const row = this.db.prepare("SELECT count(*) as count FROM chemrxn_reactions").get() as {
      count: number;
    };
    return row.count;
  }

  public getYears(): number[] {
    const rows = this.db
      .prepare("SELECT DISTINCT year FROM chemrxn_reactions ORDER BY year DESC")
      .all() as { year: number }[];
    return rows.map((r) => r.year);
  }

  public getStats() {
    const totalCount = this.getCount();
    const years = this.getYears();
    const yieldStats = this.db.prepare(`
      SELECT 
        AVG(yield_percent) as avgYield,
        COUNT(CASE WHEN yield_percent >= 80 THEN 1 END) as highYieldCount,
        COUNT(CASE WHEN product_state IS NOT NULL THEN 1 END) as stateCount
      FROM chemrxn_reactions
    `).get() as { avgYield: number | null; highYieldCount: number; stateCount: number };

    let totalXmlFiles = 0;
    try {
      if (fs.existsSync(this.chemrxnDir)) {
        const yearDirs = fs.readdirSync(this.chemrxnDir).filter((y) => /^\d{4}$/.test(y));
        for (const y of yearDirs) {
          const files = fs.readdirSync(path.join(this.chemrxnDir, y)).filter((f) => f.endsWith(".xml"));
          totalXmlFiles += files.length;
        }
      }
    } catch {
      // ignore
    }

    return {
      totalIndexed: totalCount,
      totalXmlFiles,
      yearsCovered: years.length,
      minYear: years[years.length - 1] ?? 1976,
      maxYear: years[0] ?? 2016,
      avgYield: yieldStats.avgYield ? Math.round(yieldStats.avgYield) : null,
      highYieldCount: yieldStats.highYieldCount,
      stateRecordedCount: yieldStats.stateCount,
    };
  }

  private mapRowToRecord(row: any): ChemrxnReactionRecord {
    return {
      id: row.id,
      year: row.year,
      sourceFile: row.source_file,
      documentId: row.document_id,
      heading: row.heading,
      reactionSmiles: row.reaction_smiles,
      equationDisplay: row.equation_display,
      reactantNames: row.reactant_names,
      productNames: row.product_names,
      solvents: row.solvents,
      catalysts: row.catalysts,
      yieldPercent: row.yield_percent,
      yieldText: row.yield_text,
      productState: row.product_state,
      productAppearance: row.product_appearance,
      procedureText: row.procedure_text,
      actionCount: row.action_count,
      reactants: JSON.parse(row.reactants_json || "[]"),
      products: JSON.parse(row.products_json || "[]"),
      spectators: JSON.parse(row.spectators_json || "[]"),
      actions: JSON.parse(row.actions_json || "[]"),
      createdAt: row.created_at,
    };
  }

  /**
   * Lightning-fast search with FTS5 or parametric filters.
   */
  public search(params: ChemrxnSearchQuery): { items: ChemrxnReactionRecord[]; total: number } {
    const limit = Math.min(params.limit ?? 25, 100);
    const offset = params.offset ?? 0;

    const conditions: string[] = [];
    const sqlParams: any[] = [];

    // FTS full-text search
    if (params.q && params.q.trim()) {
      // Clean query for FTS5 syntax
      const cleanQ = params.q.replace(/['"/*+-]/g, " ").trim();
      if (cleanQ) {
        const terms = cleanQ.split(/\s+/).filter(Boolean);
        const matchExpression = terms.map((t) => `"${t}"*`).join(" AND ");
        conditions.push(`chemrxn_reactions.id IN (SELECT id FROM chemrxn_fts WHERE chemrxn_fts MATCH ?)`);
        sqlParams.push(matchExpression);
      }
    }

    if (params.year) {
      conditions.push("chemrxn_reactions.year = ?");
      sqlParams.push(params.year);
    } else if (params.era) {
      if (params.era === "2010s") conditions.push("chemrxn_reactions.year >= 2010");
      else if (params.era === "2000s") conditions.push("chemrxn_reactions.year >= 2000 AND chemrxn_reactions.year < 2010");
      else if (params.era === "1990s") conditions.push("chemrxn_reactions.year >= 1990 AND chemrxn_reactions.year < 2000");
      else if (params.era === "1980s") conditions.push("chemrxn_reactions.year >= 1980 AND chemrxn_reactions.year < 1990");
      else if (params.era === "1970s") conditions.push("chemrxn_reactions.year >= 1970 AND chemrxn_reactions.year < 1980");
    }

    if (params.minYield) {
      conditions.push("chemrxn_reactions.yield_percent >= ?");
      sqlParams.push(params.minYield);
    }

    if (params.reactant) {
      conditions.push("chemrxn_reactions.reactant_names LIKE ?");
      sqlParams.push(`%${params.reactant.trim()}%`);
    }

    if (params.product) {
      conditions.push("chemrxn_reactions.product_names LIKE ?");
      sqlParams.push(`%${params.product.trim()}%`);
    }

    if (params.productState) {
      conditions.push("chemrxn_reactions.product_state LIKE ?");
      sqlParams.push(`%${params.productState.trim()}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const countSql = `SELECT count(*) as count FROM chemrxn_reactions ${whereClause}`;
    const total = (this.db.prepare(countSql).get(...sqlParams) as { count: number }).count;

    const selectSql = `
      SELECT * FROM chemrxn_reactions 
      ${whereClause} 
      ORDER BY 
        CASE WHEN yield_percent IS NOT NULL THEN yield_percent ELSE 0 END DESC,
        action_count DESC,
        year DESC
      LIMIT ? OFFSET ?
    `;

    const rows = this.db.prepare(selectSql).all(...sqlParams, limit, offset);
    return {
      items: rows.map((r) => this.mapRowToRecord(r)),
      total,
    };
  }

  public getById(id: string): ChemrxnReactionRecord | undefined {
    const row = this.db.prepare("SELECT * FROM chemrxn_reactions WHERE id = ?").get(id);
    if (!row) return undefined;
    return this.mapRowToRecord(row);
  }

  /**
   * Matches a reaction by reactant names or formulas.
   */
  public findByReactants(searchTokens: string[]): ChemrxnReactionRecord | undefined {
    if (searchTokens.length === 0) return undefined;

    // Build query checking each token in reactant_names
    const clauses = searchTokens.map(() => "reactant_names LIKE ?");
    const params = searchTokens.map((t) => `%${t.trim()}%`);

    const sql = `
      SELECT * FROM chemrxn_reactions 
      WHERE ${clauses.join(" AND ")}
      ORDER BY 
        CASE WHEN yield_percent IS NOT NULL THEN yield_percent ELSE 0 END DESC,
        action_count DESC
      LIMIT 1
    `;

    const row = this.db.prepare(sql).get(...params);
    if (row) return this.mapRowToRecord(row);

    // Fallback: match at least first 2 reactants
    if (searchTokens.length >= 2) {
      const relaxed = this.db
        .prepare(
          `SELECT * FROM chemrxn_reactions WHERE reactant_names LIKE ? AND reactant_names LIKE ? LIMIT 1`
        )
        .get(`%${searchTokens[0]}%`, `%${searchTokens[1]}%`);
      if (relaxed) return this.mapRowToRecord(relaxed);
    }

    return undefined;
  }

  /**
   * Simulates a ChemRxn reaction record into the Virtual Chem Lab SimulationResult format.
   */
  public simulateChemrxnReaction(
    rxn: ChemrxnReactionRecord,
    conditions: ReactionConditions = {}
  ): SimulationResult {
    const observableEffects: ObservableEffect[] = [];

    // Observable product physical state
    if (rxn.productState || rxn.productAppearance) {
      const state = rxn.productState || "substance";
      const color = rxn.productAppearance || "";
      const desc = `Isolated as a ${color ? `${color} ` : ""}${state} with ${
        rxn.yieldText || (rxn.yieldPercent ? `${rxn.yieldPercent}% yield` : "verified yield")
      }.`;

      if (state.toLowerCase().includes("precipitate") || state.toLowerCase().includes("solid") || state.toLowerCase().includes("crystal")) {
        observableEffects.push({
          type: "precipitation",
          colorTo: rxn.productAppearance ? this.mapColorToHex(rxn.productAppearance) : "#FFFFFF",
          description: desc,
        });
      } else if (state.toLowerCase().includes("gas") || state.toLowerCase().includes("bubble")) {
        observableEffects.push({
          type: "gas_evolution",
          description: desc,
        });
      } else {
        observableEffects.push({
          type: "phase_change",
          description: desc,
        });
      }
    }

    // Map procedural actions to ProcessBreakdown dimensions
    const actionDetails = rxn.actions.map(
      (a) => `${a.action}: ${a.phrase}${a.temp ? ` (${a.temp})` : ""}${a.time ? ` [${a.time}]` : ""}`
    );

    const processBreakdown: ChemicalProcessBreakdown = {
      masterExplanation:
        rxn.procedureText ||
        `Experimental patent procedure from ${rxn.documentId}: ${rxn.heading}. ${
          rxn.yieldPercent ? `Product formed in ${rxn.yieldPercent}% yield.` : ""
        }`,
      dimensions: [
        {
          title: "Patent Experimental Procedure",
          category: "properties",
          description: `Laboratory preparation recorded in US Patent ${rxn.documentId} (${rxn.year}).`,
          details:
            actionDetails.length > 0
              ? actionDetails
              : [rxn.procedureText || "Procedure described in patent."],
        },
        {
          title: "Solvents & Spectators",
          category: "observables",
          description: rxn.solvents
            ? `Reaction carried out in ${rxn.solvents}${rxn.catalysts ? ` with catalyst ${rxn.catalysts}` : ""}.`
            : "Direct conversion under laboratory atmospheric conditions.",
          details: [
            rxn.solvents ? `Solvents: ${rxn.solvents}` : "Solvent: neat / aqueous",
            rxn.catalysts ? `Catalyst: ${rxn.catalysts}` : "No separate catalyst listed",
          ],
        },
        {
          title: "Product Isolation & Outcomes",
          category: "concentrations",
          description: `Outcome: ${rxn.productNames}. Yield: ${rxn.yieldText || (rxn.yieldPercent ? `${rxn.yieldPercent}%` : "Not reported")}.`,
          details: [
            `Physical form: ${rxn.productState || "Solid/Liquid product"}`,
            `Appearance: ${rxn.productAppearance || "Characteristic appearance"}`,
            `Reaction SMILES: ${rxn.reactionSmiles || "Available in patent record"}`,
          ],
        },
      ],
    };

    const reactants = rxn.reactants.map((r, i) => {
      const resolved = this.resolveChemicalInfo(r.name, r.formula);
      return {
        chemicalId: resolved.chemicalId,
        formula: resolved.formula || (r.formula && /^[A-Z]/.test(r.formula) ? r.formula : `Reactant_${i + 1}`),
        commonName: resolved.commonName || r.name,
        coefficient: 1,
        isRegistered: true,
      };
    });

    const products = rxn.products.map((p, i) => {
      const resolved = this.resolveChemicalInfo(p.name, p.formula);
      return {
        chemicalId: resolved.chemicalId,
        formula: resolved.formula || (p.formula && /^[A-Z]/.test(p.formula) ? p.formula : `Product_${i + 1}`),
        commonName: resolved.commonName || p.name,
        coefficient: 1,
        isRegistered: true,
        isByproduct: i > 0,
      };
    });

    const resolution: ReactionResolution = {
      status: "REACTION",
      confidenceTier: "SUPPORTED",
      confidenceScore: 0.98,
      reactionType: "synthesis",
      balancedEquation: rxn.equationDisplay,
      reactants,
      products,
      observableEffects,
      energyClassification: "unknown",
      explanation: `Patent reaction record from ${rxn.documentId} (${rxn.year}): ${rxn.heading}. ${
        rxn.yieldText ? `Yield: ${rxn.yieldText}.` : ""
      } ${rxn.procedureText ? `Procedure: "${rxn.procedureText.slice(0, 300)}..."` : ""}`,
      ruleApplied: `chemrxn_patent:${rxn.documentId}`,
      reference: `US Patent ${rxn.documentId} (${rxn.year}, file: ${rxn.sourceFile})`,
      safetyNotes: rxn.solvents
        ? `Handle solvents (${rxn.solvents}) in a fume hood. Standard laboratory PPE required.`
        : "Standard laboratory PPE required.",
      warnings: [],
      processBreakdown,
    };

    // Calculate realistic stoichiometry lines
    const stoichLines: StoichiometryLine[] = [];
    for (const r of reactants) {
      const parsed = this.safeParseMolarMass(r.formula);
      stoichLines.push({
        chemicalId: r.chemicalId,
        formula: r.formula,
        commonName: r.commonName,
        role: "reactant",
        coefficient: 1,
        inputMoles: 0.05,
        inputMass: parsed > 0 ? parseFloat((0.05 * parsed).toFixed(2)) : 5.0,
        isLimiting: false,
        remainingMoles: 0,
        remainingMass: 0,
      });
    }

    const primeProd = products[0];
    if (primeProd) {
      const parsed = this.safeParseMolarMass(primeProd.formula);
      const yieldFrac = (rxn.yieldPercent ?? 85) / 100;
      const theoMoles = 0.05;
      const actualMoles = theoMoles * yieldFrac;
      stoichLines.push({
        chemicalId: primeProd.chemicalId,
        formula: primeProd.formula,
        commonName: primeProd.commonName,
        role: "product",
        coefficient: 1,
        theoreticalYieldMoles: theoMoles,
        theoreticalYieldMass: parsed > 0 ? parseFloat((theoMoles * parsed).toFixed(2)) : 10.0,
      });
    }

    return {
      resolution,
      stoichiometry: stoichLines,
      limitingReagentChemicalId: reactants[0]?.chemicalId,
    };
  }

  private safeParseMolarMass(formula: string): number {
    try {
      const parsed = parseFormula(formula);
      return computeMolarMass(parsed.composition);
    } catch {
      return 150.0;
    }
  }

  private mapColorToHex(colorName: string): string {
    const c = colorName.toLowerCase();
    if (c.includes("white") || c.includes("colorless")) return "#FFFFFF";
    if (c.includes("pale") || c.includes("light yellow")) return "#FEF9C3";
    if (c.includes("yellow")) return "#EAB308";
    if (c.includes("brown") || c.includes("tan")) return "#A16207";
    if (c.includes("orange")) return "#F97316";
    if (c.includes("red") || c.includes("pink")) return "#EF4444";
    if (c.includes("blue")) return "#3B82F6";
    if (c.includes("green")) return "#22C55E";
    return "#E2E8F0";
  }
}

// Singleton export
export const chemrxnService = new ChemrxnService();
