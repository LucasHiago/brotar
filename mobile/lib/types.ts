// Tipos do domínio do Brotar — espelham docs/data-model.md e data/species/catalog.json.

export type Status = 'ok' | 'atencao' | 'critico';
export type LightCategory = 'sol_pleno' | 'sol_a_meia_sombra' | 'meia_sombra';
export type NutrientDemand = 'baixa' | 'média' | 'alta';
export type CalcarioResposta = 'gosta' | 'tolera' | 'evitar';

/** Faixa numérica ideal/crítica de uma grandeza (pH, umidade...). */
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

/** Uma árvore frutífera cadastrada pelo usuário. */
export interface Plant {
  id: string;
  apelido: string;
  especieId: string;
  local?: string;
  fotoUrl?: string;
  deviceId?: string;
  criadoEm: number;
}

/** Uma leitura enviada pelo sensor fixo (via Wi-Fi). */
export interface Reading {
  id: string;
  plantId: string;
  deviceId?: string;
  medidoEm: number;
  umidadeSoloPct?: number;
  ph?: number;
  luzHoras?: number; // horas de sol/dia estimadas
  n?: number;
  p?: number;
  k?: number;
  temperaturaC?: number;
}

/** Avaliação de uma grandeza: valor x faixa da espécie. */
export interface MetricEval {
  chave: 'umidade' | 'ph' | 'luz' | 'npk';
  rotulo: string;
  valor: string;
  status: Status;
  detalhe?: string;
}

export interface Recommendation {
  tipo: 'regar' | 'adubar' | 'corrigir_ph' | 'ajustar_luz' | 'reduzir_agua';
  severidade: Status;
  mensagem: string;
}
