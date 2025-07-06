import { View, Alert } from 'react-native';
import Markdown from 'react-native-markdown-display';
import * as Clipboard from 'expo-clipboard'; // or `import Clipboard from '@react-native-clipboard/clipboard';`
import { TouchableWithoutFeedback } from 'react-native';

interface Props {
  sender: 'user' | 'ai';
  text: string;
}

export default function MessageBubble({ sender, text }: Props) {
  const isUser = sender === 'user';

  const handleLongPress = async () => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', 'Message copied to clipboard');
  };

  return (
    <TouchableWithoutFeedback onLongPress={handleLongPress}>
      <View
        className={`mb-2 p-3 rounded-lg max-w-[80%] ${
          isUser ? 'bg-secondary self-end' : 'bg-gray-200 self-start'
        }`}
      >
        <Markdown
          style={{
            body: {
              color: isUser ? 'white' : '#1f2937',
              fontSize: 14,
            },
            paragraph: {
              marginTop: 0,
              marginBottom: 0,
            },
          }}
        >
          {text}
        </Markdown>
      </View>
    </TouchableWithoutFeedback>
  );
}
