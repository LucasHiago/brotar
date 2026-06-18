// Motor de avaliação — MESMA lógica de mobile/lib/species.ts, no servidor.
// Compara a leitura do sensor com a faixa ideal da ESPÉCIE.
import type { NumericRange, Species } from '../species/species.types';

export type Status = 'ok' | 'atencao' | 'critico';

export interface ReadingInput {
  umidadeSoloPct?: number | null;
  ph?: number | null;
  luzHoras?: number | null;
  n?: number | null;
  p?: number | null;
  k?: number | null;
}

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

export function evalNumeric(value: number, range: NumericRange): Status {
  if (
    (range.min_critico !== undefined && value < range.min_critico) ||
    (range.max_critico !== undefined && value > range.max_critico)
  ) {
    return 'critico';
  }
  if (value < range.min_ideal || value > range.max_ideal) return 'atencao';
  return 'ok';
}

export function worstStatus(list: Status[]): Status {
  if (list.includes('critico')) return 'critico';
  if (list.includes('atencao')) return 'atencao';
  return 'ok';
}

function num(v: number | null | undefined): v is number {
  return v !== null && v !== undefined;
}

export function evaluate(reading: ReadingInput, species: Species): MetricEval[] {
  const out: MetricEval[] = [];
  const f = species.faixas;

  if (num(reading.umidadeSoloPct)) {
    out.push({
      chave: 'umidade',
      rotulo: 'Umidade do solo',
      valor: `${reading.umidadeSoloPct}%`,
      status: evalNumeric(reading.umidadeSoloPct, f.umidade_solo_pct),
      detalhe: `ideal ${f.umidade_solo_pct.min_ideal}–${f.umidade_solo_pct.max_ideal}%`,
    });
  }

  if (num(reading.ph)) {
    out.push({
      chave: 'ph',
      rotulo: 'pH do solo',
      valor: reading.ph.toFixed(1),
      status: evalNumeric(reading.ph, f.ph),
      detalhe: `ideal ${f.ph.min_ideal}–${f.ph.max_ideal}`,
    });
  }

  if (num(reading.luzHoras)) {
    const ok = reading.luzHoras >= f.luz.horas_sol_min;
    out.push({
      chave: 'luz',
      rotulo: 'Luz (sol/dia)',
      valor: `${reading.luzHoras}h`,
      status: ok ? 'ok' : 'atencao',
      detalhe: `mín. ${f.luz.horas_sol_min}h (${f.luz.categoria.replace(/_/g, ' ')})`,
    });
  }

  if (num(reading.n) || num(reading.k)) {
    out.push({
      chave: 'npk',
      rotulo: 'Nutrientes (NPK)',
      valor: [
        num(reading.n) ? `N ${reading.n}` : null,
        num(reading.p) ? `P ${reading.p}` : null,
        num(reading.k) ? `K ${reading.k}` : null,
      ]
        .filter(Boolean)
        .join('  '),
      status: 'ok',
      detalhe: `demanda N:${f.npk.n.demanda} P:${f.npk.p.demanda} K:${f.npk.k.demanda}`,
    });
  }

  return out;
}

export function overallStatus(evals: MetricEval[]): Status {
  return worstStatus(evals.map((e) => e.status));
}

export function recommend(reading: ReadingInput, species: Species): Recommendation[] {
  const recs: Recommendation[] = [];
  const f = species.faixas;
  const nome = species.nome_popular;

  if (num(reading.umidadeSoloPct)) {
    if (reading.umidadeSoloPct < f.umidade_solo_pct.min_ideal) {
      recs.push({
        tipo: 'regar',
        severidade: evalNumeric(reading.umidadeSoloPct, f.umidade_solo_pct),
        mensagem: `Solo seco para ${nome}. Regue até a faixa ${f.umidade_solo_pct.min_ideal}–${f.umidade_solo_pct.max_ideal}%.`,
      });
    } else if (reading.umidadeSoloPct > f.umidade_solo_pct.max_ideal) {
      recs.push({
        tipo: 'reduzir_agua',
        severidade: evalNumeric(reading.umidadeSoloPct, f.umidade_solo_pct),
        mensagem: `Solo encharcado para ${nome}. Espace as regas e confira a drenagem.`,
      });
    }
  }

  if (num(reading.ph)) {
    if (reading.ph < f.ph.min_ideal) {
      const podeCalcario = species.calcario_resposta !== 'evitar';
      recs.push({
        tipo: 'corrigir_ph',
        severidade: evalNumeric(reading.ph, f.ph),
        mensagem: podeCalcario
          ? `pH ácido para ${nome}. Considere calagem (calcário) para subir a ${f.ph.min_ideal}–${f.ph.max_ideal}.`
          : `pH ácido, mas ${nome} prefere solo ácido — NÃO aplique calcário; reavalie antes de corrigir.`,
      });
    } else if (reading.ph > f.ph.max_ideal) {
      recs.push({
        tipo: 'corrigir_ph',
        severidade: evalNumeric(reading.ph, f.ph),
        mensagem: `pH alto para ${nome}. Evite calcário; use matéria orgânica/enxofre para acidificar.`,
      });
    }
  }

  if (num(reading.luzHoras) && reading.luzHoras < f.luz.horas_sol_min) {
    recs.push({
      tipo: 'ajustar_luz',
      severidade: 'atencao',
      mensagem: `${nome} está recebendo pouca luz (${reading.luzHoras}h). Ideal: ${f.luz.horas_sol_min}h+ (${f.luz.categoria.replace(/_/g, ' ')}).`,
    });
  }

  return recs;
}
