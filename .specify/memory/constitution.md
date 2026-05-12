<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- PRINCIPLE_1_NAME placeholder -> I. Drivers Are Independent Business Owners
- PRINCIPLE_2_NAME placeholder -> II. Concierge Reliability Over Gig-App Urgency
- PRINCIPLE_3_NAME placeholder -> III. Calm, Legible, Low-Touch Operation
- PRINCIPLE_4_NAME placeholder -> IV. Relationship Memory Creates the Business
- PRINCIPLE_5_NAME placeholder -> V. Tested, Observable, Incremental Engineering
Added sections:
- Driver App Scope and Product Constraints
- Delivery Workflow and Quality Gates
Removed sections:
- Placeholder SECTION_2_NAME
- Placeholder SECTION_3_NAME
Templates requiring updates:
- Updated: .specify/templates/plan-template.md
- Updated: .specify/templates/spec-template.md
- Updated: .specify/templates/tasks-template.md
- Reviewed: .specify/templates/checklist-template.md (no change required)
- Reviewed: .specify/templates/commands/*.md (not present)
Runtime guidance:
- Reviewed: README.md (no constitution references to update)
Follow-up TODOs:
- None
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
and rider communication. Thin, tested slices reduce risk while the product shape
is still evolving.

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
include a Constitution Check before research and after design. Tasks MUST include
automated tests for each user story and must keep every story independently
verifiable.

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

**Version**: 1.0.0 | **Ratified**: 2026-05-12 | **Last Amended**: 2026-05-12
