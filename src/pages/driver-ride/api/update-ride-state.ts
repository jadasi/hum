import { getSupabase } from '@/shared/api';

import { logUpdateRideStateFailed, logUpdateRideStateSucceeded } from '../model/ride-view-logger';

export type DriverRideStateTransition =
  | 'navigate_to_pickup'
  | 'start_dropoff_leg'
  | 'end_trip';

type SupabaseErrorLike = {
  code?: string;
  message?: string;
};

export function updateRideStateErrorMessage(error: SupabaseErrorLike): string {
  if (error.code === '42501') {
    return 'You do not have permission to update this ride.';
  }
  if (error.code === 'PGRST116') {
    return 'We could not find that ride for your account.';
  }
  return 'We could not update this ride. Please try again.';
}

type UpdateRideStateArgs = {
  driverId: string;
  rideId: string;
  transition: DriverRideStateTransition;
};

export async function updateRideState({
  driverId,
  rideId,
  transition,
}: UpdateRideStateArgs): Promise<{ error: string | null }> {
  const supabase = getSupabase();

  const rideResult = await supabase
    .from('rides')
    .select('id, state, active_started_at, completed_at')
    .eq('driver_id', driverId)
    .eq('id', rideId)
    .maybeSingle();

  if (rideResult.error) {
    logUpdateRideStateFailed({
      rideId,
      transition,
      errorCategory: 'ride_lookup',
      errorCode: rideResult.error.code,
    });
    return { error: updateRideStateErrorMessage(rideResult.error) };
  }

  if (!rideResult.data) {
    logUpdateRideStateFailed({ rideId, transition, errorCategory: 'ride_not_found' });
    return { error: 'We could not find that ride for your account.' };
  }

  const currentState = rideResult.data.state as string;
  const now = new Date().toISOString();

  let nextState: string | null = null;
  let patch: Record<string, unknown> = { updated_at: now };

  if (transition === 'navigate_to_pickup') {
    if (currentState !== 'confirmed') {
      logUpdateRideStateFailed({ rideId, transition, errorCategory: 'invalid_state' });
      return { error: 'This ride is no longer ready to start pickup navigation.' };
    }
    nextState = 'driving_to_appointment';
    patch = {
      ...patch,
      state: nextState,
      active_started_at: rideResult.data.active_started_at ?? now,
    };
  } else if (transition === 'start_dropoff_leg') {
    if (currentState !== 'driving_to_appointment') {
      logUpdateRideStateFailed({ rideId, transition, errorCategory: 'invalid_state' });
      return { error: 'Start drop-off is only available while driving to pickup.' };
    }
    nextState = 'driving_to_destination';
    patch = {
      ...patch,
      state: nextState,
    };
  } else if (transition === 'end_trip') {
    if (currentState !== 'driving_to_destination') {
      logUpdateRideStateFailed({ rideId, transition, errorCategory: 'invalid_state' });
      return { error: 'End trip is only available while driving to drop-off.' };
    }
    nextState = 'completed';
    patch = {
      ...patch,
      state: nextState,
      completed_at: now,
    };
  } else {
    const _exhaustive: never = transition;
    return { error: `Unsupported ride transition: ${_exhaustive}` };
  }

  const rideUpdate = await supabase
    .from('rides')
    .update(patch)
    .eq('id', rideId)
    .eq('driver_id', driverId)
    .eq('state', currentState)
    .select('id');

  if (rideUpdate.error) {
    logUpdateRideStateFailed({
      rideId,
      transition,
      errorCategory: 'ride_update',
      errorCode: rideUpdate.error.code,
    });
    return { error: updateRideStateErrorMessage(rideUpdate.error) };
  }

  if (!rideUpdate.data?.length) {
    logUpdateRideStateFailed({ rideId, transition, errorCategory: 'ride_concurrent_state' });
    return { error: 'This ride changed while updating. Refresh and try again.' };
  }

  logUpdateRideStateSucceeded({ rideId, transition, nextState: nextState ?? currentState });
  return { error: null };
}
