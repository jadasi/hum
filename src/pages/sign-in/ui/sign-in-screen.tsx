import { Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { messageFromCaughtException, signInWithPassword } from '@/features/auth';
import { BottomTabInset } from '@/shared/lib/ui-tokens';
import { cn } from '@/shared/lib/utils';
import { HumArcLogo } from '@/shared/ui/hum-arc-logo';
import { Button, Input, Label, Text, textVariants } from '@/shared/ui/primitives';

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(async () => {
    if (submitting) {
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const { error: signInError } = await signInWithPassword(email, password);
      if (signInError) {
        setError(signInError);
      }
    } catch (e) {
      setError(messageFromCaughtException(e));
    } finally {
      setSubmitting(false);
    }
  }, [email, password, submitting]);

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView
        className="flex-1"
        edges={['top', 'bottom', 'left', 'right']}
        style={{ paddingBottom: BottomTabInset }}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}>
          <View className="flex-1">
            <View className="items-center px-6 pb-4 pt-2">
              <HumArcLogo />
            </View>
            <ScrollView
              className="flex-1"
              contentContainerClassName="grow justify-center gap-6 px-6 pb-8"
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <Text variant="title">Sign in</Text>
              <Text variant="subtitle">
                Use the email and password for your HUM driver account.
              </Text>

              <View className="gap-2">
                <Label nativeID="sign-in-email-label">Email</Label>
                <Input
                  accessibilityHint="Account email address"
                  accessibilityLabel="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  editable={!submitting}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="Email"
                  textContentType="username"
                  value={email}
                />
              </View>

              <View className="gap-2">
                <Label nativeID="sign-in-password-label">Password</Label>
                <Input
                  accessibilityHint="Your account password"
                  accessibilityLabel="Password"
                  autoCapitalize="none"
                  autoComplete="password"
                  editable={!submitting}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  textContentType="password"
                  value={password}
                />
              </View>

              {error ? (
                <Text accessibilityRole="alert" variant="destructive">
                  {error}
                </Text>
              ) : null}

              <Button
                accessibilityHint="Submits email and password to sign in"
                className="mt-2"
                loading={submitting}
                onPress={() => void onSubmit()}>
                Sign in
              </Button>

              <View className="flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-4">
                <Text variant="muted">New here?</Text>
                <Link
                  accessibilityLabel="Go to create account"
                  accessibilityRole="link"
                  className={cn(textVariants({ variant: 'link' }))}
                  href="/sign-up">
                  Create an account
                </Link>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
