import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, FontSize } from '@/constants/theme';

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  color?: string;
}

export function CategoryChip({ label, selected, onPress, color }: CategoryChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        selected
          ? { backgroundColor: color ?? Colors.primary[600], borderColor: color ?? Colors.primary[600] }
          : { backgroundColor: Colors.neutral[0], borderColor: Colors.neutral[200] },
      ]}
    >
      <Text
        style={[
          styles.text,
          selected ? { color: Colors.neutral[0] } : { color: Colors.neutral[600] },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: Radius.full,
    borderWidth: 1.5,
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
