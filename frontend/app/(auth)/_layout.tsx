import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { useThemeColors } from '@/src/theme/ThemeProvider';

export default function AuthLayout() {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.surface,
        },
        headerShadowVisible: false,
        animationDuration: 230,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          presentation: 'card',
          animation: Platform.OS === 'ios' ? 'slide_from_bottom' : 'fade_from_bottom',
        }}
      />
      <Stack.Screen
        name="terms"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
