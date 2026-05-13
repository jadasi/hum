import { updateRideState } from '@/pages/driver-ride';
import { getSupabase } from '@/shared/api';

jest.mock('@/shared/api', () => ({
  getSupabase: jest.fn(),
}));

describe('updateRideState', () => {
  const driverId = 'driver-1';
  const rideId = 'ride-1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns an error when the ride is not in the expected state', async () => {
    const maybeSingle = jest.fn(() =>
      Promise.resolve({
        data: { id: rideId, state: 'pending', active_started_at: null, completed_at: null },
        error: null,
      })
    );

    (getSupabase as jest.Mock).mockReturnValue({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              maybeSingle,
            })),
          })),
        })),
      })),
    });

    const result = await updateRideState({ driverId, rideId, transition: 'navigate_to_pickup' });
    expect(result.error).toMatch(/no longer ready/i);
  });

  it('updates confirmed rides to driving_to_appointment', async () => {
    const maybeSingle = jest.fn(() =>
      Promise.resolve({
        data: { id: rideId, state: 'confirmed', active_started_at: null, completed_at: null },
        error: null,
      })
    );

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
        throw new Error(`unexpected table ${table}`);
      }),
    });

    const result = await updateRideState({ driverId, rideId, transition: 'navigate_to_pickup' });
    expect(result.error).toBeNull();
    expect(rideUpdate).toHaveBeenCalled();
  });

  it('completes a ride in the drop-off leg with a completion timestamp', async () => {
    const maybeSingle = jest.fn(() =>
      Promise.resolve({
        data: {
          id: rideId,
          state: 'driving_to_destination',
          active_started_at: '2026-05-12T15:00:00.000Z',
          completed_at: null,
        },
        error: null,
      })
    );

    const rideSelectAfterUpdate = jest.fn(() => Promise.resolve({ data: [{ id: rideId }], error: null }));
    const rideEq3 = jest.fn(() => ({ select: rideSelectAfterUpdate }));
    const rideEq2 = jest.fn(() => ({ eq: rideEq3 }));
    const rideEq1 = jest.fn(() => ({ eq: rideEq2 }));
    const rideUpdate = jest.fn(() => ({ eq: rideEq1 }));

    (getSupabase as jest.Mock).mockReturnValue({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
          eq: jest.fn(() => ({
            eq: jest.fn(() => ({
              maybeSingle,
            })),
          })),
        })),
        update: rideUpdate,
      })),
    });

    const result = await updateRideState({ driverId, rideId, transition: 'end_trip' });
    expect(result.error).toBeNull();
    expect(rideUpdate).toHaveBeenCalled();
    const patch = (rideUpdate as jest.Mock).mock.calls[0][0] as { completed_at?: string; state?: string };
    expect(patch.state).toBe('completed');
    expect(patch.completed_at).toBeTruthy();
  });
});
