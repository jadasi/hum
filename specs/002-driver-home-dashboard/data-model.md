# Data Model: Driver Home Dashboard

Conceptual and implementation-oriented model for `002-driver-home-dashboard`. The model assumes Supabase Auth already owns driver identity through `auth.users`. New public app tables must enable RLS and scope access to the signed-in driver.

## Entities

### 1. Driver Dashboard Summary

Represents the stat card shown above the daily schedule.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Primary identifier |
| `driver_id` | UUID | Yes | References `auth.users(id)`; RLS owner |
| `summary_date` | Date | Yes | Driver-local date represented by the row |
| `today_earnings_cents` | Integer | Yes | Defaults to 0; display as currency |
| `week_earnings_cents` | Integer | Yes | Defaults to 0; current week according to product calendar |
| `weekly_rides_completed` | Integer | Yes | Defaults to 0 |
| `weekly_rides_goal` | Integer | Yes | Must be greater than 0 |
| `computed_at` | Timestamp | Yes | Freshness indicator |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Relationships**: Many summaries belong to one driver. The home page reads the row for today's date or receives equivalent derived values.

**Validation**:

- Earnings values must be non-negative integers.
- Completed ride count must be non-negative.
- Weekly goal must be at least 1.
- A driver should have no more than one summary per `summary_date`.

### 2. Rider

Represents a client or passenger shown on ride cards.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Primary identifier |
| `driver_id` | UUID | Yes | Owner driver for this slice |
| `first_name` | Text | Yes | Display name source |
| `last_name` | Text | Yes | Display name source |
| `phone_number` | Text | Yes | Plain contact value for v1 |
| `total_rides` | Integer | Yes | Defaults to 0 |
| `lifetime_value_cents` | Integer | Yes | Defaults to 0 |
| `preferences` | Text array or JSON list | No | Plain-language preferences such as "prefers quiet" |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Relationships**: One rider can be associated with many rides for the same driver.

**Validation**:

- First and last name must not be blank.
- Phone number must not be blank for records used on the home page.
- Total rides and lifetime value must be non-negative.
- Preferences may be empty but must not render as empty copy in the UI.

### 3. Location

Represents pickup and drop-off places displayed on ride cards.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Primary identifier |
| `driver_id` | UUID | Yes | Owner driver for RLS simplicity |
| `label` | Text | No | Human place name such as "Sky Harbor offices" |
| `address_line1` | Text | Yes | Display address or primary place text |
| `address_line2` | Text | No | Suite, gate area, or supplemental text |
| `city` | Text | No | Optional display context |
| `region` | Text | No | State/region |
| `postal_code` | Text | No | Optional |
| `airport_code` | Text | No | Useful when the location is an airport |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Relationships**: A ride may reference one pickup location and one drop-off location. Airport rides may use an airport pickup or drop-off location plus a flight record.

**Validation**:

- `address_line1` or `label` must provide enough display text for the card.
- If `airport_code` is present, it should be an uppercase IATA-style code when known.

### 4. Pricing

Represents the driver-facing price context for a ride.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Primary identifier |
| `driver_id` | UUID | Yes | Owner driver |
| `quoted_amount_cents` | Integer | Yes | Driver's quoted number |
| `accepted_amount_cents` | Integer | No | Final accepted number; null while pending |
| `platform_average_low_cents` | Integer | No | Lower comparison value |
| `platform_average_high_cents` | Integer | No | Higher comparison value |
| `currency` | Text | Yes | Defaults to USD |
| `pricing_note` | Text | No | Short display note such as "flat" or "standing" |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Relationships**: One pricing record belongs to one ride in v1.

**Validation**:

- Quoted amount must be non-negative.
- Accepted amount, when present, must be non-negative.
- Platform average values, when present, must be non-negative and low must not exceed high.
- Currency must be a supported ISO-style currency code.

### 5. Flight

Represents optional flight context for airport rides.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Primary identifier |
| `driver_id` | UUID | Yes | Owner driver |
| `airline_code` | Text | No | Example: `AA` |
| `flight_number` | Text | Yes | Example: `2241`; display can combine airline + number |
| `origin_airport_code` | Text | No | Example: `DFW` |
| `destination_airport_code` | Text | Yes | Example: `PHX` |
| `scheduled_arrival_at` | Timestamp | No | Original arrival time |
| `estimated_arrival_at` | Timestamp | No | Current expected arrival |
| `actual_arrival_at` | Timestamp | No | Present after landing |
| `status` | Enum/text | Yes | `scheduled`, `on_time`, `delayed`, `landed`, `cancelled`, `unknown` |
| `delay_minutes` | Integer | No | Positive delay duration when known |
| `gate` | Text | No | Arrival gate |
| `terminal` | Text | No | Arrival terminal |
| `baggage_claim` | Text | No | Optional, useful for future detail screens |
| `data_freshness_at` | Timestamp | No | When flight data was last verified |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Relationships**: One flight may be associated with one ride in v1. Later, repeated airport jobs could reuse a flight record if needed.

**Validation**:

- Flight number must not be blank.
- Destination airport code should be present for pickup context.
- Delay minutes must be null or non-negative.
- Unknown or stale data must be distinguishable from "on time".

### 6. Ride

Represents a scheduled, active, or completed ride in the driver's daily schedule.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Primary identifier |
| `driver_id` | UUID | Yes | Owner driver and RLS scope |
| `rider_id` | UUID | Yes | References Rider |
| `pricing_id` | UUID | Yes | References Pricing |
| `flight_id` | UUID | No | References Flight for airport rides |
| `pickup_location_id` | UUID | No | References Location; required for non-flight fixed pickups |
| `dropoff_location_id` | UUID | Yes | References Location |
| `ride_type` | Enum/text | Yes | `appointment`, `airport`, `commute`, `other` |
| `state` | Enum/text | Yes | See state transitions below |
| `scheduled_pickup_at` | Timestamp | No | Fixed appointment time |
| `active_started_at` | Timestamp | No | Future state support |
| `completed_at` | Timestamp | No | Present when completed |
| `display_note` | Text | No | Short context such as "standing" |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Relationships**:

- Many rides belong to one driver.
- Many rides can reference one rider.
- One ride has one pricing record.
- One ride may have one flight record.
- One ride has a required drop-off location and optional pickup location.

**Validation**:

- State must be one of the supported ride states.
- Drop-off location is required for all rides.
- A non-flight ride must have a scheduled pickup time and pickup location to show a fixed appointment card.
- An airport ride may use flight arrival information as the key timing signal, but should still provide enough pickup context for display.
- Completed rides should have `completed_at`.

## Ride State Transitions

Display-only v1 must support all states but does not need to mutate them. Future creation/update flows should follow this progression:

```text
pending -> confirmed -> driving_to_appointment -> driving_to_destination -> completed
```

Allowed exceptions:

- `pending -> completed` is not expected.
- `confirmed -> completed` should be avoided unless a manual correction flow exists later.
- Cancelled/no-show states are out of scope for this feature and should not be invented in v1 UI copy.

## Home Page Read Model

The page should receive a driver-scoped structure equivalent to:

```text
HomeDashboard
├── summary
│   ├── todayEarnings
│   ├── weekEarnings
│   ├── weeklyRidesCompleted
│   └── weeklyRidesGoal
└── rides[]
    ├── ride identity, type, state, times, display note
    ├── rider display fields
    ├── pricing display fields
    ├── pickup/drop-off display fields
    └── optional flight display fields
```

## RLS and Access Rules

- All new public tables must enable RLS.
- Authenticated drivers can read only rows where `driver_id = auth.uid()`.
- Policies should explicitly require `auth.uid() IS NOT NULL`.
- Insert/update/delete policies are not required for client data creation in this feature unless seed/admin workflows need them; if added, they must preserve driver ownership.
- Do not rely on user-editable metadata for authorization.

## Indexing and Query Notes

- Rides need an index for `driver_id` plus schedule ordering fields used by the home page.
- Dashboard summaries need a uniqueness constraint for `(driver_id, summary_date)`.
- Child tables need indexes on `driver_id` for RLS-filtered reads.
- Foreign keys should cascade or restrict deletes deliberately; default to preserving ride history unless the implementation has a clear cleanup rule.
