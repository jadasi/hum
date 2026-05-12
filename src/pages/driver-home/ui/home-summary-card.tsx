import * as React from 'react';
import { View } from 'react-native';

import { formatMoney, formatRideGoalProgress } from '../model/home-dashboard-formatters';
import type { DriverHomeSummary } from '../model/home-dashboard-types';

import { Card } from '@/shared/ui/primitives/card';
import { Text } from '@/shared/ui/primitives/text';

type HomeSummaryCardProps = {
  summary: DriverHomeSummary;
};

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <View
      accessibilityLabel={`${label}: ${value}`}
      className="">
      <Text className="font-sans text-hum-xs font-hum-medium uppercase tracking-wide text-primary">{label}</Text>
      <Text className="mt-1 font-sans text-[24px] leading-none font-hum-bold text-primary-foreground">
        {value}
      </Text>
    </View>
  );
}

export function HomeSummaryCard({ summary }: HomeSummaryCardProps) {
  const rideGoal = formatRideGoalProgress(summary.weeklyRidesCompleted, summary.weeklyRidesGoal);

  return (
    <Card
      accessible
      accessibilityLabel={`Business snapshot. Today ${formatMoney(summary.todayEarnings)}. This week ${formatMoney(summary.weekEarnings)}. Goal ${rideGoal}.`}
      className="border-transparent bg-black py-3 px-4">
      <View className="flex-row justify-between">
        <StatCell label="Today" value={formatMoney(summary.todayEarnings)} />
        <StatCell label="This week" value={formatMoney(summary.weekEarnings)} />
        <StatCell label="Ride goal" value={rideGoal} />
      </View>
    </Card>
  );
}