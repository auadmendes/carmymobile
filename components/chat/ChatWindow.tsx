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
import { PredefineCarouselChatMessage } from './PredeninedCarouselChatMessage';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';

interface Props {
  chatId: string | null;
}

export default function ChatWindow({ chatId }: Props) {
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const inputRef = useRef<RNTextInput>(null);
  const scrollViewRef = useRef<RNScrollView>(null);

  const [location, setLocation] = useState<LocationObject | null>(null);

  const quickMessages = [
    "Parques",
    "Vistas deslumbrantes",
    "esporte",
    "Bares e baladas",
    "Praias",
  ];

  // const sendMessage = async () => {
  //   if (!input.trim()) return;

  //   const userMessage = input;
  //   setMessages(prev => [
  //     ...prev,
  //     { sender: 'user', text: userMessage },
  //     { sender: 'ai', text: 'Typing...' },
  //   ]);
  //   setInput('');

  //   try {
  //     // Convert previous messages to Gemini-compatible format
  //     const messageHistory = [
  //       ...messages,
  //       { sender: 'user', text: userMessage } // include current user input
  //     ].slice(-6) // last 6 messages
  //       .map(m => ({
  //         role: m.sender === 'user' ? 'user' : 'model',
  //         content: m.text,
  //       }));

  //     const response = await api.post('/chat-with-carmy', {
  //       messages: messageHistory,
  //     });

  //     const aiResponse = response.data.reply || 'No response';

  //     setMessages(prev => [
  //       ...prev.slice(0, -1), // remove "Typing..." placeholder
  //       { sender: 'ai', text: aiResponse },
  //     ]);
  //   } catch (error) {
  //     console.error('Axios error:', JSON.stringify(error, null, 2));
  //     alert("Network error. Is the Flask server reachable?");
  //     setMessages(prev => [
  //       ...prev.slice(0, -1),
  //       { sender: 'ai', text: 'Failed to get a response. Try again.' },
  //     ]);
  //   }
  // };

  const sendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage ?? input;
    if (!messageToSend.trim()) return;

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: messageToSend },
      { sender: 'ai', text: 'Typing...' },
    ]);
    setInput('');

    try {
      // Prepare message history
      const messageHistory = [
        ...messages,
        { sender: 'user', text: messageToSend },
      ].slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      // Get location using Expo
      let locationData = null;
      try {
        const loc = await Location.getCurrentPositionAsync({});
        locationData = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };
      } catch (err) {
        console.warn("Could not get location:", err);
      }

      const response = await api.post("/chat-with-carmy", {
        messages: messageHistory,
        location: locationData,
      });

      const aiResponse = response.data.reply || 'No response';
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: aiResponse },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { sender: 'ai', text: 'Something went wrong. Please try again.' },
      ]);
    }
  };





  const dismissKeyboard = () => {
    Keyboard.dismiss();
    inputRef.current?.blur(); // Remove focus manually
  };

  useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Location permission not granted');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  })();
}, []);


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
          className="flex-1 py-6 px-2"
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
         <View className='w-full h-20'>
            <PredefineCarouselChatMessage
              quickMessages={quickMessages}
              setInput={setInput}
              sendMessage={sendMessage}
            />
         </View>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View className="p-3 relative"> 
            {/* Input */}
            <View className="absolute bottom-3 left-3 right-3 flex-row items-center">
              <TextInput
                value={input}
                ref={inputRef}
                onChangeText={setInput}
                multiline
                onContentSizeChange={(e) => {
                  const height = Math.min(e.nativeEvent.contentSize.height, 120);
                  setInputHeight(height);
                }}
                placeholder="Type your message..."
                style={{
                  height: inputHeight,
                  maxHeight: 120,
                }}
                className="flex-1 border border-gray-300 bg-white px-3 py-2 mr-2 text-base rounded-lg"
              />
              <TouchableOpacity
                onPress={() => sendMessage()}
                className="bg-secondary px-4 py-2 rounded"
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
