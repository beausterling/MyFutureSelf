import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { 
  useFonts, 
  Inter_400Regular, 
  Inter_500Medium,
  Inter_600SemiBold, 
  Inter_700Bold 
} from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Import appropriate Clerk provider based on platform
import { ClerkProvider as ClerkExpoProvider, useAuth } from '@clerk/clerk-expo';
import { ClerkProvider as ClerkWebProvider } from '@clerk/clerk-react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const tokenCache = Platform.select({
  web: {
    async getToken(key: string) {
      try {
        return localStorage.getItem(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        localStorage.setItem(key, value);
      } catch (err) {
        return;
      }
    },
  },
  default: {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  },
});

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';
    const inOnboarding = segments[0] === 'onboarding';
    const inAuthGroup = segments[0] === 'sign-in' || segments[0] === 'sign-up';

    if (isSignedIn) {
      // If the user is signed in but in the onboarding flow, let them complete it
      if (!inOnboarding && !inTabsGroup && !inAuthGroup) {
        // Otherwise, send them to the main app
        router.replace('/(tabs)');
      }
    } else {
      // If the user isn't signed in, send them to the welcome screen
      if (inTabsGroup || inOnboarding) {
        router.replace('/');
      }
    }
  }, [isSignedIn, segments, isLoaded, router]);

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}

export default function RootLayout() {
  // Framework ready hook must be called unconditionally before any other hooks
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
    throw new Error("Missing Clerk publishable key");
  }

  if (Platform.OS === 'web') {
    if (!frontendApi) {
      throw new Error("Missing Clerk frontend API");
    }

    return (
      <ClerkWebProvider frontendApi={frontendApi} publishableKey={publishableKey}>
        <InitialLayout />
        <StatusBar style="light" />
      </ClerkWebProvider>
    );
  }

  return (
    <ClerkExpoProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <InitialLayout />
      <StatusBar style="light" />
    </ClerkExpoProvider>
  );
}