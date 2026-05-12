-- Local fixture data for the driver home dashboard.
--
-- Before running locally, replace the driver UUIDs below with auth.users ids
-- that exist in your Supabase project. The main demo driver should match the
-- signed-in account you use in the app.
--
-- Demo driver:
--   94530c16-3e8a-46d7-b0eb-5dbc7a0665e0
-- Cross-driver fixture:
--   11111111-1111-4111-8111-111111111111
--
-- This seed is intentionally read/display focused; in-app creation flows are
-- out of scope for 002-driver-home-dashboard.

\i ./supabase/temp_driver_home_seed_94530c16.sql

-- Minimal cross-driver data to verify RLS/read scoping. This block requires the
-- cross-driver auth user above to exist. Leave it commented unless you create
-- that user in your local project.
/*
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
  '11000000-0000-4000-8000-000000000001',
  '11111111-1111-4111-8111-111111111111',
  current_date,
  999999,
  999999,
  99,
  100,
  now()
)
on conflict (driver_id, summary_date) do update set
  today_earnings_cents = excluded.today_earnings_cents,
  week_earnings_cents = excluded.week_earnings_cents,
  weekly_rides_completed = excluded.weekly_rides_completed,
  weekly_rides_goal = excluded.weekly_rides_goal,
  computed_at = excluded.computed_at,
  updated_at = now();
*/
