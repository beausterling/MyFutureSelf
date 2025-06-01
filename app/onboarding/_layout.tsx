import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFFFFF' }
      }}
    >
      <Stack.Screen name="verify-phone" />
      <Stack.Screen name="pick-goal" />
      <Stack.Screen name="call-style" />
      <Stack.Screen name="choose-voice" />
      <Stack.Screen name="consent" />
    </Stack>
  );
}