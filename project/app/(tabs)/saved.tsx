import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Bookmark, BookmarkX } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';
import { OpportunityCard } from '@/components/OpportunityCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function SavedScreen() {
  const { opportunities, savedIds } = useApp();

  const savedOpportunities = opportunities.filter((o) => savedIds.includes(o.id));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Opportunities</Text>
        <Text style={styles.headerSubtitle}>
          {savedOpportunities.length} saved {savedOpportunities.length === 1 ? 'opportunity' : 'opportunities'}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {savedOpportunities.length === 0 ? (
          <EmptyState
            icon={<Bookmark size={32} color={Colors.primary[500]} strokeWidth={2} />}
            title="Nothing saved yet"
            message="Tap the bookmark icon on any opportunity to save it here for later."
            action={<Button label="Browse opportunities" onPress={() => router.push('/opportunities')} />}
          />
        ) : (
          <View style={styles.cardList}>
            {savedOpportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onPress={() => router.push({ pathname: '/opportunity/[id]', params: { id: opp.id } })}
              />
            ))}
          </View>
        )}
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
  cardList: {
    gap: Spacing.md,
  },
});
