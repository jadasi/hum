import { SymbolView } from 'expo-symbols';
import * as React from 'react';
import { View } from 'react-native';

import type { FlightDisplay } from '../model/home-dashboard-types';
import {
  formatBaggageClaim,
  formatFlightArrival,
  formatFlightRoute,
  formatFlightTerminalGate,
  getFlightStatusCopy,
} from '../model/home-flight-view';

import { Text } from '@/shared/ui/primitives/text';

type FlightInfoPanelProps = {
  flight: FlightDisplay;
};

export function FlightInfoPanel({ flight }: FlightInfoPanelProps) {
  const arrival = formatFlightArrival(flight);
  const status = getFlightStatusCopy(flight);
  const terminalGate = formatFlightTerminalGate(flight);
  const baggageClaim = formatBaggageClaim(flight);

  return (
    <View className="mt-3 gap-1 rounded-lg bg-primary/10 px-3 py-3">
      <View className="flex-row items-center gap-3">
        <SymbolView
          name={{ ios: 'airplane', android: 'local_airport', web: 'local_airport' }}
          size={24}
          tintColor="#52ADA2"
        />
        <View className="flex-1 gap-1">
          {formatFlightRoute(flight)}
          <View className="flex-row flex-1 flex-wrap gap-2">
            {arrival ? (
              <Text className="font-sans text-hum-xs text-muted-foreground">{arrival}</Text>
            ) : null}
            <Text className="font-sans text-hum-xs font-hum-semibold text-primary">{status}</Text>
          </View>
          {terminalGate ? (
            <Text className="font-sans text-hum-xs text-muted-foreground">{terminalGate}</Text>
          ) : null}
          {baggageClaim ? (
            <Text className="font-sans text-hum-xs text-muted-foreground">{baggageClaim}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
