import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
}

import { TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

export function SectionHeader({ title, subtitle, actionText, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {actionText && onAction && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7} style={styles.action}>
          <Text style={styles.actionText}>{actionText}</Text>
          <ArrowRight size={14} color={Colors.primary[600]} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md - 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.sm,
  },
  actionText: {
    fontSize: FontSize.sm,
    color: Colors.primary[600],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
