import { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Sparkles, TrendingUp, Clock, ArrowRight, Info } from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { OpportunityCard } from '@/components/OpportunityCard';
import { QuickAccess } from '@/components/QuickAccess';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SearchBar } from '@/components/ui/SearchBar';

export default function HomeScreen() {
  const { opportunities, profile, savedIds } = useApp();
  const [search, setSearch] = useState('');

  const featured = useMemo(() => opportunities.filter((o) => o.featured).slice(0, 5), [opportunities]);

  const closingSoon = useMemo(() => {
    const now = Date.now();
    return [...opportunities]
      .filter((o) => new Date(o.closingDate).getTime() > now)
      .sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime())
      .slice(0, 5);
  }, [opportunities]);

  const recommended = useMemo(() => {
    const interests = profile.areasOfInterest.toLowerCase();
    if (!interests) return opportunities.slice(0, 5);
    return opportunities
      .filter((o) => interests.includes(o.category.toLowerCase()) || interests.includes(o.title.toLowerCase().split(' ')[0]))
      .concat(opportunities)
      .slice(0, 5);
  }, [opportunities, profile]);

  const greeting = profile.name ? `Welcome back, ${profile.name.split(' ')[0]}` : 'Welcome to Nexora';

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    if (text.length > 0) {
      router.push({ pathname: '/opportunities', params: { q: text } });
    }
  }, []);

  const handleCategoryPress = useCallback((category: string) => {
    if (category === 'Resources') {
      router.push('/opportunities');
    } else {
      router.push({ pathname: '/opportunities', params: { category } });
    }
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.brandRow}>
            <View style={styles.logoWrap}>
              <Sparkles size={18} color={Colors.neutral[0]} strokeWidth={2.5} />
            </View>
            <Text style={styles.brandName}>Nexora</Text>
          </View>
          <Text style={styles.brandTagline}>Your opportunity starts here</Text>
        </View>

        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.heroSubtitle}>
          Discover jobs, learnerships, internships, and training — all in one place.
        </Text>

        <View style={styles.searchWrap}>
          <SearchBar value={search} onChangeText={handleSearch} placeholder="Search for jobs, training, internships..." />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{opportunities.length}</Text>
            <Text style={styles.statLabel}>Opportunities</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>{savedIds.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>4</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>
      </View>

      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by category</Text>
        <QuickAccess onCategoryPress={handleCategoryPress} />
      </View>

      {/* AI Assistant CTA */}
      <TouchableOpacity
        onPress={() => router.push('/assistant')}
        activeOpacity={0.85}
        style={styles.aiCard}
      >
        <View style={styles.aiIconWrap}>
          <Sparkles size={22} color={Colors.neutral[0]} strokeWidth={2} />
        </View>
        <View style={styles.aiTextWrap}>
          <Text style={styles.aiTitle}>AI Career Assistant</Text>
          <Text style={styles.aiSubtitle}>Get instant help with your CV, interviews, and job search</Text>
        </View>
        <ArrowRight size={20} color={Colors.neutral[0]} strokeWidth={2} />
      </TouchableOpacity>

      {/* Featured */}
      <View style={styles.section}>
        <SectionHeader
          title="Featured Opportunities"
          subtitle="Hand-picked opportunities for you"
          actionText="See all"
          onAction={() => router.push('/opportunities')}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {featured.map((opp) => (
            <View key={opp.id} style={styles.horizontalCard}>
              <OpportunityCard
                opportunity={opp}
                onPress={() => router.push({ pathname: '/opportunity/[id]', params: { id: opp.id } })}
                compact
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Closing Soon */}
      <View style={styles.section}>
        <SectionHeader
          title="Closing Soon"
          subtitle="Don't miss these deadlines"
          actionText="See all"
          onAction={() => router.push('/opportunities')}
        />
        <View style={styles.listGap}>
          {closingSoon.slice(0, 3).map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onPress={() => router.push({ pathname: '/opportunity/[id]', params: { id: opp.id } })}
              compact
            />
          ))}
        </View>
      </View>

      {/* Recommended */}
      <View style={styles.section}>
        <SectionHeader
          title="Recommended For You"
          subtitle="Based on your interests"
          actionText="See all"
          onAction={() => router.push('/opportunities')}
        />
        <View style={styles.listGap}>
          {recommended.slice(0, 3).map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onPress={() => router.push({ pathname: '/opportunity/[id]', params: { id: opp.id } })}
              compact
            />
          ))}
        </View>
      </View>

      {/* About teaser */}
      <TouchableOpacity
        onPress={() => router.push('/about')}
        activeOpacity={0.85}
        style={styles.aboutCard}
      >
        <View style={styles.aboutIconWrap}>
          <Info size={18} color={Colors.primary[600]} strokeWidth={2} />
        </View>
        <View style={styles.aboutTextWrap}>
          <Text style={styles.aboutTitle}>About Nexora</Text>
          <Text style={styles.aboutSubtitle}>Learn about our mission and vision</Text>
        </View>
        <ArrowRight size={18} color={Colors.primary[600]} strokeWidth={2} />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Nexora — Demo MVP</Text>
        <Text style={styles.footerSub}>All opportunities shown are demo data</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  content: {
    paddingBottom: Spacing.xxl + 20,
  },
  hero: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'web' ? Spacing.lg : Spacing.xl + 16,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoWrap: {
    width: 32,
    height: 32,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter-Regular',
  },
  greeting: {
    fontSize: FontSize.xxxl,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  searchWrap: {
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.md,
  },
  horizontalScroll: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  horizontalCard: {
    width: 280,
  },
  listGap: {
    gap: Spacing.md,
  },
  aiCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent[600],
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    ...Shadows.md,
  },
  aiIconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTextWrap: {
    flex: 1,
  },
  aiTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
  },
  aiSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  aboutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[0],
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.sm,
  },
  aboutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutTextWrap: {
    flex: 1,
  },
  aboutTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
  },
  aboutSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Medium',
  },
  footerSub: {
    fontSize: FontSize.xs,
    color: Colors.neutral[300],
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
});
