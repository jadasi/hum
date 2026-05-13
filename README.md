# HUM — driver fulfillment slice

This repository is the **HUM driver mobile client**: an [Expo](https://expo.dev) app focused on **driver fulfillment** — the workflows that let independent drivers run concierge-grade rides (schedule, preparation, active ride, handoff, and relationship context) backed by **Supabase**.

HUM is not a generic gig dispatch experience. Riders are **clients** of a relationship-based service: discovery often happens through the driver, trust is in **consistent platform quality** as much as in one person, and the emotional bar is **relief** — *“You don’t know how much stress you relieve me of by allowing me to count on you.”* Product background for that rider journey (airport pickup as the signature flow, proactive communication, and moving off fragmented texts and payment apps) lives in [`resources/hum_rider_perspective.md`](resources/hum_rider_perspective.md).

This codebase intentionally delivers **vertical slices** of that vision: the driver app and its contracts are governed by [`.specify/memory/constitution.md`](.specify/memory/constitution.md). In short:

- **Drivers as business owners** — language and flows reinforce ownership, clients, and judgment; not anonymous marketplace pressure.
- **Concierge reliability over gig urgency** — especially for airport pickup: flight context, pickup clarity, and one-tap progression before improvisation.
- **Calm, legible, low-touch UI** — plain language, strong hierarchy, accessibility-friendly targets; software stays out of the way of driving and relationships.
- **Relationship memory** — durable concepts for clients, history, and follow-up where the product touches them.
- **Tested, incremental delivery** — small, independently verifiable workflows with automated coverage appropriate to risk.
- **Feature-Sliced Design** — under `src/` (`app`, `pages`, `widgets`, `features`, `entities`, `shared`); route files in `src/app/` stay thin and compose slices from lower layers.

Feature specs and plans live under `specs/` (for example [`specs/003-view-ride-screen/plan.md`](specs/003-view-ride-screen/plan.md)). The constitution applies to this driver slice and related backend behavior; it does not define the full rider or admin products.

## Prerequisites

- Node.js compatible with the Expo SDK in `package.json`
- For native builds: Xcode (iOS) and/or Android Studio as required by [Expo’s docs](https://docs.expo.dev/)
- Supabase and other secrets: copy `.env.example` to `.env` and configure values for your environment

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the dev server

   ```bash
   npm run start
   ```

   You can open the app in a [development build](https://docs.expo.dev/develop/development-builds/introduction/), simulators, or [Expo Go](https://expo.dev/go) where compatible.

3. Run checks used in development

   ```bash
   npm run lint
   npm run test
   ```

Native runs (when using prebuild / dev clients):

```bash
npm run ios
npm run android
```

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router (file-based routes)](https://docs.expo.dev/router/introduction/) — this project routes through `src/app/`
