import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, FontSize } from '@/constants/theme';
import { ApplicationStatus } from '@/types';

export const statusConfig: Record<ApplicationStatus, { color: string; bg: string }> = {
  Interested: { color: Colors.primary[700], bg: Colors.primary[50] },
  Applied: { color: Colors.accent[700], bg: Colors.accent[50] },
  Interview: { color: Colors.warning[600], bg: Colors.warning[50] },
  Successful: { color: Colors.success[600], bg: Colors.success[50] },
  Unsuccessful: { color: Colors.error[600], bg: Colors.error[50] },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  const fs = size === 'sm' ? FontSize.xs : FontSize.sm;
  const pv = size === 'sm' ? 3 : Spacing.xs + 1;
  const ph = size === 'sm' ? Spacing.sm : Spacing.md;

  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg, paddingVertical: pv, paddingHorizontal: ph }]}>
      <Text style={[styles.text, { color: cfg.color, fontSize: fs }]}>{status}</Text>
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
