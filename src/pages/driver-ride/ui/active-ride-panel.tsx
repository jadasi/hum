import { View } from 'react-native';

import { formatLocation } from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import type { RideViewReadModel } from '../model/ride-view-types';

export type ActiveRidePanelProps = {
  data: RideViewReadModel;
};

export function ActiveRidePanel({ data }: ActiveRidePanelProps) {
  const pickupLine = formatLocation(data.pickup);
  const dropoffLine = formatLocation(data.dropoff);

  return (
    <View className="gap-4" testID="active-ride-panel">
      <View className="gap-2 rounded-xl border border-border bg-background px-3 py-3" testID="active-route-summary">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">Stops</Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground" testID="active-pickup-line">
          Pickup: {pickupLine}
        </Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground" testID="active-dropoff-line">
          Drop-off: {dropoffLine}
        </Text>
      </View>
    </View>
  );
}
