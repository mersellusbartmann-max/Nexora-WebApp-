import { TextInput, View, StyleSheet } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Colors, Radius, Spacing, FontSize } from '@/constants/theme';
import { TouchableOpacity } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search opportunities...' }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search size={20} color={Colors.neutral[400]} strokeWidth={2} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.neutral[400]}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={8}>
          <X size={18} color={Colors.neutral[400]} strokeWidth={2} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md - 2,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.neutral[800],
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
});
