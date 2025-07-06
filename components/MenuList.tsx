import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export const MenuList = () => {
  const router = useRouter();

  const menuItems = [
    { label: 'Home', path: '(auth)' },
    { label: 'Saved Events', path: '(auth)/savedevents' },
    { label: 'Espirito Santo', path: '(auth)/places' },
    { label: 'Create Events', path: '/event/create' },
    { label: 'User Profile', path: '/createEvents' },
    { label: 'Settings', path: '/settings' },
  ];

  return (
    <View className="flex-1 p-4">
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          onPress={() => router.push(item.path as any)}
          className="w-full p-4 mb-2 bg-white/10 rounded-lg"
        >
          <Text className="text-base text-white">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
