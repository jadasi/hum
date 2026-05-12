# Implementation Plan: Driver sign-in and account access

**Branch**: `001-auth-flow` | **Date**: 2026-05-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-auth-flow/spec.md`

**Note**: This plan was produced by `/speckit-plan`. Phase 0 output: [research.md](./research.md). Phase 1 output: [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/](./contracts/).

## Summary

Ship the first vertical slice of the HUM driver app: **email/password sign-in and sign-up** backed by **Supabase Auth**, **Expo Router** route groups so signed-out users only see auth entry and signed-in users reach the existing tabbed starter shell, **Zustand** for a single client-side auth/session view model wired to Supabase’s session lifecycle, and **plain-language errors** plus **sign-out** for shared-device trust. This establishes each driver as the owner of a private session before any concierge, client, or ride data ships—matching the spec’s “account gate first” scope.

## Technical Context

**Language/Version**: TypeScript 5.9 / React 19 / React Native 0.83 (Expo SDK ~55)

**Primary Dependencies**: Expo Router (`expo-router`), `@supabase/supabase-js`, Zustand (to be added), NativeWind / React Navigation (existing), `@rn-primitives/portal` (existing)

**Storage**: Supabase Auth hosted user store + JWT refresh via Supabase client; local session persistence via **`expo-secure-store`** (custom `auth.storage` adapter to be added; not yet in `package.json`)

**Testing**: Not configured in repo today; add **`jest-expo` + `jest` + `@testing-library/react-native`** (per [Expo unit testing](https://docs.expo.dev/develop/unit-testing/)) with `npm run test`, plus targeted tests under `tests/` for auth flows and routing guards (see Constitution Check)

**Target Platform**: iOS, Android

**Project Type**: Mobile driver client — iOS and Android only (Expo Router + FSD under `src/`)

**Performance Goals**: Auth API calls bounded by normal mobile expectations (sub-second perceived response on warm network); no blocking UI beyond splash/font loading already in root layout

**Constraints**: No `service_role` or secrets in client env; only `EXPO_PUBLIC_*` keys in the app bundle; RLS-ready posture for future tables (auth-only feature touches `auth` schema via Supabase only)

**Scale/Scope**: Two auth screens (sign-in, sign-up), one session store, root + grouped layouts, sign-out entry point on main shell, minimal Supabase project config (email provider on)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Driver business ownership**: Authentication ties the device session to **one driver’s business identity** before any earnings, clients, or rides appear—reinforcing independent operation rather than anonymous gig dispatch.
- **Concierge reliability**: A **predictable entry path** (clear sign-in/sign-up, no dead ends on errors, resume after email confirmation) reduces pre-shift anxiety; full airport concierge behavior remains future work gated on this session.
- **Calm, legible, low-touch operation**: Reuse **ThemedView / ThemedText / spacing tokens** from `src/app/index.tsx` and `src/shared/ui/*`; large touch targets, short labels, non-technical error copy mapped from Supabase error codes.
- **Relationship memory**: **Out of scope** for data beyond Supabase `User` identity (`id`, `email`); no client/ride entities in this feature (see [data-model.md](./data-model.md)).
- **Required testing and observability**:
  - **P1 Sign-in**: unit/integration tests for successful sign-in → navigates to protected home; wrong password → user-visible message; double-submit guarded.
  - **P2 Sign-up**: tests for happy path + duplicate email path.
  - **P3 Sign-out**: test that session clears and protected routes reject.
  - **FR-004 routing**: test accessing a protected route while signed out redirects (or equivalent) to auth.
  - **Observability**: lightweight `console`-level or structured debug logging behind `__DEV__` for auth state transitions (`SIGNED_IN`, `SIGNED_OUT`, `TOKEN_REFRESHED`, `USER_UPDATED`)—no PII in logs.
- **Feature-Sliced Design** (new/touched areas—imports **downward** only):
  - **`src/app/`**: Root `_layout.tsx` gains providers only (Supabase client context if used, Zustand not required at root if using module store); **route groups** e.g. `src/app/(auth)/`, `src/app/(driver)/` (names illustrative—pick one scheme in implementation) with thin `*_layout.tsx` files that **compose** pages, not large inline UIs.
  - **`src/pages/`** (new slices): `pages/sign-in`, `pages/sign-up` with `ui/` segments exporting screen components; optional `model/` for purely presentational form state if not lifted to feature.
  - **`src/features/auth/`** (new): `api/` (signIn, signUp, signOut wrappers calling Supabase), `model/` (Zustand store + `onAuthStateChange` subscription wiring), optional thin `ui/` for shared auth chrome.
  - **`src/entities/session/`** (optional, new): thin types/selectors if session/user shape is reused; otherwise keep types in `features/auth/model` until a second consumer exists.
  - **`src/shared/`**: `shared/api/supabase-client.ts` (or `shared/lib/`) for `createClient` + storage adapter; **no business rules** here beyond client construction.
  - **Public APIs**: each new slice exposes `index.ts`; route files import from `@/pages/...` / `@/features/auth` public entrypoints only.
  - **No `processes` layer.**

## Project Structure

### Documentation (this feature)

```text
specs/001-auth-flow/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1
└── tasks.md             # Phase 2 (/speckit-tasks — not created here)
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
├── pages/               # FSD pages: sign-in / sign-up screen slices (new)
├── widgets/             # FSD widgets (optional; skip unless reuse demands)
├── features/            # FSD features: auth session + mutations (new)
├── entities/            # FSD entities: optional session/user slice (new if needed)
├── shared/
│   ├── ui/              # UI kit: reuse themed components
│   ├── lib/             # tokens, navigation theme
│   └── api/ or lib/     # Supabase client factory + storage adapter (new)
└── assets/

supabase/
├── migrations/          # Add only when app tables/RLS need changes; auth-only MVP may be empty

tests/
├── integration/         # Auth + routing (new)
└── unit/                # Store/helpers (new)
```

**Structure Decision**: Introduce **Expo Router groups** so `(auth)` contains `sign-in` and `sign-up` routes and `(driver)` (or `(app)`) contains the **existing tab layout** currently in root `_layout.tsx` + `index` / `explore`. Move the tab shell from the root `_layout.tsx` into the protected group’s `_layout.tsx`, keeping fonts/splash/theme at root. Place screen bodies in `src/pages/sign-in` and `src/pages/sign-up`; place `signInWithPassword`, `signUp`, `signOut`, and `onAuthStateChange` subscription in `src/features/auth`. Supabase JS client singleton lives in `src/shared/…` per public API rule.

## Post-Design Constitution Re-check

- All gates above remain satisfied; [research.md](./research.md) resolves storage and routing patterns without weakening driver ownership or legibility.
- Testing obligation is explicit; `tests/` layout to be created with jest-expo (see [quickstart.md](./quickstart.md)).
- No new relationship-memory data; identity only.

## Complexity Tracking

No constitution violations or FSD exceptions required for this feature.
