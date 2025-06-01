import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';
import { Feather } from '@expo/vector-icons';

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(true); // sidebar state

  return (
   <SafeAreaView className="flex-1 bg-white">
    
        <View className="flex-1 flex-row relative">
          {/* Sidebar */}
          {sidebarVisible && (
            <View className="w-1/3 border-r border-gray-300 p-2">
              <ChatList selectedChatId={selectedChatId} onSelect={setSelectedChatId} />
            </View>
          )}

          {/* Toggle Button */}
          <TouchableOpacity
            onPress={() => setSidebarVisible(!sidebarVisible)}
            className="flex flex-row absolute pr-4 top-4 left-2 z-10 bg-secondary p-2 rounded-full justify-between items-center"
          >
            <Feather
              name={sidebarVisible ? 'chevron-left' : 'chevron-right'}
              size={24}
              color="white"
            />
            {!sidebarVisible && (
              <Text className="ml-2 text-white font-semibold">Chats</Text>
            )}
            
          </TouchableOpacity>

          {/* Chat Window */}
          <View className="flex-1">
            <ChatWindow chatId={selectedChatId} />
          </View>
        </View>
      
    </SafeAreaView>
  );
}