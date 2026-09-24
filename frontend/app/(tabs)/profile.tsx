import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetProfileQuery } from '@/src/store/api/authApi';
import { BaseComponent } from '@/src/core/base/BaseComponent';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { ErrorHandler } from '@/src/core/exceptions/ErrorHandler';
import { Button } from '@/src/components/common/Button';
import { useAuth } from '@/src/core/auth/AuthProvider';
import { LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { signOut } = useAuth();
  const { data, isLoading, isError, error, refetch } = useGetProfileQuery();

  const handleRetry = useCallback(() => refetch(), [refetch]);

  if (isError) {
    ErrorHandler.log(error, 'ProfileScreen.getProfile');
  }

  return (
    <BaseComponent
      isLoading={isLoading}
      isError={isError}
      errorMessage={(error as Error)?.message ?? 'Profil yüklenemedi.'}
      onRetry={handleRetry}
      skeletonVariant="profile"
      skeletonCount={1}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>

      {data && (
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.primary[600] }]}>
              <Text style={styles.avatarText}>
                {data.firstName[0]}
                {data.lastName[0]}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.name, { color: colors.text }]}>
                {data.firstName} {data.lastName}
              </Text>
              <Text style={[styles.email, { color: colors.textMuted }]}>
                {data.email}
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>128</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Posts</Text>
            </View>
            <View style={[styles.statBox, { borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>1.2K</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Followers</Text>
            </View>
            <View style={[styles.statBox, { borderColor: colors.border }]}>
              <Text style={[styles.statValue, { color: colors.text }]}>340</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Following</Text>
            </View>
          </View>
        </View>
      )}

      <Button
        label="Çıkış Yap"
        variant="outline"
        onPress={() => signOut()}
        style={styles.logoutBtn}
      />
    </BaseComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 20,
    borderWidth: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  logoutBtn: {
    marginTop: 16,
  },
});
