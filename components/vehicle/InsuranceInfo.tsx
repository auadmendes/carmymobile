import { View, Text } from 'react-native';

export default function InsuranceInfo() {
  return (
    <View className="bg-white rounded-2xl shadow-md mb-4 p-4">
      <Text className="text-base font-bold text-gray-800 mb-2">Insurance</Text>

      <View className="space-y-1">
        <Text className="text-sm text-gray-600">Provider: <Text className="font-medium text-gray-800">Geico</Text></Text>
        <Text className="text-sm text-gray-600">Policy #: <Text className="font-medium text-gray-800">ABC123456</Text></Text>
        <Text className="text-sm text-gray-600">Expires: <Text className="font-medium text-gray-800">Dec 31, 2025</Text></Text>
      </View>
    </View>
  );
}
