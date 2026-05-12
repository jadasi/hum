import { Link } from 'expo-router';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { messageFromCaughtException, signUp } from '@/features/auth';
import { getSignUpFeedback } from '@/pages/sign-up/model';
import { BottomTabInset } from '@/shared/lib/ui-tokens';
import { cn } from '@/shared/lib/utils';
import { HumArcLogo } from '@/shared/ui/hum-arc-logo';
import { Button, Card, Input, Label, Text, textVariants } from '@/shared/ui/primitives';

const MIN_PASSWORD_LEN = 8;

export function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<{ title: string; body: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = useCallback(async () => {
    if (submitting) {
      return;
    }
    setError(null);
    setInfo(null);

    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < MIN_PASSWORD_LEN) {
      setError(`Password must be at least ${MIN_PASSWORD_LEN} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const result = await signUp(email, password);
      const feedback = getSignUpFeedback(result);
      if (feedback.kind === 'error') {
        setError(feedback.message);
      } else if (feedback.kind === 'awaiting_email') {
        setInfo({ title: feedback.title, body: feedback.body });
      }
    } catch (e) {
      setError(messageFromCaughtException(e));
    } finally {
      setSubmitting(false);
    }
  }, [email, password, confirm, submitting]);

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
              contentContainerClassName="grow px-6 pb-8 pt-2"
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View className="mx-auto w-full max-w-[800px] gap-6">
              <Text variant="title">Create account</Text>
              <Text variant="subtitle">
                Use your work email. You will use this to sign in to HUM.
              </Text>

              <View className="gap-2">
                <Label nativeID="sign-up-email-label">Email</Label>
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
                  textContentType="emailAddress"
                  value={email}
                />
              </View>

              <View className="gap-2">
                <Label nativeID="sign-up-password-label">Password</Label>
                <Input
                  accessibilityHint={`At least ${MIN_PASSWORD_LEN} characters`}
                  accessibilityLabel="Password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  editable={!submitting}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  textContentType="newPassword"
                  value={password}
                />
              </View>

              <View className="gap-2">
                <Label nativeID="sign-up-confirm-label">Confirm password</Label>
                <Input
                  accessibilityLabel="Confirm password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  editable={!submitting}
                  onChangeText={setConfirm}
                  placeholder="Confirm password"
                  secureTextEntry
                  textContentType="newPassword"
                  value={confirm}
                />
              </View>

              {error ? (
                <Text accessibilityRole="alert" variant="destructive">
                  {error}
                </Text>
              ) : null}

              {info ? (
                <Card accessibilityLabel={`${info.title}. ${info.body}`} accessibilityLiveRegion="polite" accessible>
                  <Text className="text-center text-hum-md font-hum-semibold" variant="body">
                    {info.title}
                  </Text>
                  <Text className="mt-2 text-center" variant="subtitle">
                    {info.body}
                  </Text>
                </Card>
              ) : null}

              <Button
                accessibilityHint="Creates your driver account"
                loading={submitting}
                onPress={() => void onSubmit()}>
                Create account
              </Button>

              <View className="flex-row flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-2">
                <Text variant="muted">Already have an account?</Text>
                <Link
                  accessibilityLabel="Go to sign in"
                  accessibilityRole="link"
                  className={cn(textVariants({ variant: 'link' }))}
                  href="/sign-in">
                  Sign in instead
                </Link>
              </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
