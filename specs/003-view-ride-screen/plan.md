# Implementation Plan: View Ride Screen

**Branch**: `003-view-ride-screen` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-view-ride-screen/spec.md`

**Note**: This plan was produced by `/speckit-plan`. Phase 0 output: [research.md](./research.md). Phase 1 output: [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/](./contracts/).

## Summary

Build the primary ride workspace for the HUM driver app: a persistent map with a gesture-driven ride sheet that changes content and actions across pending, confirmed, driving-to-pickup, dropoff, and completed ride states. The implementation should add a dedicated `driver-ride` page slice, reuse and extend the existing driver-home ride read model where sensible, add map/location support, use `@gorhom/bottom-sheet` for the adjustable sheet, and keep route files thin.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.9 / React 19 / React Native 0.83 (Expo SDK ~55)

**Primary Dependencies**: Expo Router, Supabase JS, NativeWind, React Native Reusables/shared primitives, `react-native-gesture-handler`, `react-native-reanimated`, `@gorhom/bottom-sheet`, `@rnmapbox/maps` with its Expo config plugin

**Storage**: Supabase Postgres public app tables created by `002-driver-home-dashboard`, extended with Mapbox-ready location coordinates and ride-view relationship note concepts as needed

**Testing**: Existing Jest + `jest-expo` + React Native Testing Library via `npm run test`; static contract tests for ride-view read model and state mapping

**Target Platform**: iOS, Android

**Project Type**: Mobile driver client with Supabase-backed data model

**Performance Goals**: Ride view opens to useful map/sheet content without blocking navigation; state-specific primary action identifiable within 5 seconds; sheet gestures and map panning remain responsive on representative mobile devices

**Constraints**: Public mobile client must not expose secret keys; Mapbox public access token must be app-safe and configured through environment/app config; every public-table addition must preserve RLS; active driving states must keep actions low-touch and not depend on dense content; route files stay thin; bottom sheet must work under the existing `GestureHandlerRootView`

**Scale/Scope**: One protected ride detail page, five ride states, one page-level ride-view read model, map/sheet UI, optional flight display, route previews, message/navigation action intents, and post-ride note/tag UI

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Driver business ownership**: Pass. Pending and completed states foreground quote, platform comparison, payment, and client relationship context so the driver operates as a business owner.
- **Concierge reliability**: Pass. Confirmed and active states encode preparation, pre-trip communication, route awareness, passenger contact, and one-tap state movement.
- **Calm, legible, low-touch operation**: Pass. The persistent map/sheet structure, default 50/50 split, state-specific primary action, and active-state map emphasis reduce context switching.
- **Relationship memory**: Pass. Completed rides capture note/tag intent and preserve rider history and HUM moment context. Durable note persistence is included as a small extension because it is central to the completed-state story.
- **Required testing and observability**:
  - **P1 Workspace shell**: render tests for all five states proving map placeholder/region, sheet content, snap-point defaults, and primary action label.
  - **P1 Pending**: render tests for suggested quote, platform comparison present/absent, route preview copy, and optional flight omission.
  - **P1 Confirmed**: render tests for agenda timeline, pre-trip confirmation action, and three-waypoint map summary with/without current location.
  - **P1 Active states**: render tests for driving-to-pickup and dropoff action sets; unit tests for state-to-action mapping.
  - **P2 Completed**: render tests for payment, rider relationship context, note/tags, HUM moment, and follow-up actions.
  - **Contracts**: mapper tests for Supabase rows to ride-view read model, including missing optional fields and stale flight/location data.
  - **Observability**: development-safe logs for ride view load success/failure, route/location availability, message action failures, and state-transition action failures; never log phone numbers, full addresses, message body text, tokens, or precise coordinates.
- **Feature-Sliced Design**:
  - `src/app/(driver)/ride/[rideId].tsx`: thin route, reads route param and composes the page slice.
  - `src/pages/driver-ride/`: page slice for data loading, ride-view mapping, map/sheet layout, state panels, loading/empty/error states, public `index.ts`.
  - `src/features/ride-actions/`: optional feature slice for reusable state-transition/contact/pre-trip intent controls if they are reused beyond this page; otherwise keep page-local for this first slice.
  - `src/features/relationship-note/`: optional feature slice only if completed-state note/tag persistence is implemented now and needs isolated mutation tests.
  - `src/entities/ride`, `src/entities/rider`, `src/entities/pricing`, `src/entities/flight`, `src/entities/route`: promote shared model helpers only where reused by driver home and ride view; otherwise keep read-model composition inside the page.
  - `src/shared/ui/` and `src/shared/lib/`: use only generic primitives, map helpers with no HUM business rules, and formatting utilities.
  - No `processes` layer. Imports flow downward; public APIs are updated for every new slice.

## Project Structure

### Documentation (this feature)

```text
specs/003-view-ride-screen/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

HUM driver app uses **Feature-Sliced Design** under `src/`. Expo Router lives in
`src/app/`. Shared UI lives in `src/shared/ui/`; React Native Reusables /
shadcn-style generated components go in `src/shared/ui/primitives/` (see
`components.json` alias `ui`). Backend may be `supabase/` or another
`backend/` root. Tests live under `tests/`.

```text
src/
├── app/                 # FSD app: Expo Router, root layouts, providers
├── pages/               # FSD pages: screen slices (add when used)
├── widgets/             # FSD widgets: large composed blocks (optional)
├── features/            # FSD features: user interactions (optional)
├── entities/            # FSD entities: domain nouns (optional)
├── shared/
│   ├── ui/              # UI kit: app chrome + themed components
│   │   └── primitives/  # shadcn/RNR-generated components (components.json "ui")
│   ├── lib/             # cn(), theme tokens, navigation theme, color-scheme hooks
│   └── styles/          # design-tokens.css (imported from global.css)
└── assets/

supabase/ or backend/
├── migrations/
├── functions/
└── tests/

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: Implement a new ride page under `src/pages/driver-ride` and expose it through a thin Expo Router file at `src/app/(driver)/ride/[rideId].tsx`. Keep the first implementation page-local unless a model/helper is shared with `src/pages/driver-home`; when shared, promote the model to an entity slice with explicit public APIs. Add map and bottom-sheet layout components inside the page slice because they are currently specific to the ride workspace.

## Post-Design Constitution Re-check

- All gates above remain satisfied after Phase 0 and Phase 1 design.
- [research.md](./research.md) resolves the bottom sheet, map, current location, route data, state transition, note persistence, FSD placement, and test strategy decisions without unresolved clarifications.
- [data-model.md](./data-model.md) defines the ride-view read model, map route concepts, agenda items, action intents, and relationship notes while preserving driver-owned access rules.
- [contracts/](./contracts/) documents the read-model and state-rendering contracts for implementation.
- Testing and observability requirements are explicit and should be converted into `/speckit-tasks` tasks.

## Complexity Tracking

No constitution violations or FSD exceptions required for this feature.
