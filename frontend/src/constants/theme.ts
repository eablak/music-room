import { TextStyle, ViewStyle } from 'react-native';

export interface ColorRamp {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface AppColors {
  primary: ColorRamp;
  secondary: ColorRamp;
  accent: ColorRamp;
  success: ColorRamp;
  warning: ColorRamp;
  error: ColorRamp;
  neutral: ColorRamp;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

const blueRamp: ColorRamp = {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
};

const tealRamp: ColorRamp = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
};

const amberRamp: ColorRamp = {
  50: '#fffbeb',
  100: '#fef3c7',
  200: '#fde68a',
  300: '#fcd34d',
  400: '#fbbf24',
  500: '#f59e0b',
  600: '#d97706',
  700: '#b45309',
  800: '#92400e',
  900: '#78350f',
};

const greenRamp: ColorRamp = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
};

const redRamp: ColorRamp = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
};

const neutralRamp: ColorRamp = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
};

export const LightColors: AppColors = {
  primary: blueRamp,
  secondary: tealRamp,
  accent: amberRamp,
  success: greenRamp,
  warning: amberRamp,
  error: redRamp,
  neutral: neutralRamp,
  background: '#f7f8fa',
  surface: '#ffffff',
  text: '#171717',
  textMuted: '#737373',
  border: '#e5e5e5',
};

export const DarkColors: AppColors = {
  primary: blueRamp,
  secondary: tealRamp,
  accent: amberRamp,
  success: greenRamp,
  warning: amberRamp,
  error: redRamp,
  neutral: neutralRamp,
  background: '#0a0a0a',
  surface: '#171717',
  text: '#fafafa',
  textMuted: '#a3a3a3',
  border: '#262626',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography: Record<string, TextStyle> = {
  h1: { fontSize: 32, fontWeight: '700', lineHeight: 38 },
  h2: { fontSize: 24, fontWeight: '700', lineHeight: 29 },
  h3: { fontSize: 20, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  bodyMuted: { fontSize: 14, fontWeight: '400', lineHeight: 21 },
  caption: { fontSize: 12, fontWeight: '500', lineHeight: 18 },
  button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
} as const;

export const shadows: Record<string, ViewStyle> = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2, elevation: 1 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 3 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.16, shadowRadius: 16, elevation: 6 },
};
