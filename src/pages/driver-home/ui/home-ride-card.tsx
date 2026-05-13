import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import {
  formatLocation,
  formatMoney,
  formatRideStateLabel,
  formatRoute,
  formatShortRiderName,
  formatTime,
} from '../model/home-dashboard-formatters';
import type { HomeRideCardModel, RideType } from '../model/home-dashboard-types';
import { isActiveRide, isCompletedRide } from '../model/home-schedule-view';
import { FlightInfoPanel } from './flight-info-panel';
import { RideStatusBadge } from './ride-status-badge';

import { Card } from '@/shared/ui/primitives/card';
import { Text } from '@/shared/ui/primitives/text';

type HomeRideCardProps = {
  ride: HomeRideCardModel;
};

type PriceDisplay = {
  label: 'Accepted' | 'Quoted';
  value: string;
  accessibilityText: string;
};

function formatPricing(ride: HomeRideCardModel): PriceDisplay {
  const accepted = ride.pricing.accepted;
  if (accepted) {
    const value = formatMoney(accepted);
    return { label: 'Accepted', value, accessibilityText: `accepted ${value}` };
  }

  const value = formatMoney(ride.pricing.quoted);
  return { label: 'Quoted', value, accessibilityText: `quoted ${value}` };
}

function formatRideTypeLabel(type: RideType): string {
  switch (type) {
    case 'airport':
      return 'Airport';
    case 'appointment':
      return 'Appointment';
    case 'commute':
      return 'Commute';
    case 'other':
      return 'Ride';
  }
}

function formatRiderHistory(ride: HomeRideCardModel): string {
  const rideCount = `${ride.rider.totalRides} ${ride.rider.totalRides === 1 ? 'ride' : 'rides'}`;
  return `${rideCount} · ${formatMoney(ride.rider.lifetimeValue)} lifetime`;
}

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase();
}

function PreferenceChip({ value }: { value: string }) {
  return (
    <View className="flex-row items-center gap-1 rounded-lg bg-primary/10 px-3 py-2">
      <SymbolView name="sparkles" size={12} tintColor="#52ADA2" />
      <Text className="font-sans text-hum-xs font-hum-semibold text-primary">{value}</Text>
    </View>
  );
}

function RideNote({ value }: { value: string }) {
  return (
    <View className="w-full rounded-xl bg-muted px-3 py-3">
      <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
        Ride note
      </Text>
      <Text className="mt-1 font-sans text-hum-sm font-hum-semibold text-foreground">{value}</Text>
    </View>
  );
}

function RoutePoint({ label, value }: { label: string; value: string }) {
  return (
    <View className="min-w-0 flex-1">
      <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </Text>
      <Text className="mt-0.5 font-sans text-hum-sm font-hum-semibold text-foreground" numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

function RouteSummary({ pickup, dropoff }: { pickup: string; dropoff: string }) {
  return (
    <View className="mt-4 flex-row items-center gap-3 rounded-2xl border border-border bg-background px-3 py-3">
      <RoutePoint label="Pickup" value={pickup} />
      <View className="h-9 w-9 items-center justify-center rounded-full bg-primary/10">
        <SymbolView
          fallback={<Text className="font-sans text-hum-sm font-hum-bold text-primary">→</Text>}
          name="arrow.right"
          size={15}
          tintColor="#52ADA2"
        />
      </View>
      <RoutePoint label="Drop-off" value={dropoff} />
    </View>
  );
}

export function HomeRideCard({ ride }: HomeRideCardProps) {
  const riderName = formatShortRiderName(ride.rider.firstName, ride.rider.lastName);
  const route = formatRoute(ride.pickup, ride.dropoff);
  const price = formatPricing(ride);
  const stateLabel = formatRideStateLabel(ride.state);
  const muted = isCompletedRide(ride);
  const active = isActiveRide(ride);
  const rideType = formatRideTypeLabel(ride.type);
  const preferenceChips = ride.rider.preferences.slice(0, 2);
  const cardAccessibilityLabel = `${riderName}. ${stateLabel}. ${route}. ${price.accessibilityText}.`;

  const onOpenRide = React.useCallback(() => {
    router.push(`/ride/${ride.id}`);
  }, [ride.id]);

  return (
    <Pressable
      accessibilityHint="Opens the full ride workspace"
      accessibilityLabel={cardAccessibilityLabel}
      accessibilityRole="button"
      accessible={false}
      className="active:opacity-90"
      onPress={onOpenRide}>
      <Card
        accessible={false}
        className={
          muted
            ? 'relative overflow-hidden bg-muted/60 opacity-80'
            : active
              ? 'relative overflow-hidden border-[1.5px] border-primary bg-card shadow-md'
              : 'relative overflow-hidden bg-card'
        }>
        {active ? (
          <>
            <View className="absolute bottom-0 left-0 top-0 w-1.5 bg-primary" />
            <View className="absolute -right-8 -top-10 h-24 w-24 rounded-full bg-primary/10" />
          </>
        ) : null}

        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className="rounded-full bg-primary/10 px-3 py-1 font-sans text-hum-xs font-hum-bold text-primary">
              {formatTime(ride.completedAt ?? ride.scheduledPickupAt)}
            </Text>
            <Text className="font-sans text-hum-xs font-hum-semibold uppercase tracking-wide text-muted-foreground">
              {rideType}
            </Text>
          </View>
          <RideStatusBadge state={ride.state} />
        </View>

        <View className="mt-4 flex-row items-start gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-black">
            <Text className="font-sans text-hum-sm font-hum-bold text-white">
              {getInitials(ride.rider.firstName, ride.rider.lastName)}
            </Text>
          </View>
          <View className="flex-1 gap-1">
            <Text
              testID="home-ride-rider-name"
              className="font-sans text-[20px] leading-6 font-hum-bold text-foreground">
              {riderName}
            </Text>
            <Text className="font-sans text-hum-xs text-muted-foreground">{formatRiderHistory(ride)}</Text>
          </View>
          <View className="min-w-[92px] rounded-2xl bg-primary/10 px-3 py-2">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-primary">
              {price.label}
            </Text>
            <Text className="mt-0.5 font-sans text-[22px] leading-6 font-hum-bold text-primary">
              {price.value}
            </Text>
          </View>
        </View>

        <RouteSummary pickup={formatLocation(ride.pickup)} dropoff={formatLocation(ride.dropoff)} />

        {ride.flight ? <FlightInfoPanel flight={ride.flight} /> : null}

        {ride.displayNote || preferenceChips.length > 0 ? (
          <View className="mt-3 flex-row flex-wrap gap-2">
            {ride.displayNote ? <RideNote value={ride.displayNote} /> : null}
            {preferenceChips.map((preference) => (
              <PreferenceChip key={preference} value={preference} />
            ))}
          </View>
        ) : null}
      </Card>
    </Pressable>
  );
}
