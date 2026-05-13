import { SymbolView } from 'expo-symbols';
import * as React from 'react';
import { Pressable, View } from 'react-native';

import type { RideState } from '@/pages/driver-home';
import { Text } from '@/shared/ui/primitives/text';

import { rideNavSubtitleForState } from '../model/ride-nav-heading';
import { formatRiderDisplayName } from '../model/ride-view-formatters';

const islandBase = 'border border-border/70 bg-card shadow';

/** Space below the status bar taken by the floating nav row; pass to bottom sheet `topInset` (with safe-area top). */
export const RIDE_MAP_NAV_FLOATING_HEIGHT_PX = 56 + 12; // 56px + 12px padding bottom

type RideMapNavHeaderProps = {
  riderFirstName: string;
  riderLastName: string;
  state: RideState;
  topInset: number;
  onPressBack: () => void;
  tintColor: string;
};

export function RideMapNavHeader({
  riderFirstName,
  riderLastName,
  state,
  topInset,
  onPressBack,
  tintColor,
}: RideMapNavHeaderProps) {
  const title = formatRiderDisplayName(riderFirstName, riderLastName);
  const subtitle = rideNavSubtitleForState(state);

  return (
    <View
      className="absolute inset-x-0 top-0 z-50"
      pointerEvents="box-none"
      style={{ paddingTop: topInset }}
      testID="ride-map-nav-header">
      <View className="relative w-full px-3 pb-2">
        {/* Horizontally centered pill (viewport-centered); width follows content */}
        <View className="w-full items-center" pointerEvents="box-none">
          <View
            accessibilityLabel={`${title}. ${subtitle}`}
            accessibilityRole="header"
            className={`max-w-[88%] flex-col items-center rounded-full px-4 py-2 ${islandBase}`}
            testID="ride-map-nav-title-pill">
            <Text className="text-center font-sans text-hum-md font-hum-semibold text-foreground" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-center font-sans text-hum-xs text-muted-foreground" numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
        </View>

        {/* Back circle: left rail, vertically centered to the pill row — does not shift the pill */}
        <View
          className="absolute bottom-0 left-3 top-0 z-10 w-11 justify-center"
          pointerEvents="box-none">
          <Pressable
            accessibilityHint="Returns to the previous screen"
            accessibilityLabel="Back"
            accessibilityRole="button"
            className={`h-11 w-11 items-center justify-center rounded-full active:opacity-70 ${islandBase}`}
            hitSlop={8}
            onPress={onPressBack}
            testID="ride-map-nav-back">
            <SymbolView
              fallback={<Text className="font-sans text-hum-lg text-foreground">‹</Text>}
              name="chevron.left"
              size={22}
              tintColor={tintColor}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
