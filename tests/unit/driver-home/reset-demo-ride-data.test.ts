import { resetDemoRideData, resetDemoRideDataErrorMessage } from '@/pages/driver-home';
import { getSupabase } from '@/shared/api';

jest.mock('@/shared/api', () => ({
  getSupabase: jest.fn(),
}));

describe('resetDemoRideData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('invokes the reset Edge Function', async () => {
    const invoke = jest.fn(() =>
      Promise.resolve({
        data: { counts: { summaries: 1, riders: 5, locations: 8, pricingQuotes: 5, flights: 1, rides: 5 } },
        error: null,
      })
    );

    (getSupabase as jest.Mock).mockReturnValue({
      functions: { invoke },
    });

    const result = await resetDemoRideData();

    expect(result.error).toBeNull();
    expect(invoke).toHaveBeenCalledWith('reset-demo-ride-data', { body: {} });
  });

  it('maps unauthorized reset failures to sign-in copy', () => {
    expect(resetDemoRideDataErrorMessage({ context: { status: 401 } })).toMatch(/sign in/i);
  });
});
