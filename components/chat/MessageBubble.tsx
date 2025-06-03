import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  sender: 'user' | 'ai';
  text: string;
}

export default function MessageBubble({ sender, text }: Props) {
  const isUser = sender === 'user';

  return (
    <View className={`mb-2 p-3 rounded-lg max-w-[80%] ${isUser ? 'bg-secondary self-end' : 'bg-gray-200 self-start'}`}>
      <Text className={`text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>{text}</Text>
    </View>
  );
}
