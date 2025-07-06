import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { DateComp } from '../../components/events/DateComp'; // 👈 your custom component
import api from '~/services/api';
import { categories } from '~/utils/catergories';

export default function DateTimeTestScreen() {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [font, setFont] = useState('');
  const [category, setCategory] = useState('');
  const [UF, setUF] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState(new Date());

    const handleCreate = async () => {
    if (!title || !location || !date || !link || !image) {
        Alert.alert('Erro', 'Por favor, preencha os campos obrigatórios.');
        return;
    }

    // Optional validation
    if (endDate <= date) {
        Alert.alert('Erro', 'A data de término deve ser posterior à data de início.');
        return;
    }

    try {
        const response = await api.post('/events', {
        title,
        location,
        date,
        end_date: endDate,
        link,
        image,
        font,
        category,
        UF,
        });

        if (response.status === 201) {
        Alert.alert('Sucesso', 'Evento criado com sucesso!', [
            { text: 'OK', onPress: () => router.back() },
        ]);
        }
    } catch (error: any) {
        console.error('Erro ao criar evento:', error);
        Alert.alert('Erro', error.response?.data?.error || 'Erro ao criar evento.');
    }
    };


  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            className="flex-1 bg-primary p-4 pb-10 mt-6"
            keyboardShouldPersistTaps="handled"
          >
            <StatusBar style="dark" />
            <Text className="text-xl font-bold text-secondary mb-4">Criar Novo Evento</Text>

            <TextInput
              placeholder="Título*"
              value={title}
              onChangeText={setTitle}
              className="border border-gray-300 rounded px-3 py-2 mb-3 bg-white"
            />

            <TextInput
              placeholder="Localização*"
              value={location}
              onChangeText={setLocation}
              className="border border-gray-300 rounded px-3 py-2 mb-3 bg-white"
            />

            {/* ✅ Replacing original datetime picker with DateComp */}
            <Text className="text-sm text-gray-700 mb-1">Início*</Text>
            <DateComp value={date} onChange={setDate} />

            <Text className="text-sm text-gray-700 mb-1">Término*</Text>
            <DateComp value={endDate} onChange={setEndDate} />

            <TextInput
              placeholder="Link*"
              value={link}
              onChangeText={setLink}
              className="border border-gray-300 rounded px-3 py-2 mb-3 bg-white"
            />

            <View className="px-4 py-2">
              <Text className="text-sm text-gray-700 mb-1">Imagem (URL)*</Text>

            <TextInput
              placeholder="Imagem (URL)*"
              value={image}
              onChangeText={setImage}
              className="border border-gray-300 rounded px-3 py-2 mb-3 bg-white"
            />

            {image !== '' && (
            <Image
                source={{ uri: image }}
                style={{ width: '100%', height: 200, borderRadius: 8 }}
                contentFit="cover"
                placeholder={null}
                transition={100}
            />
            )}

            </View>

            <TextInput
              placeholder="Fonte"
              value={font}
              onChangeText={setFont}
              className="border border-gray-300 rounded px-3 py-2 mb-3 bg-white"
            />

          <View className="border border-gray-300 rounded mb-3 bg-white">
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={{ height: 50 }}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

            <TextInput
              placeholder="UF"
              value={UF}
              onChangeText={setUF}
              className="border border-gray-300 rounded px-3 py-2 mb-5 bg-white"
            />

            <TouchableOpacity onPress={handleCreate} className="bg-secondary py-3 rounded mb-6">
              <Text className="text-white text-center font-semibold">Salvar Evento</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}


