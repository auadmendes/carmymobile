import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  make: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  image?: string;
}

export default function VehicleCard({ make, model, year, vin, color, image }: Props) {
  return (
    <View className="bg-white rounded-2xl shadow-md mb-4 p-4 flex-row space-x-4 items-center">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-20 h-20 rounded-xl"
          contentFit="cover"
        />
      ) : (
        <View className="bg-gray-200 w-20 h-20 rounded-xl items-center justify-center">
          <MaterialIcons name="directions-car" size={32} color="#6B7280" />
        </View>
      )}

      <View className="flex-1">
        <Text className="text-base font-bold text-gray-900">{year} {make} {model}</Text>
        <Text className="text-sm text-gray-600">VIN: {vin}</Text>
        <View className="mt-1 bg-purple-100 px-2 py-1 rounded-md self-start">
          <Text className="text-xs text-purple-700 font-medium">Color: {color}</Text>
        </View>
      </View>
    </View>
  );
}
