import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

import { View, Text, TouchableOpacity, Image, Linking, Share, Alert } from 'react-native';
import { Star, Bookmark, ExternalLink, Pencil, Delete, Trash, ThumbsUp } from 'lucide-react-native';
import { saveEvent, SAVED_EVENTS_KEY } from '~/utils/storage_events';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '~/services/api';

interface EventCardProps {
  _id: string;
  title: string;
  location: string;
  date: string;
  link: string;
  image: string;
  font?: string;
  category?: string;
  highlighted?: string;
  UF?: string;
  onPress?: () => void;
}


export default function EventCard({
  _id,
  title,
  location,
  date,
  link,
  image,
  font = 'System',
  category,
  highlighted,
  UF,
  onPress,
}: EventCardProps) {
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useUser();
  const isAdmin = user?.emailAddresses?.some(emailObj => emailObj.emailAddress === 'luciano.mendes.horta@gmail.com');
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (link) {
      Linking.openURL(link).catch(err => console.error('Failed to open link:', err));
    }
  };

  const handleSave = async () => {
    try {
      await saveEvent({
        _id,
        title,
        location,
        date,
        link,
        image,
        font,
        category,
        UF,
      });
      setIsSaved(true); // update state
      //Alert.alert('Evento salvo', 'Você poderá ver este evento mesmo sem internet.');
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      //Alert.alert('Erro', 'Não foi possível salvar o evento.');
    }
  };

  const handleLike = async () => {
    try {
      const userId = user?.id;
      const likeType = "star";

      const response = await api.post(`/events/${_id}/like`, {
        user_id: userId,
        type: likeType,
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Você deu gostei!");
        setLikeCount((prev) => prev + 1); // increment
      } else {
        Alert.alert("Info", response.data.message);
      }

      console.log('Favorited event:', _id);
    } catch (error) {
      console.error("Error liking event:", error);
      Alert.alert("Erro", "Falha ao favoritar evento");
    }
  };

  const handleShare = async () => {
    try {
      const message = `📅 ${title}
      \n📍 ${location}
      \n🗓️ ${new Date(date).toLocaleDateString('pt-BR')}
      \n🔗 ${link}\n\nCompartilhado via App EventES 🎉`;
      
      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) {
        // optionally handle sharing success
      }
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  const handleEdit = () => {
    router.push(`/event/${_id}` as any); // cast to any to satisfy type checker
  };

  const handleDelete = async (eventId: string) => {
  try {
    const response = await api.delete(`/events/${eventId}`);

    if (response.status === 200) {
      Alert.alert('Success', 'Event deleted successfully');
      // Optionally refresh your event list here or navigate back
    } else {
      Alert.alert('Error', 'Failed to delete event');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    Alert.alert('Error', 'An error occurred while deleting the event');
  }
};
    const checkIfSaved = async () => {
    try {
      const saved = await AsyncStorage.getItem('SAVED_EVENTS');
      const savedList = saved ? JSON.parse(saved) : [];
      const exists = savedList.some((event: EventCardProps) => event._id === _id);
      setIsSaved(exists);
    } catch (err) {
      console.error('Error checking saved status:', err);
    }
  };

  useEffect(() => {
  const fetchLikeCount = async () => {
    try {
      const response = await api.get(`/events/${_id}/likes/count`);
      setLikeCount(response.data.count);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  fetchLikeCount();
}, [_id]);

useEffect(() => {
  const checkIfSaved = async () => {
    try {
      const saved = await AsyncStorage.getItem(SAVED_EVENTS_KEY); // ✅ match the key exactly
      const savedList = saved ? JSON.parse(saved) : [];
      const exists = savedList.some((event: EventCardProps) => event._id === _id);
      setIsSaved(exists);
    } catch (err) {
      console.error('Error checking saved status:', err);
    }
  };

  checkIfSaved();
}, [_id]);


  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      className={`bg-white w-full rounded-xl overflow-hidden shadow-md my-2 ${highlighted ? 'border-b-2 border-b-third' : 'border-0'}`}  
    >
      {/* Event Image */}
      <Image
        source={{ uri: image }}
        className="w-full h-40"
        resizeMode={font === 'Espaço Patrick Ribeiro' ? 'contain' : 'cover'}
      />

      {/* Info container */}
      <View className="p-4">
        <Text
          className="text-lg font-bold text-secondary"
          style={{ fontFamily: font }}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text className="mt-1 text-sm text-gray-600">
          {new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </Text>

        <Text className="text-sm text-gray-600">{location}</Text>

        <View className="flex-row justify-between mt-3">
          {category && (
            <View>
              <Text className="text-xs italic text-gray-500">{category}</Text>
              <Text className="text-xs italic text-gray-500">{font}</Text>
              <Text className="text-xs italic text-gray-500">{highlighted}</Text>
            </View>
          )}
          {UF && (
            <Text className="text-xs font-bold text-third">{UF}</Text>
          )}
        </View>

        {/* Footer with icons */}
        <View className="mt-4 -mb-4 -mx-4 border-t border-gray-200 bg-gray-50 px-6 py-3 rounded-b-xl flex-row justify-between items-center">
        <TouchableOpacity className="items-center" onPress={handleLike}>
          <ThumbsUp size={20} color="#F05B8E" fill={likeCount > 0 ? "#F05B8E" : "#FFF"} />
          <Text className="text-[10px] text-gray-600 mt-1">Gostei ({likeCount})</Text>
        </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={handleSave}
          >
            <Bookmark size={20} color={isSaved ? "#0FA3CF" : "#6B7280"} fill={isSaved ? "#0FA3CF": "#FFFFFF"} />
            <Text className="text-[10px] text-gray-600 mt-1">Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={handleShare}
          >
            <ExternalLink size={20} color="#4B5563" />
            <Text className="text-[10px] text-gray-600 mt-1">Compartilhar</Text>
          </TouchableOpacity>


          {isAdmin && (
            <View className='flex-row gap-4'>
              <TouchableOpacity
              className="items-center"
              onPress={handleEdit}
            >
              <Pencil size={20} color="#4B5563" />
              <Text className="text-[10px] text-gray-600 mt-1">Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
              className="items-center"
              onPress={handleDelete.bind(null, _id)}
            >
              <Trash size={20} color="#FF4D4D" />
              <Text className="text-[10px] text-gray-600 mt-1">Deletar</Text>
              </TouchableOpacity>
            </View>
          )}

          
        </View>

      </View>
    </TouchableOpacity>
  );
}
