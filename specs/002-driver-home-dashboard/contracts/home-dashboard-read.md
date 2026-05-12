# Contract: Home Dashboard Read

The driver home page consumes a single read model for the signed-in driver's current day. Implementation may compose this from multiple Supabase tables, but the UI should not need to understand raw table joins.

## Query Boundary

**Consumer**: `src/pages/driver-home`  
**Data source**: Authenticated Supabase client using the current session  
**Input**:

| Field | Required | Notes |
|-------|----------|-------|
| `driverId` | Yes | Current authenticated user id; used for validation and RLS alignment |
| `date` | Yes | Driver-local date for "today" |

**Output**: `HomeDashboardReadModel`

## Read Model

```ts
type RideState =
  | 'pending'
  | 'confirmed'
  | 'driving_to_appointment'
  | 'driving_to_destination'
  | 'completed';

type RideType = 'appointment' | 'airport' | 'commute' | 'other';

type Money = {
  cents: number;
  currency: 'USD' | string;
};

type HomeDashboardReadModel = {
  summary: {
    todayEarnings: Money;
    weekEarnings: Money;
    weeklyRidesCompleted: number;
    weeklyRidesGoal: number;
    computedAt: string;
  };
  rides: HomeRideCardModel[];
};

type HomeRideCardModel = {
  id: string;
  type: RideType;
  state: RideState;
  scheduledPickupAt: string | null;
  completedAt: string | null;
  displayNote: string | null;
  rider: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    totalRides: number;
    lifetimeValue: Money;
    preferences: string[];
  };
  pricing: {
    quoted: Money;
    accepted: Money | null;
    platformAverageLow: Money | null;
    platformAverageHigh: Money | null;
    note: string | null;
  };
  pickup: LocationDisplay | null;
  dropoff: LocationDisplay;
  flight: FlightDisplay | null;
};

type LocationDisplay = {
  label: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string | null;
  region: string | null;
  airportCode: string | null;
};

type FlightDisplay = {
  airlineCode: string | null;
  flightNumber: string;
  originAirportCode: string | null;
  destinationAirportCode: string;
  scheduledArrivalAt: string | null;
  estimatedArrivalAt: string | null;
  actualArrivalAt: string | null;
  status: 'scheduled' | 'on_time' | 'delayed' | 'landed' | 'cancelled' | 'unknown';
  delayMinutes: number | null;
  gate: string | null;
  terminal: string | null;
  baggageClaim: string | null;
  dataFreshnessAt: string | null;
};
```

## UI Rendering Obligations

- Render the summary values even when all numbers are zero.
- Sort rides chronologically before display if the data source does not guarantee order.
- Show accepted pricing when present; otherwise show quoted pricing as pending/proposed.
- Do not render empty flight rows when `flight` is null.
- For `flight.status = 'unknown'` or stale `dataFreshnessAt`, communicate that flight details are not confirmed.
- Use state-specific labels:
  - `pending`: "Pending"
  - `confirmed`: "Confirmed"
  - `driving_to_appointment`: "Driving to pickup"
  - `driving_to_destination`: "Driving to destination"
  - `completed`: "Completed"

## Error and Empty States

- Loading: show a calm loading state that does not flash another driver's data.
- No rides: show the stat card and an empty schedule message.
- Query failure: show a recoverable error and retry affordance.
- Partial optional data: render available required fields and omit unavailable optional fields.
