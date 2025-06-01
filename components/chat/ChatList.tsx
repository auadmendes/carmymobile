import { View, Text, TouchableOpacity, FlatList } from 'react-native';

interface Props {
  selectedChatId: string | null;
  onSelect: (id: string) => void;
}

const mockChats = [
  { id: '1', title: 'Chat 1' },
  { id: '2', title: 'Product Advice' },
];

export default function ChatList({ selectedChatId, onSelect }: Props) {
  return (
    <View>
      <Text className="text-xl font-bold mb-4 mt-4 self-end text-secondary">Chats</Text>
      {mockChats.map(chat => (
        <TouchableOpacity
          key={chat.id}
          onPress={() => onSelect(chat.id)}
          className={`p-2 mb-2 rounded ${
            selectedChatId === chat.id ? 'bg-blue-100' : 'bg-gray-100'
          }`}
        >
          <Text className="text-gray-800">{chat.title}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => onSelect('new')}
        className="mt-4 bg-blue-500 p-2 rounded"
      >
        <Text className="text-white text-center">+ New Chat</Text>
      </TouchableOpacity>
    </View>
  );
}
