import type { HomeDashboardReadModel, HomeRideCardModel } from '@/pages/driver-home';

export const fixtureSummary = {
  todayEarnings: { cents: 0, currency: 'USD' },
  weekEarnings: { cents: 142000, currency: 'USD' },
  weeklyRidesCompleted: 7,
  weeklyRidesGoal: 10,
  computedAt: '2026-05-12T15:00:00.000Z',
};

export const zeroFixtureSummary = {
  todayEarnings: { cents: 0, currency: 'USD' },
  weekEarnings: { cents: 0, currency: 'USD' },
  weeklyRidesCompleted: 0,
  weeklyRidesGoal: 10,
  computedAt: '2026-05-12T15:00:00.000Z',
};

const rider = {
  id: 'rider-michele',
  firstName: 'Michele',
  lastName: 'White',
  phoneNumber: '+16025550100',
  totalRides: 12,
  lifetimeValue: { cents: 54000, currency: 'USD' },
  preferences: ['prefers quiet', 'flies T4'],
};

const dropoff = {
  label: 'Scottsdale',
  addressLine1: 'Scottsdale, AZ',
  addressLine2: null,
  city: 'Scottsdale',
  region: 'AZ',
  airportCode: null,
};

export const pendingRide: HomeRideCardModel = {
  id: 'ride-pending',
  type: 'appointment',
  state: 'pending',
  scheduledPickupAt: '2026-05-12T15:15:00.000Z',
  completedAt: null,
  displayNote: null,
  rider,
  pricing: {
    quoted: { cents: 4500, currency: 'USD' },
    accepted: null,
    platformAverageLow: { cents: 5200, currency: 'USD' },
    platformAverageHigh: { cents: 6300, currency: 'USD' },
    note: 'flat',
  },
  pickup: {
    label: 'Phoenix Sky Harbor',
    addressLine1: '3400 E Sky Harbor Blvd',
    addressLine2: null,
    city: 'Phoenix',
    region: 'AZ',
    airportCode: 'PHX',
  },
  dropoff,
  flight: null,
};

export const confirmedRide: HomeRideCardModel = {
  ...pendingRide,
  id: 'ride-confirmed',
  state: 'confirmed',
  scheduledPickupAt: '2026-05-12T22:00:00.000Z',
  displayNote: 'standing',
  rider: {
    id: 'rider-brian',
    firstName: 'Brian',
    lastName: 'Sorenson',
    phoneNumber: '+16025550102',
    totalRides: 18,
    lifetimeValue: { cents: 81000, currency: 'USD' },
    preferences: [],
  },
  pricing: {
    quoted: { cents: 4000, currency: 'USD' },
    accepted: { cents: 4000, currency: 'USD' },
    platformAverageLow: { cents: 4600, currency: 'USD' },
    platformAverageHigh: { cents: 5200, currency: 'USD' },
    note: 'standing',
  },
  pickup: {
    label: 'Camelback Inn',
    addressLine1: '5402 E Lincoln Dr',
    addressLine2: null,
    city: 'Scottsdale',
    region: 'AZ',
    airportCode: null,
  },
  dropoff: {
    label: 'Home',
    addressLine1: 'Home',
    addressLine2: null,
    city: 'Phoenix',
    region: 'AZ',
    airportCode: null,
  },
};

export const drivingToAppointmentRide: HomeRideCardModel = {
  ...pendingRide,
  id: 'ride-driving-pickup',
  state: 'driving_to_appointment',
  scheduledPickupAt: '2026-05-12T16:30:00.000Z',
  rider: {
    id: 'rider-daniel',
    firstName: 'Daniel',
    lastName: 'Reyes',
    phoneNumber: '+16025550103',
    totalRides: 24,
    lifetimeValue: { cents: 96000, currency: 'USD' },
    preferences: ['front seat okay'],
  },
};

export const drivingToDestinationRide: HomeRideCardModel = {
  ...pendingRide,
  id: 'ride-driving-destination',
  state: 'driving_to_destination',
  scheduledPickupAt: '2026-05-12T18:00:00.000Z',
  rider: {
    id: 'rider-alicia',
    firstName: 'Alicia',
    lastName: 'Moreno',
    phoneNumber: '+16025550104',
    totalRides: 8,
    lifetimeValue: { cents: 32000, currency: 'USD' },
    preferences: ['needs extra trunk space'],
  },
};

export const completedRide: HomeRideCardModel = {
  ...pendingRide,
  id: 'ride-completed',
  state: 'completed',
  scheduledPickupAt: '2026-05-12T14:00:00.000Z',
  completedAt: '2026-05-12T14:35:00.000Z',
  rider: {
    id: 'rider-nora',
    firstName: 'Nora',
    lastName: 'Patel',
    phoneNumber: '+16025550105',
    totalRides: 5,
    lifetimeValue: { cents: 22500, currency: 'USD' },
    preferences: ['prefers text updates'],
  },
  pricing: {
    quoted: { cents: 4500, currency: 'USD' },
    accepted: { cents: 4500, currency: 'USD' },
    platformAverageLow: null,
    platformAverageHigh: null,
    note: 'flat',
  },
};

export const airportRide: HomeRideCardModel = {
  ...pendingRide,
  id: 'ride-airport',
  type: 'airport',
  state: 'confirmed',
  scheduledPickupAt: null,
  flight: {
    airlineCode: 'AA',
    flightNumber: '2241',
    originAirportCode: 'DFW',
    destinationAirportCode: 'PHX',
    scheduledArrivalAt: '2026-05-12T21:18:00.000Z',
    estimatedArrivalAt: '2026-05-12T21:48:00.000Z',
    actualArrivalAt: null,
    status: 'delayed',
    delayMinutes: 30,
    gate: 'B12',
    terminal: '4',
    baggageClaim: '6',
    dataFreshnessAt: '2026-05-12T20:55:00.000Z',
  },
};

export const staleAirportRide: HomeRideCardModel = {
  ...airportRide,
  id: 'ride-airport-stale',
  flight: airportRide.flight
    ? {
        ...airportRide.flight,
        status: 'unknown',
        delayMinutes: null,
        gate: null,
        terminal: null,
        dataFreshnessAt: null,
      }
    : null,
};

export const partialAirportRide: HomeRideCardModel = {
  ...airportRide,
  id: 'ride-airport-partial',
  flight: airportRide.flight
    ? {
        ...airportRide.flight,
        airlineCode: null,
        originAirportCode: null,
        estimatedArrivalAt: null,
        gate: null,
        terminal: null,
        baggageClaim: null,
      }
    : null,
};

export const homeDashboardFixture: HomeDashboardReadModel = {
  summary: fixtureSummary,
  rides: [pendingRide, airportRide],
};

export const scheduleDashboardFixture: HomeDashboardReadModel = {
  summary: fixtureSummary,
  rides: [
    confirmedRide,
    drivingToDestinationRide,
    pendingRide,
    completedRide,
    drivingToAppointmentRide,
  ],
};

export const zeroHomeDashboardFixture: HomeDashboardReadModel = {
  summary: zeroFixtureSummary,
  rides: [],
};
