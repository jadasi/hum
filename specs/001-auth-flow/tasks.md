---

description: "Task list for driver sign-in and account access (001-auth-flow)"

---

# Tasks: Driver sign-in and account access

**Input**: Design documents from `/specs/001-auth-flow/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: REQUIRED by the HUM Driver App Constitution and [spec.md](./spec.md) (FR-010 / SC-005). Each user story includes automated tests **before** implementation tasks for that story.

**Organization**: Phases follow user story priority (P1 → P2 → P3) after shared setup and foundation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependency on incomplete sibling tasks)
- **[USn]**: User story label from [spec.md](./spec.md)
- Paths use repo root; FSD layers under `src/` per [plan.md](./plan.md)

---

## Phase 1: Setup (shared infrastructure)

**Purpose**: Dependencies and test runner so constitution-mandated tests can run in CI.

- [x] T001 Add `zustand` and `expo-secure-store` with `npx expo install zustand expo-secure-store` and verify entries in `package.json`
- [x] T002 Add devDependencies `jest-expo`, `jest`, `@types/jest`, `@testing-library/react-native` and verify entries in `package.json`
- [x] T003 Add `npm run test` script plus Jest config (`jest.config.js` or `package.json` `jest` field) with `jest-expo` preset at repo root
- [x] T004 [P] Add Jest-related TypeScript support in `tsconfig.json` at repo root (e.g. `types` including `jest`) if editor/`tsc` requires it for test files — **skipped**: ambient `@types/jest` sufficient with Jest 29; `tsc --noEmit` passes without narrowing `compilerOptions.types`

---

## Phase 2: Foundational (blocking prerequisites)

**Purpose**: Supabase client, SecureStore session persistence, auth feature module, and Expo Router groups **before** any user story UI.

**⚠️ CRITICAL**: No user story phase work until this phase completes.

- [x] T005 Create Supabase JS client factory with `expo-secure-store` `auth.storage` adapter (no secrets in code; read `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) in `src/shared/api/supabase-client.ts` with public export via `src/shared/api/index.ts` if the folder uses a barrel
- [x] T006 [P] Create Zustand auth session store (`unknown` / `signedOut` / `signedIn`), `getSession` hydration, and `supabase.auth.onAuthStateChange` subscription in `src/features/auth/model/auth-store.ts` exporting through `src/features/auth/model/index.ts`
- [x] T007 [P] Create email/password auth wrappers (`signInWithPassword`, `signUp`, `signOut`, `getSession`) delegating to Supabase in `src/features/auth/api/auth-api.ts` exporting through `src/features/auth/api/index.ts`
- [x] T008 Create FSD public entry `src/features/auth/index.ts` re-exporting only the allowed surface for `app/` and `pages/` consumers
- [x] T009 Create stack layout for unauthenticated routes in `src/app/(auth)/_layout.tsx` (thin composition only)
- [x] T010 Move `src/app/index.tsx` to `src/app/(driver)/index.tsx` and `src/app/explore.tsx` to `src/app/(driver)/explore.tsx` preserving `AppTabs` trigger names `index` and `explore`
- [x] T011 Create `src/app/(driver)/_layout.tsx` hosting `ThemeProvider`, `AnimatedSplashOverlay`, `AppTabs`, and `PortalHost` moved from current `src/app/_layout.tsx` per [plan.md](./plan.md) — **note**: `ThemeProvider` + `PortalHost` remain in root `src/app/_layout.tsx` so `(auth)` screens inherit navigation theme and portals; `(driver)/_layout.tsx` hosts `AnimatedSplashOverlay` + `AppTabs` only
- [x] T012 Refactor root `src/app/_layout.tsx` to keep font loading + splash gating, wrap with any minimal providers, and implement auth-based routing between `(auth)` and `(driver)` using store/session from `src/features/auth` per [contracts/auth-routing.md](./contracts/auth-routing.md) — **note**: `src/app/index.tsx` is the session-based redirect entry; `(auth)/_layout` redirects signed-in users to `/(driver)`

**Checkpoint**: Cold launch → signed-out users can reach `(auth)` routes; signed-in users reach `(driver)` tabs; SecureStore persists session across restart.

---

## Phase 3: User Story 1 — Sign in with existing account (Priority: P1) 🎯 MVP

**Goal**: Email/password sign-in, wrong-password messaging, double-submit guard, session survives short backgrounding, signed-in users not trapped in auth stack.

**Independent Test**: From signed-out cold start, sign in only (no sign-up), reach `(driver)` home, background/foreground once, still signed in; wrong password shows plain-language error.

### Tests for User Story 1 (REQUIRED) ⚠️

> Write first; they should fail until implementation lands.

- [x] T013 [P] [US1] Add unit tests for mapping Supabase auth errors to user-safe messages in `tests/unit/map-auth-error.test.ts`
- [x] T014 [P] [US1] Add unit tests for auth Zustand store transitions with mocked Supabase client in `tests/unit/auth-store.test.ts`
- [x] T015 [US1] Add routing/redirect test for signed-out access to driver area per [contracts/auth-routing.md](./contracts/auth-routing.md) in `tests/integration/auth-routing.test.tsx` (mock `expo-router` / navigation as needed) — **implemented** as contract tests on `evaluateDriverGuard` / `evaluateRootIndexRedirect` in `tests/integration/auth-routing.test.ts`

### Implementation for User Story 1

- [x] T016 [US1] Implement sign-in screen UI (email, password, submit, a11y labels, `ThemedView` / `ThemedText` / spacing from `src/shared/lib/ui-tokens`) in `src/pages/sign-in/ui/sign-in-screen.tsx`
- [x] T017 [US1] Add `src/pages/sign-in/index.ts` public API for the sign-in page slice
- [x] T018 [US1] Add thin route `src/app/(auth)/sign-in.tsx` that composes `src/pages/sign-in` and wires submit to `src/features/auth/api/auth-api.ts`
- [x] T019 [US1] Enforce `(driver)` layout guard: redirect signed-out users to `/(auth)/sign-in` in `src/app/(driver)/_layout.tsx` (or a colocated `src/app/(driver)/auth-gate.tsx` imported only from that layout)
- [x] T020 [US1] Add loading state and double-submit protection plus inline error display on `src/pages/sign-in/ui/sign-in-screen.tsx`
- [x] T021 [US1] Add `__DEV__` logging for auth events (`SIGNED_IN`, `SIGNED_OUT`, `TOKEN_REFRESHED`, `USER_UPDATED`) without PII in `src/features/auth/model/auth-store.ts`

**Checkpoint**: User Story 1 fully demonstrable without sign-up or sign-out UI beyond minimal needs.

---

## Phase 4: User Story 2 — Create a new driver account (Priority: P2)

**Goal**: Sign-up screen, duplicate-email guidance, email-confirmation “check your email” path when session is null.

**Independent Test**: New email signs up → lands in `(driver)` **or** sees single clear confirmation instruction; duplicate email steers to sign-in.

### Tests for User Story 2 (REQUIRED) ⚠️

- [x] T022 [P] [US2] Add unit tests for sign-up API wrapper outcomes (success session, success without session / confirm email, duplicate user) in `tests/unit/sign-up-flow.test.ts`
- [x] T023 [US2] Add UI logic test for “confirm email” vs “signed in” branching on `src/pages/sign-up/ui/sign-up-screen.tsx` (or thin hook under `src/pages/sign-up/model/`) in `tests/unit/sign-up-screen-logic.test.ts`

### Implementation for User Story 2

- [x] T024 [P] [US2] Implement sign-up screen UI (email, password, confirm password, validation) in `src/pages/sign-up/ui/sign-up-screen.tsx` matching starter visual patterns
- [x] T025 [US2] Add `src/pages/sign-up/index.ts` public API for the sign-up page slice
- [x] T026 [US2] Add thin route `src/app/(auth)/sign-up.tsx` composing `src/pages/sign-up` and wiring submit to `src/features/auth/api/auth-api.ts`
- [x] T027 [US2] Add navigation links between `src/pages/sign-in/ui/sign-in-screen.tsx` and `src/pages/sign-up/ui/sign-up-screen.tsx` (plain-language “Create account” / “Sign in instead”)
- [x] T028 [US2] Handle duplicate registration and confirmation-pending states with copy from [spec.md](./spec.md) acceptance scenarios in `src/pages/sign-up/ui/sign-up-screen.tsx` using mapped errors from `src/features/auth/api/auth-api.ts`

**Checkpoint**: User Stories 1 and 2 independently testable; sign-up does not break sign-in.

---

## Phase 5: User Story 3 — Sign out and session clarity (Priority: P3)

**Goal**: Explicit sign-out returns to signed-out entry; back navigation cannot reveal stale signed-in UI.

**Independent Test**: While signed in, sign out → `(auth)`; attempting to open driver content prompts auth; no private data visible.

### Tests for User Story 3 (REQUIRED) ⚠️

- [x] T029 [P] [US3] Add unit test that `signOut` clears Supabase session and Zustand store ends in `signedOut` in `tests/unit/sign-out.test.ts`

### Implementation for User Story 3

- [x] T030 [US3] Add visible **Sign out** action on the main shell (e.g. header area in `src/app/(driver)/index.tsx` or toolbar pattern) calling `signOut` from `src/features/auth/api/auth-api.ts` and navigating to `/(auth)/sign-in` per [contracts/auth-routing.md](./contracts/auth-routing.md)

**Checkpoint**: All three user stories pass their independent tests.

---

## Phase 6: Polish & cross-cutting concerns

**Purpose**: Edge cases from [spec.md](./spec.md), accessibility, runbook.

- [x] T031 [P] Add network/timeout and recoverable failure messaging on `src/pages/sign-in/ui/sign-in-screen.tsx` and `src/pages/sign-up/ui/sign-up-screen.tsx` (no form state corruption on retry)
- [x] T032 [P] Add `__DEV__` navigation-state logging hook (optional) in `src/app/_layout.tsx` or `src/features/auth/model/auth-store.ts` only if it aids debugging route flicker—no PII
- [x] T033 Run manual verification steps in `specs/001-auth-flow/quickstart.md` on **iOS or Android** simulator or device
- [x] T034 Accessibility review: large tap targets, readable errors, screen reader labels on `src/pages/sign-in/ui/sign-in-screen.tsx`, `src/pages/sign-up/ui/sign-up-screen.tsx`, and sign-out control from T030

---

## Dependencies & execution order

### Phase dependencies

- **Phase 1** → no prerequisites.
- **Phase 2** → depends on Phase 1 (tests and imports need deps and Jest).
- **Phase 3–5** → each depends on **Phase 2 complete** (client, store, routes).
- **Phase 6** → depends on user stories you intend to ship (minimum: US1 for internal demos; all three for feature-complete).

### User story dependencies

- **US1 (P1)**: First vertical slice; no dependency on US2/US3.
- **US2 (P2)**: Uses same foundation and `(auth)` stack as US1; must not break US1 flows.
- **US3 (P3)**: Uses `signOut` from foundation/API; adds shell affordance only.

### Within each user story

- Tests (T013–T015, etc.) written and **failing** before implementation tasks in that phase.
- Routes compose `pages/` only; **no deep imports** across FSD slices (use `@/features/auth`, `@/pages/sign-in`, etc.).

### Parallel opportunities

| Phase | Parallel batches (example) |
|-------|---------------------------|
| 1 | T004 after T001–T003 started: T004 can proceed alongside T003 if files differ. |
| 2 | After T005: **T006** and **T007** in parallel; then **T008**; **T009** parallel with **T005–T007** only if route files do not import unfinished store—safer **sequential: T005→T006,T007→T008→T009→T010→T011→T012**. |
| 3 | **T013** and **T014** in parallel; **T015** after mocks for router stable. |
| 4 | **T022** parallel with follow-up; **T024** after T023 optional. |
| 5 | **T029** alone or parallel with polish doc tasks. |
| 6 | **T031** and **T032** in parallel. |

---

## Parallel example: User Story 1

```bash
# After Phase 2 complete, start US1 tests together:
# - tests/unit/map-auth-error.test.ts  (T013)
# - tests/unit/auth-store.test.ts      (T014)
# Then routing integration test (T015), then T016–T021 in order.
```

---

## Implementation strategy

### MVP first (User Story 1 only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. **Stop**: run `npm run test`, manual sign-in on device/simulator, demo MVP.

### Incremental delivery

1. Setup + Foundation → routing + store stable.
2. Add US1 → validate independently.
3. Add US2 → validate independently.
4. Add US3 + Phase 6 polish → feature-complete for spec P1–P3.

### Parallel team strategy

- Developer A: Phase 2 `shared/api` + `features/auth/api`
- Developer B: Phase 2 Expo route moves `(driver)` / `(auth)` + root gate (coordinate on **T012**)
- After Phase 2: split US1 UI (`pages/sign-in`) vs US1 tests

---

## Summary

| Metric | Value |
|--------|-------|
| **Total tasks** | 34 |
| **Phase 1** | 4 |
| **Phase 2** | 8 |
| **US1** | 9 (3 tests + 6 impl) |
| **US2** | 7 (2 tests + 5 impl) |
| **US3** | 2 (1 test + 1 impl) |
| **Phase 6** | 4 |
| **Suggested MVP scope** | Through **T021** (end of Phase 3) |
| **Format** | All tasks use `- [ ] Tnnn …` with file paths; story phases include `[USn]` |

---

## Notes

- If `src/shared/api/` lacks a barrel, add `index.ts` only where it matches existing repo conventions; otherwise export from the single file and import from `@/shared/api/supabase-client` explicitly—**do not** violate FSD public API rules on new slices.
- Keep `NativeTabs` trigger file names aligned with moved routes under `src/app/(driver)/`.
- Revisit `specs/001-auth-flow/quickstart.md` after env var names stabilize.
- **Typed routes**: `.expo/types/router.d.ts` is committed (see `.gitignore` exceptions). After adding or renaming routes, run `npx expo start` briefly so Metro regenerates that file, then commit the update.
- **T033**: Automated checks (`npm test`, `npx tsc --noEmit`, `npm run lint`) pass in CI; on-device steps in `quickstart.md` remain operator-run.
