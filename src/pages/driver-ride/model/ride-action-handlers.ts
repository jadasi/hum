import { Alert, Linking } from 'react-native';

export function showReviewPreTripUnavailable(): void {
  Alert.alert('Pre-trip review', 'Guided pre-trip review is not available in this build yet.');
}

export function showPassengerContactUnavailable(reason: 'missing_phone' | 'unsupported_device'): void {
  const message =
    reason === 'missing_phone'
      ? 'No phone number on file for this passenger.'
      : 'Calls are not supported on this device.';
  Alert.alert('Contact passenger', message);
}

export async function contactPassengerByPhone(phoneNumber: string | null | undefined): Promise<void> {
  const trimmed = phoneNumber?.trim() ?? '';
  if (!trimmed.length) {
    showPassengerContactUnavailable('missing_phone');
    return;
  }

  const url = `tel:${trimmed}`;
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    showPassengerContactUnavailable('unsupported_device');
    return;
  }

  await Linking.openURL(url);
}

export function showScheduleReturnUnavailable(): void {
  Alert.alert('Schedule return', 'Return scheduling is not available yet.');
}

export function navigateSaveAndNextRide(router: { back: () => void }): void {
  router.back();
}
