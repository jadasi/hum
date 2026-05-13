import { mapRideView } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

describe('mapRideView', () => {
  it('returns null when rider is missing', () => {
    const row = buildRideViewRow({ rider: null });
    expect(mapRideView(row)).toBeNull();
  });

  it('returns null when pricing is missing', () => {
    const row = buildRideViewRow({ pricing: null });
    expect(mapRideView(row)).toBeNull();
  });

  it('returns null when dropoff is missing', () => {
    const row = buildRideViewRow({ dropoff: null });
    expect(mapRideView(row)).toBeNull();
  });

  it('maps required rider, pricing, and dropoff fields', () => {
    const row = buildRideViewRow();
    const model = mapRideView(row);
    expect(model).not.toBeNull();
    expect(model?.rider.id).toBe(row.rider?.id);
    expect(model?.rider.clientSource).toBe(row.rider?.client_source);
    expect(model?.pricing.quoteId).toBe(row.pricing?.id);
    expect(model?.pricing.quoted.cents).toBe(row.pricing?.quoted_amount_cents);
    expect(model?.dropoff.addressLine1).toBe(row.dropoff?.address_line1);
  });

  it('omits flight when not provided', () => {
    const row = buildRideViewRow({ flight: null });
    const model = mapRideView(row);
    expect(model?.flight).toBeNull();
  });

  it('maps flight when provided', () => {
    const row = buildRideViewRow({
      flight: {
        airline_code: 'AA',
        flight_number: '123',
        origin_airport_code: 'PHX',
        destination_airport_code: 'LAX',
        scheduled_arrival_at: '2026-05-12T18:00:00.000Z',
        estimated_arrival_at: null,
        actual_arrival_at: null,
        status: 'on_time',
        delay_minutes: null,
        gate: 'A1',
        terminal: '4',
        baggage_claim: null,
        data_freshness_at: '2026-05-12T12:00:00.000Z',
      },
    });
    const model = mapRideView(row);
    expect(model?.flight?.flightNumber).toBe('123');
    expect(model?.flight?.airlineCode).toBe('AA');
  });

  it('keeps platform averages null when absent', () => {
    const row = buildRideViewRow({
      pricing: {
        id: '70000000-0000-4000-8000-000000000099',
        quoted_amount_cents: 4500,
        accepted_amount_cents: null,
        platform_average_low_cents: null,
        platform_average_high_cents: null,
        currency: 'USD',
        pricing_note: null,
      },
    });
    const model = mapRideView(row);
    expect(model?.pricing.platformAverageLow).toBeNull();
    expect(model?.pricing.platformAverageHigh).toBeNull();
  });
});
