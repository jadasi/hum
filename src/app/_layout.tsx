import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import '@/global.css';
import { NAV_THEME } from '@/lib/theme';

void SplashScreen.preventAutoHideAsync();

const dmSans = require('../assets/fonts/DMSans-VariableFont_opsz_wght.ttf');
const dmSansItalic = require('../assets/fonts/DMSans-Italic-VariableFont_opsz_wght.ttf');

export default function TabLayout() {
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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={NAV_THEME[themeKey]}>
      <AnimatedSplashOverlay />
      <AppTabs />
      <PortalHost />
    </ThemeProvider>
  );
}
