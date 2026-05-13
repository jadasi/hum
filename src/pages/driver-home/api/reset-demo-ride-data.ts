import { getSupabase } from '@/shared/api';

type ResetDemoRideDataResponse = {
  counts?: {
    summaries: number;
    riders: number;
    locations: number;
    pricingQuotes: number;
    flights: number;
    rides: number;
  };
};

type SupabaseFunctionErrorLike = {
  message?: string;
  context?: {
    status?: number;
  };
};

export function resetDemoRideDataErrorMessage(error: SupabaseFunctionErrorLike): string {
  if (error.context?.status === 401) {
    return 'Sign in again to reset demo ride data.';
  }
  if (error.context?.status === 403) {
    return 'You do not have permission to reset demo ride data.';
  }
  return 'We could not reset demo ride data. Please try again.';
}

export async function resetDemoRideData(): Promise<{
  data: ResetDemoRideDataResponse | null;
  error: string | null;
}> {
  const supabase = getSupabase();
  const { data, error } = await supabase.functions.invoke<ResetDemoRideDataResponse>('reset-demo-ride-data', {
    body: {},
  });

  if (error) {
    return { data: null, error: resetDemoRideDataErrorMessage(error) };
  }

  return { data: data ?? null, error: null };
}
