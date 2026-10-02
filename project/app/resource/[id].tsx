import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Clock, CheckCircle2, BookOpen } from 'lucide-react-native';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { demoResources } from '@/constants/demoData';
import { Badge } from '@/components/ui/Badge';

export default function ResourceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const resource = demoResources.find((r) => r.id === id);

  if (!resource) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Resource not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
          <ArrowLeft size={22} color={Colors.neutral[0]} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.badgeRow}>
            <Badge label={resource.category} />
            <View style={styles.readTimeBadge}>
              <Clock size={13} color={Colors.neutral[400]} strokeWidth={2} />
              <Text style={styles.readTimeText}>{resource.readTime}</Text>
            </View>
          </View>
          <Text style={styles.title}>{resource.title}</Text>
          <Text style={styles.description}>{resource.description}</Text>
        </View>

        {resource.content.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.heading}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
            {section.tips && section.tips.length > 0 && (
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsLabel}>Key tips:</Text>
                {section.tips.map((tip, j) => (
                  <View key={j} style={styles.tipItem}>
                    <CheckCircle2 size={16} color={Colors.accent[600]} strokeWidth={2} />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={styles.demoNotice}>
          <BookOpen size={16} color={Colors.neutral[400]} strokeWidth={2} />
          <Text style={styles.demoNoticeText}>
            This is a demo resource guide for the Nexora prototype. In production, these guides would be fully interactive with videos and downloadable templates.
          </Text>
        </View>

        <View style={{ height: Spacing.xxl }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Platform.OS === 'web' ? Spacing.md : Spacing.xl + 16,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.primary[600],
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  infoCard: {
    backgroundColor: Colors.neutral[0],
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.md,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md - 2,
    flexWrap: 'wrap',
  },
  readTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTimeText: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    lineHeight: 30,
    marginBottom: Spacing.sm + 2,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm + 2,
  },
  sectionBody: {
    fontSize: FontSize.md,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  tipsContainer: {
    backgroundColor: Colors.accent[50],
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  tipsLabel: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.accent[700],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm + 2,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    marginBottom: Spacing.sm - 2,
  },
  tipText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  demoNotice: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.neutral[100],
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  demoNoticeText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.neutral[50],
  },
  notFoundText: {
    fontSize: FontSize.lg,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  backLink: {
    padding: Spacing.sm,
  },
  backLinkText: {
    fontSize: FontSize.md,
    color: Colors.primary[600],
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
});
