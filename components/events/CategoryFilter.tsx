
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <FlatList
      data={categories}
      horizontal
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectCategory(item)}
          style={{
            backgroundColor: selectedCategory === item ? '#0FA3CF' : '#E5E7EB',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            marginRight: 8,
          }}
        >
          <View>
            <Text style={{ color: selectedCategory === item ? '#FFFFFF' : '#374151' }}>
            {item}
          </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
