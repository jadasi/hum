import { View } from 'react-native';

import { FlightInfoPanel, formatMoney } from '@/pages/driver-home';
import { formatLocation, formatRiderName, formatTime } from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import { buildConfirmedRideAgenda } from '../model/ride-agenda';
import { getRouteOverviewBannerCopy } from '../model/ride-route-context';
import type { RideViewReadModel } from '../model/ride-view-types';
import { RideAgendaTimeline } from './ride-agenda-timeline';

export type ConfirmedRidePanelProps = {
  data: RideViewReadModel;
  nowMs?: number;
};

function SummaryPill({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 rounded-2xl bg-muted/50 px-3 py-2">
      <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </Text>
      <Text className="font-sans text-hum-sm font-hum-bold text-foreground">{value}</Text>
    </View>
  );
}

function RouteStop({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row gap-3">
      <View className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
      <View className="min-w-0 flex-1 gap-0.5">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">{value}</Text>
      </View>
    </View>
  );
}

export function ConfirmedRidePanel({ data, nowMs = Date.now() }: ConfirmedRidePanelProps) {
  const agenda = buildConfirmedRideAgenda(data, nowMs);
  const accepted = data.pricing.accepted;
  const routeBanner = getRouteOverviewBannerCopy(data.route);
  const pickupLine = formatLocation(data.pickup);
  const dropoffLine = formatLocation(data.dropoff);
  const pickupTime = data.scheduledPickupAt ? formatTime(data.scheduledPickupAt) : 'Time TBD';
  const riderName = formatRiderName(data.rider.firstName, data.rider.lastName);
  const fare = accepted ? formatMoney(accepted) : formatMoney(data.pricing.quoted);
  const relationshipLine =
    data.rider.totalRides === 1 ? '1 ride with you' : `${data.rider.totalRides} rides with you`;

  return (
    <View className="gap-4" testID="confirmed-ride-panel">
      <View className="gap-4 rounded-3xl border border-primary/20 bg-primary/5 px-4 py-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1 gap-1">
            <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-primary">
              Confirmed ride
            </Text>
            <Text className="font-sans text-hum-lg font-hum-bold text-foreground">{riderName}</Text>
            <Text className="font-sans text-hum-xs text-muted-foreground">{relationshipLine}</Text>
          </View>
          <View className="rounded-full bg-background px-3 py-1" testID="confirmed-accepted-quote">
            <Text className="font-sans text-hum-sm font-hum-bold text-foreground">{fare}</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <SummaryPill label="Pickup" value={pickupTime} />
          <SummaryPill label="Destination" value={dropoffLine} />
        </View>

        {data.rider.preferences.length ? (
          <View className="flex-row flex-wrap gap-2">
            {data.rider.preferences.map((preference) => (
              <View className="rounded-full bg-background px-3 py-1.5" key={preference}>
                <Text className="font-sans text-hum-xs font-hum-semibold text-foreground">{preference}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View className="gap-3 rounded-3xl border border-border bg-background px-4 py-4">
        <View className="gap-1">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Prep plan
          </Text>
          <Text className="font-sans text-hum-sm text-muted-foreground">
            Keep the ride ready without living in the app.
          </Text>
        </View>
        <RideAgendaTimeline items={agenda} />
      </View>

      <View className="gap-3 rounded-3xl border border-border bg-background px-4 py-4" testID="confirmed-route-summary">
        <View className="gap-1">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Route
          </Text>
          <Text className="font-sans text-hum-sm text-muted-foreground">Know the stops before you head out.</Text>
        </View>
        <View className="gap-3">
          <RouteStop label="Pickup" value={pickupLine} />
          <View className="ml-1 h-4 w-px bg-border" />
          <RouteStop label="Drop-off" value={dropoffLine} />
        </View>
        {routeBanner ? (
          <Text className="font-sans text-hum-xs text-muted-foreground" testID="confirmed-route-fallback">
            {routeBanner}
          </Text>
        ) : null}
      </View>

      {data.flight ? (
        <View testID="confirmed-flight-summary">
          <FlightInfoPanel flight={data.flight} />
        </View>
      ) : null}
    </View>
  );
}
