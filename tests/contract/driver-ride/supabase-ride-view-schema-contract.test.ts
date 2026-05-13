import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const migrationSql = readFileSync(
  join(process.cwd(), 'supabase/migrations/202605130001_extend_ride_view.sql'),
  'utf8'
);

describe('ride view Supabase schema contract', () => {
  it('adds map coordinates to locations', () => {
    expect(migrationSql).toContain('alter table public.locations');
    expect(migrationSql).toContain('latitude');
    expect(migrationSql).toContain('longitude');
  });

  it('adds client source context to riders', () => {
    expect(migrationSql).toContain('alter table public.riders');
    expect(migrationSql).toContain('client_source');
    expect(migrationSql).toContain('platform_conversion');
    expect(migrationSql).toContain('recurring_private_client');
  });

  it('grants authenticated updates for ride workflow tables', () => {
    expect(migrationSql).toContain('grant update on public.locations');
    expect(migrationSql).toContain('grant update on public.rides');
    expect(migrationSql).toContain('grant update on public.pricing_quotes');
  });

  it('defines driver-owned update policies', () => {
    expect(migrationSql).toContain('locations update own driver rows');
    expect(migrationSql).toContain('rides update own driver rows');
    expect(migrationSql).toContain('pricing_quotes update own driver rows');
    expect(migrationSql).toContain('auth.uid() is not null and auth.uid() = driver_id');
  });
});
