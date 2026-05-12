/**
 * Runtime spacing / fonts for the few places that still use `StyleSheet` or
 * native APIs (e.g. tab inset). Prefer NativeWind + `global.css` for colors.
 */

import { Platform } from 'react-native';

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
