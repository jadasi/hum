import * as React from 'react';
import { View } from 'react-native';

import type { HomeRideCardModel } from '../model/home-dashboard-types';
import { sortRidesForSchedule } from '../model/home-schedule-view';
import { HomeRideCard } from './home-ride-card';

import { Text } from '@/shared/ui/primitives/text';

type HomeScheduleListProps = {
  rides: HomeRideCardModel[];
};

export function HomeScheduleList({ rides }: HomeScheduleListProps) {
  const sortedRides = sortRidesForSchedule(rides);

  return (
    <View className="gap-2">
      <Text
        accessibilityRole="header"
        className="font-sans text-hum-xs font-hum-semibold uppercase tracking-wide text-muted-foreground">
        Today&apos;s schedule
      </Text>
      {sortedRides.length === 0 ? (
        <View className="rounded-lg border border-dashed border-border bg-muted px-4 py-6">
          <Text className="text-center font-sans text-hum-sm text-muted-foreground">
            No rides scheduled today.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          {sortedRides.map((ride) => (
            <HomeRideCard key={ride.id} ride={ride} />
          ))}
        </View>
      )}
    </View>
  );
}
