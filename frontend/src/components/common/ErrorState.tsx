import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RefreshCw } from 'lucide-react-native';
import { useThemeColors } from '@/src/theme/ThemeProvider';
import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.error[50] }]}>
        <RefreshCw size={32} color={colors.error[600]} />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>Bir şeyler ters gitti</Text>
      <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
      {onRetry && (
        <Button label="Tekrar Dene" variant="primary" onPress={onRetry} style={styles.retryBtn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },
  retryBtn: {
    marginTop: 12,
  },
});
