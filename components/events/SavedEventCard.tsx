import { View, Text, TouchableOpacity, Image, Linking, Share, Alert } from 'react-native';
import { removeSavedEvent } from '~/utils/storage_events';

interface EventCardProps {
  _id: string;
  title: string;
  location: string;
  date: string;
  link: string;
  image: string;
  font?: string;
  category?: string;
  UF?: string;
  onPress?: () => void;
  onRemove?: () => void; // ✅ Add this line
}

export default function SavedEventCard({
  _id,
  title,
  location,
  date,
  link,
  image,
  font = 'System',
  category,
  UF,
  onPress,
  onRemove, // ✅ Include here
}: EventCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (link) {
      Linking.openURL(link).catch(err => console.error('Failed to open link:', err));
    }
  };

  const handleShare = async () => {
    try {
      const message = `📅 ${title}
📍 ${location}
🗓️ ${new Date(date).toLocaleDateString('pt-BR')}
🔗 ${link}\n\nCompartilhado via App EventES 🎉`;
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing event:', error);
    }
  };

  const handleRemove = async () => {
    await removeSavedEvent(_id);
    Alert.alert("Removido", "Evento removido dos salvos.");
    onRemove?.(); // ✅ Refresh parent
  };

  return (
    <TouchableOpacity onPress={handlePress} className="bg-white w-full rounded-xl my-2 shadow-md">
      <Image source={{ uri: image }} className="w-full h-40" resizeMode="cover" />
      <View className="p-4">
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-sm text-gray-600 mt-1">
          {new Date(date).toLocaleDateString('pt-BR')}
        </Text>
        <Text className="text-sm text-gray-600">{location}</Text>

        <View className="mt-4 flex-row justify-between border-t pt-2">
          <TouchableOpacity onPress={handleRemove}>
            <Text className="text-sm text-red-500">Remover</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShare}>
            <Text className="text-sm text-blue-500">Compartilhar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
