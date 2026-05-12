# Implementation Plan: Driver Home Dashboard

**Branch**: `002-driver-home-dashboard` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-driver-home-dashboard/spec.md`

**Note**: This plan was produced by `/speckit-plan`. Phase 0 output: [research.md](./research.md). Phase 1 output: [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/](./contracts/).

## Summary

Build the signed-in driver's home dashboard: a calm business stat card plus today's ride schedule, populated from Supabase-backed driver data. The first vertical slice creates the durable home data model (dashboard summary, riders, locations, pricing, flights, rides), protects it with driver-scoped RLS, and replaces the placeholder protected home route with a Feature-Sliced page that renders regular and airport ride cards using existing React Native reusable primitives wherever possible.

## Technical Context

**Language/Version**: TypeScript 5.9 / React 19 / React Native 0.83 (Expo SDK ~55)

**Primary Dependencies**: Expo Router (`expo-router`), `@supabase/supabase-js`, Zustand/auth store from `001-auth-flow`, NativeWind, React Native Reusables / `@rn-primitives/*`, existing shared UI primitives (`Card`, `Button`, text/input/label)

**Storage**: Supabase Postgres public app tables with Row Level Security; Supabase Auth remains the driver identity source

**Testing**: Existing `jest-expo`, Jest, React Native Testing Library via `npm run test`; Supabase migration/RLS verification through local Supabase CLI or SQL checks during implementation

**Target Platform**: iOS, Android

**Project Type**: Mobile driver client with Supabase-backed data model

**Performance Goals**: Home dashboard opens to a useful loading/empty/data state without blocking navigation; representative test drivers can identify their next ride within 5 seconds and business stats within 10 seconds

**Constraints**: Public mobile client must never expose service-role or secret keys; every new public table must enable RLS; route files stay thin; no data creation/editing or live flight-provider sync in this feature

**Scale/Scope**: One protected home page, one page-level read model, six core table families, all five requested ride states, regular and airport ride-card display, representative seed/manual data path for verification

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Driver business ownership**: Pass. The dashboard leads with earnings and ride-goal progress, then shows the driver's own schedule and pricing context.
- **Concierge reliability**: Pass. Airport ride cards surface flight, delay, gate, terminal, airport, rider, and route context before the driver has to improvise.
- **Calm, legible, low-touch operation**: Pass. Implementation must use clear card hierarchy, plain labels, large touch targets, and omit empty optional fields rather than creating dense forms.
- **Relationship memory**: Pass. Rider history, lifetime value, preferences, ride history, pricing, and flight context become durable concepts; client note creation remains out of scope.
- **Required testing and observability**:
  - **P1 Stat card**: render tests for populated and zero-state summary values.
  - **P1 Schedule**: render tests for chronological display and all five ride states.
  - **P2 Airport rides**: render tests for complete flight data, delayed flight data, and missing optional flight fields.
  - **P2 Data foundation**: migration/RLS checks that driver-owned rows are protected; mapper tests for Supabase rows → home read model.
  - **Observability**: development-safe logs for home data load success/failure and query error category, with no rider phone number, full address, or token values in logs.
- **Feature-Sliced Design**:
  - `src/app/(driver)/index.tsx`: route stays thin and composes the page slice.
  - `src/pages/driver-home/`: new page slice for screen UI, page-level query/model mapping, loading/empty/error states, public `index.ts`.
  - `src/entities/ride`, `src/entities/rider`, `src/entities/pricing`, `src/entities/flight`, `src/entities/dashboard-summary`: add only the shared models/API helpers needed beyond the page; expose public APIs and avoid same-layer cross-imports except through `@x` if necessary.
  - `src/shared/ui/primitives/` and existing `src/shared/lib/`: reused for foundation UI/tokens only; no business rules added to shared.
  - No `processes` layer.

## Project Structure

### Documentation (this feature)

```text
specs/002-driver-home-dashboard/
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

**Structure Decision**: Implement the screen as `src/pages/driver-home` and keep `src/app/(driver)/index.tsx` as the composition route. Create Supabase migrations under `supabase/migrations/`. Prefer a page-level home read API/mapper first; promote ride/rider/pricing/flight/dashboard model code into `src/entities/*` only where it is reused or needed for testable contracts. Reuse `src/shared/ui/primitives` for base controls and tokens; create custom home card components inside the page slice unless a component is clearly generic.

## Post-Design Constitution Re-check

- All gates above remain satisfied after Phase 0 and Phase 1 design.
- [research.md](./research.md) resolves the data-loading, RLS, ownership, ride state, flight, FSD placement, UI reuse, and test strategy decisions without unresolved clarifications.
- [data-model.md](./data-model.md) defines driver-owned durable relationship-memory concepts and RLS rules.
- [contracts/](./contracts/) documents the home read model and Supabase schema expectations for implementation.
- Testing and observability obligations are explicit and should be converted into `/speckit-tasks` tasks.

## Complexity Tracking

No constitution violations or FSD exceptions required for this feature.
