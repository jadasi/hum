type RideViewLogPayload = {
  rideId: string;
  state?: string;
  actionId?: string;
  errorCategory?: string;
  errorCode?: string;
};

/** Dev-only logs: keep payloads free of phone numbers, addresses, notes, tokens, and coordinates. */
function devLog(event: string, payload: RideViewLogPayload): void {
  if (!__DEV__) {
    return;
  }

  console.log(`[ride-view] ${event}`, payload);
}

export function logRideViewLoaded(payload: { rideId: string; state: string }): void {
  devLog('loaded', { rideId: payload.rideId, state: payload.state });
}

export function logRideViewLoadFailed(payload: { rideId: string; errorCode?: string; errorCategory: string }): void {
  devLog('load_failed', {
    rideId: payload.rideId,
    errorCode: payload.errorCode,
    errorCategory: payload.errorCategory,
  });
}

export function logConfirmPendingRideSucceeded(payload: { rideId: string }): void {
  devLog('confirm_pending_succeeded', { rideId: payload.rideId });
}

export function logConfirmPendingRideFailed(payload: {
  rideId: string;
  errorCategory: string;
  errorCode?: string;
}): void {
  devLog('confirm_pending_failed', {
    rideId: payload.rideId,
    errorCategory: payload.errorCategory,
    errorCode: payload.errorCode,
  });
}

export function logUpdateRideStateSucceeded(payload: {
  rideId: string;
  transition: string;
  nextState: string;
}): void {
  devLog('update_ride_state_succeeded', {
    rideId: payload.rideId,
    actionId: payload.transition,
    state: payload.nextState,
  });
}

export function logUpdateRideStateFailed(payload: {
  rideId: string;
  transition: string;
  errorCategory: string;
  errorCode?: string;
}): void {
  devLog('update_ride_state_failed', {
    rideId: payload.rideId,
    actionId: payload.transition,
    errorCategory: payload.errorCategory,
    errorCode: payload.errorCode,
  });
}
