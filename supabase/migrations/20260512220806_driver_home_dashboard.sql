do $$
begin
  if not exists (select 1 from pg_type where typname = 'home_ride_state') then
    create type public.home_ride_state as enum (
      'pending',
      'confirmed',
      'driving_to_appointment',
      'driving_to_destination',
      'completed'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'home_ride_type') then
    create type public.home_ride_type as enum (
      'appointment',
      'airport',
      'commute',
      'other'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'home_flight_status') then
    create type public.home_flight_status as enum (
      'scheduled',
      'on_time',
      'delayed',
      'landed',
      'cancelled',
      'unknown'
    );
  end if;
end $$;

create table if not exists public.driver_dashboard_summaries (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references auth.users(id) on delete cascade,
  summary_date date not null,
  today_earnings_cents integer not null default 0 check (today_earnings_cents >= 0),
  week_earnings_cents integer not null default 0 check (week_earnings_cents >= 0),
  weekly_rides_completed integer not null default 0 check (weekly_rides_completed >= 0),
  weekly_rides_goal integer not null check (weekly_rides_goal > 0),
  computed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (driver_id, summary_date)
);

create table if not exists public.riders (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references auth.users(id) on delete cascade,
  first_name text not null check (length(trim(first_name)) > 0),
  last_name text not null check (length(trim(last_name)) > 0),
  phone_number text not null check (length(trim(phone_number)) > 0),
  total_rides integer not null default 0 check (total_rides >= 0),
  lifetime_value_cents integer not null default 0 check (lifetime_value_cents >= 0),
  preferences text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references auth.users(id) on delete cascade,
  label text,
  address_line1 text not null check (length(trim(address_line1)) > 0),
  address_line2 text,
  city text,
  region text,
  postal_code text,
  airport_code text check (airport_code is null or airport_code = upper(airport_code)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pricing_quotes (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references auth.users(id) on delete cascade,
  quoted_amount_cents integer not null check (quoted_amount_cents >= 0),
  accepted_amount_cents integer check (accepted_amount_cents is null or accepted_amount_cents >= 0),
  platform_average_low_cents integer check (platform_average_low_cents is null or platform_average_low_cents >= 0),
  platform_average_high_cents integer check (platform_average_high_cents is null or platform_average_high_cents >= 0),
  currency text not null default 'USD' check (length(trim(currency)) = 3),
  pricing_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    platform_average_low_cents is null
    or platform_average_high_cents is null
    or platform_average_low_cents <= platform_average_high_cents
  )
);

create table if not exists public.flights (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references auth.users(id) on delete cascade,
  airline_code text,
  flight_number text not null check (length(trim(flight_number)) > 0),
  origin_airport_code text check (origin_airport_code is null or origin_airport_code = upper(origin_airport_code)),
  destination_airport_code text not null check (
    length(trim(destination_airport_code)) > 0
    and destination_airport_code = upper(destination_airport_code)
  ),
  scheduled_arrival_at timestamptz,
  estimated_arrival_at timestamptz,
  actual_arrival_at timestamptz,
  status public.home_flight_status not null default 'unknown',
  delay_minutes integer check (delay_minutes is null or delay_minutes >= 0),
  gate text,
  terminal text,
  baggage_claim text,
  data_freshness_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rides (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references auth.users(id) on delete cascade,
  rider_id uuid not null references public.riders(id) on delete restrict,
  pricing_id uuid not null references public.pricing_quotes(id) on delete restrict,
  flight_id uuid references public.flights(id) on delete set null,
  pickup_location_id uuid references public.locations(id) on delete restrict,
  dropoff_location_id uuid not null references public.locations(id) on delete restrict,
  ride_type public.home_ride_type not null default 'appointment',
  state public.home_ride_state not null default 'pending',
  scheduled_pickup_at timestamptz,
  active_started_at timestamptz,
  completed_at timestamptz,
  display_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ride_type = 'airport' or (scheduled_pickup_at is not null and pickup_location_id is not null)),
  check (state <> 'completed' or completed_at is not null)
);

create index if not exists driver_dashboard_summaries_driver_date_idx
  on public.driver_dashboard_summaries(driver_id, summary_date);

create index if not exists riders_driver_id_idx
  on public.riders(driver_id);

create index if not exists locations_driver_id_idx
  on public.locations(driver_id);

create index if not exists pricing_quotes_driver_id_idx
  on public.pricing_quotes(driver_id);

create index if not exists flights_driver_id_idx
  on public.flights(driver_id);

create index if not exists rides_driver_scheduled_pickup_idx
  on public.rides(driver_id, scheduled_pickup_at);

create index if not exists rides_driver_state_idx
  on public.rides(driver_id, state);

alter table public.driver_dashboard_summaries enable row level security;
alter table public.riders enable row level security;
alter table public.locations enable row level security;
alter table public.pricing_quotes enable row level security;
alter table public.flights enable row level security;
alter table public.rides enable row level security;

grant select on public.driver_dashboard_summaries to authenticated;
grant select on public.riders to authenticated;
grant select on public.locations to authenticated;
grant select on public.pricing_quotes to authenticated;
grant select on public.flights to authenticated;
grant select on public.rides to authenticated;

create policy "driver_dashboard_summaries select own driver rows"
on public.driver_dashboard_summaries
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);

create policy "riders select own driver rows"
on public.riders
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);

create policy "locations select own driver rows"
on public.locations
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);

create policy "pricing_quotes select own driver rows"
on public.pricing_quotes
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);

create policy "flights select own driver rows"
on public.flights
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);

create policy "rides select own driver rows"
on public.rides
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);
