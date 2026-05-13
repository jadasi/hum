import * as React from 'react';
import { Pressable, View } from 'react-native';

import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';

import type { RideAction } from '../model/ride-view-types';

type RidePrimaryActionBarProps = {
  actions: RideAction[];
  loadingActionId?: string | null;
  onPressAction?: (actionId: string) => void | Promise<void>;
};

export function RidePrimaryActionBar({ actions, loadingActionId, onPressAction }: RidePrimaryActionBarProps) {
  const primary = React.useMemo(() => actions.find((action) => action.priority === 'primary'), [actions]);
  const secondary = React.useMemo(() => actions.find((action) => action.priority === 'secondary'), [actions]);
  const busy = Boolean(loadingActionId);

  if (!primary) {
    return null;
  }

  const primaryBusy = loadingActionId === primary.id;

  const primaryButton = (
    <Button
      accessibilityHint="Primary ride action"
      accessibilityLabel={primary.label}
      accessibilityState={{ disabled: !primary.enabled || primaryBusy }}
      className="w-full"
      disabled={!primary.enabled || primaryBusy}
      loading={primaryBusy}
      onPress={() => void onPressAction?.(primary.id)}>
      {primary.label}
    </Button>
  );

  const secondaryControl = secondary ? (
    <View className="min-w-0 flex-1">
      <Pressable
        accessibilityHint={secondary.disabledReason ?? 'Secondary ride action'}
        accessibilityLabel={secondary.label}
        accessibilityRole="button"
        accessibilityState={{ disabled: !secondary.enabled || busy }}
        className="min-h-[48px] w-full items-center justify-center rounded-lg border border-border bg-background px-2 py-2 active:opacity-80"
        disabled={!secondary.enabled || busy}
        onPress={() => void onPressAction?.(secondary.id)}>
        <Text className="text-center font-sans text-hum-sm font-hum-semibold text-foreground" numberOfLines={2}>
          {secondary.label}
        </Text>
        {!secondary.enabled && secondary.disabledReason ? (
          <Text className="mt-1 text-center font-sans text-hum-xs text-muted-foreground" numberOfLines={2}>
            {secondary.disabledReason}
          </Text>
        ) : null}
      </Pressable>
    </View>
  ) : null;

  return (
    <View className="gap-3" testID="ride-primary-action-bar">
      {secondary ? (
        <View className="flex-row items-stretch gap-2">
          <View className="min-w-0 flex-1">{primaryButton}</View>
          {secondaryControl}
        </View>
      ) : (
        primaryButton
      )}
    </View>
  );
}
