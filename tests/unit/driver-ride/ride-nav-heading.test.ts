import { rideNavSubtitleForState } from '@/pages/driver-ride/model/ride-nav-heading';

describe('rideNavSubtitleForState', () => {
  it('returns state-specific subtitles', () => {
    expect(rideNavSubtitleForState('pending')).toMatch(/quote/i);
    expect(rideNavSubtitleForState('confirmed')).toMatch(/pickup/i);
    expect(rideNavSubtitleForState('driving_to_appointment')).toMatch(/pickup/i);
    expect(rideNavSubtitleForState('driving_to_destination')).toMatch(/drop/i);
    expect(rideNavSubtitleForState('completed')).toMatch(/complete/i);
  });
});
