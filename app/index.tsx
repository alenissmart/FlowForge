import { Redirect } from "expo-router";

export default function Index() {
  const onboarding_completed = false;
  const show_auth = true;
  
  if (show_auth) {
    return <Redirect href="/(auth)" />; 
  } else {
    if (onboarding_completed) {
      return <Redirect href="/(tabs)" />; 
    } else {
      return <Redirect href="/(onboarding)" />;
    }
  }
  
}