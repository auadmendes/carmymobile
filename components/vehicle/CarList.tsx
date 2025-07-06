import { View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function CarList({
  cars,
  selectedCarVin,
  onSelect,
}: {
  cars: any[];
  selectedCarVin: string | null;
  onSelect: (vin: string) => void;
}) {
  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.vin}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelect(item.vin)}
          className={`p-4 mb-2 rounded-xl ${
            item.vin === selectedCarVin ? 'bg-purple-200' : 'bg-white'
          }`}
        >
          <Text className="font-semibold">
            {item.year} {item.make} {item.model}
          </Text>
          <Text className="text-xs text-gray-500">VIN: {item.vin}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
