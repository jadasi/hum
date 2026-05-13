import { TextInput, View } from 'react-native';

import { FlightInfoPanel, formatMoney } from '@/pages/driver-home';
import {
  formatLocation,
  formatRideStateLabel,
  formatRiderName,
  formatRoute,
  formatTime,
} from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import type { RiderClientSource, RideViewReadModel } from '../model/ride-view-types';

export type PendingRidePanelProps = {
  data: RideViewReadModel;
  quoteInput: string;
  onQuoteInputChange: (value: string) => void;
  quoteError: string | null;
  confirmError: string | null;
  isConfirming: boolean;
};

function RouteRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row gap-3">
      <View className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
      <View className="flex-1 gap-0.5">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">{value}</Text>
      </View>
    </View>
  );
}

function RelationshipStat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-muted/50 px-3 py-2">
      <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </Text>
      <Text className="font-sans text-hum-sm font-hum-bold text-foreground">{value}</Text>
    </View>
  );
}

const clientSourceLabelByValue: Record<RiderClientSource, string> = {
  unknown: 'Source unknown',
  platform_conversion: 'Platform conversion',
  referral: 'Referral',
  recurring_private_client: 'Recurring client',
  hum_network: 'HUM network',
  direct_booking: 'Direct booking',
};

function formatClientSource(source: RiderClientSource): string | null {
  if (source === 'unknown') {
    return null;
  }
  return clientSourceLabelByValue[source];
}

function formatRideCount(totalRides: number): string {
  return totalRides === 1 ? '1 ride' : `${totalRides} rides`;
}

function getRiderInitials(firstName: string, lastName: string): string {
  const firstInitial = firstName.trim().charAt(0);
  const lastInitial = lastName.trim().charAt(0);
  return `${firstInitial}${lastInitial}`.trim().toUpperCase() || '?';
}

export function PendingRidePanel({
  data,
  quoteInput,
  onQuoteInputChange,
  quoteError,
  confirmError,
  isConfirming,
}: PendingRidePanelProps) {
  const routeLine = formatRoute(data.pickup, data.dropoff);
  const pickupLine = formatLocation(data.pickup);
  const dropoffLine = formatLocation(data.dropoff);
  const platformLow = data.pricing.platformAverageLow;
  const platformHigh = data.pricing.platformAverageHigh;
  const showPlatform = platformLow !== null && platformHigh !== null;
  const riderName = formatRiderName(data.rider.firstName, data.rider.lastName);
  const scheduledPickup = data.scheduledPickupAt ? formatTime(data.scheduledPickupAt) : null;
  const clientSourceLabel = formatClientSource(data.rider.clientSource);

  return (
    <View className="gap-4" testID="pending-ride-panel">
      <View className="gap-4 rounded-3xl border border-primary/20 bg-primary/5 px-4 py-4" testID="pending-quote-card">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 gap-1">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-primary">
              Set your quote
            </Text>
            <Text className="font-sans text-hum-xs text-muted-foreground">
              Price this trip with passenger context and route details in view.
            </Text>
          </View>
          <View className="rounded-full bg-background px-3 py-1">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
              {formatRideStateLabel(data.state)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-center gap-2">
          <Text className="font-sans text-[34px] font-hum-bold leading-[38px] text-foreground">$</Text>
          <TextInput
            accessibilityLabel="Editable driver quote in dollars"
            autoCorrect={false}
            className="h-16 w-32 rounded-2xl border border-primary/30 bg-background px-3 py-0 text-center align-middle font-sans text-[34px] font-hum-bold leading-[38px] text-foreground"
            editable={!isConfirming}
            keyboardType="decimal-pad"
            onChangeText={onQuoteInputChange}
            placeholder="0.00"
            testID="pending-quote-input"
            value={quoteInput}
          />
          <Text
            accessibilityElementsHidden
            className="font-sans text-[34px] font-hum-bold leading-[38px] text-foreground opacity-0"
            importantForAccessibility="no-hide-descendants">
            $
          </Text>
        </View>

        <View className="flex-row gap-2">
          <View className="flex-1 rounded-2xl bg-background px-3 py-2">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
              Suggested
            </Text>
            <Text className="font-sans text-hum-md font-hum-bold text-foreground" testID="pending-suggested-quote">
              {formatMoney(data.pricing.quoted)}
            </Text>
          </View>

          {showPlatform ? (
            <View className="flex-1 rounded-2xl bg-background px-3 py-2" testID="pending-platform-comparison">
              <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
                Platform
              </Text>
              <Text className="font-sans text-hum-md font-hum-bold text-foreground">
                {formatMoney(platformLow!)}-{formatMoney(platformHigh!)}
              </Text>
            </View>
          ) : null}
        </View>

        {quoteError ? (
          <Text className="font-sans text-hum-xs text-destructive" testID="pending-quote-error">
            {quoteError}
          </Text>
        ) : null}
        {confirmError ? (
          <Text className="font-sans text-hum-xs text-destructive" testID="pending-confirm-error">
            {confirmError}
          </Text>
        ) : null}
      </View>

      <View className="gap-3 rounded-3xl border border-border bg-background px-4 py-4" testID="pending-rider-summary">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Text className="font-sans text-hum-md font-hum-bold text-primary">
              {getRiderInitials(data.rider.firstName, data.rider.lastName)}
            </Text>
          </View>
          <View className="flex-1 gap-1">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
              Passenger
            </Text>
            <Text className="font-sans text-hum-lg font-hum-bold text-foreground">{riderName}</Text>
          </View>
          {clientSourceLabel ? (
            <View className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1" testID="pending-rider-source">
              <Text className="font-sans text-[10px] font-hum-semibold text-primary">{clientSourceLabel}</Text>
            </View>
          ) : null}
        </View>

        <View className="flex-row gap-2">
          <RelationshipStat label="History" value={formatRideCount(data.rider.totalRides)} />
          <RelationshipStat label="Lifetime" value={formatMoney(data.rider.lifetimeValue)} />
        </View>

        {data.rider.preferences.length ? (
          <View className="gap-2" testID="pending-rider-preferences">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
              Known preferences
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {data.rider.preferences.map((preference) => (
                <View className="rounded-full bg-muted px-3 py-1.5" key={preference}>
                  <Text className="font-sans text-hum-xs font-hum-semibold text-foreground">{preference}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>

      <View className="gap-3 rounded-3xl border border-border bg-background px-4 py-4" testID="pending-route-summary">
        <View className="gap-1">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Trip to price
          </Text>
          <Text className="font-sans text-hum-md font-hum-bold text-foreground">{routeLine}</Text>
          {scheduledPickup ? (
            <Text className="font-sans text-hum-xs text-muted-foreground">Pickup at {scheduledPickup}</Text>
          ) : null}
        </View>

        <View className="gap-3">
          <RouteRow label="Pickup" value={pickupLine} />
          <View className="ml-1 h-4 w-px bg-border" />
          <RouteRow label="Drop-off" value={dropoffLine} />
        </View>

        {data.pricing.note ? (
          <View className="rounded-2xl bg-muted/50 px-3 py-2" testID="pending-pricing-note">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
              Pricing note
            </Text>
            <Text className="font-sans text-hum-xs text-foreground">{data.pricing.note}</Text>
          </View>
        ) : null}
      </View>

      {data.flight ? (
        <View testID="pending-flight-summary">
          <FlightInfoPanel flight={data.flight} />
        </View>
      ) : null}
    </View>
  );
}
