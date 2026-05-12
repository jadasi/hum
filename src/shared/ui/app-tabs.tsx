import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';

import { THEME } from '@/shared/lib/navigation-theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const mode = scheme === 'dark' ? 'dark' : 'light';
  const t = THEME[mode];

  return (
    <NativeTabs
      backgroundColor={t.background}
      indicatorColor={t.muted}
      labelStyle={{ selected: { color: t.foreground } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Today</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="clients">
        <NativeTabs.Trigger.Label>Clients</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="person" sf="person" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="earnings">
        <NativeTabs.Trigger.Label>Earnings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="paid" sf="dollarsign.circle" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="posse">
        <NativeTabs.Trigger.Label>Posse</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="people" sf="person.2" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
