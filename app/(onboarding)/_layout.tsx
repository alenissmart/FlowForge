import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="personalInfo" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="scheduleInfo" />
      <Stack.Screen name="done" />
    </Stack>
  );
}