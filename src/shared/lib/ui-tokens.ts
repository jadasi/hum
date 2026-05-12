/**
 * Runtime colors / spacing for React Native `StyleSheet` usage.
 * Tokens mirror `src/shared/styles/design-tokens.css`.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0D0D0D',
    textSecondary: '#444444',
    background: '#FFFFFF',
    backgroundElement: '#F8F8F8',
    backgroundSelected: '#F0FBF7',
    link: '#52ADA2',
    linkPressed: '#2A6B62',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#BBBBBB',
    background: '#0D0D0D',
    backgroundElement: '#2E2E2E',
    backgroundSelected: '#444444',
    link: '#7EC5BC',
    linkPressed: '#52ADA2',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'DM Sans',
    serif: 'Georgia',
    rounded: 'DM Sans',
    mono: 'Menlo',
  },
  default: {
    sans: 'DM Sans',
    serif: 'serif',
    rounded: 'DM Sans',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-primary)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-primary)',
    mono: 'var(--font-mono)',
  },
});

/** 4px grid — same scale as `--space-*` in the design system */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
