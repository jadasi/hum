import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/shared/ui/primitives/text';

export default function ClientsTab() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      <View className="flex-1 items-center justify-center px-6">
        <Text className="font-sans text-hum-2xl font-hum-bold text-foreground">Clients</Text>
        <Text className="mt-2 text-center font-sans text-hum-sm text-muted-foreground">
          Client relationship tools will live here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
