# Quickstart: Driver Home Dashboard

## Prerequisites

- Existing auth feature configured and working.
- Supabase project linked locally or reachable through `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Node/npm matching the repo.

## Environment

Use the existing environment variables:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Never expose a service role or secret key in the mobile app.

## Implementation Outline

1. Create a Supabase migration for the home dashboard tables:
   - `driver_dashboard_summaries`
   - `riders`
   - `locations`
   - `pricing_quotes`
   - `flights`
   - `rides`
2. Enable RLS and add authenticated driver-owned select policies on every new public table.
3. Add representative local seed/manual insert data for one signed-in driver.
4. Add the home page slice under `src/pages/driver-home`.
5. Keep route files thin: `src/app/(driver)/_layout.tsx` wraps the driver tabs and drawer, while `src/app/(driver)/(tabs)/index.tsx` composes the `src/pages/driver-home` page slice.
6. Add entity models/API helpers only where they are reused outside the page slice.
7. Render the stat card and schedule from the Supabase-backed read model.
8. Add tests for the summary card, ride state rendering, airport flight rendering, empty state, and query error state.

## Run the App

```bash
npm install
npm run start
```

Sign in with a driver account that has representative dashboard data. The protected driver home route should show the stat card and today's schedule.

## Run Tests

```bash
npm run test
npm run lint
npx tsc --noEmit
```

Expected coverage for this feature:

- Summary card displays today's earnings, weekly earnings, and ride-goal progress.
- Schedule renders all supported ride states.
- Airport ride displays available flight data and omits unavailable optional fields.
- Non-flight ride displays pickup/drop-off, rider, and pricing data.
- Edge cases cover missing pickup, missing optional flight fields, riders with no preferences, and pending accepted pricing.
- Empty and recoverable error states are visible.

## Supabase Verification

### Temporary Manual Seed

For the current development driver, apply the migration and then run:

```sql
-- psql from the repository root
\i supabase/temp_driver_home_seed_94530c16.sql
```

If you use the Supabase SQL editor, paste the contents of `supabase/temp_driver_home_seed_94530c16.sql` instead of the `\i` command. The temp seed targets auth user `94530c16-3e8a-46d7-b0eb-5dbc7a0665e0` and creates one summary, riders, locations, pricing, all supported ride states, and one delayed airport flight. If you use `supabase/seed.sql`, replace any placeholder auth user ids with users that exist in your local Auth database before running it.

Use the Supabase CLI or SQL editor to verify:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'driver_dashboard_summaries',
    'riders',
    'locations',
    'pricing_quotes',
    'flights',
    'rides'
  );
```

All new tables should report RLS enabled.

Verify that authenticated reads return only rows for the signed-in driver's `driver_id`. Cross-driver fixture rows should not appear in the mobile home page.

For a static migration/RLS contract check without a running Supabase database, run:

```bash
npm run test -- tests/contract/driver-home/supabase-schema-contract.test.ts
```

## Implementation Notes

- The app route tree uses a drawer wrapper around the driver tab group. The `Today` tab renders the dashboard; `Clients`, `Earnings`, and `Posse` are placeholder tabs for future slices.
- The dashboard read path lives in `src/pages/driver-home/api/get-home-dashboard.ts` and maps raw Supabase rows through `src/pages/driver-home/model/map-home-dashboard.ts`.
- Flight route display is a JSX helper so it can render iconography between origin and destination codes.
- Airport flight panels omit unavailable optional rows instead of rendering blank labels.
- Completed rides are visually muted; active driving rides receive primary-border emphasis and a top notch.

## Troubleshooting

- **Home page stays empty after sign-in**: Confirm the signed-in user's id matches `driver_id` on seeded rows.
- **Permission denied or no rows from Supabase**: Check RLS policies and authenticated session hydration.
- **Flight fields show as blank labels**: Update the UI mapper to omit optional null fields.
- **Rides appear out of order**: Check query ordering and fallback client-side sort.
- **Money displays incorrectly**: Confirm all stored amounts are cents and formatted once at the UI boundary.
- **Drawer or tab layout errors after theme changes**: Confirm the root layout is wrapped in `GestureHandlerRootView` and the driver layout uses `react-native-drawer-layout` rather than adding another Expo Router drawer navigator around native tabs.
