# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary driver workflow + technical approach from research.
State how this feature helps a HUM driver run a private driving business.]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]

**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]

**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]

**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]

**Project Type**: [e.g., library/cli/web-service/mobile-app/compiler/desktop-app or NEEDS CLARIFICATION]

**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]

**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]

**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Driver business ownership**: Explain how the feature reinforces the driver
  as an independent professional, not a gig worker.
- **Concierge reliability**: Identify the proactive preparation, automation, or
  one-tap action that reduces airport-pickup or service anxiety.
- **Calm, legible, low-touch operation**: Confirm clear hierarchy, readable type,
  large touch targets, plain language, and minimal driver attention.
- **Relationship memory**: State what client, ride, preference, note, or revenue
  context is created, updated, preserved, or intentionally out of scope.
- **Required testing and observability**: Define automated tests for every user
  story and the logs/events needed to debug core driver workflow failures.
- **Feature-Sliced Design**: List new or touched files under the correct FSD
  layer (`app`, `pages`, `widgets`, `features`, `entities`, `shared`). Confirm
  imports only flow **downward** across layers, route files in `src/app/` stay
  thin, and **public API** entrypoints (`index.ts`) are updated—no deep imports
  across slice boundaries. Do not add the deprecated `processes` layer.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
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
├── pages/               # FSD pages: screen slices (add when used)
├── widgets/             # FSD widgets: large composed blocks (optional)
├── features/            # FSD features: user interactions (optional)
├── entities/            # FSD entities: domain nouns (optional)
├── shared/
│   ├── ui/              # UI kit: app chrome + themed components
│   │   └── primitives/  # shadcn/RNR-generated components (components.json "ui")
│   ├── lib/             # cn(), theme tokens, navigation theme, color-scheme hooks
│   └── styles/          # design-tokens.css (imported from global.css)
└── assets/

supabase/ or backend/
├── migrations/
├── functions/
└── tests/

tests/
├── contract/
├── integration/
└── unit/
```

**Structure Decision**: [Describe where this feature’s files land in the tree
above; reference real paths and any temporary deviation documented in Complexity
Tracking]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
