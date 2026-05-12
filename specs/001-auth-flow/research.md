# Phase 0 — Research: Driver sign-in and account access

Consolidated decisions for `001-auth-flow`. No unresolved `NEEDS CLARIFICATION` items remained after technical context review.

## 1. Expo Router structure (signed-in vs signed-out)

**Decision**: Use **layout route groups** at `src/app/` level: a **public** group exposes sign-in and sign-up stacks (or stack screens); a **protected** group wraps the existing tab navigator. Root `_layout.tsx` applies global providers (fonts, theme, splash) and a **single auth-gate** component that switches the default child stack based on Zustand/Supabase session, **or** uses `Redirect` components inside protected layouts (preferred: **redirect in `(driver)/_layout.tsx`** so deep links can be handled consistently).

**Rationale**: Matches FR-003/FR-004; keeps route files thin per constitution; aligns with Expo Router docs on nested layouts and authentication flows.

**Alternatives considered**:

- **Monolithic root stack only**: Rejected — harder to isolate auth chrome from main tabs and bloats root layout.
- **External navigation container duplicate of Expo Router**: Rejected — fights the framework.

## 2. Supabase client on React Native (Expo)

**Decision**: Use `createClient` from `@supabase/supabase-js` with **`auth.storage` implemented via `expo-secure-store`** on iOS and Android (install `expo-secure-store`). **Mobile-only** — SecureStore is the sole session persistence path.

**Rationale**: Persists refresh tokens in the device keychain/keystore; matches Supabase guidance for Expo/React Native mobile clients.

**Alternatives considered**:

- **In-memory only**: Rejected — breaks “remain signed in after brief background” (spec Story 1).
- **AsyncStorage only**: Rejected for tokens — weaker than secure storage on shared devices; constitution emphasizes trust on sign-out and session clarity.

## 3. Zustand vs React Context for auth

**Decision**: **Zustand** store in `src/features/auth/model` holding `{ status: 'unknown' | 'signedOut' | 'signedIn', session: Session | null, user: User | null }` (Supabase types), updated from **`supabase.auth.onAuthStateChange`** and from explicit sign-in/up/out calls.

**Rationale**: Explicit product request; small global surface; easy to test store transitions in isolation; avoids prop-drilling through tabs.

**Alternatives considered**:

- **Context + useReducer only**: Rejected — user asked for Zustand; store tests are simpler.
- **Raw Supabase calls in every screen**: Rejected — violates FR-007 single coherent session notion.

## 4. Email confirmation and errors

**Decision**: Assume **Supabase project “Confirm email”** may be enabled. UI must handle `session === null` after sign-up with **“check your email”** messaging when `data.user && !data.session` on sign-up response. Map common Supabase auth errors to **plain-language** strings (FR-006).

**Rationale**: Matches spec assumptions and edge cases for partial setup.

**Alternatives considered**:

- **Disable email confirmation in all envs**: Rejected as a product default — less realistic for production Supabase projects; implementation can still work with confirm off.

## 5. Test stack (greenfield in repo)

**Decision**: Add **jest-expo** preset, **Jest**, and **React Native Testing Library**; first tests target `features/auth` store + a protected-route redirect behavior (mock Supabase module).

**Rationale**: Constitution requires automated tests per user story; Expo documents this stack.

**Alternatives considered**:

- **Maestro/E2E only**: Deferred — higher setup cost; unit/integration first satisfies SC-005 baseline.
- **No tests**: Blocked — constitution gate.
