# Quickstart: View Ride Screen

## Prerequisites

- Existing auth and driver-home features configured.
- Representative driver-owned ride data from `002-driver-home-dashboard`.
- Node/npm matching the repo.
- Expo development build or environment capable of native Mapbox, gesture, and Reanimated modules.
- A Mapbox public access token suitable for the mobile app environment.

## Dependencies

Install the new runtime dependencies:

```bash
npx expo install @gorhom/bottom-sheet
npm install @rnmapbox/maps
```

Configure the `@rnmapbox/maps` Expo config plugin in the app config and provide the Mapbox public access token through the project's environment/app config. The app already has `react-native-gesture-handler`, `react-native-reanimated`, and a root `GestureHandlerRootView`; verify those remain intact after dependency changes.

## Implementation Outline

1. Add route-ready location fields or an equivalent route read path so pickup and dropoff can provide map coordinates.
2. Add a ride-view page slice under `src/pages/driver-ride`.
3. Add a thin protected route at `src/app/(driver)/ride/[rideId].tsx` that passes the route param into the page slice.
4. Create a page-level ride-view loader and mapper that returns the contract in `contracts/ride-view-read-model.md`.
5. Build the persistent map plus `@gorhom/bottom-sheet` shell with collapsed, balanced, and expanded snap states.
6. Implement state-specific sheet panels for pending, confirmed, driving to pickup, dropoff, and completed.
7. Add typed action mapping for pre-trip confirmation, navigation, passenger contact, active leg transition, end trip, schedule return, and save/next ride.
8. Persist driver-owned quote edits on confirm (`confirmPendingRide`) and core ride state transitions (`updateRideState` for navigate-to-pickup, start-dropoff, end-trip). Completed-state relationship notes entered in the sheet are **local drafts only** in this slice (no Supabase writes for new note bodies or tags).
9. Add render, mapper, mutation, and action-mapping tests for all state contracts.

## Run the App

```bash
npm install
npm run start
```

Open a signed-in driver account with representative rides. Navigate to a ride detail route such as `/ride/<ride-id>` from the driver schedule once wired.

## Run Tests

```bash
npm run test
npm run lint
npx tsc --noEmit
```

Expected coverage for this feature:

- Ride workspace renders map and sheet for every supported ride state.
- Bottom sheet defaults to the balanced map/content state and exposes collapsed/expanded states in component props.
- Pending ride displays suggested quote and omits missing platform comparison or flight data.
- Confirmed ride displays agenda and pre-trip confirmation action.
- Driving-to-pickup displays contact passenger and start-dropoff actions.
- Dropoff displays contact passenger and end-trip actions.
- Completed ride displays paid amount, relationship context, note/tag entry point, HUM moment, and follow-up actions.
- Mapper handles missing optional route polyline, current location, platform comparison, flight fields, and relationship notes.

## Manual Device Checks

Use a signed-in driver with seeded rides and walk each ride state on a physical device or simulator.

- Map renders on iOS and Android with a valid Mapbox token.
- Current-location permission denied still shows pickup/dropoff text and route fallback copy when live navigation is unavailable.
- Sheet pan gestures coexist with map pan/zoom (no competing gesture handlers).
- Active rides use the lower default sheet snap so the primary transition action stays reachable without precise dragging.
- Driver home ride cards navigate to `/ride/<ride-id>` and return via **Save and next ride** (`router.back()`).
- Pending quotes can be edited before confirm; confirming persists `quoted_amount_cents` and `accepted_amount_cents` plus `state = confirmed` via Supabase.
- Completed relationship note/tag UI updates only local component state (no new note persistence API in this slice).

## Troubleshooting

- **Bottom sheet does not drag**: Confirm root layout still uses `GestureHandlerRootView` and Reanimated is configured.
- **Map is blank**: Confirm the Mapbox token, native plugin setup, and location coordinates in seeded ride data.
- **Current location never appears**: Confirm Mapbox user-location permissions and simulator/device location settings.
- **Tests fail on native modules**: Mock map, location, and bottom-sheet modules in Jest setup while asserting product-visible props and content.
- **Flight labels appear empty**: Confirm optional flight field filtering is done in the mapper or display helper before render.
- **Ride opens with wrong action**: Check state-to-action mapping against `contracts/state-rendering.md`.
