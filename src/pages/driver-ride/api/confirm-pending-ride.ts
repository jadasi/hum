import { getSupabase } from '@/shared/api';

import { logConfirmPendingRideFailed, logConfirmPendingRideSucceeded } from '../model/ride-view-logger';

type ConfirmPendingRideArgs = {
  driverId: string;
  rideId: string;
  quoteCents: number;
};

type SupabaseErrorLike = {
  code?: string;
  message?: string;
};

export function confirmPendingRideErrorMessage(error: SupabaseErrorLike): string {
  if (error.code === '42501') {
    return 'You do not have permission to update this ride.';
  }
  if (error.code === 'PGRST116') {
    return 'We could not find that ride for your account.';
  }
  return 'We could not confirm this ride. Please try again.';
}

export async function confirmPendingRide({
  driverId,
  rideId,
  quoteCents,
}: ConfirmPendingRideArgs): Promise<{ error: string | null }> {
  const supabase = getSupabase();

  const rideResult = await supabase
    .from('rides')
    .select('id, state, pricing_id')
    .eq('driver_id', driverId)
    .eq('id', rideId)
    .maybeSingle();

  if (rideResult.error) {
    logConfirmPendingRideFailed({
      rideId,
      errorCategory: 'ride_lookup',
      errorCode: rideResult.error.code,
    });
    return { error: confirmPendingRideErrorMessage(rideResult.error) };
  }

  if (!rideResult.data) {
    logConfirmPendingRideFailed({ rideId, errorCategory: 'ride_not_found' });
    return { error: 'We could not find that ride for your account.' };
  }

  if (rideResult.data.state !== 'pending') {
    logConfirmPendingRideFailed({ rideId, errorCategory: 'invalid_state' });
    return { error: 'This ride is no longer pending.' };
  }

  const pricingId = rideResult.data.pricing_id as string;
  const now = new Date().toISOString();

  const quoteUpdate = await supabase
    .from('pricing_quotes')
    .update({
      quoted_amount_cents: quoteCents,
      accepted_amount_cents: quoteCents,
      updated_at: now,
    })
    .eq('id', pricingId)
    .eq('driver_id', driverId);

  if (quoteUpdate.error) {
    logConfirmPendingRideFailed({
      rideId,
      errorCategory: 'pricing_update',
      errorCode: quoteUpdate.error.code,
    });
    return { error: confirmPendingRideErrorMessage(quoteUpdate.error) };
  }

  const rideUpdate = await supabase
    .from('rides')
    .update({
      state: 'confirmed',
      updated_at: now,
    })
    .eq('id', rideId)
    .eq('driver_id', driverId)
    .eq('state', 'pending')
    .select('id');

  if (rideUpdate.error) {
    logConfirmPendingRideFailed({
      rideId,
      errorCategory: 'ride_update',
      errorCode: rideUpdate.error.code,
    });
    return { error: confirmPendingRideErrorMessage(rideUpdate.error) };
  }

  if (!rideUpdate.data?.length) {
    logConfirmPendingRideFailed({ rideId, errorCategory: 'ride_concurrent_state' });
    return { error: 'This ride changed while confirming. Refresh and try again.' };
  }

  logConfirmPendingRideSucceeded({ rideId });
  return { error: null };
}
