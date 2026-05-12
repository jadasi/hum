# Contract: Auth routing and session gates

## Session states (client)

| State | Meaning | Default landing |
|-------|---------|-----------------|
| `unknown` | Boot; session not yet read from Supabase | Splash / null UI (existing font gate may apply) |
| `signedOut` | No valid session | Sign-in screen (or last public auth screen) |
| `signedIn` | Valid session present | Protected tab shell (current `index` / `explore` home) |

## Route access matrix

| Route group / pattern | `signedOut` | `signedIn` |
|----------------------|-------------|------------|
| Sign-in | Allow | Redirect to protected home |
| Sign-up | Allow | Redirect to protected home |
| Protected tabs (`index`, `explore`, …) | Redirect to sign-in (preserve intended path in query/param when practical) | Allow |
| Sign-out action | N/A | Clears session → `signedOut` |

## Post-success navigation

- **Sign-in success**: Navigate to protected **home** (`/` or `(driver)` default).
- **Sign-up success**:
  - If `session` present: same as sign-in.
  - If email confirmation required and no session: remain on confirmation messaging; do not enter protected shell until `SIGNED_IN` fires.

## Deep linking (v1 minimum)

- If a deep link targets a protected path while `signedOut`, user completes auth then lands on **home** first; storing full return URL is **nice-to-have** if Expo Router params allow without complexity (document in tasks if deferred).

## Error presentation contract

- Never show raw Supabase JSON, stack traces, or tokens.
- Map to fixed user-facing categories: `network`, `invalid_credentials`, `validation`, `rate_limited`, `server`, `email_not_confirmed` (extend as needed).
