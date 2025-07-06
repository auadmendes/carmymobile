import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MaintenanceSummary() {
  return (
    <View className="bg-white rounded-2xl shadow-md mb-4 p-4">
      <Text className="text-base font-bold text-gray-800 mb-2">Maintenance Summary</Text>

      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-sm text-gray-600">Last Service</Text>
        <Text className="text-sm font-medium text-gray-800">Apr 10, 2025</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-600">Odometer</Text>
        <Text className="text-sm font-medium text-gray-800">42,000 km</Text>
      </View>
    </View>
  );
}
