import { SymbolView } from 'expo-symbols';
import * as React from 'react';
import { View } from 'react-native';

import { Text } from '@/shared/ui/primitives/text';

import { formatTime } from './home-dashboard-formatters';
import type { FlightDisplay } from './home-dashboard-types';

export function formatFlightRoute(flight: FlightDisplay): React.ReactElement {
  const flightLabel = flight.airlineCode ? `${flight.airlineCode} ${flight.flightNumber}` : `Flight ${flight.flightNumber}`;

  return (
    <View className="flex-row flex-wrap items-center gap-1">
      <Text className="font-sans text-hum-sm font-hum-bold text-foreground">{flightLabel}</Text>
      <Text className="font-sans text-hum-sm font-hum-bold text-foreground">·</Text>
      {flight.originAirportCode ? (
        <>
          <Text className="font-sans text-hum-sm font-hum-bold text-foreground">{flight.originAirportCode}</Text>
          <SymbolView
            fallback={<Text className="font-sans text-hum-sm font-hum-bold text-primary">→</Text>}
            name="arrow.right"
            size={12}
            tintColor="#52ADA2"
          />
        </>
      ) : null}
      <Text className="font-sans text-hum-sm font-hum-bold text-foreground">{flight.destinationAirportCode}</Text>
    </View>
  );
}

export function getFlightStatusCopy(flight: FlightDisplay): string {
  if (flight.status === 'unknown' || !flight.dataFreshnessAt) {
    return 'Flight details not confirmed';
  }
  if (flight.status === 'delayed' && flight.delayMinutes) {
    return `delayed ${flight.delayMinutes} min`;
  }
  if (flight.status === 'landed') {
    return 'landed';
  }
  if (flight.status === 'cancelled') {
    return 'cancelled';
  }
  if (flight.status === 'on_time') {
    return 'on time';
  }
  return 'scheduled';
}

export function formatFlightArrival(flight: FlightDisplay): string | null {
  const arrival = flight.actualArrivalAt ?? flight.estimatedArrivalAt ?? flight.scheduledArrivalAt;
  if (!arrival) {
    return null;
  }
  return `arrives ${formatTime(arrival)}`;
}

export function formatFlightTerminalGate(flight: FlightDisplay): string | null {
  const parts = [
    flight.terminal ? `Terminal ${flight.terminal}` : null,
    flight.gate ? `Gate ${flight.gate}` : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(' · ') : null;
}

export function formatBaggageClaim(flight: FlightDisplay): string | null {
  return flight.baggageClaim ? `Baggage ${flight.baggageClaim}` : null;
}
