import { useEffect, useRef } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
// import { ThemeProvider as NavThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as SystemUI from 'expo-system-ui';

import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { store, resetStore } from '@/src/store';
import { setupInterceptors } from '@/src/core/network/interceptors';
import { ThemeProvider, useThemeColors } from '@/src/theme/ThemeProvider';
import { ToastProvider, showToast } from '@/src/components/common/Toast';
import { setGlobalToastHandler } from '@/src/core/exceptions/ErrorHandler';
import { AuthProvider, useAuth } from '@/src/core/auth/AuthProvider';
import { OfflineBanner } from '@/src/components/common/OfflineBanner';
import { baseApi } from '@/src/store/api/baseApi';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    setupInterceptors(() => {
      resetStore();
      showToast('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
    });
    setGlobalToastHandler((message) => showToast(message));
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <RootNavigator />
              <OfflineBanner />
              <StatusBar style="auto" />
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

function RootNavigator() {
  const { session, initializing } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const colors = useThemeColors();
  const wasConnectedRef = useRef(true);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background).catch(() => {});
  }, [colors.background]);

  // const navigationTheme = {
  //   ...(colors.isDark ? DarkTheme : DefaultTheme),
  //   colors: {
  //     ...(colors.isDark ? DarkTheme.colors : DefaultTheme.colors),
  //     background: colors.background,
  //     card: colors.surface,
  //     text: colors.text,
  //     border: colors.border,
  //     primary: colors.primary[600],
  //   },
  // };

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, initializing, segments, router]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected ?? false;
      if (!wasConnectedRef.current && isConnected) {
        store.dispatch(baseApi.util.invalidateTags(['Posts', 'Profile']));
      }
      wasConnectedRef.current = isConnected;
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary[600]} />
      </View>
    );
  }

  // return (
  //   <NavThemeProvider value={navigationTheme}>
  //     <Stack
  //       screenOptions={{
  //         headerShown: false,
  //         animation: 'fade',
  //         animationDuration: 250,
  //         contentStyle: { backgroundColor: colors.background },
  //       }}
  //     >
  //       <Stack.Screen name="(auth)" />
  //       <Stack.Screen name="(tabs)" />
  //       <Stack.Screen name="+not-found" />
  //     </Stack>
  //   </NavThemeProvider>
  // );

  return (
  <Stack
    screenOptions={{
      headerShown: false,
      animation: 'fade',
      animationDuration: 250,
      contentStyle: { backgroundColor: colors.background },
    }}
  >
    <Stack.Screen name="(auth)" />
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="+not-found" />
  </Stack>
);}
