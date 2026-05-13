# Contract: Ride View Read Model

This contract defines the page-level data shape consumed by `src/pages/driver-ride`. It is an application UI contract, not a public network API.

## Loader

```ts
type GetRideViewArgs = {
  driverId: string;
  rideId: string;
};

type GetRideViewResult = {
  data: RideViewReadModel | null;
  error: string | null;
};
```

## Read Model

```ts
type RideViewReadModel = {
  id: string;
  state: RideViewState;
  type: RideType;
  scheduledPickupAt: string | null;
  activeStartedAt: string | null;
  completedAt: string | null;
  displayNote: string | null;
  rider: RiderSnapshot;
  pricing: PricingContext;
  route: RouteContext;
  flight: FlightContext | null;
  agenda: RideAgendaItem[];
  relationshipNotes: RelationshipNote[];
  availableActions: RideAction[];
};
```

## Enums

```ts
type RideViewState =
  | 'pending'
  | 'confirmed'
  | 'driving_to_appointment'
  | 'driving_to_destination'
  | 'completed';

type RouteMode =
  | 'pickup_to_dropoff'
  | 'current_to_pickup_to_dropoff'
  | 'current_to_pickup'
  | 'current_to_dropoff'
  | 'completed_summary';

type RouteAvailability =
  | 'ready'
  | 'location_unavailable'
  | 'route_unavailable'
  | 'permission_needed';
```

## Required Behavior

- Loader MUST return only a ride owned by the signed-in driver.
- Missing required rider, pricing, or dropoff data MUST return a recoverable error instead of rendering incomplete controls.
- Optional flight, route polyline, platform comparison, agenda detail, and relationship note fields MAY be absent.
- The mapper MUST omit unavailable optional fields from display models instead of substituting placeholder labels.
- Every successful read model MUST include at least one `primary` action in `availableActions`.
- Active states MUST include `contact_passenger` plus the correct transition action.

## Error Copy

Use plain driver-facing errors:

- Ride not found or inaccessible: `We could not find that ride for your account.`
- Required ride details missing: `This ride is missing details needed to open it.`
- Network or unknown failure: `We could not load this ride. Please try again.`
