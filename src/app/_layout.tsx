import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { setStatusBarStyle } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme, View } from 'react-native';

import { hydrateAuthStore, subscribeAuthStore } from '@/features/auth';
import '@/global.css';
import { applySystemUiTheme } from '@/shared/lib/apply-system-ui-theme';
import { NAV_THEME } from '@/shared/lib/navigation-theme';

void SplashScreen.preventAutoHideAsync();

const dmSans = require('../assets/fonts/DMSans-VariableFont_opsz_wght.ttf');
const dmSansItalic = require('../assets/fonts/DMSans-Italic-VariableFont_opsz_wght.ttf');

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themeKey = colorScheme === 'dark' ? 'dark' : 'light';

  const [fontsLoaded, fontError] = useFonts({
    'DM Sans': dmSans,
    'DM Sans Italic': dmSansItalic,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!fontsLoaded && !fontError) {
      return;
    }
    let unsubscribe: (() => void) | undefined;
    void (async () => {
      await hydrateAuthStore();
      unsubscribe = subscribeAuthStore();
    })();
    return () => {
      unsubscribe?.();
    };
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!fontsLoaded && !fontError) {
      return;
    }
    setStatusBarStyle(themeKey === 'dark' ? 'light' : 'dark');
    void applySystemUiTheme(themeKey);
  }, [fontsLoaded, fontError, themeKey]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className={`flex-1 ${themeKey === 'dark' ? 'dark' : ''}`}>
      <ThemeProvider value={NAV_THEME[themeKey]}>
        <Stack screenOptions={{ headerShown: false }} />
        <PortalHost />
      </ThemeProvider>
    </View>
  );
}
