import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { useThemeColors } from '@/src/theme/ThemeProvider';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
}

export function FormInput({
  label,
  error,
  touched,
  secureTextEntry = false,
  style,
  ...rest
}: FormInputProps) {
  const colors = useThemeColors();
  const [showPassword, setShowPassword] = useState(false);
  const hasError = touched && !!error;
  const isSecure = secureTextEntry && !showPassword;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.inputWrap,
          {
            backgroundColor: colors.surface,
            borderColor: hasError ? colors.error[500] : colors.border,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }, style]}
          placeholderTextColor={colors.neutral[400]}
          secureTextEntry={isSecure}
          autoCapitalize="none"
          autoCorrect={false}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            style={styles.iconBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.textMuted} />
            ) : (
              <Eye size={20} color={colors.textMuted} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {hasError && (
        <View style={styles.errorRow}>
          <AlertCircle size={14} color={colors.error[500]} />
          <Text style={[styles.errorText, { color: colors.error[500] }]}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  iconBtn: {
    padding: 4,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
