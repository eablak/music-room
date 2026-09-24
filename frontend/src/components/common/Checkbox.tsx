import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useThemeColors } from '@/src/theme/ThemeProvider';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function Checkbox({ checked, onToggle }: CheckboxProps) {
  const colors = useThemeColors();

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      style={[
        styles.box,
        {
          backgroundColor: checked ? colors.primary[600] : 'transparent',
          borderColor: checked ? colors.primary[600] : colors.border,
        },
      ]}
    >
      {checked && <Check size={16} color="#ffffff" strokeWidth={3} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
});
