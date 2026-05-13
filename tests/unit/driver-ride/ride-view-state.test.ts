import { buildRideActions, getRouteModeForState } from '@/pages/driver-ride';

describe('ride-view-state', () => {
  describe('getRouteModeForState', () => {
    it('maps pending to pickup_to_dropoff', () => {
      expect(getRouteModeForState('pending', false)).toBe('pickup_to_dropoff');
    });

    it('maps confirmed with current location to current_to_pickup_to_dropoff', () => {
      expect(getRouteModeForState('confirmed', true)).toBe('current_to_pickup_to_dropoff');
    });

    it('maps confirmed without current location to pickup_to_dropoff overview', () => {
      expect(getRouteModeForState('confirmed', false)).toBe('pickup_to_dropoff');
    });

    it('maps driving_to_appointment to current_to_pickup', () => {
      expect(getRouteModeForState('driving_to_appointment', false)).toBe('current_to_pickup');
    });

    it('maps driving_to_destination to current_to_dropoff', () => {
      expect(getRouteModeForState('driving_to_destination', false)).toBe('current_to_dropoff');
    });

    it('maps completed to completed_summary', () => {
      expect(getRouteModeForState('completed', false)).toBe('completed_summary');
    });
  });

  describe('buildRideActions', () => {
    it('includes a primary action for every in-progress state', () => {
      const states = ['pending', 'confirmed', 'driving_to_appointment', 'driving_to_destination'] as const;

      for (const state of states) {
        const actions = buildRideActions(state, true);
        expect(actions.some((a) => a.priority === 'primary' && a.enabled)).toBe(true);
      }
    });

    it('returns no actions when the ride is completed', () => {
      expect(buildRideActions('completed', true)).toEqual([]);
    });

    it('includes contact passenger for active driving states', () => {
      for (const state of ['driving_to_appointment', 'driving_to_destination'] as const) {
        const actions = buildRideActions(state, true);
        expect(actions.some((a) => a.id === 'contact_passenger')).toBe(true);
      }
    });
  });
});
