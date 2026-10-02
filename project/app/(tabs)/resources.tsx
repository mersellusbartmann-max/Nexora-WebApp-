import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import {
  FileText, MessageSquare, Search, Briefcase, Laptop, Sparkles, Wallet, Mail,
  Clock, ArrowRight, BookOpen,
} from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { demoResources } from '@/constants/demoData';
import { TouchableOpacity } from 'react-native';
import { SectionHeader } from '@/components/ui/SectionHeader';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  FileText,
  MessageSquare,
  Search,
  Briefcase,
  Laptop,
  Sparkles,
  Wallet,
  Mail,
};

const categoryColors: Record<string, { color: string; bg: string }> = {
  'CV Tips': { color: Colors.primary[600], bg: Colors.primary[50] },
  'Interview Prep': { color: Colors.accent[600], bg: Colors.accent[50] },
  'Job Search': { color: Colors.primary[700], bg: Colors.primary[100] },
  'Workplace Skills': { color: Colors.accent[700], bg: Colors.accent[100] },
  'Digital Skills': { color: Colors.warning[600], bg: Colors.warning[50] },
  'AI Skills': { color: Colors.primary[600], bg: Colors.primary[50] },
  'Financial Basics': { color: Colors.success[600], bg: Colors.success[50] },
  'Communication': { color: Colors.accent[600], bg: Colors.accent[50] },
};

export default function ResourcesScreen() {
  const { } = useApp();

  const featured = demoResources[0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resources</Text>
        <Text style={styles.headerSubtitle}>Career development guides and tips</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Featured resource */}
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/resource/[id]', params: { id: featured.id } })}
          activeOpacity={0.85}
          style={styles.featuredCard}
        >
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>Featured Guide</Text>
          </View>
          <View style={styles.featuredIconWrap}>
            {(() => {
              const Icon = iconMap[featured.icon] ?? FileText;
              return <Icon size={28} color={Colors.primary[600]} strokeWidth={2} />;
            })()}
          </View>
          <Text style={styles.featuredTitle}>{featured.title}</Text>
          <Text style={styles.featuredDesc} numberOfLines={2}>{featured.description}</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.featuredMeta}>
              <Clock size={13} color={Colors.neutral[400]} strokeWidth={2} />
              <Text style={styles.featuredMetaText}>{featured.readTime}</Text>
            </View>
            <View style={styles.featuredArrow}>
              <Text style={styles.featuredArrowText}>Read now</Text>
              <ArrowRight size={14} color={Colors.primary[600]} strokeWidth={2} />
            </View>
          </View>
        </TouchableOpacity>

        {/* All resources */}
        <View style={styles.section}>
          <SectionHeader title="All Resources" subtitle={`${demoResources.length} guides available`} />
          <View style={styles.resourceList}>
            {demoResources.map((resource) => {
              const Icon = iconMap[resource.icon] ?? FileText;
              const colors = categoryColors[resource.category] ?? { color: Colors.primary[600], bg: Colors.primary[50] };
              return (
                <TouchableOpacity
                  key={resource.id}
                  onPress={() => router.push({ pathname: '/resource/[id]', params: { id: resource.id } })}
                  activeOpacity={0.8}
                  style={styles.resourceCard}
                >
                  <View style={[styles.resourceIconWrap, { backgroundColor: colors.bg }]}>
                    <Icon size={20} color={colors.color} strokeWidth={2} />
                  </View>
                  <View style={styles.resourceTextWrap}>
                    <View style={styles.resourceCategoryRow}>
                      <Text style={[styles.resourceCategory, { color: colors.color }]}>{resource.category}</Text>
                    </View>
                    <Text style={styles.resourceTitle} numberOfLines={2}>{resource.title}</Text>
                    <Text style={styles.resourceDesc} numberOfLines={1}>{resource.description}</Text>
                    <View style={styles.resourceFooter}>
                      <Clock size={12} color={Colors.neutral[400]} strokeWidth={2} />
                      <Text style={styles.resourceReadTime}>{resource.readTime}</Text>
                    </View>
                  </View>
                  <ArrowRight size={18} color={Colors.neutral[300]} strokeWidth={2} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'web' ? Spacing.lg : Spacing.xl + 16,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.neutral[0],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  headerTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl + 20,
  },
  featuredCard: {
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.md,
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.primary[50],
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  featuredBadgeText: {
    fontSize: FontSize.xs,
    color: Colors.primary[700],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  featuredIconWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  featuredTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm,
  },
  featuredDesc: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md - 2,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredMetaText: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
  },
  featuredArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredArrowText: {
    fontSize: FontSize.sm,
    color: Colors.primary[600],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    flex: 1,
  },
  resourceList: {
    gap: Spacing.sm + 2,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    gap: Spacing.md,
    ...Shadows.sm,
  },
  resourceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceTextWrap: {
    flex: 1,
  },
  resourceCategoryRow: {
    marginBottom: 2,
  },
  resourceCategory: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  resourceTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  resourceDesc: {
    fontSize: FontSize.sm,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  resourceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resourceReadTime: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
  },
});
