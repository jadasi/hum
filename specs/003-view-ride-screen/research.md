# Phase 0 — Research: View Ride Screen

Consolidated decisions for `003-view-ride-screen`. The feature has no unresolved `NEEDS CLARIFICATION` items; implementation choices are resolved below.

## 1. Ride workspace layout

**Decision**: Build the ride view as a full-screen map with an overlaid bottom sheet using `@gorhom/bottom-sheet`. Configure snap points around collapsed, balanced, and expanded content states, with the balanced state as the default.

**Rationale**: The user explicitly requested an adjustable bottom sheet, and the existing app already wraps the root in `GestureHandlerRootView` with Reanimated and gesture handler installed. `@gorhom/bottom-sheet` fits this stack and supports the 50/50 default plus swipe-up/swipe-down behavior without inventing custom gesture handling.

**Alternatives considered**:

- **Static 50/50 layout**: Rejected because it does not satisfy the requested map/content gestures.
- **Custom pan responder sheet**: Rejected because gesture correctness and accessibility are higher risk than using a maintained native library.
- **Modal-only details view**: Rejected because the ride view must keep map context visible across states.

## 2. Map rendering and current location

**Decision**: Add the Mapbox React Native maps plugin (`@rnmapbox/maps`) for the in-app map, using its Expo config plugin and user-location support for driver location display. Show route/waypoint context in-app, and treat turn-by-turn navigation as an action that can hand off to a native navigation app unless a later feature chooses full in-app navigation.

**Rationale**: The current dependency set does not include a map renderer. Mapbox gives the ride view a consistent styled map, marker/shape primitives, route line rendering, and a path toward Mapbox Directions if the product later needs richer routing. The plugin approach also matches the user's requested maps direction. Handing off turn-by-turn keeps the first slice focused on the HUM ride workspace instead of building a navigation engine.

**Alternatives considered**:

- **`react-native-maps` plus `expo-location`**: Rejected after user direction to use the Mapbox maps plugin.
- **WebView map embed**: Rejected because it complicates native gestures, testing, and offline/error behavior.
- **Static image map**: Rejected because active states require current location and route context.
- **Full in-app turn-by-turn navigation**: Deferred because it requires routing provider selection, traffic updates, voice guidance, and more operational risk than the spec requires.

## 3. Route and waypoint data

**Decision**: Extend ride-view data with route-ready coordinates for pickup, dropoff, and driver current location when available. Support optional route polyline/summary fields but allow the UI to fall back to waypoint markers and plain route copy when routing data is unavailable.

**Rationale**: Existing home dashboard locations have display addresses but no latitude/longitude. The ride view needs map markers and route previews, while the spec explicitly requires recoverable behavior when route data is delayed.

**Alternatives considered**:

- **Geocode addresses on every render**: Rejected because it introduces latency, provider dependence, and privacy risk.
- **Require a route polyline for every ride**: Rejected because pending and confirmed rides should remain useful before route provider data is ready.
- **Use display-only addresses without map coordinates**: Rejected because it cannot satisfy the persistent map requirement.

## 4. Ride state naming and transitions

**Decision**: Reuse the existing constrained ride states from `002-driver-home-dashboard`: `pending`, `confirmed`, `driving_to_appointment`, `driving_to_destination`, and `completed`. Map user-facing "driving to pickup" to `driving_to_appointment` and "dropoff" to `driving_to_destination`.

**Rationale**: The existing data model and fixtures already use these states. Reusing them avoids schema churn and keeps the driver-home schedule and ride-view page consistent.

**Alternatives considered**:

- **Rename backend states to match screen copy**: Rejected because it creates churn without improving user-facing copy.
- **Introduce a richer workflow event log now**: Deferred until ride updates, auditing, cancellation, and handoff flows are planned.
- **Use free-text state labels**: Rejected because action mapping and tests need deterministic state values.

## 5. State transition and messaging actions

**Decision**: Model ride actions as explicit UI intents for this slice: send/review pre-trip confirmation, start navigation, contact passenger, start dropoff, end trip, schedule return, and save/next ride. Implement durable mutations only where existing backend support is present; otherwise provide typed action boundaries and tested placeholders for future mutations.

**Rationale**: The feature is primarily the view ride screen, but each state requires a clear primary action. Keeping action boundaries explicit lets implementation demonstrate flows without overbuilding a full ride workflow engine in this slice.

**Alternatives considered**:

- **Build full ride workflow mutations immediately**: Deferred because it increases backend/state risk beyond the screen slice.
- **Render disabled actions only**: Rejected because the screen must be independently demonstrable and useful.
- **Hide unimplemented actions**: Rejected because primary actions define each ride state and must be planned now.

## 6. Flight information behavior

**Decision**: Reuse the optional flight display behavior from the driver-home slice and make relevance state-specific. Pending and confirmed states can show concise flight context when available; active states suppress flight panels unless the data directly supports the next action; completed state can mention flight context only as part of the HUM moment.

**Rationale**: The spec requires flight information only when relevant. Existing helpers already omit missing fields and distinguish unknown/stale data from "on time."

**Alternatives considered**:

- **Always show flight data for airport rides**: Rejected because active navigation should not be crowded.
- **Never show flight data after confirmation**: Rejected because landed/gate/carousel details may still be relevant before pickup.
- **Duplicate flight formatting inside the page**: Rejected where shared helper extraction avoids inconsistent copy.

## 7. Relationship notes and tags

**Decision**: Include a small completed-ride relationship-note concept in the data model and UI contract. Persisting notes/tags may be implemented through a dedicated feature slice if mutation support is added; otherwise the page should still render existing notes/tags and provide a tested entry point.

**Rationale**: Post-ride memory is central to HUM's CRM layer and the completed-state prototype. The plan should not reduce this to visual-only decoration.

**Alternatives considered**:

- **Defer notes entirely**: Rejected because completed-state value depends on capturing relationship memory.
- **Store notes only in local component state**: Rejected for production behavior because the note should survive navigation.
- **Create a full CRM feature now**: Deferred because this screen only needs ride-adjacent note/tag capture.

## 8. FSD placement

**Decision**: Create `src/pages/driver-ride` as the main page slice. Add a thin route at `src/app/(driver)/ride/[rideId].tsx`. Promote shared model helpers to `entities` only when reused by both `driver-home` and `driver-ride`; keep map/sheet composition page-local for now.

**Rationale**: The constitution requires thin route files and downward imports. The ride view is a full screen/activity, so a page slice is the correct starting point.

**Alternatives considered**:

- **Add the ride view inside `driver-home`**: Rejected because the ride view is a primary screen with its own state machine and interactions.
- **Create widgets for every panel immediately**: Rejected until reuse appears.
- **Put ride business helpers in `shared`**: Rejected because shared must not contain HUM business rules.

## 9. Test strategy

**Decision**: Use Jest and React Native Testing Library for page rendering, state-specific panels, action mapping, optional field omission, and mapper behavior. Mock map and bottom-sheet components in tests to focus on visible state and props rather than native internals.

**Rationale**: Native map and gesture libraries are better verified through integration/manual smoke checks, while product behavior can be covered reliably in unit and render tests.

**Alternatives considered**:

- **Manual testing only**: Rejected by the constitution and the state matrix risk.
- **End-to-end mobile automation now**: Deferred because the first slice can be validated with focused render tests plus manual device checks.
- **Snapshot-only tests**: Rejected because the action and optional-data matrix needs explicit assertions.
