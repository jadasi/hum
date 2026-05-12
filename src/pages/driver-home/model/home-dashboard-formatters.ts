import type { LocationDisplay, Money, RideState } from './home-dashboard-types';

export function formatMoney(money: Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currency,
    maximumFractionDigits: money.cents % 100 === 0 ? 0 : 2,
  }).format(money.cents / 100);
}

export function formatRideGoalProgress(completed: number, goal: number): string {
  return `${completed}/${goal}`;
}

export function formatRiderName(firstName: string, lastName: string): string {
  return `${firstName.trim()} ${lastName.trim()}`.trim();
}

export function formatShortRiderName(firstName: string, lastName: string): string {
  const lastInitial = lastName.trim().charAt(0);
  return lastInitial ? `${firstName.trim()} ${lastInitial}.` : firstName.trim();
}

export function formatLocation(location: LocationDisplay | null): string {
  if (!location) {
    return 'Pickup to be confirmed';
  }
  return location.label || location.addressLine1;
}

export function formatRoute(pickup: LocationDisplay | null, dropoff: LocationDisplay): string {
  return `${formatLocation(pickup)} -> ${formatLocation(dropoff)}`;
}

export function formatRideStateLabel(state: RideState): string {
  switch (state) {
    case 'pending':
      return 'Pending';
    case 'confirmed':
      return 'Confirmed';
    case 'driving_to_appointment':
      return 'Driving to pickup';
    case 'driving_to_destination':
      return 'Driving to destination';
    case 'completed':
      return 'Completed';
  }
}

export function formatTime(value: string | null): string {
  if (!value) {
    return 'Time to be confirmed';
  }

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
