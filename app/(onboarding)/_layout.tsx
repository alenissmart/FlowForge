import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="personalInfoScreen" />
      <Stack.Screen name="preferencesScreen" />
      <Stack.Screen name="scheduleInfoScreen" />
      <Stack.Screen name="doneScreen" />
    </Stack>
  );
}
