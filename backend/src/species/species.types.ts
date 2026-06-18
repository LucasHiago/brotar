// Tipos do catálogo — espelham data/species/catalog.json e o app (mobile/lib/types.ts).
export type LightCategory = 'sol_pleno' | 'sol_a_meia_sombra' | 'meia_sombra';
export type NutrientDemand = 'baixa' | 'média' | 'alta';
export type CalcarioResposta = 'gosta' | 'tolera' | 'evitar';

export interface NumericRange {
  min_ideal: number;
  max_ideal: number;
  min_critico?: number;
  max_critico?: number;
  nota?: string;
}

export interface LightRange {
  categoria: LightCategory;
  horas_sol_min: number;
  nota?: string;
}

export interface NutrientRange {
  demanda: NutrientDemand;
  nota?: string;
}

export interface SpeciesRanges {
  ph: NumericRange;
  umidade_solo_pct: NumericRange;
  luz: LightRange;
  npk: { n: NutrientRange; p: NutrientRange; k: NutrientRange };
}

export interface Species {
  id: string;
  nome_popular: string;
  nomes_alt?: string[];
  nome_cientifico?: string;
  grupo?: string;
  faixas: SpeciesRanges;
  calcario_resposta: CalcarioResposta;
  calcario?: string;
  observacoes?: string;
}
