import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useThemeColors } from '@/src/theme/ThemeProvider';

interface ToastState {
  message: string;
  visible: boolean;
}

let setter: ((state: ToastState) => void) | null = null;

export function showToast(message: string) {
  setter?.({ message, visible: true });
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  const [state, setState] = React.useState<ToastState>({ message: '', visible: false });
  const opacity = useSharedValue(0);
  const offsetY = useSharedValue(-20);

  useEffect(() => {
    setter = (s) => setState(s);
    return () => { setter = null; };
  }, []);

  useEffect(() => {
    if (state.visible) {
      opacity.value = withTiming(1, { duration: 250 });
      offsetY.value = withTiming(0, { duration: 250 });
      const t = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 300 });
        offsetY.value = withTiming(-20, { duration: 300 });
        setTimeout(() => setState((s) => ({ ...s, visible: false })), 300);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [state.visible, opacity, offsetY]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offsetY.value }],
  }));

  if (!state.visible) return <>{children}</>;

  return (
    <>
      {children}
      <Animated.View
        style={[
          styles.toast,
          { backgroundColor: colors.neutral[900] },
          animStyle,
        ]}
        pointerEvents="none"
      >
        <Text style={[styles.text, { color: colors.neutral[50] }]}>{state.message}</Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
