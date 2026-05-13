-- Ride view: map coordinates on locations and driver-owned updates for ride workflow.

alter table public.locations
  add column if not exists latitude double precision;

alter table public.locations
  add column if not exists longitude double precision;

alter table public.riders
  add column if not exists client_source text not null default 'unknown'
  check (
    client_source in (
      'unknown',
      'platform_conversion',
      'referral',
      'recurring_private_client',
      'hum_network',
      'direct_booking'
    )
  );

grant update on public.locations to authenticated;
grant update on public.rides to authenticated;
grant update on public.pricing_quotes to authenticated;

create policy "locations update own driver rows"
on public.locations
for update
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id)
with check (auth.uid() is not null and auth.uid() = driver_id);

create policy "rides update own driver rows"
on public.rides
for update
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id)
with check (auth.uid() is not null and auth.uid() = driver_id);

create policy "pricing_quotes update own driver rows"
on public.pricing_quotes
for update
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id)
with check (auth.uid() is not null and auth.uid() = driver_id);
