import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { SkeletonList } from '@/src/components/common/SkeletonList';
import { ErrorState } from '@/src/components/common/ErrorState';

type SkeletonVariant = 'list' | 'profile' | 'card';

interface BaseComponentProps {
  children: React.ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  skeletonVariant?: SkeletonVariant;
  skeletonCount?: number;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  edges?: ['top' | 'bottom' | 'left' | 'right'];
}

export function BaseComponent({
  children,
  isLoading = false,
  isError = false,
  errorMessage = 'Veriler yüklenemedi.',
  onRetry,
  skeletonVariant = 'list',
  skeletonCount = 4,
  scrollable = true,
  style,
  edges = ['top'],
}: BaseComponentProps) {
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();

  const paddingTop = edges.includes('top') ? insets.top : 0;
  const paddingBottom = edges.includes('bottom') ? insets.bottom : 0;

  const content = (
    <View
      style={[
        styles.inner,
        { paddingTop, paddingBottom, backgroundColor: colors.background },
        style,
      ]}
    >
      {isLoading ? (
        <SkeletonList count={skeletonCount} />
      ) : isError ? (
        <ErrorState message={errorMessage} onRetry={onRetry} />
      ) : (
        children
      )}
    </View>
  );

  if (scrollable && !isLoading && !isError) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: colors.background }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {content}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
    width: '100%',
  },
});
