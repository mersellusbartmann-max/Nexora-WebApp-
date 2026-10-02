import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity,
  TextInput, KeyboardAvoidingView,
} from 'react-native';
import { router } from 'expo-router';
import {
  User, Mail, MapPin, GraduationCap, Wrench, Heart, Edit3, Check,
  Sparkles, Info, ChevronRight,
} from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius, Shadows } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { UserProfile } from '@/types';

export default function ProfileScreen() {
  const { profile, updateProfile, applications, savedIds } = useApp();
  const [editing, setEditing] = useState(!profile.name);
  const [form, setForm] = useState<UserProfile>(profile);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm(profile);
    setEditing(false);
  };

  const statItems = [
    { label: 'Saved', value: savedIds.length, icon: Heart, color: Colors.primary[600], bg: Colors.primary[50] },
    { label: 'Tracked', value: applications.length, icon: Check, color: Colors.accent[600], bg: Colors.accent[50] },
  ];

  const menuItems = [
    { label: 'AI Career Assistant', icon: Sparkles, color: Colors.accent[600], bg: Colors.accent[50], route: '/assistant' },
    { label: 'About Nexora', icon: Info, color: Colors.primary[600], bg: Colors.primary[50], route: '/about' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
      <KeyboardAvoidingView behavior={Platform.OS === 'web' ? undefined : 'padding'}>
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            {profile.name ? (
              <Text style={styles.avatarText}>
                {profile.name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
              </Text>
            ) : (
              <User size={32} color={Colors.neutral[0]} strokeWidth={2} />
            )}
          </View>
          <Text style={styles.profileName}>{profile.name || 'Your Profile'}</Text>
          <Text style={styles.profileEmail}>{profile.email || 'Add your details to get started'}</Text>

          {profile.name && !editing && (
            <TouchableOpacity onPress={() => { setForm(profile); setEditing(true); }} activeOpacity={0.7} style={styles.editBtn}>
              <Edit3 size={14} color={Colors.primary[600]} strokeWidth={2} />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {statItems.map((stat) => {
            const Icon = stat.icon;
            return (
              <View key={stat.label} style={styles.statCard}>
                <View style={[styles.statIconWrap, { backgroundColor: stat.bg }]}>
                  <Icon size={18} color={stat.color} strokeWidth={2} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        {/* Form / display */}
        {editing ? (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Your Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <View style={styles.inputWrap}>
                <User size={16} color={Colors.neutral[400]} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={form.name}
                  onChangeText={(v) => setForm({ ...form, name: v })}
                  placeholder="e.g. Thabo Molefe"
                  placeholderTextColor={Colors.neutral[300]}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrap}>
                <Mail size={16} color={Colors.neutral[400]} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={form.email}
                  onChangeText={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                  placeholderTextColor={Colors.neutral[300]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputWrap}>
                <MapPin size={16} color={Colors.neutral[400]} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={form.location}
                  onChangeText={(v) => setForm({ ...form, location: v })}
                  placeholder="e.g. Johannesburg, Gauteng"
                  placeholderTextColor={Colors.neutral[300]}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Education Level</Text>
              <View style={styles.inputWrap}>
                <GraduationCap size={16} color={Colors.neutral[400]} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={form.educationLevel}
                  onChangeText={(v) => setForm({ ...form, educationLevel: v })}
                  placeholder="e.g. Matric, Diploma, Degree"
                  placeholderTextColor={Colors.neutral[300]}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Skills</Text>
              <View style={styles.inputWrap}>
                <Wrench size={16} color={Colors.neutral[400]} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={form.skills}
                  onChangeText={(v) => setForm({ ...form, skills: v })}
                  placeholder="e.g. Excel, Communication, Python"
                  placeholderTextColor={Colors.neutral[300]}
                  multiline
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Areas of Interest</Text>
              <View style={styles.inputWrap}>
                <Heart size={16} color={Colors.neutral[400]} strokeWidth={2} />
                <TextInput
                  style={styles.input}
                  value={form.areasOfInterest}
                  onChangeText={(v) => setForm({ ...form, areasOfInterest: v })}
                  placeholder="e.g. Jobs, Learnerships, IT, Finance"
                  placeholderTextColor={Colors.neutral[300]}
                  multiline
                />
              </View>
            </View>

            <View style={styles.formActions}>
              <Button label="Cancel" onPress={handleCancel} variant="ghost" size="md" />
              <Button label="Save Profile" onPress={handleSave} variant="primary" size="md" icon={<Check size={18} color={Colors.neutral[0]} strokeWidth={2} />} />
            </View>
          </View>
        ) : (
          <View style={styles.infoCard}>
            <InfoRow icon={Mail} label="Email" value={profile.email || 'Not set'} />
            <InfoRow icon={MapPin} label="Location" value={profile.location || 'Not set'} />
            <InfoRow icon={GraduationCap} label="Education" value={profile.educationLevel || 'Not set'} />
            <InfoRow icon={Wrench} label="Skills" value={profile.skills || 'Not set'} />
            <InfoRow icon={Heart} label="Interests" value={profile.areasOfInterest || 'Not set'} last />
          </View>
        )}

        {/* Menu */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.label}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.7}
                style={styles.menuItem}
              >
                <View style={[styles.menuIconWrap, { backgroundColor: item.bg }]}>
                  <Icon size={18} color={item.color} strokeWidth={2} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <ChevronRight size={18} color={Colors.neutral[300]} strokeWidth={2} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nexora — Demo MVP</Text>
          <Text style={styles.footerSub}>Your opportunity starts here</Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

function InfoRow({ icon: Icon, label, value, last }: { icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && styles.infoRowBorder]}>
      <View style={styles.infoIconWrap}>
        <Icon size={18} color={Colors.neutral[400]} strokeWidth={2} />
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
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
  profileHeader: {
    backgroundColor: Colors.primary[600],
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'web' ? Spacing.lg : Spacing.xl + 16,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    alignItems: 'center',
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md - 2,
  },
  avatarText: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
  },
  profileName: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[0],
    fontFamily: 'Inter-Bold',
  },
  profileEmail: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    marginTop: Spacing.md,
  },
  editBtnText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[0],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.md,
    marginBottom: Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.md,
  },
  statIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: Colors.neutral[0],
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.md,
  },
  formTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.neutral[600],
    fontFamily: 'Inter-SemiBold',
    marginBottom: Spacing.xs + 2,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.neutral[50],
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md - 2,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[800],
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  infoCard: {
    backgroundColor: Colors.neutral[0],
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md - 2,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  infoIconWrap: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.neutral[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSize.xs,
    color: Colors.neutral[400],
    fontFamily: 'Inter-Regular',
  },
  infoValue: {
    fontSize: FontSize.md,
    color: Colors.neutral[800],
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  menuSection: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    gap: Spacing.sm + 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[100],
    ...Shadows.sm,
  },
  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
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
