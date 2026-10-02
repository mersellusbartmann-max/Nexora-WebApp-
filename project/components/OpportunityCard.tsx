import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { MapPin, Calendar, Building2, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { Opportunity } from '@/types';
import { Colors, Radius, Spacing, FontSize, Shadows } from '@/constants/theme';
import { categoryColors, categoryBgColors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onPress: () => void;
  compact?: boolean;
}

export function OpportunityCard({ opportunity, onPress, compact }: OpportunityCardProps) {
  const { isSaved, toggleSave } = useApp();
  const saved = isSaved(opportunity.id);
  const catColor = categoryColors[opportunity.category] ?? Colors.primary[500];
  const catBg = categoryBgColors[opportunity.category] ?? Colors.primary[50];

  const daysLeft = Math.ceil(
    (new Date(opportunity.closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const closingText = daysLeft < 0 ? 'Closed' : daysLeft === 0 ? 'Closes today' : `${daysLeft} days left`;
  const closingColor = daysLeft <= 3 ? Colors.error[600] : daysLeft <= 7 ? Colors.warning[600] : Colors.neutral[500];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: catBg }]}>
          <Text style={[styles.categoryText, { color: catColor }]}>{opportunity.category}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleSave(opportunity.id)}
          hitSlop={12}
          style={styles.saveButton}
        >
          {saved ? (
            <BookmarkCheck size={20} color={Colors.primary[600]} strokeWidth={2} />
          ) : (
            <Bookmark size={20} color={Colors.neutral[400]} strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.title} numberOfLines={2}>{opportunity.title}</Text>

      <View style={styles.orgRow}>
        <Building2 size={14} color={Colors.neutral[500]} strokeWidth={2} />
        <Text style={styles.orgText} numberOfLines={1}>{opportunity.organisation}</Text>
      </View>

      {!compact && (
        <Text style={styles.description} numberOfLines={2}>{opportunity.description}</Text>
      )}

      <View style={styles.footer}>
        <View style={styles.metaItem}>
          <MapPin size={13} color={Colors.neutral[400]} strokeWidth={2} />
          <Text style={styles.metaText} numberOfLines={1}>{opportunity.location}</Text>
        </View>
        <View style={styles.metaItem}>
          <Calendar size={13} color={closingColor} strokeWidth={2} />
          <Text style={[styles.metaText, { color: closingColor }]}>{closingText}</Text>
        </View>
      </View>

      {opportunity.isDemo && (
        <View style={styles.demoTag}>
          <Text style={styles.demoText}>Demo</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  saveButton: {
    padding: Spacing.xs,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  orgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  orgText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: Spacing.md - 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
    gap: Spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  metaText: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  demoTag: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.warning[100],
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderTopRightRadius: Radius.lg,
    borderBottomLeftRadius: Radius.sm,
  },
  demoText: {
    fontSize: 10,
    color: Colors.warning[600],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
