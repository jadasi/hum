import * as SystemUI from 'expo-system-ui';
import { Platform } from 'react-native';

import { THEME } from '@/shared/lib/navigation-theme';

/** Root / window background aligned with app shell (see `THEME` + `global.css`). */
const ROOT_BACKGROUND: Record<'light' | 'dark', string> = {
  light: THEME.light.background,
  dark: THEME.dark.background,
};

async function applyAndroidNavigationBarStyle(themeKey: 'light' | 'dark'): Promise<void> {
  if (Platform.OS !== 'android') {
    return;
  }
  try {
    const { setStyle } = await import('expo-navigation-bar');
    setStyle(themeKey === 'dark' ? 'dark' : 'light');
  } catch {
    /* Expo Go and other binaries without `ExpoNavigationBar` linked */
  }
}

/**
 * Keeps Android (and shared root) system chrome readable: status bar is driven by
 * `setStatusBarStyle` / `<StatusBar />` in the root layout; this updates root background +
 * navigation bar when the native module exists.
 */
export async function applySystemUiTheme(themeKey: 'light' | 'dark'): Promise<void> {
  await SystemUI.setBackgroundColorAsync(ROOT_BACKGROUND[themeKey]);
  await applyAndroidNavigationBarStyle(themeKey);
}
