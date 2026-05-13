import { View } from 'react-native';

import { formatLocation } from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import type { RideViewReadModel } from '../model/ride-view-types';

export type ActiveRidePanelProps = {
  data: RideViewReadModel;
};

function RouteStop({ label, value, testID }: { label: string; value: string; testID: string }) {
  return (
    <View className="flex-row gap-3">
      <View className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
      <View className="min-w-0 flex-1 gap-0.5">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground" testID={testID}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export function ActiveRidePanel({ data }: ActiveRidePanelProps) {
  const pickupLine = formatLocation(data.pickup);
  const dropoffLine = formatLocation(data.dropoff);
  const isPickupLeg = data.state === 'driving_to_appointment';
  const stageLabel = isPickupLeg ? 'En route to pickup' : 'On trip';
  const stageSupportCopy = isPickupLeg
    ? 'Get the rider safely into the vehicle and start the trip.'
    : 'Stay focused on the destination and complete the ride smoothly.';

  return (
    <View className="gap-4" testID="active-ride-panel">
      <View className="gap-3 rounded-3xl border border-border bg-background px-4 py-4" testID="active-route-summary">
        <View className="gap-1">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            {stageLabel}
          </Text>
          <Text className="font-sans text-hum-sm text-muted-foreground">{stageSupportCopy}</Text>
        </View>

        <View className="gap-3">
          <RouteStop label="Pickup" testID="active-pickup-line" value={pickupLine} />
          <View className="ml-1 h-4 w-px bg-border" />
          <RouteStop label="Drop-off" testID="active-dropoff-line" value={dropoffLine} />
        </View>
      </View>
    </View>
  );
}
