import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  quickMessages: string[];
  setInput: (text: string) => void;
  sendMessage: (customMessage?: string) => void;
}

export function PredefineCarouselChatMessage({ quickMessages, setInput, sendMessage }: Props) {
  return (
    <View className="w-full mb-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {quickMessages.map((msg, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => sendMessage(msg)}
            className="bg-purple-pastelc px-4 py-2 rounded-full mr-2"
            >
            <Text className="text-secondary">{msg}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
