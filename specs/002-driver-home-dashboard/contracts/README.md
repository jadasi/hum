# Contracts: Driver Home Dashboard

This feature exposes two implementation contracts:

- [Home dashboard read contract](./home-dashboard-read.md): the page-level data shape consumed by the mobile home screen.
- [Supabase schema contract](./supabase-schema.md): the required database tables, ownership rules, and RLS expectations for implementation.

The contracts are intentionally display/read focused. Data creation, editing, live flight-provider sync, and ride state mutation are out of scope for this feature.
