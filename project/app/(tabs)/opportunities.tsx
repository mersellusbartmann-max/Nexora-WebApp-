import { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { Colors, Spacing, FontSize, Radius } from '@/constants/theme';
import { OpportunityCard } from '@/components/OpportunityCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { Compass, SlidersHorizontal, X } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { Sheet } from '@/components/ui/Sheet';
import { OpportunityCategory } from '@/types';

const categories: (OpportunityCategory | 'All')[] = ['All', 'Jobs', 'Learnerships', 'Internships', 'Training'];
const locations = ['All locations', 'Remote / Online', 'Johannesburg, Gauteng', 'Cape Town, Western Cape', 'Durban, KwaZulu-Natal', 'Pretoria, Gauteng', 'Sandton, Gauteng', 'Port Elizabeth, Eastern Cape', 'Secunda, Mpumalanga', 'Soweto, Gauteng'];
const sortOptions = ['Newest closing', 'Oldest closing', 'Title A-Z'];

export default function OpportunitiesScreen() {
  const { opportunities } = useApp();
  const params = useLocalSearchParams<{ q?: string; category?: string }>();
  const [search, setSearch] = useState(params.q ?? '');
  const [activeCategory, setActiveCategory] = useState<string>(params.category ?? 'All');
  const [activeLocation, setActiveLocation] = useState('All locations');
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (params.q) setSearch(params.q);
    if (params.category) setActiveCategory(params.category);
  }, [params.q, params.category]);

  const filtered = useMemo(() => {
    let result = [...opportunities];

    if (activeCategory !== 'All') {
      result = result.filter((o) => o.category === activeCategory);
    }

    if (activeLocation !== 'All locations') {
      result = result.filter((o) => o.location === activeLocation);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.organisation.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.location.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'Oldest closing':
        result.sort((a, b) => new Date(b.closingDate).getTime() - new Date(a.closingDate).getTime());
        break;
      case 'Title A-Z':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime());
    }

    return result;
  }, [opportunities, activeCategory, activeLocation, search, sortBy]);

  const activeFilterCount = (activeCategory !== 'All' ? 1 : 0) + (activeLocation !== 'All locations' ? 1 : 0) + (sortBy !== sortOptions[0] ? 1 : 0);

  const clearFilters = () => {
    setActiveCategory('All');
    setActiveLocation('All locations');
    setSortBy(sortOptions[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Opportunities</Text>
        <Text style={styles.headerSubtitle}>{filtered.length} opportunities found</Text>
      </View>

      <View style={styles.searchSection}>
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search opportunities..." />
        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                selected={activeCategory === cat}
                onPress={() => setActiveCategory(cat)}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => setFilterOpen(true)}
            activeOpacity={0.7}
            style={styles.filterButton}
          >
            <SlidersHorizontal size={16} color={Colors.neutral[700]} strokeWidth={2} />
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Compass size={32} color={Colors.primary[500]} strokeWidth={2} />}
            title="No opportunities found"
            message="Try adjusting your search or filters to find more opportunities."
            action={
              activeFilterCount > 0 ? (
                <TouchableOpacity onPress={clearFilters} style={styles.clearBtn}>
                  <Text style={styles.clearBtnText}>Clear all filters</Text>
                </TouchableOpacity>
              ) : undefined
            }
          />
        ) : (
          <View style={styles.cardList}>
            {filtered.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onPress={() => router.push({ pathname: '/opportunity/[id]', params: { id: opp.id } })}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <Sheet visible={filterOpen} onClose={() => setFilterOpen(false)} title="Filters & Sorting">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.filterLabel}>Location</Text>
          <View style={styles.filterOptions}>
            {locations.map((loc) => (
              <TouchableOpacity
                key={loc}
                onPress={() => setActiveLocation(loc)}
                style={[
                  styles.filterOption,
                  activeLocation === loc && styles.filterOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    activeLocation === loc && styles.filterOptionTextActive,
                  ]}
                >
                  {loc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.filterLabel}>Sort by</Text>
          <View style={styles.filterOptions}>
            {sortOptions.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() => setSortBy(opt)}
                style={[
                  styles.filterOption,
                  sortBy === opt && styles.filterOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    sortBy === opt && styles.filterOptionTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterActions}>
            <TouchableOpacity onPress={clearFilters} style={styles.clearFiltersBtn}>
              <X size={16} color={Colors.neutral[600]} strokeWidth={2} />
              <Text style={styles.clearFiltersText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Sheet>
    </View>
  );
}

import { router } from 'expo-router';

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
  searchSection: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral[0],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
    gap: Spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  chipsRow: {
    gap: Spacing.sm,
    paddingRight: Spacing.sm,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    fontSize: 10,
    color: Colors.neutral[0],
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl + 20,
  },
  cardList: {
    gap: Spacing.md,
  },
  clearBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.primary[50],
    borderRadius: Radius.md,
  },
  clearBtnText: {
    fontSize: FontSize.sm,
    color: Colors.primary[700],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  filterLabel: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.neutral[800],
    fontFamily: 'Inter-Bold',
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  filterOptions: {
    gap: Spacing.xs + 2,
  },
  filterOption: {
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    backgroundColor: Colors.neutral[0],
  },
  filterOptionActive: {
    borderColor: Colors.primary[600],
    backgroundColor: Colors.primary[50],
  },
  filterOptionText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  filterOptionTextActive: {
    color: Colors.primary[700],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: Spacing.lg,
  },
  clearFiltersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  clearFiltersText: {
    fontSize: FontSize.sm,
    color: Colors.neutral[600],
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
