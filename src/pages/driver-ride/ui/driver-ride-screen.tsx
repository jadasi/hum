import { router } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '@/features/auth';
import { Button } from '@/shared/ui/primitives/button';
import { Text } from '@/shared/ui/primitives/text';
import { THEME } from '@/shared/lib/navigation-theme';

import { confirmPendingRide } from '../api/confirm-pending-ride';
import { getRideView } from '../api/get-ride-view';
import { updateRideState } from '../api/update-ride-state';
import {
  formatQuoteDollarsFromCents,
  parseDriverQuoteInput,
  validatePendingQuoteCents,
} from '../model/pending-quote';
import {
  createEmptyRelationshipDraft,
  setRelationshipDraftBody,
  toggleRelationshipDraftTag,
} from '../model/local-relationship-draft';
import {
  contactPassengerByPhone,
  showReviewPreTripUnavailable,
} from '../model/ride-action-handlers';
import type { RideViewLoadState, RideViewReadModel } from '../model/ride-view-types';
import { ActiveRidePanel } from './active-ride-panel';
import { CompletedRidePanel } from './completed-ride-panel';
import { ConfirmedRidePanel } from './confirmed-ride-panel';
import { PendingRidePanel } from './pending-ride-panel';
import { RideBottomSheet } from './ride-bottom-sheet';
import { RideMapNavHeader, RIDE_MAP_NAV_FLOATING_HEIGHT_PX } from './ride-map-nav-header';
import { RideMapView } from './ride-map-view';
import { RidePrimaryActionBar } from './ride-primary-action-bar';

type DriverRideScreenProps = {
  rideId: string;
  initialData?: RideViewReadModel;
};

const transitionByActionId = {
  navigate_to_pickup: 'navigate_to_pickup',
  start_dropoff_leg: 'start_dropoff_leg',
  end_trip: 'end_trip',
} as const;

type TransitionActionId = keyof typeof transitionByActionId;

function isTransitionActionId(actionId: string): actionId is TransitionActionId {
  return actionId in transitionByActionId;
}

export function DriverRideScreen({ rideId, initialData }: DriverRideScreenProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const navChevronTint = colorScheme === 'dark' ? THEME.dark.foreground : THEME.light.foreground;
  const user = useAuthStore((state) => state.user);
  const driverId = user?.id;
  const [loadState, setLoadState] = React.useState<RideViewLoadState>(() =>
    initialData ? { kind: 'ready', data: initialData } : { kind: 'loading' }
  );
  const [quoteInput, setQuoteInput] = React.useState('');
  const [confirmError, setConfirmError] = React.useState<string | null>(null);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [transitionLoadingId, setTransitionLoadingId] = React.useState<string | null>(null);
  const [transitionError, setTransitionError] = React.useState<string | null>(null);
  const [completedDraft, setCompletedDraft] = React.useState(createEmptyRelationshipDraft);

  const loadRide = React.useCallback(() => {
    if (!driverId) {
      setLoadState({ kind: 'error', message: 'Sign in again to load this ride.' });
      return () => {};
    }

    let active = true;
    setLoadState({ kind: 'loading' });
    void getRideView({ driverId, rideId }).then((result) => {
      if (!active) {
        return;
      }
      if (result.error || !result.data) {
        setLoadState({
          kind: 'error',
          message: result.error ?? 'We could not load this ride. Please try again.',
        });
        return;
      }
      setLoadState({ kind: 'ready', data: result.data });
    });

    return () => {
      active = false;
    };
  }, [driverId, rideId]);

  React.useEffect(() => {
    if (initialData) {
      setLoadState({ kind: 'ready', data: initialData });
      return;
    }

    return loadRide();
  }, [initialData, loadRide]);

  React.useEffect(() => {
    setCompletedDraft(createEmptyRelationshipDraft());
  }, [rideId]);

  React.useEffect(() => {
    if (loadState.kind !== 'ready') {
      return;
    }
    if (loadState.data.state === 'pending') {
      setQuoteInput(formatQuoteDollarsFromCents(loadState.data.pricing.quoted.cents));
      setConfirmError(null);
    } else {
      setConfirmError(null);
    }
  }, [loadState]);

  const onRetryLoad = React.useCallback(() => {
    loadRide();
  }, [loadRide]);

  const quoteValidationMessage = React.useMemo(() => {
    const parsed = parseDriverQuoteInput(quoteInput);
    if (!parsed.ok) {
      return parsed.error;
    }
    return validatePendingQuoteCents(parsed.cents);
  }, [quoteInput]);

  const onQuoteInputChange = React.useCallback((value: string) => {
    setQuoteInput(value);
    setConfirmError(null);
  }, []);

  const onPressMapBack = React.useCallback(() => {
    router.back();
  }, []);

  const onPressAction = React.useCallback(
    async (actionId: string) => {
      if (actionId === 'review_pre_trip_confirmation') {
        showReviewPreTripUnavailable();
        return;
      }

      if (actionId === 'contact_passenger') {
        if (loadState.kind !== 'ready') {
          return;
        }
        void contactPassengerByPhone(loadState.data.rider.phoneNumber);
        return;
      }

      if (isTransitionActionId(actionId)) {
        if (!driverId) {
          return;
        }

        setTransitionError(null);
        setTransitionLoadingId(actionId);
        const { error } = await updateRideState({
          driverId,
          rideId,
          transition: transitionByActionId[actionId],
        });

        if (error) {
          setTransitionLoadingId(null);
          setTransitionError(error);
          return;
        }

        const refreshed = await getRideView({ driverId, rideId });
        setTransitionLoadingId(null);
        if (refreshed.error || !refreshed.data) {
          setTransitionError(refreshed.error ?? 'Ride updated but we could not refresh details.');
          return;
        }
        setLoadState({ kind: 'ready', data: refreshed.data });
        return;
      }

      if (actionId !== 'confirm_pending_ride') {
        return;
      }

      if (!driverId) {
        return;
      }

      const parsed = parseDriverQuoteInput(quoteInput);
      if (!parsed.ok) {
        return;
      }
      const centsError = validatePendingQuoteCents(parsed.cents);
      if (centsError) {
        return;
      }

      setConfirmError(null);
      setIsConfirming(true);
      const { error } = await confirmPendingRide({
        driverId,
        rideId,
        quoteCents: parsed.cents,
      });

      if (error) {
        setIsConfirming(false);
        setConfirmError(error);
        return;
      }

      const refreshed = await getRideView({ driverId, rideId });
      setIsConfirming(false);
      if (refreshed.error || !refreshed.data) {
        setConfirmError(refreshed.error ?? 'Ride confirmed but we could not refresh details.');
        return;
      }
      setLoadState({ kind: 'ready', data: refreshed.data });
    },
    [driverId, loadState, quoteInput, rideId]
  );

  const rideActions = React.useMemo(() => {
    if (loadState.kind !== 'ready') {
      return [];
    }
    const d = loadState.data;
    if (d.state !== 'pending') {
      return d.availableActions;
    }
    return d.availableActions.map((action) =>
      action.id === 'confirm_pending_ride'
        ? {
            ...action,
            enabled: action.enabled && !quoteValidationMessage && !isConfirming,
            disabledReason: quoteValidationMessage ?? action.disabledReason,
          }
        : action
    );
  }, [isConfirming, loadState, quoteValidationMessage]);

  if (loadState.kind === 'loading') {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-background">
        <ActivityIndicator />
        <Text variant="muted">Loading ride...</Text>
      </View>
    );
  }

  if (loadState.kind === 'error') {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-background px-6">
        <Text className="text-center font-sans text-hum-lg font-hum-semibold text-foreground">Ride unavailable</Text>
        <Text className="text-center font-sans text-hum-sm text-muted-foreground">{loadState.message}</Text>
        <Button onPress={onRetryLoad} size="sm" variant="outline">
          Try again
        </Button>
      </View>
    );
  }

  const data = loadState.data;
  const bottomSheetLayout =
    data.state === 'driving_to_appointment' || data.state === 'driving_to_destination' ? 'navigation' : 'default';

  return (
    <View className="flex-1 bg-background">
      <View className="absolute inset-0">
        <RideMapView route={data.route} />
      </View>
      <RideMapNavHeader
        riderFirstName={data.rider.firstName}
        riderLastName={data.rider.lastName}
        state={data.state}
        topInset={insets.top}
        tintColor={navChevronTint}
        onPressBack={onPressMapBack}
      />
      <RideBottomSheet layout={bottomSheetLayout} topInset={insets.top + RIDE_MAP_NAV_FLOATING_HEIGHT_PX}>
        <View className="gap-4 px-4">
          {rideActions.length > 0 ? (
            <RidePrimaryActionBar
              actions={rideActions}
              loadingActionId={isConfirming ? 'confirm_pending_ride' : transitionLoadingId}
              onPressAction={onPressAction}
            />
          ) : null}
          {transitionError ? (
            <Text className="font-sans text-hum-sm text-destructive" testID="ride-transition-error">
              {transitionError}
            </Text>
          ) : null}
          {data.state === 'pending' ? (
            <PendingRidePanel
              confirmError={confirmError}
              data={data}
              isConfirming={isConfirming}
              onQuoteInputChange={onQuoteInputChange}
              quoteError={quoteValidationMessage}
              quoteInput={quoteInput}
            />
          ) : null}
          {data.state === 'confirmed' ? <ConfirmedRidePanel data={data} /> : null}
          {data.state === 'driving_to_appointment' || data.state === 'driving_to_destination' ? (
            <ActiveRidePanel data={data} />
          ) : null}
          {data.state === 'completed' ? (
            <CompletedRidePanel
              data={data}
              draft={completedDraft}
              onChangeDraftBody={(body) => setCompletedDraft((draft) => setRelationshipDraftBody(draft, body))}
              onToggleDraftTag={(tag) => setCompletedDraft((draft) => toggleRelationshipDraftTag(draft, tag))}
            />
          ) : null}
        </View>
      </RideBottomSheet>
    </View>
  );
}
