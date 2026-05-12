# Quickstart: Auth feature (local dev)

## Prerequisites

- Node/npm matching repo conventions
- Expo CLI via `npx expo`
- A **Supabase** project with **Email** provider enabled and URL + publishable key available

## Environment

Copy `.env.example` to `.env` and set:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Never commit real secrets. Do not add non-publishable keys with `EXPO_PUBLIC_` prefix.

## Supabase dashboard (once per project)

1. **Authentication → Providers → Email**: enabled.
2. Decide **email confirmations**: if enabled, add redirect URLs that match your **mobile** Expo scheme (Expo Go `exp://…`, dev client, or production app deep link) per [Supabase redirect URL docs](https://supabase.com/docs/guides/auth/redirect-urls).
3. (Optional) **Auth hooks / SMTP** for production-quality mail — not required for local token testing.

## Install (after implementation lands)

Implementation is expected to add at minimum:

- `zustand`
- `expo-secure-store`
- dev deps: `jest-expo`, `jest`, `@types/jest`, `@testing-library/react-native`

Use `npx expo install <pkg>` for Expo-native modules.

## Run the app

```bash
npm install
npm run start
```

Sign-in and sign-up screens should appear for signed-out users; after session established, the existing tabbed home/explore shell should appear.

## Run tests (after Jest config exists)

```bash
npm run test
```

## Troubleshooting

- **Instant sign-out / session not sticking**: check the SecureStore-backed storage adapter and OS permissions where relevant.
- **“Invalid API key”**: verify publishable key and project URL pair.
- **Email confirmation link does not return to the app**: update the Supabase redirect allowlist for your Expo / dev-client scheme and native intent filters.
