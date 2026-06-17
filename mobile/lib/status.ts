// Helpers de apresentação de status (cores e rótulos) — usados nas telas.
import { colors } from './theme';
import type { Status } from './types';

export function statusColor(s: Status): string {
  if (s === 'critico') return colors.danger;
  if (s === 'atencao') return colors.warning;
  return colors.ok;
}

export function statusLabel(s: Status): string {
  if (s === 'critico') return 'Crítico';
  if (s === 'atencao') return 'Atenção';
  return 'Tudo certo';
}
