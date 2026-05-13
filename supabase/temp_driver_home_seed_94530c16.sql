-- Temporary driver home dashboard seed data.
-- Run after applying supabase/migrations/20260512220806_driver_home_dashboard.sql.
--
-- Target auth user:
--   94530c16-3e8a-46d7-b0eb-5dbc7a0665e0
--
-- This file is intentionally separate from supabase/seed.sql and uses fixed
-- UUIDs with upserts so it can be re-run while testing the home screen.

begin;

insert into public.driver_dashboard_summaries (
  id,
  driver_id,
  summary_date,
  today_earnings_cents,
  week_earnings_cents,
  weekly_rides_completed,
  weekly_rides_goal,
  computed_at
) values (
  '10000000-0000-4000-8000-000000000001',
  '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
  current_date,
  4500,
  142000,
  7,
  10,
  now()
)
on conflict (driver_id, summary_date) do update set
  today_earnings_cents = excluded.today_earnings_cents,
  week_earnings_cents = excluded.week_earnings_cents,
  weekly_rides_completed = excluded.weekly_rides_completed,
  weekly_rides_goal = excluded.weekly_rides_goal,
  computed_at = excluded.computed_at,
  updated_at = now();

insert into public.riders (
  id,
  driver_id,
  first_name,
  last_name,
  phone_number,
  total_rides,
  lifetime_value_cents,
  preferences,
  client_source
) values
  (
    '20000000-0000-4000-8000-000000000001',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Daniel',
    'Reyes',
    '+16025550101',
    24,
    96000,
    array['front seat okay', 'commuter'],
    'recurring_private_client'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Michele',
    'White',
    '+16025550102',
    12,
    54000,
    array['prefers quiet', 'flies T4'],
    'referral'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Alicia',
    'Moreno',
    '+16025550103',
    8,
    32000,
    array['needs extra trunk space'],
    'platform_conversion'
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Brian',
    'Sorenson',
    '+16025550104',
    18,
    81000,
    array[]::text[],
    'direct_booking'
  ),
  (
    '20000000-0000-4000-8000-000000000005',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Nora',
    'Patel',
    '+16025550105',
    5,
    22500,
    array['prefers text updates'],
    'hum_network'
  )
on conflict (id) do update set
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  phone_number = excluded.phone_number,
  total_rides = excluded.total_rides,
  lifetime_value_cents = excluded.lifetime_value_cents,
  preferences = excluded.preferences,
  client_source = excluded.client_source,
  updated_at = now();

insert into public.locations (
  id,
  driver_id,
  label,
  address_line1,
  address_line2,
  city,
  region,
  postal_code,
  airport_code
) values
  (
    '30000000-0000-4000-8000-000000000001',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Arcadia',
    'Arcadia, Phoenix, AZ',
    null,
    'Phoenix',
    'AZ',
    null,
    null
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Sky Harbor offices',
    'Sky Harbor offices',
    null,
    'Phoenix',
    'AZ',
    null,
    null
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Phoenix Sky Harbor',
    '3400 E Sky Harbor Blvd',
    null,
    'Phoenix',
    'AZ',
    '85034',
    'PHX'
  ),
  (
    '30000000-0000-4000-8000-000000000004',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Scottsdale',
    'Scottsdale, AZ',
    null,
    'Scottsdale',
    'AZ',
    null,
    null
  ),
  (
    '30000000-0000-4000-8000-000000000005',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Biltmore Fashion Park',
    '2502 E Camelback Rd',
    null,
    'Phoenix',
    'AZ',
    '85016',
    null
  ),
  (
    '30000000-0000-4000-8000-000000000006',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'The Phoenician',
    '6000 E Camelback Rd',
    null,
    'Scottsdale',
    'AZ',
    '85251',
    null
  ),
  (
    '30000000-0000-4000-8000-000000000007',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Camelback Inn',
    '5402 E Lincoln Dr',
    null,
    'Scottsdale',
    'AZ',
    '85253',
    null
  ),
  (
    '30000000-0000-4000-8000-000000000008',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    'Home',
    'Home',
    null,
    'Phoenix',
    'AZ',
    null,
    null
  )
on conflict (id) do update set
  label = excluded.label,
  address_line1 = excluded.address_line1,
  address_line2 = excluded.address_line2,
  city = excluded.city,
  region = excluded.region,
  postal_code = excluded.postal_code,
  airport_code = excluded.airport_code,
  updated_at = now();

-- Map coordinates for ride view (approximate Phoenix metro).
update public.locations set latitude = 33.4499, longitude = -111.9700 where id = '30000000-0000-4000-8000-000000000001';
update public.locations set latitude = 33.4340, longitude = -112.0080 where id = '30000000-0000-4000-8000-000000000002';
update public.locations set latitude = 33.4343, longitude = -112.0116 where id = '30000000-0000-4000-8000-000000000003';
update public.locations set latitude = 33.4942, longitude = -111.9261 where id = '30000000-0000-4000-8000-000000000004';
update public.locations set latitude = 33.5081, longitude = -112.0267 where id = '30000000-0000-4000-8000-000000000005';
update public.locations set latitude = 33.5013, longitude = -111.9512 where id = '30000000-0000-4000-8000-000000000006';
update public.locations set latitude = 33.5271, longitude = -111.9518 where id = '30000000-0000-4000-8000-000000000007';
update public.locations set latitude = 33.4500, longitude = -112.0700 where id = '30000000-0000-4000-8000-000000000008';

insert into public.pricing_quotes (
  id,
  driver_id,
  quoted_amount_cents,
  accepted_amount_cents,
  platform_average_low_cents,
  platform_average_high_cents,
  currency,
  pricing_note
) values
  (
    '40000000-0000-4000-8000-000000000001',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    3500,
    3500,
    3900,
    4600,
    'USD',
    'commute'
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    4500,
    null,
    5200,
    6300,
    'USD',
    'flat'
  ),
  (
    '40000000-0000-4000-8000-000000000003',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    3800,
    3800,
    4300,
    5100,
    'USD',
    'appointment'
  ),
  (
    '40000000-0000-4000-8000-000000000004',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    4000,
    4000,
    4600,
    5200,
    'USD',
    'standing'
  ),
  (
    '40000000-0000-4000-8000-000000000005',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    4500,
    4500,
    null,
    null,
    'USD',
    'flat'
  )
on conflict (id) do update set
  quoted_amount_cents = excluded.quoted_amount_cents,
  accepted_amount_cents = excluded.accepted_amount_cents,
  platform_average_low_cents = excluded.platform_average_low_cents,
  platform_average_high_cents = excluded.platform_average_high_cents,
  currency = excluded.currency,
  pricing_note = excluded.pricing_note,
  updated_at = now();

insert into public.flights (
  id,
  driver_id,
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
) values (
  '50000000-0000-4000-8000-000000000001',
  '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
  'AA',
  '2241',
  'DFW',
  'PHX',
  (current_date + time '14:18')::timestamptz,
  (current_date + time '14:48')::timestamptz,
  null,
  'delayed',
  30,
  'B12',
  '4',
  '6',
  now()
)
on conflict (id) do update set
  airline_code = excluded.airline_code,
  flight_number = excluded.flight_number,
  origin_airport_code = excluded.origin_airport_code,
  destination_airport_code = excluded.destination_airport_code,
  scheduled_arrival_at = excluded.scheduled_arrival_at,
  estimated_arrival_at = excluded.estimated_arrival_at,
  actual_arrival_at = excluded.actual_arrival_at,
  status = excluded.status,
  delay_minutes = excluded.delay_minutes,
  gate = excluded.gate,
  terminal = excluded.terminal,
  baggage_claim = excluded.baggage_claim,
  data_freshness_at = excluded.data_freshness_at,
  updated_at = now();

insert into public.rides (
  id,
  driver_id,
  rider_id,
  pricing_id,
  flight_id,
  pickup_location_id,
  dropoff_location_id,
  ride_type,
  state,
  scheduled_pickup_at,
  active_started_at,
  completed_at,
  display_note
) values
  (
    '60000000-0000-4000-8000-000000000001',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    '20000000-0000-4000-8000-000000000005',
    '40000000-0000-4000-8000-000000000005',
    null,
    '30000000-0000-4000-8000-000000000005',
    '30000000-0000-4000-8000-000000000006',
    'appointment',
    'completed',
    (current_date + time '08:15')::timestamptz,
    (current_date + time '08:15')::timestamptz,
    (current_date + time '08:48')::timestamptz,
    'completed airport prospect follow-up'
  ),
  (
    '60000000-0000-4000-8000-000000000002',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    '20000000-0000-4000-8000-000000000001',
    '40000000-0000-4000-8000-000000000001',
    null,
    '30000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000002',
    'commute',
    'pending',
    (current_date + time '10:30')::timestamptz,
    null,
    null,
    'morning commuter'
  ),
  (
    '60000000-0000-4000-8000-000000000003',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    '20000000-0000-4000-8000-000000000002',
    '40000000-0000-4000-8000-000000000002',
    '50000000-0000-4000-8000-000000000001',
    '30000000-0000-4000-8000-000000000003',
    '30000000-0000-4000-8000-000000000004',
    'airport',
    'confirmed',
    (current_date + time '14:35')::timestamptz,
    null,
    null,
    'flat airport pickup'
  ),
  (
    '60000000-0000-4000-8000-000000000004',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    '20000000-0000-4000-8000-000000000003',
    '40000000-0000-4000-8000-000000000003',
    null,
    '30000000-0000-4000-8000-000000000005',
    '30000000-0000-4000-8000-000000000006',
    'appointment',
    'driving_to_appointment',
    (current_date + time '16:30')::timestamptz,
    (current_date + time '16:05')::timestamptz,
    null,
    'extra trunk space'
  ),
  (
    '60000000-0000-4000-8000-000000000005',
    '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0',
    '20000000-0000-4000-8000-000000000004',
    '40000000-0000-4000-8000-000000000004',
    null,
    '30000000-0000-4000-8000-000000000007',
    '30000000-0000-4000-8000-000000000008',
    'appointment',
    'driving_to_destination',
    (current_date + time '18:00')::timestamptz,
    (current_date + time '18:04')::timestamptz,
    null,
    'standing'
  )
on conflict (id) do update set
  rider_id = excluded.rider_id,
  pricing_id = excluded.pricing_id,
  flight_id = excluded.flight_id,
  pickup_location_id = excluded.pickup_location_id,
  dropoff_location_id = excluded.dropoff_location_id,
  ride_type = excluded.ride_type,
  state = excluded.state,
  scheduled_pickup_at = excluded.scheduled_pickup_at,
  active_started_at = excluded.active_started_at,
  completed_at = excluded.completed_at,
  display_note = excluded.display_note,
  updated_at = now();

commit;

-- Quick verification:
select
  (select count(*) from public.driver_dashboard_summaries where driver_id = '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0') as summaries,
  (select count(*) from public.riders where driver_id = '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0') as riders,
  (select count(*) from public.locations where driver_id = '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0') as locations,
  (select count(*) from public.pricing_quotes where driver_id = '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0') as pricing_quotes,
  (select count(*) from public.flights where driver_id = '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0') as flights,
  (select count(*) from public.rides where driver_id = '94530c16-3e8a-46d7-b0eb-5dbc7a0665e0') as rides;
