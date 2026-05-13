import type { RideAgendaItem, RideViewReadModel } from './ride-view-types';

export function buildConfirmedRideAgenda(data: RideViewReadModel, nowMs: number): RideAgendaItem[] {
  if (data.state !== 'confirmed') {
    return [];
  }

  const scheduledMs = data.scheduledPickupAt ? Date.parse(data.scheduledPickupAt) : Number.NaN;
  const hoursUntilPickup = Number.isFinite(scheduledMs) ? (scheduledMs - nowMs) / 3_600_000 : 48;

  const items: RideAgendaItem[] = [
    {
      id: 'ride_confirmed',
      status: 'done',
      title: 'Ride confirmed',
      description: 'Passenger accepted your quote.',
      scheduledAt: null,
    },
    {
      id: 'prep_vehicle',
      status: 'upcoming',
      title: 'Prep vehicle',
      description: 'Fuel, water, phone charger.',
      scheduledAt: null,
    },
    {
      id: 'head_to_pickup',
      status: 'upcoming',
      title: 'Head to pickup',
      description: 'Aim to arrive a few minutes early.',
      scheduledAt: data.scheduledPickupAt,
    },
  ];

  if (hoursUntilPickup <= 2) {
    items[1].status = 'done';
    items[2].status = 'active';
  } else if (hoursUntilPickup <= 24) {
    items[1].status = 'active';
    items[2].status = 'upcoming';
  } else {
    items[1].status = 'upcoming';
    items[2].status = 'upcoming';
  }

  return items;
}
