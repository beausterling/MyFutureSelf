import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium,
  Inter_600SemiBold, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

// Import appropriate Clerk provider based on platform
import { ClerkProvider as ClerkExpoProvider } from '@clerk/clerk-expo';
import { ClerkProvider as ClerkWebProvider } from '@clerk/clerk-react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = Platform.select({
  web: {
    getToken: (key: string) => window.localStorage.getItem(key),
    saveToken: (key: string, value: string) => window.localStorage.setItem(key, value),
  },
  default: {
    getToken: (key: string) => SecureStore.getItemAsync(key),
    saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  },
});

export default function RootLayout() {
  // Framework ready hook must be called unconditionally
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const frontendApi = process.env.EXPO_PUBLIC_CLERK_FRONTEND_API;

  if (!publishableKey) {
    throw new Error('Missing Clerk publishable key');
  }

  // Use appropriate provider based on platform
  if (Platform.OS === 'web') {
    if (!frontendApi) {
      throw new Error('Missing Clerk frontend API');
    }

    return (
      <ClerkWebProvider publishableKey={publishableKey} frontendApi={frontendApi}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Welcome' }} />
          <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
          <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
        <StatusBar style="light" />
      </ClerkWebProvider>
    );
  }

  return (
    <ClerkExpoProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ title: 'Welcome' }} />
        <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="light" />
    </ClerkExpoProvider>
  );
}