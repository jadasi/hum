import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { signOut } from '@/features/auth';
import { BottomTabInset } from '@/shared/lib/ui-tokens';

export default function DriverHomeScreen() {
  const [signingOut, setSigningOut] = useState(false);

  const onSignOut = useCallback(async () => {
    if (signingOut) {
      return;
    }
    setSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        Alert.alert('Sign out failed', error);
        return;
      }
      router.replace('/sign-in');
    } finally {
      setSigningOut(false);
    }
  }, [signingOut]);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView
        className="flex-1"
        edges={['top', 'left', 'right']}
        style={{ paddingBottom: BottomTabInset }}>
        <View className="flex-1 px-6 pt-4">
          <View className="flex-row items-center justify-end">
            <Pressable
              accessibilityHint="Ends your session and returns to the sign-in screen"
              accessibilityLabel="Sign out"
              accessibilityRole="button"
              className="min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border border-border px-4 active:opacity-80 disabled:opacity-60"
              disabled={signingOut}
              hitSlop={8}
              onPress={() => void onSignOut()}>
              {signingOut ? (
                <ActivityIndicator />
              ) : (
                <Text className="font-sans text-hum-sm font-hum-semibold text-foreground">Sign out</Text>
              )}
            </Pressable>
          </View>
          <View className="flex-1 items-center justify-center">
            <Text className="text-center font-sans text-hum-2xl font-hum-bold text-foreground">HUM</Text>
            <Text className="mt-3 max-w-md text-center font-sans text-hum-base text-muted-foreground">
              Signed in. Driver home and concierge flows will live here.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
