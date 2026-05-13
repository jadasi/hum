import { getSupabase } from '@/shared/api';

import { logRideViewLoadFailed, logRideViewLoaded } from '../model/ride-view-logger';
import { mapRideView } from '../model/map-ride-view';
import type { RideViewReadModel, RideViewRideRow } from '../model/ride-view-types';

type GetRideViewArgs = {
  driverId: string;
  rideId: string;
};

type SupabaseErrorLike = {
  code?: string;
  message?: string;
};

const rideViewSelect = `
  id,
  pricing_id,
  ride_type,
  state,
  scheduled_pickup_at,
  active_started_at,
  completed_at,
  display_note,
  rider:riders (
    id,
    first_name,
    last_name,
    phone_number,
    total_rides,
    lifetime_value_cents,
    preferences,
    client_source
  ),
  pricing:pricing_quotes (
    id,
    quoted_amount_cents,
    accepted_amount_cents,
    platform_average_low_cents,
    platform_average_high_cents,
    currency,
    pricing_note
  ),
  pickup:locations!rides_pickup_location_id_fkey (
    label,
    address_line1,
    address_line2,
    city,
    region,
    airport_code,
    latitude,
    longitude
  ),
  dropoff:locations!rides_dropoff_location_id_fkey (
    label,
    address_line1,
    address_line2,
    city,
    region,
    airport_code,
    latitude,
    longitude
  ),
  flight:flights (
    airline_code,
    flight_number,
    origin_airport_code,
    destination_airport_code,
    scheduled_arrival_at,
    estimated_arrival_at,
    actual_arrival_at,
    status,
    delay_minutes,
    gate,
    terminal,
    baggage_claim,
    data_freshness_at
  )
`;

export function rideViewErrorMessage(error: SupabaseErrorLike): string {
  if (error.code === 'PGRST116') {
    return 'We could not find that ride for your account.';
  }
  if (error.code === '42501') {
    return 'You do not have permission to view this ride.';
  }
  return 'We could not load this ride. Please try again.';
}

export async function getRideView({ driverId, rideId }: GetRideViewArgs): Promise<{
  data: RideViewReadModel | null;
  error: string | null;
}> {
  const supabase = getSupabase();

  const result = await supabase.from('rides').select(rideViewSelect).eq('driver_id', driverId).eq('id', rideId).maybeSingle();

  if (result.error) {
    logRideViewLoadFailed({
      rideId,
      errorCode: result.error.code,
      errorCategory: 'supabase',
    });
    return { data: null, error: rideViewErrorMessage(result.error) };
  }

  if (!result.data) {
    logRideViewLoadFailed({
      rideId,
      errorCategory: 'not_found',
    });
    return { data: null, error: 'We could not find that ride for your account.' };
  }

  const row = result.data as unknown as RideViewRideRow;
  const mapped = mapRideView(row);

  if (!mapped) {
    logRideViewLoadFailed({
      rideId,
      errorCategory: 'incomplete_row',
    });
    return { data: null, error: 'This ride is missing details needed to open it.' };
  }

  logRideViewLoaded({ rideId, state: mapped.state });
  return { data: mapped, error: null };
}
