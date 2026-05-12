import type {
  DriverDashboardSummaryRow,
  FlightRow,
  HomeDashboardReadModel,
  HomeDashboardRows,
  HomeRideCardModel,
  LocationRow,
  PricingQuoteRow,
  RiderRow,
  RideRow,
} from './home-dashboard-types';

function mapMoney(cents: number, currency = 'USD') {
  return { cents, currency };
}

function mapSummary(row: DriverDashboardSummaryRow | null): HomeDashboardReadModel['summary'] {
  if (!row) {
    return {
      todayEarnings: mapMoney(0),
      weekEarnings: mapMoney(0),
      weeklyRidesCompleted: 0,
      weeklyRidesGoal: 10,
      computedAt: new Date(0).toISOString(),
    };
  }

  return {
    todayEarnings: mapMoney(row.today_earnings_cents),
    weekEarnings: mapMoney(row.week_earnings_cents),
    weeklyRidesCompleted: row.weekly_rides_completed,
    weeklyRidesGoal: row.weekly_rides_goal,
    computedAt: row.computed_at,
  };
}

function mapRider(row: RiderRow): HomeRideCardModel['rider'] {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    phoneNumber: row.phone_number,
    totalRides: row.total_rides,
    lifetimeValue: mapMoney(row.lifetime_value_cents),
    preferences: row.preferences ?? [],
  };
}

function mapPricing(row: PricingQuoteRow): HomeRideCardModel['pricing'] {
  return {
    quoted: mapMoney(row.quoted_amount_cents, row.currency),
    accepted: row.accepted_amount_cents === null ? null : mapMoney(row.accepted_amount_cents, row.currency),
    platformAverageLow:
      row.platform_average_low_cents === null ? null : mapMoney(row.platform_average_low_cents, row.currency),
    platformAverageHigh:
      row.platform_average_high_cents === null ? null : mapMoney(row.platform_average_high_cents, row.currency),
    note: row.pricing_note,
  };
}

function mapLocation(row: LocationRow | null): HomeRideCardModel['pickup'] {
  if (!row) {
    return null;
  }

  return {
    label: row.label,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2,
    city: row.city,
    region: row.region,
    airportCode: row.airport_code,
  };
}

function mapFlight(row: FlightRow | null): HomeRideCardModel['flight'] {
  if (!row) {
    return null;
  }

  return {
    airlineCode: row.airline_code,
    flightNumber: row.flight_number,
    originAirportCode: row.origin_airport_code,
    destinationAirportCode: row.destination_airport_code,
    scheduledArrivalAt: row.scheduled_arrival_at,
    estimatedArrivalAt: row.estimated_arrival_at,
    actualArrivalAt: row.actual_arrival_at,
    status: row.status,
    delayMinutes: row.delay_minutes,
    gate: row.gate,
    terminal: row.terminal,
    baggageClaim: row.baggage_claim,
    dataFreshnessAt: row.data_freshness_at,
  };
}

function mapRide(row: RideRow): HomeRideCardModel | null {
  if (!row.rider || !row.pricing || !row.dropoff) {
    return null;
  }

  return {
    id: row.id,
    type: row.ride_type,
    state: row.state,
    scheduledPickupAt: row.scheduled_pickup_at,
    completedAt: row.completed_at,
    displayNote: row.display_note,
    rider: mapRider(row.rider),
    pricing: mapPricing(row.pricing),
    pickup: mapLocation(row.pickup),
    dropoff: mapLocation(row.dropoff) ?? {
      label: null,
      addressLine1: 'Drop-off to be confirmed',
      addressLine2: null,
      city: null,
      region: null,
      airportCode: null,
    },
    flight: mapFlight(row.flight),
  };
}

function compareRideTime(a: HomeRideCardModel, b: HomeRideCardModel): number {
  const aTime = a.scheduledPickupAt ?? a.flight?.estimatedArrivalAt ?? a.flight?.scheduledArrivalAt ?? a.completedAt ?? '';
  const bTime = b.scheduledPickupAt ?? b.flight?.estimatedArrivalAt ?? b.flight?.scheduledArrivalAt ?? b.completedAt ?? '';
  return aTime.localeCompare(bTime);
}

export function mapHomeDashboard(rows: HomeDashboardRows): HomeDashboardReadModel {
  return {
    summary: mapSummary(rows.summary),
    rides: rows.rides.flatMap((row) => {
      const ride = mapRide(row);
      return ride ? [ride] : [];
    }).sort(compareRideTime),
  };
}
