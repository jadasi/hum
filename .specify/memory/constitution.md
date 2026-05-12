<!--
Sync Impact Report
Version change: 1.0.0 → 1.1.0
Modified principles:
- (titles unchanged I–V) — new VI added
Added sections:
- VI. Feature-Sliced Design (FSD) Application Structure (Core Principles)
Removed sections:
- None
Templates requiring updates:
- Updated: .specify/templates/plan-template.md (Constitution Check + project tree)
- Updated: .specify/templates/spec-template.md (Constitution Alignment: FSD)
- Updated: .specify/templates/tasks-template.md (path conventions + FSD task guidance)
- Reviewed: .specify/templates/checklist-template.md (no change required)
- Reviewed: .specify/templates/constitution-template.md (generic template; project-specific FSD lives here)
Runtime guidance:
- Reviewed: README.md (no mandatory update)
Follow-up TODOs:
- Add FSD `pages/` / `features/` / `entities/` slices as product screens solidify; starter routes in `src/app/` may be replaced wholesale
-->

# HUM Driver App Constitution

## Core Principles

### I. Drivers Are Independent Business Owners

The driver app MUST treat HUM drivers as independent professionals running private
driving businesses, not as gig workers waiting for dispatch. Product language,
information hierarchy, onboarding, and feature defaults MUST reinforce ownership,
client development, pricing judgment, service quality, and business progress.
Features that create platform-style pressure, arbitrary gamification, or driver
dependence on opaque marketplace behavior require explicit constitution review.

Rationale: HUM's core transformation is helping a driver become the operator of
their own relationship-based business.

### II. Concierge Reliability Over Gig-App Urgency

Every driver-facing workflow MUST help the driver deliver a calm, prepared,
concierge experience. The airport pickup is the first proof point: flight status,
delay awareness, arrival details, pickup instructions, car identity, and rider
communication MUST be surfaced before the driver has to improvise. Features MUST
prefer proactive preparation and one-tap execution over reactive alerts,
manual composition, or frantic in-the-moment decision making.

Rationale: HUM wins when the rider feels expected, guided, and relieved, and
when a new driver can deliver that experience without Kevin-level prior knowledge.

### III. Calm, Legible, Low-Touch Operation

The app MUST be immediately legible for middle-aged and older professional
drivers with standard consumer-device abilities. Driver tasks MUST use clear
visual hierarchy, plain language, large touch targets, readable type, and minimal
steps. Designs MUST meet standard mobile accessibility expectations and MUST NOT
depend on clever gestures, dense screens, hidden actions, or extended attention
while a driver is preparing, parked, or between rides.

Rationale: Drivers earn by driving and building relationships, not by managing
software. The best interaction is often the one the driver barely has to perform.

### IV. Relationship Memory Creates the Business

Features involving riders, rides, messages, pricing, or notes MUST strengthen
the driver's ability to remember, serve, and grow client relationships. Client
history, preferences, acquisition source, frequency, revenue, and follow-up
intent MUST be modeled as durable product concepts when relevant. Handoffs to
trusted drivers are part of the long-term relationship model, but posse handoff
work is intentionally deferred until that feature is planned and this
constitution is amended.

Rationale: HUM's durable advantage is the driver's trusted client base and the
continuity of care around that client, not anonymous ride matching.

### V. Tested, Observable, Incremental Engineering

All Specify-generated implementation tasks MUST include tests. Plans MUST define
the smallest independently valuable driver workflow, the required test layer, and
the observable events or logs needed to diagnose failures in core flows. Shared
schemas, backend contracts, flight status integration, messaging, pricing, and
payment-adjacent behavior MUST have automated coverage appropriate to their risk.
Implementation MUST remain incremental: each user story must be independently
testable and demonstrable before the next story depends on it.

Rationale: The app will coordinate mobile UI, backend state, third-party data,
and rider communication. Thin, tested vertical increments reduce risk while the
product shape is still evolving.

### VI. Feature-Sliced Design (FSD) Application Structure

The HUM driver client code under `src/` MUST follow [Feature-Sliced
Design](https://feature-sliced.design/docs/reference/layers) as the architectural
methodology. FSD organizes code by **layers** (dependency rank), **slices**
(business meaning within a layer), and **segments** (technical role within a
slice). Official reference: [layers](https://feature-sliced.design/docs/reference/layers),
[slices and segments](https://feature-sliced.design/docs/reference/slices-segments),
[public API](https://feature-sliced.design/docs/reference/public-api).

**FSD root.** The directory `src/` is the FSD root. Path alias `@/` maps to
`src/` (see `tsconfig.json`). New feature code MUST be placed in the correct
layer; legacy top-level folders outside FSD MUST migrate into `shared/` or
FSD layers when touched materially, unless Complexity Tracking justifies a
deferral.

**Layers (top → bottom: highest responsibility → lowest; import only downward).**
Use lowercase folder names. A module in a slice MUST NOT import another slice on
the same layer, except where this constitution explicitly allows.

1. **`app`** — Application-wide composition: global providers, router setup,
   entrypoints, app-wide styles, global stores. In this Expo Router codebase,
   `src/app/` is the framework’s route tree and root layouts; it fulfills the FSD
   **app** layer. Route files MUST stay thin: wire segments (navigation, params)
   and compose UI from **pages** / **widgets** / **features**, not large bespoke
   screens inline.
2. **`processes`** — **Deprecated** in FSD. MUST NOT be added. Use **features**
   and **app** instead.
3. **`pages`** — Full screens or activities: one slice per page (group only
   closely related screens). Typical segments: `ui`, `api` for page data
   loading/mutations, minimal local state in UI when no shared model is needed.
4. **`widgets`** — Large, reusable UI blocks composing features/entities (e.g.
   dashboard panels). Use when reused across pages or when a page has multiple
   large independent blocks. If a block is not reused and dominates one page,
   keep it in that **page** slice instead.
5. **`features`** — User interactions the product cares about (often reused),
   wired to entities (e.g. “submit airport pickup”, “edit client note”). Typical
   segments: `ui`, `api`, `model`, `config` for feature flags.
6. **`entities`** — Business nouns (Driver, Ride, Client, FlightLeg, etc.).
   Typical segments: `ui` (entity appearance), `model` (schemas, stores, domain
   logic), `api` (entity-specific requests). Slices on this layer MUST remain
   isolated from each other.
7. **`shared`** — Foundation: design system primitives, hooks with no business
   meaning, generic utilities, API client shell, env/config, i18n helpers.
   MUST NOT contain business rules or product workflows.

**`app` and `shared` are layer–slice exceptions.** They have **no business
slices** inside them—only **segments** (e.g. `shared/ui`, `shared/lib`,
`shared/api`, `app/styles`). Files inside each of these two layers MAY import
across segments within the same layer per FSD.

**Segments.** Prefer standard segment names: `ui`, `api`, `model`, `lib`,
`config`. Custom segments on **app**/**shared** MUST name a **purpose**, not a
file type: names like `components`, `hooks`, or `types` as segment folders are
FORBIDDEN.

**Public API rule.** Every slice (and every **app** / **shared** segment area
that acts as a publishable unit) MUST expose a deliberate public surface
(typically `index.ts`). Code outside that unit MUST import only from its public
API, not deep internal paths. Wildcard barrel re-exports (`export * from ...`)
that obscure the interface or harm tree-shaking are FORBIDDEN on slice public
APIs. For `shared/ui` and `shared/lib`, prefer **one publishable folder per
component/library** (each with its own `index.ts`) so consumers import
`@/shared/ui/button` rather than pulling unrelated modules.

**Import style to avoid cycles.** Inside the same slice, use **relative** imports
with full paths. Between slices or layers, use **absolute** imports (`@/...`).

**Entity cross-references.** When one entity’s model must reference another and
lifting logic to **features** / **pages** is wrong, use the FSD **`@x` public API
notation** (e.g. `entities/foo/@x/bar.ts` consumed only by `entities/bar/`).
Keep cross-imports rare; default to composing entities from higher layers.

**Optional layers.** `widgets` / `features` / `entities` folders MAY be omitted
until needed; do not invent extra top-level FSD layers beyond the standard set.

Rationale: FSD keeps dependency direction predictable, reduces accidental coupling
between business areas, and scales with the driver app’s growing domain surface.

## Driver App Scope and Product Constraints

This constitution governs the HUM driver app slice and its supporting backend
services, likely including Supabase. It does not govern the rider app, admin
tools, or broader HUM marketplace except where those systems directly affect the
driver experience.

Airport pickup is the current signature workflow, but implementation decisions
MUST be framed under the broader standard of concierge reliability. Pricing tools
MUST support driver judgment and transparency today, while allowing future HUM
rate-card or business-rule constraints without requiring a constitutional change.

The product MUST encode top-driver practice into defaults: agenda visibility,
flight awareness, prefilled communication, one-tap statuses, client flagging,
earnings visibility, and contextual coaching. No special compliance or data
retention regime is defined at this time; future rules for client notes, contact
data, flight data, ride history, or earnings MUST be added by amendment when
needed.

## Delivery Workflow and Quality Gates

Feature specifications MUST state how the feature supports the driver's business,
concierge reliability, low-touch operation, and relationship memory. Plans MUST
include a Constitution Check before research and after design. Plans MUST state
which FSD layers and slices new files belong in and confirm import directions
respect the layer rule. Tasks MUST include automated tests for each user story
and must keep every story independently verifiable.

Accessibility review is required for driver-facing UI. The review MUST verify
plain language, readable type, clear hierarchy, large touch targets, and a path
that can be completed without fine motor precision or unnecessary screen time.

Engineering practice MUST stay slim and standard: TypeScript where applicable,
linting, focused automated tests, clear backend contracts, explicit error states,
and enough logging or event capture to debug failed driver workflows. Additional
abstractions, frameworks, or compliance processes require justification in the
plan's complexity tracking.

## Governance

This constitution supersedes conflicting guidance for the HUM driver app slice.
Every new specification, plan, and task list MUST pass the constitution checks in
the Spec Kit templates before implementation starts.

Amendments require a written rationale, an impact summary, and updates to any
affected templates or runtime guidance. Versioning follows semantic versioning:
MAJOR for removed or redefined principles, MINOR for new principles or material
new obligations, and PATCH for clarifications that do not change obligations.

Constitution compliance MUST be reviewed during planning and before completion
of any feature. Known violations MUST be documented in Complexity Tracking with
the simpler alternative that was rejected.

**Version**: 1.1.0 | **Ratified**: 2026-05-12 | **Last Amended**: 2026-05-12
