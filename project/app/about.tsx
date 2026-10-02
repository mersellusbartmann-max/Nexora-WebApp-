import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft, Sparkles, Target, Users, TrendingUp, Heart, DollarSign,
  Building2, Star, Handshake, Briefcase, GraduationCap,
} from 'lucide-react-native';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
          <ArrowLeft size={22} color={Colors.neutral[0]} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Nexora</Text>
        <View style={styles.backBtnPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.logoWrap}>
            <Sparkles size={24} color={Colors.neutral[0]} strokeWidth={2.5} />
          </View>
          <Text style={styles.heroTitle}>Nexora</Text>
          <Text style={styles.heroTagline}>Your opportunity starts here</Text>
          <Text style={styles.heroDesc}>
            One platform helping people discover opportunities, develop skills, and manage their job search.
          </Text>
        </View>

        {/* Problem */}
        <View style={styles.section}>
          <View style={styles.sectionIconWrap}>
            <Target size={20} color={Colors.error[600]} strokeWidth={2} />
          </View>
          <Text style={styles.sectionTitle}>The Problem</Text>
          <Text style={styles.sectionBody}>
            Many people struggle to find reliable information about jobs, learnerships, internships, training opportunities, and career resources because information is scattered across different websites, WhatsApp groups, and social media pages. This makes it hard for job seekers to know what opportunities exist and how to apply.
          </Text>
        </View>

        {/* Solution */}
        <View style={styles.section}>
          <View style={styles.sectionIconWrap}>
            <Sparkles size={20} color={Colors.primary[600]} strokeWidth={2} />
          </View>
          <Text style={styles.sectionTitle}>The Solution</Text>
          <Text style={styles.sectionBody}>
            Nexora brings everything into one simple, mobile-friendly platform. Users can discover opportunities, save them for later, track their applications, access career development resources, and get instant help from an AI career assistant — all in one place.
          </Text>
        </View>

        {/* Target Users */}
        <View style={styles.section}>
          <View style={styles.sectionIconWrap}>
            <Users size={20} color={Colors.accent[600]} strokeWidth={2} />
          </View>
          <Text style={styles.sectionTitle}>Who It's For</Text>
          <View style={styles.userList}>
            <View style={styles.userItem}>
              <View style={[styles.userDot, { backgroundColor: Colors.primary[50] }]}>
                <Briefcase size={16} color={Colors.primary[600]} strokeWidth={2} />
              </View>
              <Text style={styles.userText}>Unemployed job seekers</Text>
            </View>
            <View style={styles.userItem}>
              <View style={[styles.userDot, { backgroundColor: Colors.accent[50] }]}>
                <Users size={16} color={Colors.accent[600]} strokeWidth={2} />
              </View>
              <Text style={styles.userText}>Young adults looking for their first job</Text>
            </View>
            <View style={styles.userItem}>
              <View style={[styles.userDot, { backgroundColor: Colors.primary[100] }]}>
                <GraduationCap size={16} color={Colors.primary[700]} strokeWidth={2} />
              </View>
              <Text style={styles.userText}>Students and recent graduates</Text>
            </View>
            <View style={styles.userItem}>
              <View style={[styles.userDot, { backgroundColor: Colors.accent[100] }]}>
                <TrendingUp size={16} color={Colors.accent[700]} strokeWidth={2} />
              </View>
              <Text style={styles.userText}>People seeking skills development and training</Text>
            </View>
          </View>
        </View>

        {/* Social Impact */}
        <View style={styles.section}>
          <View style={styles.sectionIconWrap}>
            <Heart size={20} color={Colors.success[600]} strokeWidth={2} />
          </View>
          <Text style={styles.sectionTitle}>Social Impact</Text>
          <Text style={styles.sectionBody}>
            Nexora aims to reduce unemployment by making opportunity discovery accessible to everyone. By centralising information and providing tools to manage applications, we help job seekers stay organised, informed, and motivated — giving them a better chance at finding meaningful employment.
          </Text>
        </View>

        {/* Future Business Model */}
        <View style={styles.section}>
          <View style={styles.sectionIconWrap}>
            <DollarSign size={20} color={Colors.warning[600]} strokeWidth={2} />
          </View>
          <Text style={styles.sectionTitle}>Future Revenue Streams</Text>
          <View style={styles.revenueList}>
            <RevenueItem icon={Building2} title="Organisation Listings" desc="Employers pay to post opportunities and access candidate matching." color={Colors.primary[600]} bg={Colors.primary[50]} />
            <RevenueItem icon={Star} title="Premium Features" desc="Advanced CV builder, interview simulator, and analytics for job seekers." color={Colors.accent[600]} bg={Colors.accent[50]} />
            <RevenueItem icon={Handshake} title="Training Partnerships" desc="Commission from training providers for referrals and enrolments." color={Colors.warning[600]} bg={Colors.warning[50]} />
            <RevenueItem icon={TrendingUp} title="Sponsored Opportunities" desc="Featured placement for high-priority job postings." color={Colors.primary[700]} bg={Colors.primary[100]} />
            <RevenueItem icon={Briefcase} title="Recruitment Partnerships" desc="Revenue share with recruitment agencies for successful placements." color={Colors.success[600]} bg={Colors.success[50]} />
          </View>
        </View>

        {/* Demo notice */}
        <View style={styles.demoNotice}>
          <Sparkles size={16} color={Colors.warning[600]} strokeWidth={2} />
          <Text style={styles.demoNoticeText}>
            This is a demo MVP of Nexora. All opportunities shown are fictional demo data. In production, Nexora would connect real organisations with real job seekers.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/assistant')}
          activeOpacity={0.85}
          style={styles.ctaCard}
        >
          <View style={styles.ctaIconWrap}>
            <Sparkles size={20} color={Colors.neutral[0]} strokeWidth={2} />
          </View>
          <View style={styles.ctaTextWrap}>
            <Text style={styles.ctaTitle}>Try the AI Career Assistant</Text>
            <Text style={styles.ctaSubtitle}>Get instant career advice</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nexora — Demo MVP</Text>
          <Text style={styles.footerSub}>Built for investor presentation</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function RevenueItem({ icon: Icon, title, desc, color, bg }: {
  icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;
  title: string; desc: string; color: string; bg: string;
}) {
  return (
    <View style={styles.revenueItem}>
      <View style={[styles.revenueIconWrap, { backgroundColor: bg }]}>
        <Icon size={18} color={color} strokeWidth={2} />
      </View>
      <View style={styles.revenueTextWrap}>
        <Text style={styles.revenueTitle}>{title}</Text>
        <Text style={styles.revenueDesc}>{desc}</Text>
      </View>
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
    alignItems: 'center',
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
  backBtnPlaceholder: { width: 40 },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
  },
  content: {
    paddingBottom: Spacing.xxl + 20,
  },
  heroSection: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  logoWrap: {
    width: 56,
    height: 56,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  heroTitle: {
    fontSize: FontSize.xxxl + 4,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
    letterSpacing: -1,
  },
  heroTagline: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Inter-Regular',
    marginBottom: Spacing.lg,
  },
  heroDesc: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.lg,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  sectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.neutral[0],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md - 2,
    ...Shadows.sm,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
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
  },
  userList: {
    gap: Spacing.sm + 2,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md - 2,
  },
  userDot: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userText: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Regular',
  },
  revenueList: {
    gap: Spacing.md - 2,
  },
  revenueItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.sm,
  },
  revenueIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  revenueTextWrap: {
    flex: 1,
  },
  revenueTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: 2,
  },
  revenueDesc: {
    fontSize: FontSize.sm,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  demoNotice: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.warning[50],
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  demoNoticeText: {
    flex: 1,
    fontSize: FontSize.xs,
    color: Colors.warning[600],
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  ctaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.accent[600],
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    ...Shadows.md,
  },
  ctaIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTextWrap: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
  },
  ctaSubtitle: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
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
