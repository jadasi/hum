import { SymbolView } from 'expo-symbols';
import * as React from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from '@/features/auth';
import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';

import { getHomeDashboard } from '../api/get-home-dashboard';
import type { DriverHomeLoadState, HomeDashboardReadModel } from '../model/home-dashboard-types';
import { HomeScheduleList } from './home-schedule-list';
import { HomeSummaryCard } from './home-summary-card';

type DriverHomeScreenProps = {
  initialData?: HomeDashboardReadModel;
  onOpenMenu?: () => void;
  today?: string;
};

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function headerDateParts(dateString: string): { weekday: string; monthDay: string } {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
  const monthDay = date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

  return { weekday, monthDay };
}

export function DriverHomeScreen({ initialData, onOpenMenu, today = todayString() }: DriverHomeScreenProps) {
  const user = useAuthStore((state) => state.user);
  const driverId = user?.id;
  const headerDate = headerDateParts(today);
  const [loadState, setLoadState] = React.useState<DriverHomeLoadState>(() =>
    initialData ? { kind: 'ready', data: initialData } : { kind: 'loading' }
  );

  const loadDashboard = React.useCallback(() => {
    if (!driverId) {
      setLoadState({ kind: 'error', message: 'Sign in again to load your dashboard.' });
      return () => {};
    }

    let active = true;
    setLoadState({ kind: 'loading' });
    void getHomeDashboard({ driverId, date: today }).then((result) => {
      if (!active) {
        return;
      }
      if (result.error || !result.data) {
        setLoadState({ kind: 'error', message: result.error ?? 'We could not load your dashboard.' });
        return;
      }
      setLoadState({ kind: 'ready', data: result.data });
    });

    return () => {
      active = false;
    };
  }, [driverId, today]);

  React.useEffect(() => {
    if (initialData) {
      setLoadState({ kind: 'ready', data: initialData });
      return;
    }

    return loadDashboard();
  }, [initialData, loadDashboard]);

  const onRetryLoad = React.useCallback(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView className="flex-1" edges={['top', 'left', 'right']}>
        <ScrollView className="flex-1" contentContainerClassName="gap-5 px-5 pb-8 pt-4">
          <View className="flex-row items-start justify-between gap-4">
            <View
              accessibilityLabel={`${headerDate.weekday}, ${headerDate.monthDay}`}
              accessibilityRole="header"
              className="flex-1">
              <Text className="font-sans text-[36px] leading-none font-hum-bold text-foreground">
                {headerDate.weekday}
              </Text>
              <Text className="font-sans text-[36px] leading-none font-hum-bold text-foreground">
                {headerDate.monthDay}
              </Text>
            </View>
            <Pressable
              accessibilityHint="Opens account actions"
              accessibilityLabel="Open account menu"
              accessibilityRole="button"
              className="h-12 w-12 items-center justify-center rounded-full bg-black active:opacity-80"
              hitSlop={8}
              onPress={onOpenMenu}>
              <SymbolView
                name={{ ios: 'person', android: 'person', web: 'person' }}
                size={22}
                tintColor="#ffffff"
              />
            </Pressable>
          </View>

          {loadState.kind === 'loading' ? (
            <View className="min-h-[260px] items-center justify-center gap-3">
              <ActivityIndicator />
              <Text variant="muted">Loading your day...</Text>
            </View>
          ) : null}

          {loadState.kind === 'error' ? (
            <View className="min-h-[260px] items-center justify-center gap-3 rounded-lg border border-border bg-muted px-4">
              <Text className="text-center font-sans text-hum-lg font-hum-semibold text-foreground">
                Dashboard unavailable
              </Text>
              <Text className="text-center font-sans text-hum-sm text-muted-foreground">{loadState.message}</Text>
              <Button onPress={onRetryLoad} size="sm" variant="outline">
                Try again
              </Button>
            </View>
          ) : null}

          {loadState.kind === 'ready' ? (
            <>
              <HomeSummaryCard summary={loadState.data.summary} />
              <HomeScheduleList rides={loadState.data.rides} />
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
