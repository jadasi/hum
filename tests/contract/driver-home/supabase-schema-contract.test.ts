import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const migrationSql = readFileSync(
  join(process.cwd(), 'supabase/migrations/20260512220806_driver_home_dashboard.sql'),
  'utf8'
);

const requiredTables = [
  'driver_dashboard_summaries',
  'riders',
  'locations',
  'pricing_quotes',
  'flights',
  'rides',
];

describe('driver home Supabase schema contract', () => {
  it('creates all required tables', () => {
    for (const table of requiredTables) {
      expect(migrationSql).toContain(`create table if not exists public.${table}`);
    }
  });

  it('defines constrained ride and flight statuses', () => {
    for (const status of ['pending', 'confirmed', 'driving_to_appointment', 'driving_to_destination', 'completed']) {
      expect(migrationSql).toContain(`'${status}'`);
    }
    for (const status of ['scheduled', 'on_time', 'delayed', 'landed', 'cancelled', 'unknown']) {
      expect(migrationSql).toContain(`'${status}'`);
    }
  });

  it('enables RLS and driver-owned select policies for all required tables', () => {
    for (const table of requiredTables) {
      expect(migrationSql).toContain(`alter table public.${table} enable row level security`);
      expect(migrationSql).toContain(`on public.${table}`);
    }
    expect(migrationSql.match(/auth\.uid\(\) is not null and auth\.uid\(\) = driver_id/g)).toHaveLength(6);
  });

  it('adds indexes needed by the home dashboard read path', () => {
    expect(migrationSql).toContain('driver_dashboard_summaries_driver_date_idx');
    expect(migrationSql).toContain('rides_driver_scheduled_pickup_idx');
    expect(migrationSql).toContain('rides_driver_state_idx');
  });
});
