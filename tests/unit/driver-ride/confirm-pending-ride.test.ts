import { confirmPendingRide } from '@/pages/driver-ride';
import { getSupabase } from '@/shared/api';

jest.mock('@/shared/api', () => ({
  getSupabase: jest.fn(),
}));

describe('confirmPendingRide', () => {
  const driverId = 'driver-1';
  const rideId = 'ride-1';
  const pricingId = 'price-1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns error when ride is not pending', async () => {
    (getSupabase as jest.Mock).mockReturnValue({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              maybeSingle: jest.fn(() =>
                Promise.resolve({
                  data: { id: rideId, state: 'confirmed', pricing_id: pricingId },
                  error: null,
                })
              ),
            })),
          })),
        })),
      })),
    });

    const result = await confirmPendingRide({ driverId, rideId, quoteCents: 5000 });
    expect(result.error).toMatch(/no longer pending/i);
  });

  it('updates pricing and ride when pending', async () => {
    const maybeSingle = jest.fn(() =>
      Promise.resolve({
        data: { id: rideId, state: 'pending', pricing_id: pricingId },
        error: null,
      })
    );

    const pricingEq = jest.fn(() => Promise.resolve({ error: null }));
    const pricingUpdate = jest.fn(() => ({
      eq: jest.fn(() => ({ eq: pricingEq })),
    }));

    const rideSelectAfterUpdate = jest.fn(() => Promise.resolve({ data: [{ id: rideId }], error: null }));
    const rideEq3 = jest.fn(() => ({ select: rideSelectAfterUpdate }));
    const rideEq2 = jest.fn(() => ({ eq: rideEq3 }));
    const rideEq1 = jest.fn(() => ({ eq: rideEq2 }));
    const rideUpdate = jest.fn(() => ({ eq: rideEq1 }));

    (getSupabase as jest.Mock).mockReturnValue({
      from: jest.fn((table: string) => {
        if (table === 'rides') {
          return {
            select: jest.fn(() => ({
              eq: jest.fn(() => ({
                eq: jest.fn(() => ({
                  maybeSingle,
                })),
              })),
            })),
            update: rideUpdate,
          };
        }
        if (table === 'pricing_quotes') {
          return {
            update: pricingUpdate,
          };
        }
        throw new Error(`unexpected table ${table}`);
      }),
    });

    const result = await confirmPendingRide({ driverId, rideId, quoteCents: 5200 });
    expect(result.error).toBeNull();
    expect(pricingUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        quoted_amount_cents: 5200,
        accepted_amount_cents: 5200,
      })
    );
    expect(rideUpdate).toHaveBeenCalledWith(expect.objectContaining({ state: 'confirmed' }));
  });
});
