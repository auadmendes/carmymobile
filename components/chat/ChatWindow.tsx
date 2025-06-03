import { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  KeyboardEvent,
  TouchableWithoutFeedback,
  TextInput as RNTextInput,
  ScrollView as RNScrollView,
} from 'react-native';
import MessageBubble from './MessageBubble';

import api from '~/services/api';


interface Props {
  chatId: string | null;
}

export default function ChatWindow({ chatId }: Props) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const inputRef = useRef<RNTextInput>(null);
  const scrollViewRef = useRef<RNScrollView>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userMessage },
      { sender: 'ai', text: 'Typing...' },
    ]);
    setInput('');

    try {
      const response = await api.post('/chat-with-case-ai', {
        message: userMessage,
        case_context: '', // or pass something relevant
      });

      const aiResponse = response.data.reply || 'No response';

      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: aiResponse },
      ]);
    } catch (error) {
      console.error('Axios error:', JSON.stringify(error, null, 2));
      alert("Network error. Is the Flask server reachable?");
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: 'Failed to get a response. Try again.' },
      ]);
    }
  };




  const dismissKeyboard = () => {
    Keyboard.dismiss();
    inputRef.current?.blur(); // Remove focus manually
  };

  useEffect(() => {
  const hideListener = Keyboard.addListener('keyboardDidHide', () => {
    inputRef.current?.blur(); // Ensure blur when keyboard is dismissed via down arrow
  });

  return () => {
    hideListener.remove();
  };
}, []);


  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={'padding'}
      //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View className='flex-1'>
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
          ))}
        </ScrollView>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View className="p-3 relative">
            

            {/* Input */}
            <View className="absolute bottom-3 left-3 right-3 flex-row items-center">
              <TextInput
                value={input}
                ref={inputRef}
                onChangeText={setInput}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 bg-white p-2 rounded mr-2"
              />
              <TouchableOpacity
                onPress={sendMessage}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                <Text className="text-white">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}
