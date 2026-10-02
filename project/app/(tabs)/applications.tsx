import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ClipboardList, Trash2, ChevronDown, BarChart3 } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Sheet } from '@/components/ui/Sheet';
import { StatusBadge, statusConfig } from '@/components/ui/StatusBadge';
import { ApplicationStatus, TrackedApplication } from '@/types';
import { categoryColors, categoryBgColors } from '@/constants/theme';

const statusOptions: ApplicationStatus[] = ['Interested', 'Applied', 'Interview', 'Successful', 'Unsuccessful'];

export default function ApplicationsScreen() {
  const { applications, updateApplicationStatus, removeApplication } = useApp();
  const [statusSheetApp, setStatusSheetApp] = useState<TrackedApplication | null>(null);

  const stats = useMemo(() => {
    const total = applications.length;
    const submitted = applications.filter((a) => a.status === 'Applied' || a.status === 'Interview' || a.status === 'Successful' || a.status === 'Unsuccessful').length;
    const interviews = applications.filter((a) => a.status === 'Interview').length;
    const successful = applications.filter((a) => a.status === 'Successful').length;
    return { total, submitted, interviews, successful };
  }, [applications]);

  const groupedByStatus = useMemo(() => {
    const groups: Record<ApplicationStatus, TrackedApplication[]> = {
      Interested: [],
      Applied: [],
      Interview: [],
      Successful: [],
      Unsuccessful: [],
    };
    applications.forEach((a) => groups[a.status].push(a));
    return groups;
  }, [applications]);

  const statCards = [
    { label: 'Total', value: stats.total, color: Colors.primary[600], bg: Colors.primary[50] },
    { label: 'Submitted', value: stats.submitted, color: Colors.accent[600], bg: Colors.accent[50] },
    { label: 'Interviews', value: stats.interviews, color: Colors.warning[600], bg: Colors.warning[50] },
    { label: 'Successful', value: stats.successful, color: Colors.success[600], bg: Colors.success[50] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Application Tracker</Text>
        <Text style={styles.headerSubtitle}>Track and manage your applications</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {applications.length === 0 ? (
          <EmptyState
            icon={<ClipboardList size={32} color={Colors.primary[500]} strokeWidth={2} />}
            title="No applications tracked yet"
            message="Open an opportunity and tap 'Add to Tracker' to start managing your job applications here."
            action={<Button label="Browse opportunities" onPress={() => router.push('/opportunities')} />}
          />
        ) : (
          <>
            {/* Stats */}
            <View style={styles.statsGrid}>
              {statCards.map((stat) => (
                <View key={stat.label} style={[styles.statCard, { backgroundColor: stat.bg }]}>
                  <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: stat.color + 'dd' }]}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Kanban-style columns */}
            {statusOptions.map((status) => {
              const apps = groupedByStatus[status];
              if (apps.length === 0) return null;
              const cfg = statusConfig[status];
              return (
                <View key={status} style={styles.kanbanColumn}>
                  <View style={styles.kanbanHeader}>
                    <View style={styles.kanbanTitleRow}>
                      <View style={[styles.kanbanDot, { backgroundColor: cfg.color }]} />
                      <Text style={styles.kanbanTitle}>{status}</Text>
                      <View style={[styles.kanbanCount, { backgroundColor: cfg.bg }]}>
                        <Text style={[styles.kanbanCountText, { color: cfg.color }]}>{apps.length}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.kanbanCards}>
                    {apps.map((app) => {
                      const catColor = categoryColors[app.category] ?? Colors.primary[500];
                      const catBg = categoryBgColors[app.category] ?? Colors.primary[50];
                      return (
                        <View key={app.id} style={styles.trackerCard}>
                          <View style={styles.trackerCardTop}>
                            <View style={[styles.trackerCategoryBadge, { backgroundColor: catBg }]}>
                              <Text style={[styles.trackerCategoryText, { color: catColor }]}>{app.category}</Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => removeApplication(app.id)}
                              hitSlop={12}
                              style={styles.trackerDelete}
                            >
                              <Trash2 size={16} color={Colors.neutral[400]} strokeWidth={2} />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.trackerTitle} numberOfLines={2}>{app.title}</Text>
                          <Text style={styles.trackerOrg} numberOfLines={1}>{app.organisation}</Text>
                          <Text style={styles.trackerLocation} numberOfLines={1}>{app.location}</Text>
                          <TouchableOpacity
                            onPress={() => setStatusSheetApp(app)}
                            activeOpacity={0.7}
                            style={styles.trackerStatusBtn}
                          >
                            <StatusBadge status={app.status} size="md" />
                            <ChevronDown size={16} color={Colors.neutral[400]} strokeWidth={2} />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </>
        )}
      </ScrollView>

      <Sheet
        visible={!!statusSheetApp}
        onClose={() => setStatusSheetApp(null)}
        title="Change Status"
      >
        {statusSheetApp && (
          <>
            <Text style={styles.sheetSubtitle}>
              <Text style={styles.sheetBold}>{statusSheetApp.title}</Text>
            </Text>
            <View style={styles.statusOptions}>
              {statusOptions.map((status) => {
                const cfg = statusConfig[status];
                const isActive = statusSheetApp.status === status;
                return (
                  <TouchableOpacity
                    key={status}
                    onPress={() => {
                      updateApplicationStatus(statusSheetApp.id, status);
                      setStatusSheetApp(null);
                    }}
                    style={[
                      styles.statusOption,
                      { borderColor: cfg.color + '40' },
                      isActive && { backgroundColor: cfg.bg, borderColor: cfg.color },
                    ]}
                  >
                    <View style={[styles.statusDot, { backgroundColor: cfg.color }]} />
                    <Text style={[styles.statusOptionText, { color: Colors.neutral[800] }]}>{status}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              onPress={() => {
                removeApplication(statusSheetApp.id);
                setStatusSheetApp(null);
              }}
              style={styles.removeBtn}
            >
              <Trash2 size={16} color={Colors.error[500]} strokeWidth={2} />
              <Text style={styles.removeBtnText}>Remove from tracker</Text>
            </TouchableOpacity>
          </>
        )}
      </Sheet>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm + 2,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    minWidth: '46%',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  statValue: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: FontSize.sm,
    fontFamily: 'Inter-Medium',
    marginTop: 2,
  },
  kanbanColumn: {
    marginBottom: Spacing.lg,
  },
  kanbanHeader: {
    marginBottom: Spacing.md - 2,
  },
  kanbanTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  kanbanDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  kanbanTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
  },
  kanbanCount: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  kanbanCountText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  kanbanCards: {
    gap: Spacing.md - 2,
  },
  trackerCard: {
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.sm,
  },
  trackerCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  trackerCategoryBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  trackerCategoryText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  trackerDelete: {
    padding: Spacing.xs,
  },
  trackerTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    lineHeight: 20,
    marginBottom: 4,
  },
  trackerOrg: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  trackerLocation: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    marginBottom: Spacing.sm + 2,
  },
  trackerStatusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.sm,
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
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
  },
  removeBtnText: {
    fontSize: FontSize.sm,
    color: Colors.error[500],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
