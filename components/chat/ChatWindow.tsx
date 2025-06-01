import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import MessageBubble from './MessageBubble';

interface Props {
  chatId: string | null;
}

export default function ChatWindow({ chatId }: Props) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: input },
      { sender: 'ai', text: "AI's response here..." },
    ]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={'padding'}
      //behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 p-3 relative">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 80 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
            ))}
          </ScrollView>

          {/* Input */}
          <View className="absolute bottom-3 left-3 right-3 flex-row items-center">
            <TextInput
              value={input}
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
    </KeyboardAvoidingView>
  );
}
