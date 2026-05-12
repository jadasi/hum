# Data model: Driver sign-in and account access

Conceptual model for this feature. Authoritative user credentials live in **Supabase Auth** (`auth.users`); the app does not introduce driver business tables in this slice.

## Entities

### 1. Driver account (logical)

| Field / aspect | Source | Notes |
|----------------|--------|--------|
| Primary identifier | `user.id` (UUID) | Supabase `User.id` |
| Primary email | `user.email` | May be `null` for some providers; v1 assumes email/password so non-null after confirm |
| Email verified | `user.email_confirmed_at` / `user.confirmed_at` (per SDK shape) | Drives “check your email” vs auto session |
| Created at | `user.created_at` | Optional display / support |

**Relationships**: None in-app beyond 1:1 with **Session** while signed in.

**Validation (client)**:

- Email: non-empty, basic format check before submit.
- Password: minimum length aligned with Supabase project policy (document in UI copy if policy is strict); confirm field on sign-up must match password.

### 2. Session (logical)

| Field / aspect | Source | Notes |
|----------------|--------|--------|
| Access token | `session.access_token` | Never log verbatim |
| Refresh token | `session.refresh_token` | Persisted only via storage adapter |
| Expires at | `session.expires_at` | Used for refresh / UX edge cases |

**State transitions** (app-level, mirrors Supabase + router):

1. `unknown` — app boot before first `getSession` / first auth event.
2. `signedOut` — no valid session; user sees `(auth)` routes.
3. `signedIn` — valid session; user inside `(driver)` (protected) tree.

**Events**: `SIGNED_IN`, `SIGNED_OUT`, `TOKEN_REFRESHED`, `USER_UPDATED`, `PASSWORD_RECOVERY` (last optional in v1).

### 3. Zustand auth view model (client-only)

Not a server entity; **projection** of Supabase auth for UI and routing.

- **Slices**: `status`, `session`, `user`, optional `lastError` (sanitized string code or user message).
- **Initialization**: Hydrate from `supabase.auth.getSession()` once at startup, then subscribe to `onAuthStateChange`.

## Out of scope (data)

- Rider, ride, client, earnings, notes, flights — **not** created or read in this feature.
- Custom `profiles` table — **optional follow-up** if product needs driver fields beyond auth user; not required for FR-001–FR-008.
