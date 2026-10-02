import { StyleSheet, View, Text } from 'react-native';
import { Colors, Radius, Spacing, FontSize } from '@/constants/theme';

interface BadgeProps {
  label: string;
  color?: string;
  bgColor?: string;
  size?: 'sm' | 'md';
}

export function Badge({ label, color, bgColor, size = 'sm' }: BadgeProps) {
  const fontSize = size === 'sm' ? FontSize.xs : FontSize.sm;
  const padV = size === 'sm' ? 3 : Spacing.xs + 1;
  const padH = size === 'sm' ? Spacing.sm : Spacing.md;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bgColor ?? Colors.primary[50],
          paddingVertical: padV,
          paddingHorizontal: padH,
        },
      ]}
    >
      <Text style={[styles.text, { color: color ?? Colors.primary[700], fontSize }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
