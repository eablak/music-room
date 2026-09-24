import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from 'moti/skeleton';
import { useThemeColors } from '@/src/theme/ThemeProvider';

export function SkeletonProfileCard() {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.header}>
        <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={40} boxHeight={80} width={80} />
        <View style={styles.headerText}>
          <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={8} boxHeight={20} width={'70%'} />
          <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={8} boxHeight={14} width={'50%'} />
        </View>
      </View>
      <View style={styles.statsRow}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={[styles.statBox, { borderColor: colors.border }]}>
            <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={6} boxHeight={18} width={40} />
            <Skeleton colorMode={colors.isDark ? 'dark' : 'light'} radius={6} boxHeight={12} width={50} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 20,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
    gap: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 4,
  },
});
