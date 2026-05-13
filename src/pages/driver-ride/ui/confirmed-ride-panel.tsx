import { View } from 'react-native';

import { FlightInfoPanel, formatMoney } from '@/pages/driver-home';
import { formatLocation, formatRoute } from '@/pages/driver-home/model/home-dashboard-formatters';
import { Text } from '@/shared/ui/primitives/text';

import { buildConfirmedRideAgenda } from '../model/ride-agenda';
import { getRouteOverviewBannerCopy } from '../model/ride-route-context';
import type { RideViewReadModel } from '../model/ride-view-types';
import { RideAgendaTimeline } from './ride-agenda-timeline';

export type ConfirmedRidePanelProps = {
  data: RideViewReadModel;
  nowMs?: number;
};

export function ConfirmedRidePanel({ data, nowMs = Date.now() }: ConfirmedRidePanelProps) {
  const agenda = buildConfirmedRideAgenda(data, nowMs);
  const accepted = data.pricing.accepted;
  const routeBanner = getRouteOverviewBannerCopy(data.route);
  const routeLine = formatRoute(data.pickup, data.dropoff);

  return (
    <View className="gap-4" testID="confirmed-ride-panel">
      <View className="gap-2 rounded-xl border border-border bg-background px-3 py-3" testID="confirmed-route-summary">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">Route</Text>
        <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">{routeLine}</Text>
        <Text className="font-sans text-hum-xs text-muted-foreground">
          Pickup: {formatLocation(data.pickup)}
        </Text>
        <Text className="font-sans text-hum-xs text-muted-foreground">Drop-off: {formatLocation(data.dropoff)}</Text>
        {routeBanner ? (
          <Text className="mt-2 font-sans text-hum-xs text-muted-foreground" testID="confirmed-route-fallback">
            {routeBanner}
          </Text>
        ) : null}
      </View>

      {accepted ? (
        <View className="gap-1" testID="confirmed-accepted-quote">
          <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
            Accepted quote
          </Text>
          <Text className="font-sans text-hum-lg font-hum-bold text-foreground">{formatMoney(accepted)}</Text>
        </View>
      ) : null}

      <View className="gap-2">
        <Text className="font-sans text-[10px] font-hum-semibold uppercase tracking-wide text-muted-foreground">
          {"Today's agenda"}
        </Text>
        <RideAgendaTimeline items={agenda} />
      </View>

      {data.flight ? (
        <View testID="confirmed-flight-summary">
          <FlightInfoPanel flight={data.flight} />
        </View>
      ) : null}
    </View>
  );
}
