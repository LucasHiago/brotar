// Wrapper de fetch no mesmo estilo do specialist-app (Steply).
// Enquanto USE_MOCK estiver ligado, devolve dados locais (lib/mock.ts).
import { BACKEND_URL, USE_MOCK } from './config';
import { mockPlants, mockReadings } from './mock';
import type { Plant, Reading } from './types';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  const body = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new ApiError(res.status, body?.message || `HTTP ${res.status}`);
  }
  return body as T;
}

/** Lista as árvores do usuário. */
export async function listPlants(): Promise<Plant[]> {
  if (USE_MOCK) return mockPlants;
  return request<Plant[]>('/plants');
}

/** Última leitura de cada árvore (mapa plantId -> Reading). */
export async function lastReadings(): Promise<Record<string, Reading>> {
  if (USE_MOCK) return mockReadings;
  return request<Record<string, Reading>>('/readings/last');
}
