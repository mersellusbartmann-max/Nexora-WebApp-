import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft, MapPin, Calendar, Building2, CheckCircle2, Bookmark, BookmarkCheck,
  ClipboardPlus, AlertCircle, ExternalLink, Sparkles,
} from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sheet } from '@/components/ui/Sheet';
import { StatusBadge, statusConfig } from '@/components/ui/StatusBadge';
import { ApplicationStatus } from '@/types';

const statusOptions: ApplicationStatus[] = ['Interested', 'Applied', 'Interview', 'Successful', 'Unsuccessful'];

export default function OpportunityDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { opportunities, isSaved, toggleSave, addApplication, getApplicationForOpportunity } = useApp();
  const [statusSheetOpen, setStatusSheetOpen] = useState(false);

  const opportunity = opportunities.find((o) => o.id === id);

  if (!opportunity) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Opportunity not found</Text>
        <Button label="Go back" onPress={() => router.back()} variant="outline" size="sm" />
      </View>
    );
  }

  const saved = isSaved(opportunity.id);
  const trackedApp = getApplicationForOpportunity(opportunity.id);
  const daysLeft = Math.ceil((new Date(opportunity.closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const isClosed = daysLeft < 0;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
            <ArrowLeft size={22} color={Colors.neutral[0]} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleSave(opportunity.id)} hitSlop={12} style={styles.backBtn}>
            {saved ? (
              <BookmarkCheck size={22} color={Colors.neutral[0]} strokeWidth={2} />
            ) : (
              <Bookmark size={22} color={Colors.neutral[0]} strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          <View style={styles.badgeRow}>
            <Badge label={opportunity.category} />
            {opportunity.isDemo && <Badge label="Demo Opportunity" color={Colors.warning[600]} bgColor={Colors.warning[50]} />}
          </View>

          <Text style={styles.title}>{opportunity.title}</Text>

          <View style={styles.metaList}>
            <View style={styles.metaRow}>
              <Building2 size={16} color={Colors.neutral[400]} strokeWidth={2} />
              <Text style={styles.metaText}>{opportunity.organisation}</Text>
            </View>
            <View style={styles.metaRow}>
              <MapPin size={16} color={Colors.neutral[400]} strokeWidth={2} />
              <Text style={styles.metaText}>{opportunity.location}</Text>
            </View>
            <View style={styles.metaRow}>
              <Calendar size={16} color={isClosed ? Colors.error[500] : Colors.neutral[400]} strokeWidth={2} />
              <Text style={[styles.metaText, isClosed && { color: Colors.error[600] }]}>
                {isClosed ? 'Closed' : `Closes on ${formatDate(opportunity.closingDate)}`}
                {!isClosed && daysLeft <= 7 ? `  (${daysLeft} day${daysLeft === 1 ? '' : 's'} left)` : ''}
              </Text>
            </View>
          </View>

          {trackedApp && (
            <View style={styles.trackedRow}>
              <Text style={styles.trackedLabel}>In your tracker:</Text>
              <StatusBadge status={trackedApp.status} size="md" />
            </View>
          )}
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this opportunity</Text>
          <Text style={styles.bodyText}>{opportunity.description}</Text>
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <View style={styles.reqList}>
            {opportunity.requirements.map((req, i) => (
              <View key={i} style={styles.reqItem}>
                <CheckCircle2 size={16} color={Colors.accent[600]} strokeWidth={2} />
                <Text style={styles.reqText}>{req}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* How to apply */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to apply</Text>
          <View style={styles.applyBox}>
            <AlertCircle size={18} color={Colors.primary[600]} strokeWidth={2} />
            <Text style={styles.applyText}>{opportunity.applicationInstructions}</Text>
          </View>
        </View>

        {/* Demo notice */}
        {opportunity.isDemo && (
          <View style={styles.demoNotice}>
            <Sparkles size={16} color={Colors.warning[600]} strokeWidth={2} />
            <Text style={styles.demoNoticeText}>
              This is a demo opportunity for showcase purposes. The organisation and contact details are fictional.
            </Text>
          </View>
        )}

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>

      {/* Sticky action bar */}
      <View style={styles.actionBar}>
        <Button
          label={saved ? 'Saved' : 'Save'}
          onPress={() => toggleSave(opportunity.id)}
          variant={saved ? 'outline' : 'ghost'}
          size="md"
          icon={saved ? <BookmarkCheck size={18} color={Colors.primary[600]} strokeWidth={2} /> : <Bookmark size={18} color={Colors.neutral[600]} strokeWidth={2} />}
        />
        <View style={styles.actionBarMain}>
          {trackedApp ? (
            <Button
              label={`Status: ${trackedApp.status}`}
              onPress={() => setStatusSheetOpen(true)}
              variant="secondary"
              fullWidth
            />
          ) : (
            <Button
              label="Add to Tracker"
              onPress={() => setStatusSheetOpen(true)}
              variant="primary"
              fullWidth
              icon={<ClipboardPlus size={18} color={Colors.neutral[0]} strokeWidth={2} />}
            />
          )}
        </View>
      </View>

      <Sheet visible={statusSheetOpen} onClose={() => setStatusSheetOpen(false)} title="Add to Application Tracker">
        <Text style={styles.sheetSubtitle}>
          Select the status for <Text style={styles.sheetBold}>{opportunity.title}</Text>
        </Text>
        <View style={styles.statusOptions}>
          {statusOptions.map((status) => {
            const cfg = statusConfig[status];
            return (
              <TouchableOpacity
                key={status}
                onPress={() => {
                  addApplication(opportunity, status);
                  setStatusSheetOpen(false);
                }}
                style={[
                  styles.statusOption,
                  { borderColor: cfg.color + '40' },
                  trackedApp?.status === status && { backgroundColor: cfg.bg, borderColor: cfg.color },
                ]}
              >
                <View style={[styles.statusDot, { backgroundColor: cfg.color }]} />
                <Text style={[styles.statusOptionText, { color: Colors.neutral[800] }]}>{status}</Text>
                {trackedApp?.status === status && <CheckCircle2 size={18} color={cfg.color} strokeWidth={2} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  content: {
    paddingBottom: 100,
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
    gap: Spacing.sm,
    marginBottom: Spacing.md - 2,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    lineHeight: 30,
    marginBottom: Spacing.md,
  },
  metaList: {
    gap: Spacing.sm + 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  trackedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  trackedLabel: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Medium',
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
  bodyText: {
    fontSize: FontSize.md,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  reqList: {
    gap: Spacing.sm + 2,
  },
  reqItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  reqText: {
    fontSize: FontSize.md,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Regular',
    flex: 1,
    lineHeight: 22,
  },
  applyBox: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.primary[50],
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  applyText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  demoNotice: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.warning[50],
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  demoNoticeText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.warning[600],
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[0],
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Platform.OS === 'web' ? Spacing.lg : Spacing.xl + 8,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
    gap: Spacing.md,
    ...Shadows.lg,
  },
  actionBarMain: {
    flex: 1,
  },
  sheetSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    marginBottom: Spacing.lg,
  },
  sheetBold: {
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
  },
  statusOptions: {
    gap: Spacing.sm + 2,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md - 2,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.neutral[200],
    backgroundColor: Colors.neutral[0],
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusOptionText: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
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
});
