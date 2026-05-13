# Tasks: View Ride Screen

**Input**: Design documents from `/specs/003-view-ride-screen/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED by the HUM Driver App Constitution. Each user story includes automated tests before implementation tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing. Clarified spec answers take precedence where plan/data-model text is older: core ride transitions persist, pending quote edits save on confirm, and completed note/tag entry remains a local draft.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions
- Keep FSD imports downward and expose new slice APIs through `index.ts`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add native map/sheet dependencies, app configuration, and test mocks needed by all ride-view stories.

- [X] T001 Install `@gorhom/bottom-sheet` and `@rnmapbox/maps`, updating `package.json` and `package-lock.json`
- [X] T002 Configure the `@rnmapbox/maps` Expo config plugin and public token environment reference in `app.json`
- [X] T003 [P] Add `EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN` placeholder documentation in `.env.example`
- [X] T004 [P] Add Mapbox and bottom-sheet Jest mocks in `tests/setup/jest-setup-after-env.js`
- [X] T005 Create ride-view directories `src/pages/driver-ride/api`, `src/pages/driver-ride/model`, `src/pages/driver-ride/ui`, `tests/unit/driver-ride`, `tests/integration/driver-ride`, and `tests/contract/driver-ride`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared schema, read model, loader, mapper, state/action logic, and public API required before user stories.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T006 Create Supabase migration for ride-view coordinates, quote updates, and driver-owned update policies in `supabase/migrations/202605130001_extend_ride_view.sql`
- [X] T007 [P] Add static migration/RLS contract tests for ride-view fields and update policies in `tests/contract/driver-ride/supabase-ride-view-schema-contract.test.ts`
- [X] T008 Extend representative ride seed data with pickup/dropoff coordinates and ride-view state coverage in `supabase/temp_driver_home_seed_94530c16.sql`
- [X] T009 [P] Create ride-view domain types for read model, route, actions, agenda, pricing, and local notes in `src/pages/driver-ride/model/ride-view-types.ts`
- [X] T010 [P] Create state/action mapping helpers for primary actions and route modes in `src/pages/driver-ride/model/ride-view-state.ts`
- [X] T011 [P] Create development-safe ride-view logger that excludes phone numbers, addresses, notes, tokens, and precise coordinates in `src/pages/driver-ride/model/ride-view-logger.ts`
- [X] T012 Create Supabase ride-view loader scoped by `driverId` and `rideId` in `src/pages/driver-ride/api/get-ride-view.ts`
- [X] T013 Create Supabase row-to-read-model mapper with optional-field omission in `src/pages/driver-ride/model/map-ride-view.ts`
- [X] T014 [P] Create money, location, route, and rider display formatters in `src/pages/driver-ride/model/ride-view-formatters.ts`
- [X] T015 [P] Export the driver-ride page slice public API in `src/pages/driver-ride/index.ts`
- [X] T016 Add thin protected ride route that composes the page slice in `src/app/(driver)/ride/[rideId].tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Consistent Ride Workspace (Priority: P1) MVP

**Goal**: Every ride state opens in a stable map plus adjustable sheet workspace with a balanced default split and visible primary action.

**Independent Test**: Open a ride in each supported state with fixture data and verify map surface, bottom sheet, balanced default snap state, and primary action are present.

### Tests for User Story 1 (REQUIRED)

- [X] T017 [P] [US1] Add render tests for map/sheet shell across all five ride states in `tests/integration/driver-ride/driver-ride-screen.test.tsx`
- [X] T018 [P] [US1] Add unit tests for route mode and primary action mapping in `tests/unit/driver-ride/ride-view-state.test.ts`
- [X] T019 [P] [US1] Add mapper contract tests for required rider/pricing/dropoff data and optional-field omission in `tests/unit/driver-ride/map-ride-view.test.ts`

### Implementation for User Story 1

- [X] T020 [P] [US1] Create reusable ride-view fixtures covering all states in `tests/fixtures/driver-ride/ride-view-fixtures.ts`
- [X] T021 [P] [US1] Implement Mapbox-based map shell with waypoint and route line props in `src/pages/driver-ride/ui/ride-map-view.tsx`
- [X] T022 [P] [US1] Implement bottom-sheet workspace shell with collapsed, balanced, and expanded snap points in `src/pages/driver-ride/ui/ride-bottom-sheet.tsx`
- [X] T023 [US1] Implement `DriverRideScreen` loading, error, ready, and initialData states in `src/pages/driver-ride/ui/driver-ride-screen.tsx`
- [X] T024 [US1] Wire `DriverRideScreen` to `getRideView`, route params, auth user id, and retry handling in `src/pages/driver-ride/ui/driver-ride-screen.tsx`
- [X] T025 [US1] Add accessible primary action rendering and state labels in `src/pages/driver-ride/ui/ride-primary-action-bar.tsx`
- [X] T026 [US1] Update `src/pages/driver-ride/index.ts` exports for shell, model, loader, and screen public APIs

**Checkpoint**: US1 is independently functional as a ride workspace with mock/fixture data and loader-backed data.

---

## Phase 4: User Story 2 - Review and Quote Pending Ride (Priority: P1)

**Goal**: A pending ride shows rider, pickup, destination, suggested quote, editable driver quote, platform comparison when available, optional flight context, and saves the edited quote when confirming.

**Independent Test**: Open a pending ride, edit the quote, confirm the ride, and verify the confirmed quote and ride state are saved while missing platform/flight data is omitted.

### Tests for User Story 2 (REQUIRED)

- [X] T027 [P] [US2] Add pending panel render tests for suggested quote, editable quote, platform comparison present/absent, and flight present/absent in `tests/integration/driver-ride/pending-ride-panel.test.tsx`
- [X] T028 [P] [US2] Add quote edit validation and money formatting tests in `tests/unit/driver-ride/pending-quote.test.ts`
- [X] T029 [P] [US2] Add pending confirm mutation tests for saving edited quote and moving ride to confirmed in `tests/unit/driver-ride/confirm-pending-ride.test.ts`

### Implementation for User Story 2

- [X] T030 [P] [US2] Implement pending quote model helpers and validation in `src/pages/driver-ride/model/pending-quote.ts`
- [X] T031 [P] [US2] Implement pending ride panel UI with editable quote, platform comparison, rider summary, route summary, and optional flight summary in `src/pages/driver-ride/ui/pending-ride-panel.tsx`
- [X] T032 [US2] Implement Supabase mutation for confirming pending ride with edited quote in `src/pages/driver-ride/api/confirm-pending-ride.ts`
- [X] T033 [US2] Wire pending confirm action, loading state, error copy, and post-confirm refresh in `src/pages/driver-ride/ui/driver-ride-screen.tsx`
- [X] T034 [US2] Add safe logging for pending confirm success/failure without price confusion or sensitive fields in `src/pages/driver-ride/model/ride-view-logger.ts`

**Checkpoint**: US2 can be demoed independently by confirming a pending ride at an edited quote.

---

## Phase 5: User Story 3 - Prepare for Confirmed Ride (Priority: P1)

**Goal**: A confirmed ride shows a timeline-style agenda, pre-trip confirmation intent, optional flight status, and a three-waypoint route overview when current location exists.

**Independent Test**: Open a confirmed ride with and without current location and verify agenda, confirmation action, route fallback, and optional flight status.

### Tests for User Story 3 (REQUIRED)

- [X] T035 [P] [US3] Add confirmed panel render tests for agenda timeline, pre-trip action, accepted quote, and optional flight status in `tests/integration/driver-ride/confirmed-ride-panel.test.tsx`
- [X] T036 [P] [US3] Add agenda derivation tests for done, active, and upcoming items in `tests/unit/driver-ride/ride-agenda.test.ts`
- [X] T037 [P] [US3] Add route fallback tests for current-location available and unavailable states in `tests/unit/driver-ride/ride-route-context.test.ts`

### Implementation for User Story 3

- [X] T038 [P] [US3] Implement agenda derivation helpers in `src/pages/driver-ride/model/ride-agenda.ts`
- [X] T039 [P] [US3] Implement confirmed ride agenda timeline UI in `src/pages/driver-ride/ui/ride-agenda-timeline.tsx`
- [X] T040 [P] [US3] Implement confirmed ride panel with pre-trip confirmation intent and navigation/start action in `src/pages/driver-ride/ui/confirmed-ride-panel.tsx`
- [X] T041 [US3] Wire confirmed-state panel selection and current-location fallback route copy in `src/pages/driver-ride/ui/driver-ride-screen.tsx`
- [X] T042 [US3] Add pre-trip confirmation intent handler that opens/reports review flow unavailable state without sending messages in `src/pages/driver-ride/model/ride-action-handlers.ts`

**Checkpoint**: US3 can be demoed independently from a confirmed ride fixture or seeded ride.

---

## Phase 6: User Story 4 - Navigate Active Pickup and Dropoff Legs (Priority: P1)

**Goal**: Active ride states prioritize the map and expose contact passenger plus the correct persisted state transition: start dropoff or end trip.

**Independent Test**: Open driving-to-pickup and dropoff rides, verify navigation-first UI, contact action, and persisted state transition behavior.

### Tests for User Story 4 (REQUIRED)

- [X] T043 [P] [US4] Add active ride panel render tests for driving-to-pickup and dropoff actions in `tests/integration/driver-ride/active-ride-panel.test.tsx`
- [X] T044 [P] [US4] Add core ride transition mutation tests for start dropoff and end trip in `tests/unit/driver-ride/update-ride-state.test.ts`
- [X] T045 [P] [US4] Add active-state accessibility tests for reachable contact and primary transition actions in `tests/integration/driver-ride/active-ride-accessibility.test.tsx`

### Implementation for User Story 4

- [X] T046 [P] [US4] Implement active ride panel UI for concise rider, pickup/destination, contact, and transition actions in `src/pages/driver-ride/ui/active-ride-panel.tsx`
- [X] T047 [US4] Implement Supabase mutation for persisted ride state transitions and completion timestamps in `src/pages/driver-ride/api/update-ride-state.ts`
- [X] T048 [US4] Wire start-dropoff and end-trip actions with loading, error, refresh, and safe logs in `src/pages/driver-ride/ui/driver-ride-screen.tsx`
- [X] T049 [US4] Implement passenger contact intent handler that avoids logging phone numbers and reports unavailable contact data in `src/pages/driver-ride/model/ride-action-handlers.ts`
- [X] T050 [US4] Adjust sheet collapsed/balanced active-state behavior to keep the primary driving action reachable in `src/pages/driver-ride/ui/ride-bottom-sheet.tsx`

**Checkpoint**: US4 can be demoed independently with seeded active rides and verified persisted status changes.

---

## Phase 7: User Story 5 - Complete Ride and Capture Relationship Value (Priority: P2)

**Goal**: A completed ride shows payment, rider relationship context, HUM moment, follow-up actions, and local draft note/tag entry without persisting new notes.

**Independent Test**: Open a completed ride and verify payment summary, rider value, local draft note/tag behavior, HUM moment, and save/next ride action.

### Tests for User Story 5 (REQUIRED)

- [X] T051 [P] [US5] Add completed panel render tests for payment, ride summary, rider relationship context, HUM moment, and follow-up actions in `tests/integration/driver-ride/completed-ride-panel.test.tsx`
- [X] T052 [P] [US5] Add local draft note/tag state tests proving drafts do not call persistence APIs in `tests/unit/driver-ride/local-relationship-draft.test.ts`
- [X] T053 [P] [US5] Add completed-state optional existing notes/tags tests in `tests/integration/driver-ride/completed-notes-display.test.tsx`

### Implementation for User Story 5

- [X] T054 [P] [US5] Implement local relationship draft helpers for note body and quick tags in `src/pages/driver-ride/model/local-relationship-draft.ts`
- [X] T055 [P] [US5] Implement completed ride panel with payment, rider relationship context, HUM moment, draft notes/tags, and follow-up actions in `src/pages/driver-ride/ui/completed-ride-panel.tsx`
- [X] T056 [US5] Wire completed-state panel selection and local draft lifecycle in `src/pages/driver-ride/ui/driver-ride-screen.tsx`
- [X] T057 [US5] Implement schedule-return and save-next-ride intent handlers without note persistence in `src/pages/driver-ride/model/ride-action-handlers.ts`

**Checkpoint**: US5 can be demoed independently with a completed ride fixture.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validation, accessibility, docs, and cleanup across all implemented stories.

- [X] T058 [P] Add driver-home ride card navigation to ride details in `src/pages/driver-home/ui/home-ride-card.tsx`
- [X] T059 [P] Update quickstart implementation notes for clarified quote editing, persisted core transitions, and local draft notes in `specs/003-view-ride-screen/quickstart.md`
- [X] T060 [P] Update ride-view contracts to reflect editable pending quotes and local draft completed notes in `specs/003-view-ride-screen/contracts/state-rendering.md`
- [X] T061 [P] Update ride-view data model to remove completed note persistence from this slice and add quote confirmation persistence in `specs/003-view-ride-screen/data-model.md`
- [X] T062 Run accessibility review for large touch targets, readable text, accessible labels, and non-precise sheet gestures in `src/pages/driver-ride/ui/`
- [X] T063 Run privacy/observability review for logs excluding phone numbers, full addresses, notes, tokens, and precise coordinates in `src/pages/driver-ride/model/ride-view-logger.ts`
- [X] T064 Run `npm run test`, `npm run lint`, and `npx tsc --noEmit` from the repository root
- [X] T065 Validate quickstart manual device checks for Mapbox render, permission fallback, sheet/map gesture coexistence, and navigation handoff from `specs/003-view-ride-screen/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundation. P1 stories can then proceed in parallel if staffed, though sequential delivery is recommended.
- **Polish (Phase 8)**: Depends on all selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: MVP workspace shell; should be completed first because every other story renders inside it.
- **US2 (P1)**: Depends on foundational loader/action model and benefits from US1 shell; no dependency on US3-US5.
- **US3 (P1)**: Depends on foundational loader/action model and benefits from US1 shell; no dependency on US2, US4, or US5.
- **US4 (P1)**: Depends on foundational loader/action model and benefits from US1 shell; no dependency on US2, US3, or US5.
- **US5 (P2)**: Depends on foundational loader/action model and benefits from US1 shell; can be implemented after P1 scope.

### Within Each User Story

- Tests MUST be written and fail before implementation.
- Model and mapper helpers before UI integration.
- API mutations before wiring action buttons.
- Core implementation before route/home integration.
- Story complete before moving to the next checkpoint.

### Parallel Opportunities

- T003-T004 can run in parallel after T001/T002 are understood.
- T007, T009, T010, T011, T014, and T015 can run in parallel during Foundation.
- Story tests marked [P] can run in parallel within each story.
- US2, US3, and US4 can proceed in parallel after US1 shell and Foundation if separate developers own separate files.
- US5 can proceed in parallel with P1 stories after Foundation if the completed panel stays isolated.

---

## Parallel Example: User Story 2

```bash
# Launch pending ride tests together:
Task: "Add pending panel render tests in tests/integration/driver-ride/pending-ride-panel.test.tsx"
Task: "Add quote edit validation tests in tests/unit/driver-ride/pending-quote.test.ts"
Task: "Add pending confirm mutation tests in tests/unit/driver-ride/confirm-pending-ride.test.ts"

# Launch isolated implementation helpers together:
Task: "Implement pending quote model helpers in src/pages/driver-ride/model/pending-quote.ts"
Task: "Implement pending ride panel UI in src/pages/driver-ride/ui/pending-ride-panel.tsx"
```

## Parallel Example: User Story 4

```bash
# Launch active ride tests together:
Task: "Add active ride panel render tests in tests/integration/driver-ride/active-ride-panel.test.tsx"
Task: "Add core ride transition mutation tests in tests/unit/driver-ride/update-ride-state.test.ts"
Task: "Add active-state accessibility tests in tests/integration/driver-ride/active-ride-accessibility.test.tsx"

# Launch isolated implementation helpers together:
Task: "Implement active ride panel UI in src/pages/driver-ride/ui/active-ride-panel.tsx"
Task: "Implement Supabase state transition mutation in src/pages/driver-ride/api/update-ride-state.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Complete Phase 3 workspace shell.
4. Stop and validate all five ride states render in the same map/sheet workspace with a visible primary action.

### Incremental Delivery

1. Foundation + US1: ride workspace shell and read model.
2. US2: pending quote review/edit/confirm.
3. US3: confirmed agenda and pre-trip/navigation intents.
4. US4: active pickup/dropoff low-touch actions and persisted core transitions.
5. US5: completed payment, HUM moment, and local draft relationship memory.

### Notes

- [P] tasks use different files and have no direct dependency on incomplete tasks.
- Every task includes a concrete file path.
- Avoid deep imports across FSD slice boundaries; use `src/pages/driver-ride/index.ts` as the public API.
- Treat `spec.md` clarifications as authoritative over older plan/data-model wording.
