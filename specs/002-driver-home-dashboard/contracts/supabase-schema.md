# Contract: Supabase Schema

Implementation must create the persistent data needed for the home dashboard and protect it with driver-scoped RLS.

## Required Tables

Recommended table names:

- `driver_dashboard_summaries`
- `riders`
- `locations`
- `pricing_quotes`
- `flights`
- `rides`

The exact migration may choose singular or plural names, but the resulting schema must preserve the fields, relationships, and constraints in [data-model.md](../data-model.md).

## Ownership

Every table must include:

```sql
driver_id uuid not null references auth.users(id) on delete cascade
```

For this feature, a signed-in driver may read only rows where `driver_id` is their own user id.

## RLS Requirements

Every public table created by this feature must run:

```sql
alter table public.<table_name> enable row level security;
```

Each table must have an authenticated read policy equivalent to:

```sql
create policy "<table_name> select own driver rows"
on public.<table_name>
for select
to authenticated
using (auth.uid() is not null and auth.uid() = driver_id);
```

Data creation flows are out of scope. If implementation adds insert/update/delete policies to support seeds or local demos, those policies must also prevent cross-driver writes.

## Required Constraints

- Dashboard summaries: unique `(driver_id, summary_date)`.
- Riders: non-blank `first_name`, `last_name`, and `phone_number`; non-negative `total_rides` and `lifetime_value_cents`.
- Pricing: non-negative money fields; platform average low must not exceed high when both are present.
- Flights: non-blank `flight_number`; constrained status set.
- Rides: constrained ride state; required `rider_id`, `pricing_id`, and `dropoff_location_id`; optional `flight_id`.
- Locations: displayable place text through label/address fields.

## Required Indexes

- `rides(driver_id, scheduled_pickup_at)`
- `rides(driver_id, state)`
- `driver_dashboard_summaries(driver_id, summary_date)`
- `riders(driver_id)`
- `pricing_quotes(driver_id)`
- `flights(driver_id)`
- `locations(driver_id)`

## Seed/Fixture Expectations

The implementation should provide representative local data or a documented manual insert path for testing:

- A summary row with non-zero weekly progress.
- A pending ride without a flight.
- A confirmed ride without a flight.
- An active ride in `driving_to_appointment`.
- An active ride in `driving_to_destination`.
- A completed ride.
- An airport ride with flight data, including at least one delayed scenario.

No production data import or in-app creation workflow is required in this feature.
