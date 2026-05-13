import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { View } from 'react-native';

type RideBottomSheetLayout = 'default' | 'navigation';

type RideBottomSheetProps = {
  children: React.ReactNode;
  testID?: string;
  layout?: RideBottomSheetLayout;
  /** Extra top reserve (px) so expanded snap clears overlays; usually safe-area top + nav chrome. */
  topInset?: number;
};

const layoutPresets: Record<RideBottomSheetLayout, { snapPoints: string[]; index: number }> = {
  default: { snapPoints: ['28%', '50%', '100%'], index: 1 },
  navigation: { snapPoints: ['22%', '40%', '100%'], index: 0 },
};

export function RideBottomSheet({
  children,
  testID = 'ride-bottom-sheet',
  layout = 'default',
  topInset = 0,
}: RideBottomSheetProps) {
  const preset = layoutPresets[layout];
  const snapPoints = React.useMemo(() => layoutPresets[layout].snapPoints, [layout]);

  return (
    <View className="flex-1" pointerEvents="box-none" testID={testID}>
      <BottomSheet enablePanDownToClose={false} index={preset.index} snapPoints={snapPoints} topInset={topInset}>
        <BottomSheetScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="pb-6">{children}</View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}
