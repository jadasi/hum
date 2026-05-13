import { formatMoney } from '@/pages/driver-home';

import type { LocationDisplay, Money } from '@/pages/driver-home';

export function formatRiderDisplayName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

export function formatLocationOneLine(location: LocationDisplay | null): string | null {
  if (!location) {
    return null;
  }

  const parts = [location.addressLine1, location.city, location.region].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

export function formatMoneyCompact(money: Money): string {
  return formatMoney(money);
}
