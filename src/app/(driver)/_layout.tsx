import { Redirect, router, Slot } from 'expo-router';
import * as React from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

import { evaluateDriverGuard, signOut, useAuthStore } from '@/features/auth';
import { AnimatedSplashOverlay } from '@/shared/ui/animated-icon';
import { Button } from '@/shared/ui/primitives/button';

import { DriverDrawerProvider } from './driver-drawer-context';

function DriverDrawerContent() {
  const [signingOut, setSigningOut] = React.useState(false);

  const onSignOut = React.useCallback(async () => {
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
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingVertical: 24 }}>
      <View className="flex-1 justify-between">
        <View className="gap-1">
          <View className="mt-6 gap-3">
            <Button disabled variant="ghost">
              Profile
            </Button>
            <Button disabled variant="ghost">
              Ride history
            </Button>
            <Button disabled variant="ghost">
              Earnings
            </Button>
            <Button disabled variant="ghost">
              Settings
            </Button>
          </View>
        </View>
        <Button
          accessibilityHint="Ends your session and returns to the sign-in screen"
          accessibilityLabel="Sign out"
          loading={signingOut}
          onPress={() => void onSignOut()}
          variant="outline">
          Sign out
        </Button>
      </View>
    </ScrollView>
  );
}

export default function DriverLayout() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const hydrated = useAuthStore((s) => s.hydrated);
  const status = useAuthStore((s) => s.status);
  const guard = evaluateDriverGuard(hydrated, status);

  if (guard.kind === 'loading') {
    return null;
  }
  if (guard.kind === 'redirect') {
    return <Redirect href={guard.href} />;
  }

  return (
    <>
      <AnimatedSplashOverlay />
      <Drawer
        drawerPosition="right"
        drawerStyle={{ width: 300 }}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        open={drawerOpen}
        renderDrawerContent={() => <DriverDrawerContent />}>
        <DriverDrawerProvider openDrawer={() => setDrawerOpen(true)}>
          <Slot />
        </DriverDrawerProvider>
      </Drawer>
    </>
  );
}
