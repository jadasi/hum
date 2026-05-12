# Tasks: Driver Home Dashboard

**Input**: Design documents from `/specs/002-driver-home-dashboard/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED by the HUM Driver App Constitution. Each user story includes automated tests before implementation tasks.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested as an independently valuable increment after the foundational phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare feature folders and migration/test entry points without implementing story behavior.

- [X] T001 Create the driver-home page slice directories and public API placeholder in `src/pages/driver-home/index.ts`
- [X] T002 [P] Create driver-home UI/model/API segment placeholders in `src/pages/driver-home/ui/`, `src/pages/driver-home/model/`, and `src/pages/driver-home/api/`
- [X] T003 [P] Create home dashboard test directories in `tests/unit/driver-home/`, `tests/integration/driver-home/`, and `tests/contract/driver-home/`
- [X] T004 Create a Supabase migration for the feature with `supabase migration new driver_home_dashboard` and use the generated file in `supabase/migrations/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the database schema, read model, page shell, fixtures, and test helpers that all user stories depend on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Define `driver_dashboard_summaries`, `riders`, `locations`, `pricing_quotes`, `flights`, and `rides` tables in the generated `supabase/migrations/*_driver_home_dashboard.sql`
- [X] T006 Add constrained ride/flight status types, check constraints, foreign keys, uniqueness, and indexes in `supabase/migrations/*_driver_home_dashboard.sql`
- [X] T007 Add RLS enablement and authenticated driver-owned select policies for all new tables in `supabase/migrations/*_driver_home_dashboard.sql`
- [X] T008 [P] Define `Money`, `HomeDashboardReadModel`, `HomeRideCardModel`, and related display types in `src/pages/driver-home/model/home-dashboard-types.ts`
- [X] T009 [P] Implement money, date/time, rider-name, route, and ride-state formatting helpers in `src/pages/driver-home/model/home-dashboard-formatters.ts`
- [X] T010 [P] Create representative home dashboard fixture data covering summary, all ride states, non-flight rides, airport rides, and empty state in `tests/fixtures/driver-home/home-dashboard-fixtures.ts`
- [X] T011 [P] Create Supabase row fixture data matching the schema contract in `tests/fixtures/driver-home/supabase-row-fixtures.ts`
- [X] T012 Implement Supabase row-to-read-model mapper in `src/pages/driver-home/model/map-home-dashboard.ts`
- [X] T013 Implement the authenticated page-level home dashboard query in `src/pages/driver-home/api/get-home-dashboard.ts`
- [X] T014 Implement a development-safe home dashboard logger that omits phone numbers, full addresses, and tokens in `src/pages/driver-home/model/home-dashboard-logger.ts`
- [X] T015 Create the `DriverHomeScreen` shell with loading, empty, error, and content regions in `src/pages/driver-home/ui/driver-home-screen.tsx`
- [X] T016 Update the page public API to export the screen, query, mapper, and types from `src/pages/driver-home/index.ts`
- [X] T017 Replace the placeholder protected home route with the page slice composition in `src/app/(driver)/index.tsx`

**Checkpoint**: Foundation ready - schema, read model, route composition, fixtures, and page shell exist.

---

## Phase 3: User Story 1 - See Today's Business Snapshot (Priority: P1) MVP

**Goal**: A signed-in driver sees today's earnings, this week's earnings, and weekly ride-goal progress in a prominent stat card.

**Independent Test**: Open the home page with summary data and verify the three stat values are visible, correctly labeled, and still render for zero-state values.

### Tests for User Story 1 (REQUIRED)

- [X] T018 [P] [US1] Add stat card formatter tests for currency and `7/10 rides this week` progress in `tests/unit/driver-home/home-dashboard-formatters.test.ts`
- [X] T019 [P] [US1] Add stat card render tests for populated and zero-state summaries in `tests/integration/driver-home/driver-home-summary.test.tsx`

### Implementation for User Story 1

- [X] T020 [P] [US1] Implement the summary stat card component in `src/pages/driver-home/ui/home-summary-card.tsx`
- [X] T021 [US1] Wire `home-summary-card.tsx` into the content region of `src/pages/driver-home/ui/driver-home-screen.tsx`
- [X] T022 [US1] Add accessible labels and plain-language copy for summary values in `src/pages/driver-home/ui/home-summary-card.tsx`
- [X] T023 [US1] Verify US1 tests fail before implementation and pass after implementation using `tests/integration/driver-home/driver-home-summary.test.tsx`

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Review Today's Ride Schedule (Priority: P1)

**Goal**: A signed-in driver sees today's rides in chronological order with rider, route, timing, pricing, and state-specific display for all requested states.

**Independent Test**: Load rides in pending, confirmed, driving-to-appointment, driving-to-destination, and completed states and verify the schedule cards show the correct status, rider, route, and pricing data.

### Tests for User Story 2 (REQUIRED)

- [X] T024 [P] [US2] Add ride ordering and state-label tests in `tests/unit/driver-home/home-dashboard-schedule.test.ts`
- [X] T025 [P] [US2] Add schedule render tests for all five ride states in `tests/integration/driver-home/driver-home-schedule.test.tsx`
- [X] T026 [P] [US2] Add non-flight ride pricing and route display tests in `tests/integration/driver-home/driver-home-regular-rides.test.tsx`

### Implementation for User Story 2

- [X] T027 [P] [US2] Implement schedule ordering and state display helpers in `src/pages/driver-home/model/home-schedule-view.ts`
- [X] T028 [P] [US2] Implement the ride status badge component in `src/pages/driver-home/ui/ride-status-badge.tsx`
- [X] T029 [P] [US2] Implement the base ride card component for non-flight rides in `src/pages/driver-home/ui/home-ride-card.tsx`
- [X] T030 [US2] Implement the daily schedule list component in `src/pages/driver-home/ui/home-schedule-list.tsx`
- [X] T031 [US2] Wire `home-schedule-list.tsx` into `src/pages/driver-home/ui/driver-home-screen.tsx`
- [X] T032 [US2] Add empty schedule copy and retry-safe error affordance in `src/pages/driver-home/ui/driver-home-screen.tsx`
- [X] T033 [US2] Verify US2 tests fail before implementation and pass after implementation using `tests/integration/driver-home/driver-home-schedule.test.tsx`

**Checkpoint**: User Stories 1 and 2 both work, and the home page is useful for non-flight daily schedule review.

---

## Phase 5: User Story 3 - Prepare for Airport Pickups (Priority: P2)

**Goal**: Airport rides display flight details such as flight number, airport, arrival time, delay, gate, and terminal while non-flight rides omit flight fields.

**Independent Test**: Load airport ride fixtures with complete, delayed, stale, and partial flight data and verify the card shows available flight information without blank optional rows.

### Tests for User Story 3 (REQUIRED)

- [X] T034 [P] [US3] Add flight display mapper tests for complete, delayed, stale, and partial flight data in `tests/unit/driver-home/home-dashboard-flight.test.ts`
- [X] T035 [P] [US3] Add airport ride card render tests in `tests/integration/driver-home/driver-home-airport-rides.test.tsx`
- [X] T036 [P] [US3] Add non-flight omission tests ensuring no empty flight fields render in `tests/integration/driver-home/driver-home-airport-rides.test.tsx`

### Implementation for User Story 3

- [X] T037 [P] [US3] Implement flight display formatting helpers in `src/pages/driver-home/model/home-flight-view.ts`
- [X] T038 [P] [US3] Implement the flight info panel component in `src/pages/driver-home/ui/flight-info-panel.tsx`
- [X] T039 [US3] Integrate `flight-info-panel.tsx` into `src/pages/driver-home/ui/home-ride-card.tsx` for airport rides only
- [X] T040 [US3] Add stale or unknown flight status copy in `src/pages/driver-home/ui/flight-info-panel.tsx`
- [X] T041 [US3] Verify US3 tests fail before implementation and pass after implementation using `tests/integration/driver-home/driver-home-airport-rides.test.tsx`

**Checkpoint**: Airport pickup cards support the concierge flight context while regular ride cards remain clean.

---

## Phase 6: User Story 4 - Establish Home Data Foundations (Priority: P2)

**Goal**: The backend data shape supports representative driver-specific dashboard, rider, ride, pricing, location, and flight records without adding in-app creation flows.

**Independent Test**: Apply the migration and representative records, then verify the home read contract can populate all visible sections and never exposes another driver's rows.

### Tests for User Story 4 (REQUIRED)

- [X] T042 [P] [US4] Add schema contract assertions for required tables, statuses, indexes, and RLS expectations in `tests/contract/driver-home/supabase-schema-contract.test.ts`
- [X] T043 [P] [US4] Add mapper contract tests for Supabase rows to `HomeDashboardReadModel` in `tests/contract/driver-home/home-dashboard-read-contract.test.ts`
- [X] T044 [P] [US4] Add driver-scoping query tests with same-driver and cross-driver fixtures in `tests/contract/driver-home/home-dashboard-rls-contract.test.ts`

### Implementation for User Story 4

- [X] T045 [US4] Add documented local fixture SQL for one driver, cross-driver rows, all ride states, and delayed airport data in `supabase/seed.sql`
- [X] T046 [US4] Add manual fixture setup instructions for auth user id replacement in `specs/002-driver-home-dashboard/quickstart.md`
- [X] T047 [US4] Update `src/pages/driver-home/api/get-home-dashboard.ts` to query all required relationships and return the contract shape
- [X] T048 [US4] Add query error categorization and sanitized logging calls in `src/pages/driver-home/api/get-home-dashboard.ts`
- [X] T049 [US4] Verify US4 contract tests fail before implementation and pass after implementation using `tests/contract/driver-home/home-dashboard-read-contract.test.ts`

**Checkpoint**: The backend foundation and page read contract can support seeded real data for the home dashboard.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete feature, improve accessibility, and align documentation with the final implementation.

- [X] T050 [P] Run an accessibility pass for readable hierarchy, large touch targets, and screen-reader labels in `src/pages/driver-home/ui/driver-home-screen.tsx`
- [X] T051 [P] Add edge-case tests for missing pickup, missing optional flight fields, no rider preferences, and pending accepted price in `tests/integration/driver-home/driver-home-edge-cases.test.tsx`
- [X] T052 [P] Update implementation notes and troubleshooting details in `specs/002-driver-home-dashboard/quickstart.md`
- [X] T053 Run `npm run test` and fix any failures in `tests/`
- [X] T054 Run `npm run lint` and fix any issues in `src/pages/driver-home/`, `src/app/(driver)/index.tsx`, and `tests/`
- [X] T055 Verify Supabase RLS and table presence with the quickstart SQL in `specs/002-driver-home-dashboard/quickstart.md`
- [X] T056 Review FSD imports and public APIs for `src/pages/driver-home/`, `src/app/(driver)/index.tsx`, and any `src/entities/` files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 7)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational; MVP scope.
- **User Story 2 (P1)**: Can start after Foundational; best implemented after US1 because it shares the page content region.
- **User Story 3 (P2)**: Can start after Foundational and base ride card tasks from US2.
- **User Story 4 (P2)**: Can start after Foundational; final API query task integrates with UI from US1-US3.

### Within Each User Story

- Tests must be written and observed failing before implementation.
- Models/helpers before UI integration.
- Query/mapping contracts before Supabase-backed screen integration.
- Story checkpoint should be validated before moving to the next priority.

### Parallel Opportunities

- Setup placeholders T002 and T003 can run in parallel after T001.
- Foundational fixture/type/helper tasks T008-T011 can run in parallel before mapper/query tasks.
- US1 tests T018-T019 can run in parallel; T020 can run before T021.
- US2 tests T024-T026 and components T027-T029 can run in parallel before schedule integration.
- US3 tests T034-T036 and components T037-T038 can run in parallel before ride-card integration.
- US4 contract tests T042-T044 can run in parallel before fixture/query implementation.
- Polish tasks T050-T052 can run in parallel before final test/lint verification.

---

## Parallel Example: User Story 1

```bash
Task: "Add stat card formatter tests for currency and 7/10 rides this week progress in tests/unit/driver-home/home-dashboard-formatters.test.ts"
Task: "Add stat card render tests for populated and zero-state summaries in tests/integration/driver-home/driver-home-summary.test.tsx"
Task: "Implement the summary stat card component in src/pages/driver-home/ui/home-summary-card.tsx"
```

## Parallel Example: User Story 2

```bash
Task: "Add ride ordering and state-label tests in tests/unit/driver-home/home-dashboard-schedule.test.ts"
Task: "Add schedule render tests for all five ride states in tests/integration/driver-home/driver-home-schedule.test.tsx"
Task: "Implement the ride status badge component in src/pages/driver-home/ui/ride-status-badge.tsx"
Task: "Implement the base ride card component for non-flight rides in src/pages/driver-home/ui/home-ride-card.tsx"
```

## Parallel Example: User Story 3

```bash
Task: "Add flight display mapper tests for complete, delayed, stale, and partial flight data in tests/unit/driver-home/home-dashboard-flight.test.ts"
Task: "Implement flight display formatting helpers in src/pages/driver-home/model/home-flight-view.ts"
Task: "Implement the flight info panel component in src/pages/driver-home/ui/flight-info-panel.tsx"
```

## Parallel Example: User Story 4

```bash
Task: "Add schema contract assertions for required tables, statuses, indexes, and RLS expectations in tests/contract/driver-home/supabase-schema-contract.test.ts"
Task: "Add mapper contract tests for Supabase rows to HomeDashboardReadModel in tests/contract/driver-home/home-dashboard-read-contract.test.ts"
Task: "Add driver-scoping query tests with same-driver and cross-driver fixtures in tests/contract/driver-home/home-dashboard-rls-contract.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Stop and validate the stat card with tests and representative summary data.
5. Demo the business snapshot before adding schedule complexity.

### Incremental Delivery

1. Complete Setup + Foundational to establish schema, fixtures, read model, and page shell.
2. Add US1 stat card and validate independently.
3. Add US2 schedule and validate all ride states independently.
4. Add US3 airport flight context and validate airport/non-airport card behavior.
5. Add US4 full seeded-data verification and RLS/read-contract validation.
6. Run polish, accessibility, test, lint, and quickstart verification.

### Notes

- [P] tasks use different files or can proceed without depending on incomplete tasks.
- Story labels map tasks to spec user stories for traceability.
- Do not add data creation/editing flows in this feature.
- Keep `src/app/(driver)/index.tsx` thin and avoid deep imports across FSD slice boundaries.
- Avoid logging rider phone numbers, full addresses, Supabase tokens, or other sensitive data.
