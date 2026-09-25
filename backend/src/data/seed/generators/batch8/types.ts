export interface ReactionDefinition {
  id: string;
  name: string;
  reactants: string[];
  products: string[];
  enthalpy?: number;
  enthalpyKjPerMol?: number;
  desc?: string;
  description?: string;
  type?: string;
  reactionType?: string;
  effects?: any[];
  observableEffects?: any[];
  net?: string;
  netIonicEquation?: string;
  solvent?: string;
  catalyst?: string;
  catalystChemicalId?: string;
  tempMin?: number;
  temperatureMinC?: number;
  tempMax?: number;
  temperatureMaxC?: number;
}

