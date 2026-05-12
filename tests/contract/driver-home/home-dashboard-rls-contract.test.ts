const mockSummaryMaybeSingle = jest.fn();
const mockSummaryEq = jest.fn();
const mockSummarySelect = jest.fn();
const mockRidesOrder = jest.fn();
const mockRidesEq = jest.fn();
const mockRidesSelect = jest.fn();
const mockFrom = jest.fn();

jest.mock('@/shared/api', () => ({
  getSupabase: () => ({
    from: mockFrom,
  }),
}));

import { getHomeDashboard } from '@/pages/driver-home';

describe('home dashboard driver scoping contract', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSummaryMaybeSingle.mockResolvedValue({
      data: {
        today_earnings_cents: 0,
        week_earnings_cents: 0,
        weekly_rides_completed: 0,
        weekly_rides_goal: 10,
        computed_at: '2026-05-12T15:00:00.000Z',
      },
      error: null,
    });
    mockSummaryEq.mockReturnValue({ eq: mockSummaryEq, maybeSingle: mockSummaryMaybeSingle });
    mockSummarySelect.mockReturnValue({ eq: mockSummaryEq });

    mockRidesOrder.mockResolvedValue({ data: [], error: null });
    mockRidesEq.mockReturnValue({ order: mockRidesOrder });
    mockRidesSelect.mockReturnValue({ eq: mockRidesEq });

    mockFrom.mockImplementation((table: string) => {
      if (table === 'driver_dashboard_summaries') {
        return { select: mockSummarySelect };
      }
      if (table === 'rides') {
        return { select: mockRidesSelect };
      }
      throw new Error(`Unexpected table ${table}`);
    });
  });

  it('filters summary and rides by the signed-in driver id', async () => {
    await getHomeDashboard({
      driverId: 'same-driver-id',
      date: '2026-05-12',
    });

    expect(mockSummaryEq).toHaveBeenCalledWith('driver_id', 'same-driver-id');
    expect(mockSummaryEq).toHaveBeenCalledWith('summary_date', '2026-05-12');
    expect(mockRidesEq).toHaveBeenCalledWith('driver_id', 'same-driver-id');
  });
});
