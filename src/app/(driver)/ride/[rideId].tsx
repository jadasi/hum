import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

import { DriverRideScreen } from '@/pages/driver-ride';
import { Text } from '@/shared/ui/primitives/text';

export default function DriverRideRoute() {
  const params = useLocalSearchParams<{ rideId?: string | string[] }>();
  const rawRideId = params.rideId;
  const rideId = Array.isArray(rawRideId) ? rawRideId[0] : rawRideId;

  if (!rideId) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-6">
        <Text className="text-center font-sans text-hum-sm text-muted-foreground">Missing ride identifier.</Text>
      </View>
    );
  }

  return <DriverRideScreen rideId={rideId} />;
}
