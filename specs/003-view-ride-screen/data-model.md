# Data Model: View Ride Screen

Conceptual and implementation-oriented model for `003-view-ride-screen`. This feature builds on the driver-owned ride, rider, pricing, location, and flight tables from `002-driver-home-dashboard`. New or extended public data must preserve Row Level Security and signed-in driver ownership.

## Entities

### 1. Ride View

Represents the complete read model needed to render one ride in the map/sheet workspace.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Ride identifier from the route param |
| `driver_id` | UUID | Yes | Owner driver; must match authenticated driver |
| `state` | Enum/text | Yes | `pending`, `confirmed`, `driving_to_appointment`, `driving_to_destination`, `completed` |
| `type` | Enum/text | Yes | Existing ride type such as `airport`, `appointment`, `commute`, `other` |
| `scheduled_pickup_at` | Timestamp | No | Required for fixed appointments; airport rides may derive timing from flight |
| `active_started_at` | Timestamp | No | Present after the ride begins when available |
| `completed_at` | Timestamp | No | Required for completed rides |
| `display_note` | Text | No | Short driver-facing context |
| `rider` | Rider Snapshot | Yes | Passenger/client context |
| `pricing` | Pricing Context | Yes | Quote/payment context by state |
| `route` | Route Context | Yes | Waypoints, current location availability, and optional route summary |
| `flight` | Flight Context | No | Optional and state-relevant only |
| `agenda` | Ride Agenda Item list | No | Required for confirmed ride display |
| `relationship_notes` | Relationship Note list | No | Existing notes/tags for completed ride display |
| `available_actions` | Ride Action list | Yes | State-specific action intents |

**Relationships**: One Ride View composes one ride, one rider, one pricing context, one route context, optional flight context, zero or more agenda items, and zero or more relationship notes.

**Validation**:

- State must be one of the supported ride states.
- Rider, pricing, and dropoff waypoint must be present for a renderable ride.
- Pending rides need pickup and dropoff waypoints for route preview.
- Confirmed rides should include agenda items and may include current location.
- Active rides must expose exactly one primary state-transition action.
- Completed rides must have completed timing and payment or a clear payment-unavailable state.

### 2. Rider Snapshot

Represents client context shown inside the ride sheet.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Rider/client identifier |
| `first_name` | Text | Yes | Display name source |
| `last_name` | Text | Yes | Display name source |
| `phone_number` | Text | Yes | Needed for contact action; must not be logged |
| `total_rides` | Integer | Yes | Relationship strength indicator |
| `lifetime_value_cents` | Integer | Yes | Business value indicator |
| `preferences` | Text list | No | Plain-language preferences |
| `relationship_status` | Enum/text | No | Example: `new`, `regular`, `keep`, `one_time` |

**Validation**:

- Names must not be blank.
- Phone number must be present when passenger contact action is enabled.
- Preferences may be empty but must not render as empty filler.
- Counts and money values must be non-negative.

### 3. Pricing Context

Represents quote, comparison, accepted, and paid values.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `suggested_quote_cents` | Integer | Yes for pending | Driver-facing recommendation |
| `quoted_amount_cents` | Integer | Yes | Driver quote currently attached to ride |
| `accepted_amount_cents` | Integer | No | Present after agreement |
| `paid_amount_cents` | Integer | No | Present after completion/payment |
| `platform_average_low_cents` | Integer | No | Lower comparison value |
| `platform_average_high_cents` | Integer | No | Higher comparison value |
| `currency` | Text | Yes | Defaults to USD |
| `pricing_note` | Text | No | Example: `flat`, `standing`, `regular` |

**Validation**:

- Monetary values must be non-negative.
- Platform low must not exceed platform high when both exist.
- Pending state must distinguish suggested quote from platform comparison.
- Completed state must distinguish paid amount from original quote.

### 4. Route Context

Represents map data for the current ride state.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `mode` | Enum/text | Yes | `pickup_to_dropoff`, `current_to_pickup_to_dropoff`, `current_to_pickup`, `current_to_dropoff`, `completed_summary` |
| `current_location` | Geo Point | No | Available only with permission and fresh location data |
| `pickup` | Waypoint | No | Required before pickup; may be omitted after pickup if not useful |
| `dropoff` | Waypoint | Yes | Destination or completed destination |
| `polyline` | Encoded/list geometry | No | Optional route path |
| `distance_text` | Text | No | Example: `14.2 mi` |
| `duration_text` | Text | No | Example: `23 min` |
| `route_freshness_at` | Timestamp | No | When route data was last checked |
| `availability` | Enum/text | Yes | `ready`, `location_unavailable`, `route_unavailable`, `permission_needed` |

**Validation**:

- Every waypoint used as a map marker needs coordinates.
- If current location is unavailable, route mode must fall back to known pickup/dropoff markers.
- Missing route polyline must not block ride details or primary action.
- Precise coordinates must not be written to logs.

### 5. Waypoint

Represents a map marker and place label.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `label` | Text | No | Human place name |
| `address_line1` | Text | No | Display address |
| `address_line2` | Text | No | Supplemental display detail |
| `city` | Text | No | Optional context |
| `region` | Text | No | Optional context |
| `airport_code` | Text | No | Airport context |
| `latitude` | Decimal | Yes for map marker | Needed for map display |
| `longitude` | Decimal | Yes for map marker | Needed for map display |
| `kind` | Enum/text | Yes | `current`, `pickup`, `dropoff`, `airport`, `completed` |

**Validation**:

- At least one display label/address field must exist.
- Coordinates must be valid latitude/longitude ranges.
- Airport codes should use uppercase IATA-style values when known.

### 6. Flight Context

Represents optional flight context reused from the home dashboard.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `airline_code` | Text | No | Example: `AA` |
| `flight_number` | Text | Yes when flight exists | Example: `2241` |
| `origin_airport_code` | Text | No | Example: `DFW` |
| `destination_airport_code` | Text | Yes | Example: `PHX` |
| `scheduled_arrival_at` | Timestamp | No | Original arrival |
| `estimated_arrival_at` | Timestamp | No | Current estimate |
| `actual_arrival_at` | Timestamp | No | Present after landing |
| `status` | Enum/text | Yes | `scheduled`, `on_time`, `delayed`, `landed`, `cancelled`, `unknown` |
| `delay_minutes` | Integer | No | Delay duration |
| `gate` | Text | No | Arrival gate |
| `terminal` | Text | No | Arrival terminal |
| `baggage_claim` | Text | No | Carousel/baggage context |
| `pickup_door` | Text | No | Curb door if known |
| `data_freshness_at` | Timestamp | No | Freshness indicator |

**Validation**:

- Flight number must not be blank when a flight record exists.
- Unknown or stale data must not be displayed as on-time.
- Flight panels should render only fields relevant to the current ride state.

### 7. Ride Agenda Item

Represents a confirmed-state preparation step.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | Text/UUID | Yes | Stable item identity for rendering |
| `status` | Enum/text | Yes | `done`, `active`, `upcoming` |
| `title` | Text | Yes | Plain-language step title |
| `description` | Text | No | Supporting detail |
| `scheduled_at` | Timestamp | No | Reminder or action time |
| `action` | Ride Action | No | Optional action tied to item |

**Validation**:

- Confirmed rides should have at least one active or upcoming agenda item.
- Titles must be concise and non-technical.
- Disabled or unavailable actions must explain why.

### 8. Ride Action

Represents a visible button or action intent.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | Enum/text | Yes | `send_pretrip_confirmation`, `start_navigation`, `contact_passenger`, `start_dropoff`, `end_trip`, `schedule_return`, `save_next_ride` |
| `label` | Text | Yes | Driver-facing button label |
| `priority` | Enum/text | Yes | `primary`, `secondary`, `tertiary` |
| `enabled` | Boolean | Yes | Whether the action can currently run |
| `disabled_reason` | Text | No | Required when disabled |
| `requires_review` | Boolean | Yes | True for message actions that should open review |

**Validation**:

- Every state must expose one clear primary action.
- Active driving states must expose passenger contact and the correct state-transition action.
- Message actions should protect against accidental send when message content requires review.

### 9. Relationship Note

Represents post-ride memory capture.

| Field / aspect | Type | Required | Notes |
|----------------|------|----------|-------|
| `id` | UUID | Yes | Note identifier |
| `driver_id` | UUID | Yes | Owner driver |
| `ride_id` | UUID | Yes | Ride the note came from |
| `rider_id` | UUID | Yes | Rider/client the note applies to |
| `body` | Text | No | Driver-authored note |
| `tags` | Text list | No | Quick labels such as `Sunday return` |
| `created_at` / `updated_at` | Timestamp | Yes | Audit fields |

**Validation**:

- At least one of body or tags must be present to save.
- Notes must be readable only by the owning driver in this slice.
- Notes must not be logged in full.

## State Rendering Matrix

| Ride state | Route mode | Sheet emphasis | Primary action |
|------------|------------|----------------|----------------|
| `pending` | `pickup_to_dropoff` | Overview, rider, suggested quote, platform comparison, optional flight | Quote/confirm decision action |
| `confirmed` | `current_to_pickup_to_dropoff` when current location exists; otherwise pickup/dropoff overview | Agenda, confirmation, flight status when relevant | Start ride / navigate to pickup |
| `driving_to_appointment` | `current_to_pickup` | Navigation and minimal rider context | Start dropoff trip |
| `driving_to_destination` | `current_to_dropoff` | Navigation and minimal rider context | End trip |
| `completed` | `completed_summary` | Payment, rider relationship, note/tags, HUM moment | Save and next ride |

## Access Rules

- Ride-view reads must be scoped to the signed-in driver's `driver_id`.
- Any new public table must enable Row Level Security.
- Authenticated drivers can read or mutate only rows where `driver_id = auth.uid()`.
- Logs and analytics must not include rider phone numbers, full addresses, note bodies, tokens, or precise coordinates.

## Query Notes

- The ride-view read should fetch one ride by `id` and `driver_id`, with nested rider, pricing, pickup, dropoff, optional flight, and existing notes.
- Location records need latitude/longitude to support map markers.
- Route summaries or polylines can be stored or calculated separately; the UI must tolerate them being absent.
- Pending confirmation persists driver-owned pricing via `confirmPendingRide`: it updates `pricing_quotes` (`quoted_amount_cents`, `accepted_amount_cents`) and sets `rides.state` to `confirmed` under existing RLS policies.
- **New** completed-state relationship note/tag capture from the ride sheet is **local-only** in this slice (component state); there is no Supabase mutation for saving those drafts yet. Existing relationship notes, when present on the read model, are display-only.
