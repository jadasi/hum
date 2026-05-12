import { getSupabase } from '@/shared/api';

import { logHomeDashboardLoaded, logHomeDashboardLoadFailed } from '../model/home-dashboard-logger';
import { mapHomeDashboard } from '../model/map-home-dashboard';
import type { HomeDashboardReadModel, HomeDashboardRows, RideRow } from '../model/home-dashboard-types';

type GetHomeDashboardArgs = {
  driverId: string;
  date: string;
};

type SupabaseErrorLike = {
  code?: string;
  message?: string;
};

const rideSelect = `
  id,
  ride_type,
  state,
  scheduled_pickup_at,
  completed_at,
  display_note,
  rider:riders (
    id,
    first_name,
    last_name,
    phone_number,
    total_rides,
    lifetime_value_cents,
    preferences
  ),
  pricing:pricing_quotes (
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
    airport_code
  ),
  dropoff:locations!rides_dropoff_location_id_fkey (
    label,
    address_line1,
    address_line2,
    city,
    region,
    airport_code
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

export function homeDashboardErrorMessage(error: SupabaseErrorLike): string {
  if (error.code === 'PGRST116') {
    return 'No dashboard summary found for today.';
  }
  if (error.code === '42501') {
    return 'You do not have permission to view this dashboard.';
  }
  return 'We could not load your home dashboard. Please try again.';
}

export async function getHomeDashboard({ driverId, date }: GetHomeDashboardArgs): Promise<{
  data: HomeDashboardReadModel | null;
  error: string | null;
}> {
  const supabase = getSupabase();

  const [summaryResult, ridesResult] = await Promise.all([
    supabase
      .from('driver_dashboard_summaries')
      .select(
        'today_earnings_cents, week_earnings_cents, weekly_rides_completed, weekly_rides_goal, computed_at'
      )
      .eq('driver_id', driverId)
      .eq('summary_date', date)
      .maybeSingle(),
    supabase.from('rides').select(rideSelect).eq('driver_id', driverId).order('scheduled_pickup_at', {
      ascending: true,
      nullsFirst: false,
    }),
  ]);

  const error = summaryResult.error ?? ridesResult.error;
  if (error) {
    logHomeDashboardLoadFailed({ driverId, date, errorCode: error.code });
    return { data: null, error: homeDashboardErrorMessage(error) };
  }

  const rows: HomeDashboardRows = {
    summary: summaryResult.data,
    rides: (ridesResult.data ?? []) as unknown as RideRow[],
  };
  const data = mapHomeDashboard(rows);
  logHomeDashboardLoaded({ driverId, date, rideCount: data.rides.length });
  return { data, error: null };
}
