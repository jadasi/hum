import { TextInput, View } from 'react-native';

import { FlightInfoPanel, formatMoney } from '@/pages/driver-home';
import { formatLocation, formatRoute } from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import type { RideViewReadModel } from '../model/ride-view-types';

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
    <View className="gap-0.5">
      <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">{label}</Text>
      <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">{value}</Text>
    </View>
  );
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

  return (
    <View className="gap-4" testID="pending-ride-panel">
      <View className="gap-2 rounded-xl border border-border bg-background px-3 py-3" testID="pending-route-summary">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">Route</Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">{routeLine}</Text>
        <View className="mt-2 gap-2">
          <RouteRow label="Pickup" value={pickupLine} />
          <RouteRow label="Drop-off" value={dropoffLine} />
        </View>
      </View>

      {data.rider.preferences.length ? (
        <View className="gap-1" testID="pending-rider-preferences">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Preferences
          </Text>
          <Text className="font-sans text-hum-xs text-muted-foreground">{data.rider.preferences.join(' · ')}</Text>
        </View>
      ) : null}

      <View className="gap-2">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
          Suggested quote
        </Text>
        <Text className="font-sans text-hum-lg font-hum-bold text-foreground" testID="pending-suggested-quote">
          {formatMoney(data.pricing.quoted)}
        </Text>
      </View>

      {showPlatform ? (
        <View className="gap-1 rounded-xl border border-border bg-muted/40 px-3 py-3" testID="pending-platform-comparison">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Platform comparison
          </Text>
          <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">
            {formatMoney(platformLow!)}–{formatMoney(platformHigh!)}
          </Text>
        </View>
      ) : null}

      <View className="gap-2">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">Your quote</Text>
        <TextInput
          accessibilityLabel="Editable driver quote in dollars"
          autoCorrect={false}
          className="rounded-lg border border-input bg-background px-3 py-3 font-sans text-hum-md text-foreground"
          editable={!isConfirming}
          keyboardType="decimal-pad"
          onChangeText={onQuoteInputChange}
          placeholder="0.00"
          testID="pending-quote-input"
          value={quoteInput}
        />
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

      {data.flight ? (
        <View testID="pending-flight-summary">
          <FlightInfoPanel flight={data.flight} />
        </View>
      ) : null}
    </View>
  );
}
