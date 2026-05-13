// @ts-nocheck
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
};

function jsonResponse(body: Record<string, unknown>, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
}

function envJsonDefault(name: string): string | null {
  const value = Deno.env.get(name);
  if (!value) {
    return null;
  }

  const parsed = JSON.parse(value);
  return parsed.default ?? null;
}

function requiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

function supabasePublishableKey(): string {
  return envJsonDefault('SUPABASE_PUBLISHABLE_KEYS') ?? requiredEnv('SUPABASE_ANON_KEY');
}

function supabaseSecretKey(): string {
  return envJsonDefault('SUPABASE_SECRET_KEYS') ?? requiredEnv('SUPABASE_SERVICE_ROLE_KEY');
}

function idFactory() {
  return crypto.randomUUID();
}

function demoTimestamp(today: string, time: string): string {
  return `${today}T${time}:00-07:00`;
}

async function requireUser(req: Request) {
  const authorization = req.headers.get('Authorization');
  if (!authorization) {
    return { user: null, error: 'Missing authorization header' };
  }

  const supabase = createClient(requiredEnv('SUPABASE_URL'), supabasePublishableKey(), {
    auth: { persistSession: false },
    global: { headers: { Authorization: authorization } },
  });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return { user: null, error: error?.message ?? 'Invalid session' };
  }

  return { user: data.user, error: null };
}

async function deleteExistingDriverRideData(supabaseAdmin, driverId: string) {
  const deletions = [
    ['rides', supabaseAdmin.from('rides').delete().eq('driver_id', driverId)],
    ['driver_dashboard_summaries', supabaseAdmin.from('driver_dashboard_summaries').delete().eq('driver_id', driverId)],
    ['flights', supabaseAdmin.from('flights').delete().eq('driver_id', driverId)],
    ['pricing_quotes', supabaseAdmin.from('pricing_quotes').delete().eq('driver_id', driverId)],
    ['locations', supabaseAdmin.from('locations').delete().eq('driver_id', driverId)],
    ['riders', supabaseAdmin.from('riders').delete().eq('driver_id', driverId)],
  ];

  for (const [table, deletion] of deletions) {
    const { error } = await deletion;
    if (error) {
      throw new Error(`Failed to clear ${table}: ${error.message}`);
    }
  }
}

async function insertRows(supabaseAdmin, table: string, rows: Record<string, unknown>[]) {
  const { error } = await supabaseAdmin.from(table).insert(rows);
  if (error) {
    throw new Error(`Failed to seed ${table}: ${error.message}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 });
  }

  const { user, error: authError } = await requireUser(req);
  if (authError || !user) {
    return jsonResponse({ error: authError ?? 'Unauthorized' }, { status: 401 });
  }

  const driverId = user.id;
  const today = new Date().toISOString().slice(0, 10);
  const now = new Date().toISOString();
  const id = idFactory;

  const riderIds = [id(), id(), id(), id(), id()];
  const locationIds = [id(), id(), id(), id(), id(), id(), id(), id()];
  const pricingIds = [id(), id(), id(), id(), id()];
  const flightId = id();
  const rideIds = [id(), id(), id(), id(), id()];

  const supabaseAdmin = createClient(requiredEnv('SUPABASE_URL'), supabaseSecretKey(), {
    auth: { persistSession: false },
  });

  const summary = {
    driver_id: driverId,
    summary_date: today,
    today_earnings_cents: 4500,
    week_earnings_cents: 142000,
    weekly_rides_completed: 7,
    weekly_rides_goal: 10,
    computed_at: now,
  };

  const riders = [
    {
      id: riderIds[0],
      driver_id: driverId,
      first_name: 'Daniel',
      last_name: 'Reyes',
      phone_number: '+16025550101',
      total_rides: 24,
      lifetime_value_cents: 96000,
      preferences: ['front seat okay', 'commuter'],
      client_source: 'recurring_private_client',
    },
    {
      id: riderIds[1],
      driver_id: driverId,
      first_name: 'Michele',
      last_name: 'White',
      phone_number: '+16025550102',
      total_rides: 12,
      lifetime_value_cents: 54000,
      preferences: ['prefers quiet', 'flies T4'],
      client_source: 'referral',
    },
    {
      id: riderIds[2],
      driver_id: driverId,
      first_name: 'Alicia',
      last_name: 'Moreno',
      phone_number: '+16025550103',
      total_rides: 8,
      lifetime_value_cents: 32000,
      preferences: ['needs extra trunk space'],
      client_source: 'platform_conversion',
    },
    {
      id: riderIds[3],
      driver_id: driverId,
      first_name: 'Brian',
      last_name: 'Sorenson',
      phone_number: '+16025550104',
      total_rides: 18,
      lifetime_value_cents: 81000,
      preferences: [],
      client_source: 'direct_booking',
    },
    {
      id: riderIds[4],
      driver_id: driverId,
      first_name: 'Nora',
      last_name: 'Patel',
      phone_number: '+16025550105',
      total_rides: 5,
      lifetime_value_cents: 22500,
      preferences: ['prefers text updates'],
      client_source: 'hum_network',
    },
  ];

  const locations = [
    {
      id: locationIds[0],
      driver_id: driverId,
      label: 'Arcadia',
      address_line1: 'Arcadia, Phoenix, AZ',
      city: 'Phoenix',
      region: 'AZ',
      latitude: 33.4499,
      longitude: -111.97,
    },
    {
      id: locationIds[1],
      driver_id: driverId,
      label: 'Sky Harbor offices',
      address_line1: 'Sky Harbor offices',
      city: 'Phoenix',
      region: 'AZ',
      latitude: 33.434,
      longitude: -112.008,
    },
    {
      id: locationIds[2],
      driver_id: driverId,
      label: 'Phoenix Sky Harbor',
      address_line1: '3400 E Sky Harbor Blvd',
      city: 'Phoenix',
      region: 'AZ',
      postal_code: '85034',
      airport_code: 'PHX',
      latitude: 33.4343,
      longitude: -112.0116,
    },
    {
      id: locationIds[3],
      driver_id: driverId,
      label: 'Scottsdale',
      address_line1: 'Scottsdale, AZ',
      city: 'Scottsdale',
      region: 'AZ',
      latitude: 33.4942,
      longitude: -111.9261,
    },
    {
      id: locationIds[4],
      driver_id: driverId,
      label: 'Biltmore Fashion Park',
      address_line1: '2502 E Camelback Rd',
      city: 'Phoenix',
      region: 'AZ',
      postal_code: '85016',
      latitude: 33.5081,
      longitude: -112.0267,
    },
    {
      id: locationIds[5],
      driver_id: driverId,
      label: 'The Phoenician',
      address_line1: '6000 E Camelback Rd',
      city: 'Scottsdale',
      region: 'AZ',
      postal_code: '85251',
      latitude: 33.5013,
      longitude: -111.9512,
    },
    {
      id: locationIds[6],
      driver_id: driverId,
      label: 'Camelback Inn',
      address_line1: '5402 E Lincoln Dr',
      city: 'Scottsdale',
      region: 'AZ',
      postal_code: '85253',
      latitude: 33.5271,
      longitude: -111.9518,
    },
    {
      id: locationIds[7],
      driver_id: driverId,
      label: 'Home',
      address_line1: 'Home',
      city: 'Phoenix',
      region: 'AZ',
      latitude: 33.45,
      longitude: -112.07,
    },
  ];

  const pricingQuotes = [
    {
      id: pricingIds[0],
      driver_id: driverId,
      quoted_amount_cents: 3500,
      accepted_amount_cents: 3500,
      platform_average_low_cents: 3900,
      platform_average_high_cents: 4600,
      currency: 'USD',
      pricing_note: 'commute',
    },
    {
      id: pricingIds[1],
      driver_id: driverId,
      quoted_amount_cents: 4500,
      accepted_amount_cents: null,
      platform_average_low_cents: 5200,
      platform_average_high_cents: 6300,
      currency: 'USD',
      pricing_note: 'flat',
    },
    {
      id: pricingIds[2],
      driver_id: driverId,
      quoted_amount_cents: 3800,
      accepted_amount_cents: 3800,
      platform_average_low_cents: 4300,
      platform_average_high_cents: 5100,
      currency: 'USD',
      pricing_note: 'appointment',
    },
    {
      id: pricingIds[3],
      driver_id: driverId,
      quoted_amount_cents: 4000,
      accepted_amount_cents: 4000,
      platform_average_low_cents: 4600,
      platform_average_high_cents: 5200,
      currency: 'USD',
      pricing_note: 'standing',
    },
    {
      id: pricingIds[4],
      driver_id: driverId,
      quoted_amount_cents: 4500,
      accepted_amount_cents: 4500,
      platform_average_low_cents: null,
      platform_average_high_cents: null,
      currency: 'USD',
      pricing_note: 'flat',
    },
  ];

  const flights = [
    {
      id: flightId,
      driver_id: driverId,
      airline_code: 'AA',
      flight_number: '2241',
      origin_airport_code: 'DFW',
      destination_airport_code: 'PHX',
      scheduled_arrival_at: demoTimestamp(today, '14:18'),
      estimated_arrival_at: demoTimestamp(today, '14:48'),
      actual_arrival_at: null,
      status: 'delayed',
      delay_minutes: 30,
      gate: 'B12',
      terminal: '4',
      baggage_claim: '6',
      data_freshness_at: now,
    },
  ];

  const rides = [
    {
      id: rideIds[0],
      driver_id: driverId,
      rider_id: riderIds[4],
      pricing_id: pricingIds[4],
      flight_id: null,
      pickup_location_id: locationIds[4],
      dropoff_location_id: locationIds[5],
      ride_type: 'appointment',
      state: 'completed',
      scheduled_pickup_at: demoTimestamp(today, '08:15'),
      active_started_at: demoTimestamp(today, '08:15'),
      completed_at: demoTimestamp(today, '08:48'),
      display_note: 'completed airport prospect follow-up',
    },
    {
      id: rideIds[1],
      driver_id: driverId,
      rider_id: riderIds[0],
      pricing_id: pricingIds[0],
      flight_id: null,
      pickup_location_id: locationIds[0],
      dropoff_location_id: locationIds[1],
      ride_type: 'commute',
      state: 'pending',
      scheduled_pickup_at: demoTimestamp(today, '10:30'),
      active_started_at: null,
      completed_at: null,
      display_note: 'morning commuter',
    },
    {
      id: rideIds[2],
      driver_id: driverId,
      rider_id: riderIds[1],
      pricing_id: pricingIds[1],
      flight_id: flightId,
      pickup_location_id: locationIds[2],
      dropoff_location_id: locationIds[3],
      ride_type: 'airport',
      state: 'confirmed',
      scheduled_pickup_at: demoTimestamp(today, '14:35'),
      active_started_at: null,
      completed_at: null,
      display_note: 'flat airport pickup',
    },
    {
      id: rideIds[3],
      driver_id: driverId,
      rider_id: riderIds[2],
      pricing_id: pricingIds[2],
      flight_id: null,
      pickup_location_id: locationIds[4],
      dropoff_location_id: locationIds[5],
      ride_type: 'appointment',
      state: 'driving_to_appointment',
      scheduled_pickup_at: demoTimestamp(today, '16:30'),
      active_started_at: demoTimestamp(today, '16:05'),
      completed_at: null,
      display_note: 'extra trunk space',
    },
    {
      id: rideIds[4],
      driver_id: driverId,
      rider_id: riderIds[3],
      pricing_id: pricingIds[3],
      flight_id: null,
      pickup_location_id: locationIds[6],
      dropoff_location_id: locationIds[7],
      ride_type: 'appointment',
      state: 'driving_to_destination',
      scheduled_pickup_at: demoTimestamp(today, '18:00'),
      active_started_at: demoTimestamp(today, '18:04'),
      completed_at: null,
      display_note: 'standing',
    },
  ];

  try {
    await deleteExistingDriverRideData(supabaseAdmin, driverId);
    await insertRows(supabaseAdmin, 'driver_dashboard_summaries', [summary]);
    await insertRows(supabaseAdmin, 'riders', riders);
    await insertRows(supabaseAdmin, 'locations', locations);
    await insertRows(supabaseAdmin, 'pricing_quotes', pricingQuotes);
    await insertRows(supabaseAdmin, 'flights', flights);
    await insertRows(supabaseAdmin, 'rides', rides);
  } catch (error) {
    console.error('[reset-demo-ride-data] failed', { driverId, message: error.message });
    return jsonResponse({ error: 'Could not reset demo ride data' }, { status: 500 });
  }

  return jsonResponse({
    counts: {
      summaries: 1,
      riders: riders.length,
      locations: locations.length,
      pricingQuotes: pricingQuotes.length,
      flights: flights.length,
      rides: rides.length,
    },
  });
});
