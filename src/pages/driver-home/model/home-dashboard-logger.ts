type HomeDashboardLogPayload = {
  driverId?: string;
  date?: string;
  rideCount?: number;
  errorCode?: string;
};

function safePayload(payload: HomeDashboardLogPayload): HomeDashboardLogPayload {
  return {
    driverId: payload.driverId,
    date: payload.date,
    rideCount: payload.rideCount,
    errorCode: payload.errorCode,
  };
}

export function logHomeDashboardLoaded(payload: HomeDashboardLogPayload): void {
  if (__DEV__) {
    console.info('[driver-home] loaded', safePayload(payload));
  }
}

export function logHomeDashboardLoadFailed(payload: HomeDashboardLogPayload): void {
  if (__DEV__) {
    console.warn('[driver-home] load failed', safePayload(payload));
  }
}
