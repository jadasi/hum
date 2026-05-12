# Phase 0 — Research: Driver Home Dashboard

Consolidated decisions for `002-driver-home-dashboard`. The feature has no unresolved `NEEDS CLARIFICATION` items; the open choices are implementation decisions resolved below.

## 1. Home screen data-loading shape

**Decision**: Load the home page through a page-level query function that returns one normalized view model: dashboard summary plus today's rides with nested rider, pricing, optional pickup/drop-off locations, and optional flight data.

**Rationale**: The screen needs one coherent "what is my day?" answer. A single page contract reduces loading states, keeps route files thin, and lets the UI render regular rides and airport rides consistently while preserving separate domain entities underneath.

**Alternatives considered**:

- **Independent queries per card/entity**: Rejected for v1 because it increases loading/error combinations and makes the home page feel fragmented.
- **Hardcoded mock data in the page**: Rejected because the feature explicitly includes backend data shape and driver-specific display.
- **Database view as the only contract**: Deferred; useful later if query complexity grows, but a client-side query mapper is simpler for the first vertical slice and avoids view/RLS pitfalls.

## 2. Supabase table security

**Decision**: Store new app data in Supabase Postgres tables with Row Level Security enabled on every public table. Every driver-owned table includes `driver_id` referencing `auth.users(id)`, and authenticated select policies explicitly check `auth.uid() IS NOT NULL AND auth.uid() = driver_id`.

**Rationale**: Supabase public tables are exposed through the Data API when using the mobile publishable key. Current Supabase guidance requires RLS on exposed-schema tables and recommends explicit authentication checks because unauthenticated `auth.uid()` returns `null`.

**Alternatives considered**:

- **No RLS while prototyping**: Rejected because the mobile client will use a publishable key and the constitution requires privacy around client, ride, and revenue context.
- **Service-role-only backend proxy**: Rejected for v1 because the app already uses Supabase JS directly and adding a backend service would be unnecessary complexity.
- **Custom role claims/RBAC**: Deferred because this feature only needs each signed-in driver to read their own home data; no admin or posse permissions are in scope.

## 3. Data ownership model

**Decision**: Treat the signed-in driver as the owner of dashboard summaries, riders, rides, pricing records, and locations for this slice. Rides connect the driver to a rider and optional flight; pricing belongs to the ride; dashboard summary is driver-specific and can either be stored or derived later.

**Rationale**: The spec's core promise is "my day and my business." Driver ownership keeps RLS straightforward and aligns with the authenticated session already shipped in `001-auth-flow`.

**Alternatives considered**:

- **Global rider records shared across drivers**: Deferred because HUM may eventually model riders across multiple trusted drivers, but this slice does not implement posse handoffs or shared rider ownership.
- **Pricing embedded directly on rides**: Rejected because pricing has its own requested shape and may grow into rate-card, accepted amount, and platform comparison history.
- **Dashboard summary only derived from rides**: Deferred to implementation choice. The plan supports either stored summary records or derivation as long as the UI receives consistent values.

## 4. Ride state model

**Decision**: Model ride state as a constrained status with these values: `pending`, `confirmed`, `driving_to_appointment`, `driving_to_destination`, and `completed`.

**Rationale**: The states come directly from the feature scope and drive visible card behavior. A constrained status avoids ambiguous values in backend records and makes UI tests deterministic.

**Alternatives considered**:

- **Free-text status**: Rejected because it makes card rendering and tests unreliable.
- **Full workflow event log**: Deferred until data creation and state transitions are implemented; v1 only displays records.
- **Separate state tables**: Rejected for v1 because the state set is small and product-defined.

## 5. Airport and flight data

**Decision**: Represent flight data as an optional record associated with a ride, including airline/flight number, airport, scheduled/estimated/actual arrival fields where available, delay minutes/status, gate, terminal, and data freshness.

**Rationale**: Airport pickups are the signature concierge moment. Optional flight records let normal appointments stay simple while airport rides show enough context to reduce app switching.

**Alternatives considered**:

- **Require flight data for all rides**: Rejected because many rides are fixed-time appointments or commuters.
- **Only store flight number**: Rejected because the home card must display arrival, delays, airport, gate, and terminal when available.
- **Integrate a live flight provider now**: Out of scope; the spec says data creation and automation come later.

## 6. FSD front-end placement

**Decision**: Keep `src/app/(driver)/index.tsx` as a thin route that composes `src/pages/driver-home`. Put page-level loading and view-model mapping in the page slice. Put shared business types and formatting helpers in `src/entities/ride`, `src/entities/rider`, `src/entities/pricing`, `src/entities/flight`, and `src/entities/dashboard-summary` only if they are consumed outside the page; otherwise keep page-local until reuse is real.

**Rationale**: The constitution requires FSD import direction and thin route files. The home page is the first consumer, so the plan avoids over-slicing UI while still creating durable entity models for backend contracts.

**Alternatives considered**:

- **Implement the whole screen in the route file**: Rejected because it violates the FSD route-thinness rule.
- **Create widgets for every card immediately**: Rejected unless reuse appears; page-local composition is simpler for the first home screen.
- **Put business helpers in shared**: Rejected because shared must not contain business rules.

## 7. UI component strategy

**Decision**: Use existing React Native Reusables/shadcn-style primitives and HUM shared UI where possible: `Card`, `Button`, text primitives, app tabs, tokens, NativeWind classes, SafeArea layout, and existing auth/navigation infrastructure. Add custom home components only for stat-card layout and ride-card presentation if primitives do not cover the composed pattern.

**Rationale**: This matches the user's request and keeps the UI coherent with the existing auth slice. Home-specific cards are product composition, not new primitive controls.

**Alternatives considered**:

- **Build a separate home design system**: Rejected as unnecessary and inconsistent.
- **Use web prototype code directly**: Rejected because the app is React Native and the prototype is a reference, not production code.

## 8. Test strategy

**Decision**: Use the existing Jest + React Native Testing Library setup for page rendering and state-specific card behavior, plus SQL/migration verification through Supabase CLI/local database during implementation.

**Rationale**: The repo already has `npm run test`, `jest-expo`, and React Native Testing Library. The feature includes both UI rendering and data security risk, so tests must cover visible states and data access assumptions.

**Alternatives considered**:

- **Manual testing only**: Rejected by the constitution.
- **End-to-end mobile automation in this slice**: Deferred; useful later, but the current risk can be covered with focused rendering and contract/migration checks.
