import React from 'react';
import { View, ViewStyle, StyleProp, StyleSheet } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { useThemeColors } from '@/src/theme/ThemeProvider';

interface SkeletonListProps {
  count?: number;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonList = React.memo(function SkeletonList({
  count = 3,
  style,
}: SkeletonListProps) {
  const colors = useThemeColors();
  const base = colors.neutral[200];
  const highlight = colors.neutral[50];

  return (
    <View style={[{ gap: 16 }, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 16,
            gap: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 6,
            elevation: 2,
          }}
        >
          <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={8} boxHeight={20} width={'60%'} />
          <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={8} boxHeight={14} width={'100%'} />
          <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={8} boxHeight={14} width={'90%'} />
          <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={8} boxHeight={14} width={'75%'} />
        </View>
      ))}
    </View>
  );
});
