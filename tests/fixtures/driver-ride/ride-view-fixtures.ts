import { mapRideView, type RideViewReadModel, type RideViewRideRow } from '@/pages/driver-ride';

function location(latitude: number, longitude: number) {
  return {
    label: null as string | null,
    address_line1: '123 Main St',
    address_line2: null as string | null,
    city: 'Phoenix',
    region: 'AZ',
    airport_code: null as string | null,
    latitude,
    longitude,
  };
}

const baseRider: NonNullable<RideViewRideRow['rider']> = {
  id: '20000000-0000-4000-8000-000000000001',
  first_name: 'Jordan',
  last_name: 'Lee',
  phone_number: '+16025550123',
  total_rides: 12,
  lifetime_value_cents: 48_000,
  preferences: ['quiet ride'],
  client_source: 'platform_conversion',
};

const basePricingId = '80000000-0000-4000-8000-000000000001';

const basePricing: NonNullable<RideViewRideRow['pricing']> = {
  id: basePricingId,
  quoted_amount_cents: 4500,
  accepted_amount_cents: null,
  platform_average_low_cents: null,
  platform_average_high_cents: null,
  currency: 'USD',
  pricing_note: null,
};

function pricingWithAccepted(acceptedCents: number | null): NonNullable<RideViewRideRow['pricing']> {
  return {
    ...basePricing,
    accepted_amount_cents: acceptedCents,
  };
}

export function buildRideViewRow(overrides: Partial<RideViewRideRow> = {}): RideViewRideRow {
  return {
    id: '90000000-0000-4000-8000-000000000001',
    pricing_id: basePricingId,
    ride_type: 'appointment',
    state: 'pending',
    scheduled_pickup_at: '2026-05-12T14:00:00.000Z',
    active_started_at: null,
    completed_at: null,
    display_note: null,
    rider: baseRider,
    pricing: basePricing,
    pickup: location(33.4499, -111.97),
    dropoff: location(33.46, -111.98),
    flight: null,
    ...overrides,
  };
}

function assertMapped(row: RideViewRideRow): RideViewReadModel {
  const mapped = mapRideView(row);
  if (!mapped) {
    throw new Error('Expected ride view row to map successfully');
  }
  return mapped;
}

export const rideViewReadModelByState = {
  pending: assertMapped(buildRideViewRow({ state: 'pending' })),
  confirmed: assertMapped(
    buildRideViewRow({
      state: 'confirmed',
      pricing: pricingWithAccepted(4500),
    })
  ),
  driving_to_appointment: assertMapped(
    buildRideViewRow({
      state: 'driving_to_appointment',
      pricing: pricingWithAccepted(4500),
    })
  ),
  driving_to_destination: assertMapped(
    buildRideViewRow({
      state: 'driving_to_destination',
      pricing: pricingWithAccepted(4500),
    })
  ),
  completed: assertMapped(
    buildRideViewRow({
      state: 'completed',
      completed_at: '2026-05-12T16:00:00.000Z',
      active_started_at: '2026-05-12T15:30:00.000Z',
      pricing: pricingWithAccepted(4500),
    })
  ),
} as const;
