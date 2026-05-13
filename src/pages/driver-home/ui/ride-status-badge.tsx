import { SymbolView } from 'expo-symbols';
import * as React from 'react';
import { View } from 'react-native';

import type { RideState } from '../model/home-dashboard-types';

import { Text } from '@/shared/ui/primitives/text';

type RideStatusBadgeProps = {
  state: RideState;
};

type BadgeDisplay = {
  icon: string;
  label: string;
  tintColor: string;
};

function badgeClasses(state: RideState): string {
  switch (state) {
    case 'pending':
      return 'border-amber-300 bg-amber-50';
    case 'completed':
      return 'border-border bg-muted';
    case 'driving_to_appointment':
    case 'driving_to_destination':
      return 'border-primary bg-primary/10';
    case 'confirmed':
      return 'border-primary bg-primary/10';
  }
}

function iconClasses(state: RideState): string {
  switch (state) {
    case 'pending':
      return 'bg-amber-100';
    case 'completed':
      return 'bg-background';
    case 'driving_to_appointment':
    case 'driving_to_destination':
    case 'confirmed':
      return 'bg-primary/10';
  }
}

function labelClasses(state: RideState): string {
  switch (state) {
    case 'pending':
      return 'text-amber-800';
    case 'completed':
      return 'text-muted-foreground';
    case 'driving_to_appointment':
    case 'driving_to_destination':
    case 'confirmed':
      return 'text-primary';
  }
}

function getBadgeDisplay(state: RideState): BadgeDisplay {
  switch (state) {
    case 'pending':
      return { icon: 'clock', label: 'Pending', tintColor: '#92400e' };
    case 'confirmed':
      return { icon: 'checkmark', label: 'Confirmed', tintColor: '#52ADA2' };
    case 'driving_to_appointment':
      return { icon: 'location', label: 'Pickup', tintColor: '#52ADA2' };
    case 'driving_to_destination':
      return { icon: 'car', label: 'Dropoff', tintColor: '#52ADA2' };
    case 'completed':
      return { icon: 'checkmark', label: 'Done', tintColor: '#737373' };
  }
}

export function RideStatusBadge({ state }: RideStatusBadgeProps) {
  const display = getBadgeDisplay(state);

  return (
    <View className={`min-h-[32px] flex-row items-center gap-1.5 rounded-full border py-1 pl-1.5 pr-3 ${badgeClasses(state)}`}>
      <View className={`h-5 w-5 items-center justify-center rounded-full ${iconClasses(state)}`}>
        <SymbolView
          fallback={<Text className={`font-sans text-[10px] font-hum-bold ${labelClasses(state)}`}>•</Text>}
          name={display.icon as 'clock' | 'checkmark' | 'location' | 'car'}
          size={11}
          tintColor={display.tintColor}
        />
      </View>
      <Text className={`font-sans text-hum-xs font-hum-semibold ${labelClasses(state)}`}>{display.label}</Text>
    </View>
  );
}
