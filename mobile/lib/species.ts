// Motor de avaliação: compara a leitura do sensor com a faixa ideal da ESPÉCIE.
// O catálogo é a mesma fonte de data/species/catalog.json (copiado em lib/data/species.json
// via `make sync-catalog`).
import catalog from './data/species.json';
import type {
  MetricEval,
  NumericRange,
  Reading,
  Recommendation,
  Species,
  Status,
} from './types';

const SPECIES = (catalog as { especies: Species[] }).especies;

export function listSpecies(): Species[] {
  return SPECIES;
}

export function getSpecies(id: string): Species | undefined {
  return SPECIES.find((e) => e.id === id);
}

/** Status de um valor numérico contra a faixa da espécie. */
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

/** Pior status de uma lista (critico > atencao > ok). */
export function worstStatus(list: Status[]): Status {
  if (list.includes('critico')) return 'critico';
  if (list.includes('atencao')) return 'atencao';
  return 'ok';
}

/** Avalia cada grandeza disponível na leitura contra a espécie. */
export function evaluate(reading: Reading, species: Species): MetricEval[] {
  const out: MetricEval[] = [];
  const f = species.faixas;

  if (reading.umidadeSoloPct !== undefined) {
    out.push({
      chave: 'umidade',
      rotulo: 'Umidade do solo',
      valor: `${reading.umidadeSoloPct}%`,
      status: evalNumeric(reading.umidadeSoloPct, f.umidade_solo_pct),
      detalhe: `ideal ${f.umidade_solo_pct.min_ideal}–${f.umidade_solo_pct.max_ideal}%`,
    });
  }

  if (reading.ph !== undefined) {
    out.push({
      chave: 'ph',
      rotulo: 'pH do solo',
      valor: reading.ph.toFixed(1),
      status: evalNumeric(reading.ph, f.ph),
      detalhe: `ideal ${f.ph.min_ideal}–${f.ph.max_ideal}`,
    });
  }

  if (reading.luzHoras !== undefined) {
    const ok = reading.luzHoras >= f.luz.horas_sol_min;
    out.push({
      chave: 'luz',
      rotulo: 'Luz (sol/dia)',
      valor: `${reading.luzHoras}h`,
      status: ok ? 'ok' : 'atencao',
      detalhe: `mín. ${f.luz.horas_sol_min}h (${f.luz.categoria.replace(/_/g, ' ')})`,
    });
  }

  // NPK: sem limiar absoluto confiável ainda (sensor barato precisa calibrar).
  // Mostramos a demanda da espécie como informação, sem classificar ok/crítico.
  if (reading.n !== undefined || reading.k !== undefined) {
    out.push({
      chave: 'npk',
      rotulo: 'Nutrientes (NPK)',
      valor: [
        reading.n !== undefined ? `N ${reading.n}` : null,
        reading.p !== undefined ? `P ${reading.p}` : null,
        reading.k !== undefined ? `K ${reading.k}` : null,
      ]
        .filter(Boolean)
        .join('  '),
      status: 'ok',
      detalhe: `demanda N:${f.npk.n.demanda} P:${f.npk.p.demanda} K:${f.npk.k.demanda}`,
    });
  }

  return out;
}

/** Status geral da árvore a partir das avaliações. */
export function overallStatus(evals: MetricEval[]): Status {
  return worstStatus(evals.map((e) => e.status));
}

/** Recomendações acionáveis a partir da leitura x espécie. */
export function recommend(reading: Reading, species: Species): Recommendation[] {
  const recs: Recommendation[] = [];
  const f = species.faixas;
  const nome = species.nome_popular;

  if (reading.umidadeSoloPct !== undefined) {
    if (reading.umidadeSoloPct < f.umidade_solo_pct.min_ideal) {
      recs.push({
        tipo: 'regar',
        severidade: evalNumeric(reading.umidadeSoloPct, f.umidade_solo_pct),
        mensagem: `Solo seco para ${nome}. Regue até ficar na faixa ${f.umidade_solo_pct.min_ideal}–${f.umidade_solo_pct.max_ideal}%.`,
      });
    } else if (reading.umidadeSoloPct > f.umidade_solo_pct.max_ideal) {
      recs.push({
        tipo: 'reduzir_agua',
        severidade: evalNumeric(reading.umidadeSoloPct, f.umidade_solo_pct),
        mensagem: `Solo encharcado para ${nome}. Espace as regas e confira a drenagem.`,
      });
    }
  }

  if (reading.ph !== undefined) {
    if (reading.ph < f.ph.min_ideal) {
      // solo ácido demais → subir pH. Só sugerir calcário se a espécie aceita.
      const podeCalcario = species.calcario_resposta !== 'evitar';
      recs.push({
        tipo: 'corrigir_ph',
        severidade: evalNumeric(reading.ph, f.ph),
        mensagem: podeCalcario
          ? `pH ácido para ${nome}. Considere calagem (calcário) para subir ao redor de ${f.ph.min_ideal}–${f.ph.max_ideal}.`
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

  if (reading.luzHoras !== undefined && reading.luzHoras < f.luz.horas_sol_min) {
    recs.push({
      tipo: 'ajustar_luz',
      severidade: 'atencao',
      mensagem: `${nome} está recebendo pouca luz (${reading.luzHoras}h). Ideal: ${f.luz.horas_sol_min}h+ (${f.luz.categoria.replace(/_/g, ' ')}).`,
    });
  }

  return recs;
}
