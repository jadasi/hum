import * as React from 'react';
import { View } from 'react-native';

import { formatRideStateLabel } from '../model/home-dashboard-formatters';
import type { RideState } from '../model/home-dashboard-types';

import { Text } from '@/shared/ui/primitives/text';

type RideStatusBadgeProps = {
  state: RideState;
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

export function RideStatusBadge({ state }: RideStatusBadgeProps) {
  const label = formatRideStateLabel(state);

  return (
    <View className={`min-h-[32px] justify-center rounded-full border px-3 ${badgeClasses(state)}`}>
      <Text className={`font-sans text-hum-xs font-hum-semibold ${labelClasses(state)}`}>{label}</Text>
    </View>
  );
}
