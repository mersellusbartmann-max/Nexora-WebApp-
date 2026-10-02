import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Briefcase, GraduationCap, Coffee, Wrench, Library, ArrowRight } from 'lucide-react-native';
import { Colors, Radius, Spacing, FontSize, Shadows } from '@/constants/theme';

interface QuickAccessProps {
  onCategoryPress: (category: string) => void;
}

const items = [
  { label: 'Jobs', icon: Briefcase, color: Colors.primary[600], bg: Colors.primary[50] },
  { label: 'Learnerships', icon: GraduationCap, color: Colors.accent[600], bg: Colors.accent[50] },
  { label: 'Internships', icon: Coffee, color: Colors.primary[700], bg: Colors.primary[100] },
  { label: 'Training', icon: Wrench, color: Colors.accent[700], bg: Colors.accent[100] },
  { label: 'Resources', icon: Library, color: Colors.warning[600], bg: Colors.warning[50] },
];

export function QuickAccess({ onCategoryPress }: QuickAccessProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {items.map((item) => {
        const Icon = item.icon;
      return (
        <TouchableOpacity
          key={item.label}
          onPress={() => onCategoryPress(item.label)}
          activeOpacity={0.8}
          style={styles.item}
        >
          <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
            <Icon size={22} color={item.color} strokeWidth={2} />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
    paddingHorizontal: 2,
  },
  item: {
    alignItems: 'center',
    width: 72,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs + 2,
    ...Shadows.sm,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.neutral[700],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});
