import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Props {
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
}

export default function VehicleProfileCard({ make, model, year, vin, color }: Props) {
  const router = useRouter();

  function getColorDot(colorName: string): string {
  const map: Record<string, string> = {
    'Midnight Blue': '#191970',
    'White': '#ffffff',
    'Black': '#000000',
    'Red': '#dc2626',
    'Gray': '#6b7280',
    // Add more mappings
  };

  return map[colorName] || '#a78bfa'; // fallback to purple-400
}

function onPress() {
  router.push('/carprofile')
}

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row bg-white rounded-2xl shadow-md mx-4 p-4 items-center space-x-4"
    >
      {/* Vehicle Icon */}
      <View className="bg-purple-100 p-3 rounded-full mr-2">
        <MaterialIcons name="directions-car" size={32} color="#7c3aed" />
      </View>

      {/* Vehicle Info */}
      <View className="flex-1 space-y-1">
        <Text className="text-lg font-semibold text-gray-900">
          {year} {make} {model}
        </Text>

        <Text className="text-sm text-gray-500 tracking-wide">
          VIN: <Text className="font-medium text-gray-700">{vin}</Text>
        </Text>

        <View className="flex-row items-center mt-1">
          <View className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: getColorDot(color) }} />
          <Text className="text-sm text-purple-700 font-medium">{color}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
