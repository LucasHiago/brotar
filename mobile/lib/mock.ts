// Dados de exemplo para o app rodar sem backend (USE_MOCK em config.ts).
// Mostra de propósito casos ok / atenção / crítico e o contraste de calcário.
import type { Plant, Reading } from './types';

export const mockPlants: Plant[] = [
  { id: 'p1', apelido: 'Limoeiro da varanda', especieId: 'limoeiro', local: 'Varanda', criadoEm: 0 },
  { id: 'p2', apelido: 'Jabuticabeira do fundo', especieId: 'jabuticabeira', local: 'Quintal', criadoEm: 0 },
  { id: 'p3', apelido: 'Aceroleira', especieId: 'aceroleira', local: 'Horta', criadoEm: 0 },
  { id: 'p4', apelido: 'Bananeira', especieId: 'bananeira', local: 'Fundo', criadoEm: 0 },
];

export const mockReadings: Record<string, Reading> = {
  // tudo dentro da faixa → ok
  p1: { id: 'r1', plantId: 'p1', medidoEm: 0, umidadeSoloPct: 60, ph: 6.2, luzHoras: 7, n: 40, p: 20, k: 35 },
  // pH 6.5 (ácido-amante prefere 5–6) → atenção, e NÃO deve receber calcário
  p2: { id: 'r2', plantId: 'p2', medidoEm: 0, umidadeSoloPct: 65, ph: 6.5, luzHoras: 5, n: 25, p: 18, k: 22 },
  // pH 5.4 (acerola quer 6–7) → corrigir; acerola aceita calcário
  p3: { id: 'r3', plantId: 'p3', medidoEm: 0, umidadeSoloPct: 45, ph: 5.4, luzHoras: 6, n: 30, p: 15, k: 28 },
  // solo seco demais → crítico de umidade
  p4: { id: 'r4', plantId: 'p4', medidoEm: 0, umidadeSoloPct: 35, ph: 6.1, luzHoras: 6, n: 50, p: 10, k: 60 },
};
