# Feature Specification: Driver sign-in and account access

**Feature Branch**: `001-auth-flow`

**Created**: 2026-05-12

**Status**: Draft

**Input**: User description: "create a authentication flow: handle routing, implement supabase auth for sign in / sign up, create the needed sign in up pages, treat existing screens/ui as the template starter codebase. this is the first feature we are adding to the app, add zustand for state management"

## Constitution Alignment *(mandatory)*

- **Driver business value**: Gives each driver a private, account-based entry to the app so only they can see their business data, messages, and ride context. Establishes identity as the foundation for future revenue, client history, and concierge workflows.
- **Concierge reliability**: A clear, calm sign-in path reduces pre-shift friction so drivers start a session confident they are in the right account before any rider-facing preparation.
- **Low-touch accessibility**: Sign-in and sign-up use the same legible layout patterns, plain language labels, large controls, and obvious error feedback as the existing starter screens; no dense legal or technical walls before the driver can proceed.
- **Relationship memory**: Out of scope for this feature beyond binding the session to the correct driver identity. No rider lists, notes, or revenue features are required to ship authentication.
- **FSD placement (implementation hint)**: Route composition and auth guards stay in the **app** layer (`src/app/` layouts and route groups). Dedicated **pages** slices hold sign-in and sign-up screens composed from **widgets** / **shared** UI that match current starter templates. Session derivation, sign-in/up actions, and navigation side effects live in a **features** slice (e.g. auth) with **entities** only if a stable user/session model is introduced; imports remain downward across layers.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign in with existing account (Priority: P1)

A returning driver opens the app and signs in with the credentials they already use for their HUM account so they land on the main driver experience without seeing marketing or empty shells meant for signed-out visitors.

**Why this priority**: Without sign-in, no other driver-specific capability can safely ship; this is the minimum gate for a real session.

**Independent Test**: From a cold app launch, complete sign-in only (no sign-up) and confirm the driver reaches the primary in-app destination and remains signed in after a short background/foreground cycle.

**Acceptance Scenarios**:

1. **Given** the driver has a valid account and is signed out, **When** they submit correct credentials on the sign-in page, **Then** they are taken to the main driver area and see no sign-in prompt until they sign out.
2. **Given** the driver enters wrong credentials, **When** they submit the form, **Then** they see a clear, non-technical error message and can correct and retry without losing unrelated entered fields where safe.
3. **Given** the driver is already signed in, **When** they open a deep link or restart the app within a normal session lifetime, **Then** they are not forced through sign-in again unless the session has ended or they explicitly signed out.

---

### User Story 2 - Create a new driver account (Priority: P2)

A new driver who does not yet have credentials completes sign-up so they can obtain an account and immediately continue into the same main experience as a returning driver (subject to any account verification rules the product applies).

**Why this priority**: Growth depends on self-serve account creation; it can ship after a minimal sign-in path if needed but remains essential for first-run adoption.

**Independent Test**: Using only sign-up (no prior account), create credentials, complete any mandatory verification step defined by the product, and reach the same primary in-app destination as Story 1.

**Acceptance Scenarios**:

1. **Given** the driver is on the sign-up page, **When** they provide required fields and submit, **Then** the system creates their account and either signs them in automatically or tells them exactly what to do next (e.g. confirm email) in plain language.
2. **Given** the driver tries to register with an email that already belongs to an account, **When** they submit, **Then** they see guidance that steers them to sign-in or recovery instead of a silent failure.
3. **Given** sign-up succeeds, **When** the driver reaches the main area, **Then** their session behaves the same as Story 1 for navigation and persistence rules.

---

### User Story 3 - Sign out and session clarity (Priority: P3)

A driver who shares a device or ends a shift signs out so the next person opening the app does not see their data, and the app returns to a safe signed-out entry state.

**Why this priority**: Important for trust and shared devices but secondary to getting sign-in/up working.

**Independent Test**: From a signed-in session, sign out once and confirm protected content is unreachable until credentials are entered again.

**Acceptance Scenarios**:

1. **Given** the driver is signed in, **When** they choose sign out from wherever the product surfaces it in this release, **Then** they are returned to the signed-out entry experience and cannot view signed-in-only content without signing in again.
2. **Given** the driver signed out, **When** they use OS back navigation from the sign-in page, **Then** they are not placed into a stale signed-in screen that still shows private data.

---

### Edge Cases

- Network unavailable or timeouts during sign-in, sign-up, or sign-out: user sees a recoverable message and can retry without corrupting form state.
- Partial account setup (e.g. email confirmation required): user always knows whether they are finished, blocked on a verification step, or can continue inside the app.
- Session expired while using the app: user is guided back through sign-in without silent data loss beyond what requires authentication.
- Rapid double-submit on forms: duplicate accounts or duplicate requests do not produce confusing duplicate success states.
- Routing: direct navigation to a protected URL while signed out sends the user through sign-in and, after success, returns them toward their intended destination when practical.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product MUST offer a dedicated sign-in experience where a driver can authenticate with credentials that the project's account system accepts for existing users.
- **FR-002**: The product MUST offer a dedicated sign-up experience where a new driver can create an account with the fields required by the account system, with inline validation for obvious input mistakes.
- **FR-003**: The product MUST separate signed-out entry (sign-in / sign-up paths) from signed-in driver content so that private information is not shown before authentication succeeds.
- **FR-004**: The product MUST route users based on authentication state: signed-out users who attempt to reach signed-in-only destinations are redirected or blocked in a predictable way; signed-in users are not looped back through sign-in without cause.
- **FR-005**: After successful authentication, the driver MUST land in the primary in-app experience defined for this release (same target for sign-in and sign-up success unless a verification step explicitly defers it).
- **FR-006**: The product MUST surface clear, plain-language feedback for authentication failures (wrong password, unknown email, validation errors, rate limits, and server errors) without exposing sensitive internals.
- **FR-007**: The product MUST maintain a single coherent notion of “signed in” vs “signed out” across screens opened during a session, including after brief backgrounding, so navigation and visible content stay consistent.
- **FR-008**: The product MUST provide sign-out in this release if any signed-in content is reachable (minimum viable trust on shared devices).
- **FR-009**: New authentication screens MUST reuse the existing starter screen patterns (layout rhythm, typography, components, spacing) so the first feature visually matches the template codebase.
- **FR-010**: Functional flows in this specification MUST be verifiable in a repeatable way for their risk level (happy path, failure messaging, and routing guard behavior), including through automated checks where the project requires them.

### Key Entities *(include if feature involves data)*

- **Driver account**: The record the account system uses to recognize a unique driver (e.g. primary email or equivalent identifier, authentication factors managed by the account system).
- **Session**: The driver’s authenticated state for the app, including what the product treats as “active until sign-out or expiry” for routing and content access.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a stable network, at least 90% of first-attempt sign-ins in usability testing complete in under 90 seconds from landing on the sign-in page to reaching the primary in-app destination (excluding deliberate user hesitation).
- **SC-002**: At least 90% of first-time sign-up attempts that pass validation complete account creation and reach either the primary in-app destination or a single clearly explained verification step without support intervention.
- **SC-003**: After authentication, zero critical signed-in-only tasks are reachable from a signed-out state in standard navigation tests (no unintended bypass).
- **SC-004**: In moderated review, at least 8 of 10 drivers aged 45+ describe the sign-in and sign-up wording as “easy to understand” without requesting help from a facilitator.
- **SC-005**: Repeatable automated verification covers the primary sign-in path, primary sign-up path, and routing guard behavior for at least one protected destination, and runs on every change set according to the project’s standard quality rules.

## Assumptions

- Primary authentication mechanism for v1 is email and password (plus any mandatory verification flows the account provider enforces by default); social login and enterprise SSO are out of scope unless added later.
- Technical integration with the hosted account backend and client session store follows the repository’s agreed stack for this effort; functional requirements above describe behavior, not vendor APIs.
- “Existing screens/ui as template” means visual and structural consistency with current starter routes and shared components, not preserving placeholder business copy where it conflicts with authentication.
- Password reset / “forgot password” may be provided as a simple link or entry point if the account system supports it in the same release; if omitted, the sign-in screen still directs users to support or recovery in a non-dead-end way.
- The app is the HUM driver client; rider-facing apps are out of scope.
