import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import api from '~/services/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categories } from '~/utils/catergories';

type EventFormData = {
  _id?: string; // optional
  title: string;
  location: string;
  date: string;
  image: string;
  link: string;
  font: string;
  category: string;
  highlighted: string;
  UF: string;
};


export default function EditEventScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    location: '',
    date: '',
    image: '',
    link: '',
    font: '',
    category: '',
    highlighted: '',
    UF: '',
  });


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        Alert.alert('Error', 'Failed to load event data');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/events/${id}`, formData);
      Alert.alert('Success', 'Event updated successfully!');
      router.back();
    } catch (error) {
      console.error('Error updating event:', error);
      Alert.alert('Error', 'Failed to update event');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading event...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-100'>
    <ScrollView className="flex-1 px-4 py-6 bg-white pb-10">
      <Text className="text-xl font-bold text-secondary mb-4">Edit Event</Text>

      {(Object.keys(formData) as (keyof EventFormData)[]).map((field) => {
        if (field === '_id') return null;

        if (field === 'category') {
          return (
            <View key={field} className="mb-4">
              <Text className="text-gray-700 mb-1">Categoria</Text>
              <View className="border border-gray-300 rounded-md overflow-hidden bg-white">
                <Picker
                  selectedValue={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                  ))}
                </Picker>
              </View>
            </View>
          );
        }
        if (field === 'highlighted') {
          return (
            <View key={field} className="mb-4">
              <Text className="text-gray-700 mb-1">Evento em destaque</Text>
              <View className="flex-row items-center justify-between p-3 border border-gray-300 rounded-md bg-white">
                <Text className="text-gray-600">Destacar evento</Text>
                <Switch
                  value={formData.highlighted === 'true'}
                  onValueChange={(value) => handleInputChange('highlighted', value ? 'true' : 'false')}
                />
              </View>
            </View>
          );
        }


        return (
          <View key={field} className="mb-4">
            <Text className="text-gray-700 mb-1 capitalize">{field}</Text>
            <TextInput
              value={formData[field]}
              onChangeText={(text) => handleInputChange(field, text)}
              className="border border-gray-300 rounded-md p-2"
            />
          </View>
        );
      })}

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-secondary rounded-md p-3 items-center mb-10"
        activeOpacity={0.8}
      > 
        <Text className='text-white'>Save Changes</Text> 
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}
