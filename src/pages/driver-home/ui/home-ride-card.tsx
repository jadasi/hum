import * as React from 'react';
import { View } from 'react-native';

import {
  formatMoney,
  formatRideStateLabel,
  formatRoute,
  formatShortRiderName,
  formatTime,
} from '../model/home-dashboard-formatters';
import type { HomeRideCardModel } from '../model/home-dashboard-types';
import { isActiveRide, isCompletedRide } from '../model/home-schedule-view';
import { FlightInfoPanel } from './flight-info-panel';
import { RideStatusBadge } from './ride-status-badge';

import { Card } from '@/shared/ui/primitives/card';
import { Text } from '@/shared/ui/primitives/text';

type HomeRideCardProps = {
  ride: HomeRideCardModel;
};

function formatPricing(ride: HomeRideCardModel): string {
  const accepted = ride.pricing.accepted;
  return accepted ? `accepted ${formatMoney(accepted)}` : `quoted ${formatMoney(ride.pricing.quoted)}`;
}

function formatPlatformAverage(ride: HomeRideCardModel): string | null {
  const { platformAverageLow, platformAverageHigh } = ride.pricing;
  if (!platformAverageLow || !platformAverageHigh) {
    return null;
  }
  return `platform ${formatMoney(platformAverageLow)}-${formatMoney(platformAverageHigh)}`;
}

export function HomeRideCard({ ride }: HomeRideCardProps) {
  const riderName = formatShortRiderName(ride.rider.firstName, ride.rider.lastName);
  const route = formatRoute(ride.pickup, ride.dropoff);
  const price = formatPricing(ride);
  const platformAverage = formatPlatformAverage(ride);
  const stateLabel = formatRideStateLabel(ride.state);
  const muted = isCompletedRide(ride);
  const active = isActiveRide(ride);

  return (
    <Card
      accessible
      accessibilityLabel={`${riderName}. ${stateLabel}. ${route}. ${price}.`}
      className={
        muted
          ? 'bg-muted/60 opacity-80'
          : active
            ? 'relative overflow-hidden border-[1.5px] border-primary bg-card shadow-md'
            : 'bg-card'
      }>
      {active ? (
        <View className="absolute left-4 right-4 top-0 h-[3px] rounded-b-sm bg-primary" />
      ) : null}
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-1">
          <Text className="font-sans text-hum-xs uppercase tracking-wide text-muted-foreground">
            {formatTime(ride.completedAt ?? ride.scheduledPickupAt)}
            {ride.type !== 'other' ? ` · ${ride.type}` : ''}
          </Text>
          <Text
            testID="home-ride-rider-name"
            className="font-sans text-[18px] font-hum-bold text-foreground">
            {riderName}
          </Text>
          <Text className="font-sans text-hum-sm text-muted-foreground">{route}</Text>
        </View>
        <RideStatusBadge state={ride.state} />
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        <Text className="rounded-md bg-primary/10 px-2 py-1 font-sans text-hum-xs font-hum-semibold text-primary">
          {price}
        </Text>
        {platformAverage ? (
          <Text className="rounded-md bg-muted px-2 py-1 font-sans text-hum-xs text-muted-foreground">
            {platformAverage}
          </Text>
        ) : null}
        {ride.displayNote ? (
          <Text className="rounded-md bg-muted px-2 py-1 font-sans text-hum-xs text-muted-foreground">
            {ride.displayNote}
          </Text>
        ) : null}
      </View>
      {ride.flight ? <FlightInfoPanel flight={ride.flight} /> : null}
    </Card>
  );
}
