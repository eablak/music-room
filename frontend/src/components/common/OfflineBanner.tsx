import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { WifiOff } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { useNetworkStatus } from '@/src/hooks/useNetworkStatus';

export function OfflineBanner() {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { isConnected, isChecking } = useNetworkStatus();

  const show = !isChecking && !isConnected;
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-60);

  useEffect(() => {
    if (show) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      opacity.value = withDelay(100, withTiming(0, { duration: 250 }));
      translateY.value = withDelay(100, withTiming(-60, { duration: 250 }));
    }
  }, [show, opacity, translateY]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.warning[600], paddingTop: insets.top + 4 },
        animStyle,
      ]}
      pointerEvents={show ? 'auto' : 'none'}
    >
      <View style={styles.content}>
        <WifiOff size={18} color="#ffffff" strokeWidth={2.5} />
        <Text style={styles.text}>
          Çevrimdışı Mod — Önbellekteki veriler gösteriliyor
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
    paddingHorizontal: 16,
    zIndex: 999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
