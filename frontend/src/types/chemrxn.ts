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

export interface ChemrxnReaction {
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

export interface ChemrxnStats {
  totalIndexed: number;
  totalXmlFiles: number;
  yearsCovered: number;
  minYear: number;
  maxYear: number;
  avgYield: number | null;
  highYieldCount: number;
  stateRecordedCount: number;
}

export interface ChemrxnSearchParams {
  q?: string;
  year?: number;
  era?: "2010s" | "2000s" | "1990s" | "1980s" | "1970s";
  minYield?: number;
  productState?: string;
  reactant?: string;
  product?: string;
  limit?: number;
  offset?: number;
}
