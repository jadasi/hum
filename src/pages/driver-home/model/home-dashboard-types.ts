export type RideState =
  | 'pending'
  | 'confirmed'
  | 'driving_to_appointment'
  | 'driving_to_destination'
  | 'completed';

export type RideType = 'appointment' | 'airport' | 'commute' | 'other';

export type FlightStatus = 'scheduled' | 'on_time' | 'delayed' | 'landed' | 'cancelled' | 'unknown';

export type Money = {
  cents: number;
  currency: 'USD' | string;
};

export type DriverHomeSummary = {
  todayEarnings: Money;
  weekEarnings: Money;
  weeklyRidesCompleted: number;
  weeklyRidesGoal: number;
  computedAt: string;
};

export type LocationDisplay = {
  label: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string | null;
  region: string | null;
  airportCode: string | null;
};

export type FlightDisplay = {
  airlineCode: string | null;
  flightNumber: string;
  originAirportCode: string | null;
  destinationAirportCode: string;
  scheduledArrivalAt: string | null;
  estimatedArrivalAt: string | null;
  actualArrivalAt: string | null;
  status: FlightStatus;
  delayMinutes: number | null;
  gate: string | null;
  terminal: string | null;
  baggageClaim: string | null;
  dataFreshnessAt: string | null;
};

export type HomeRideCardModel = {
  id: string;
  type: RideType;
  state: RideState;
  scheduledPickupAt: string | null;
  completedAt: string | null;
  displayNote: string | null;
  rider: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    totalRides: number;
    lifetimeValue: Money;
    preferences: string[];
  };
  pricing: {
    quoted: Money;
    accepted: Money | null;
    platformAverageLow: Money | null;
    platformAverageHigh: Money | null;
    note: string | null;
  };
  pickup: LocationDisplay | null;
  dropoff: LocationDisplay;
  flight: FlightDisplay | null;
};

export type HomeDashboardReadModel = {
  summary: DriverHomeSummary;
  rides: HomeRideCardModel[];
};

export type DriverHomeLoadState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; data: HomeDashboardReadModel };

export type DriverDashboardSummaryRow = {
  today_earnings_cents: number;
  week_earnings_cents: number;
  weekly_rides_completed: number;
  weekly_rides_goal: number;
  computed_at: string;
};

export type RiderRow = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  total_rides: number;
  lifetime_value_cents: number;
  preferences: string[] | null;
};

export type PricingQuoteRow = {
  quoted_amount_cents: number;
  accepted_amount_cents: number | null;
  platform_average_low_cents: number | null;
  platform_average_high_cents: number | null;
  currency: string;
  pricing_note: string | null;
};

export type LocationRow = {
  label: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string | null;
  region: string | null;
  airport_code: string | null;
};

export type FlightRow = {
  airline_code: string | null;
  flight_number: string;
  origin_airport_code: string | null;
  destination_airport_code: string;
  scheduled_arrival_at: string | null;
  estimated_arrival_at: string | null;
  actual_arrival_at: string | null;
  status: FlightStatus;
  delay_minutes: number | null;
  gate: string | null;
  terminal: string | null;
  baggage_claim: string | null;
  data_freshness_at: string | null;
};

export type RideRow = {
  id: string;
  ride_type: RideType;
  state: RideState;
  scheduled_pickup_at: string | null;
  completed_at: string | null;
  display_note: string | null;
  rider: RiderRow | null;
  pricing: PricingQuoteRow | null;
  pickup: LocationRow | null;
  dropoff: LocationRow | null;
  flight: FlightRow | null;
};

export type HomeDashboardRows = {
  summary: DriverDashboardSummaryRow | null;
  rides: RideRow[];
};
