import { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

import { Button }  from  '../Button'
interface Car {
  make: string;
  model: string;
  year: string;
  vin: string;
  color: string;
}

export default function CarForm({ onAdd }: { onAdd: (car: Car) => void }) {
  const [car, setCar] = useState<Car>({
    make: '',
    model: '',
    year: '',
    vin: '',
    color: '',
  });

  return (
    <View className="bg-white p-4 rounded-xl shadow-md mb-4">
      <Text className="font-semibold text-lg mb-2">Add a New Vehicle</Text>

      {(['make', 'model', 'year', 'vin', 'color'] as const).map((field) => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={car[field]}
          onChangeText={(text) => setCar({ ...car, [field]: text })}
          className="border border-gray-300 p-2 rounded-md mb-2"
        />
      ))}

      <Button title="Add Vehicle" onPress={() => onAdd(car)} />
        
    </View>
  );
}
