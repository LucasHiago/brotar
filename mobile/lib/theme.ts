// Mesma estrutura do design system do Steply (specialist-app), paleta verde p/ o Brotar.
export const colors = {
  bg: '#F7FAF5',
  bgElevated: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#EFF4EC',
  surfaceHover: '#E4ECDF',
  border: '#DCE6D6',
  borderStrong: '#C4D2BB',

  primary: '#15803D',
  primaryHover: '#166534',
  primaryAlt: '#22C55E',
  primaryDeep: '#14532D',
  primaryGlow: 'rgba(34, 197, 94, 0.25)',
  primarySoft: 'rgba(34, 197, 94, 0.08)',

  accent: '#D97706',
  accentAlt: '#F59E0B',
  accentSoft: 'rgba(245, 158, 11, 0.10)',

  text: '#15211A',
  textMid: '#42524A',
  textLow: '#6B7A71',
  textFaint: '#A7B3AC',

  // estados de leitura (ok / atenção / crítico)
  ok: '#16A34A',
  warning: '#D97706',
  danger: '#DC2626',
  info: '#2563EB',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 24,
  6: 32,
  7: 48,
  8: 64,
  9: 96,
  10: 128,
} as const;

export const radius = {
  xs: 2,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  full: 9999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 22,
  xl: 28,
  '2xl': 36,
  '3xl': 48,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '800',
} as const;

export const shadow = {
  sm: {
    shadowColor: '#0F1E14',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#0F1E14',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  lg: {
    shadowColor: '#0F1E14',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
} as const;

export const theme = { colors, space, radius, fontSize, fontWeight, shadow };
export default theme;
