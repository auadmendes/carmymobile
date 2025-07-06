import UserButton from '~/components/user/UserButton';
import { Tabs, Link, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';



import { Wrench, Calendar, CalendarCheck  } from 'lucide-react-native';
import { Text, View, DeviceEventEmitter } from 'react-native';
import { Image } from 'expo-image';


import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';


// ✅ Make sure this file exists in your assets folder
const eventsLogo = require('../../assets/eventsLogo.png');

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/(public)/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0FA3CF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: '',
          title: 'Eventos', // 👈 Sets both header title and tab label
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          headerLeft: () => (
            <View className="flex flex-row justify-center items-center ml-2">
              <Image
                source={eventsLogo}
                style={{ width: 60, height: 40 }}
                contentFit="contain"
              />
              <Text className="ml-2 text-xl font-semibold text-secondary">Event</Text>
              <Text className="text-xl font-semibold text-third">ES</Text>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingRight: 12,
              }}
            >
              <Link href="/modal" asChild>
                <HeaderButton />
              </Link>
              <UserButton />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            DeviceEventEmitter.emit('scrollToTop');
          },
        }}
      />

      <Tabs.Screen
        name="savedevents"
        options={{
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ color }) => <CalendarCheck color={color} />,
        }}
      />

      <Tabs.Screen
        name="places"
        options={{
          title: 'ES',
          headerShown: false,
          tabBarIcon: ({ color }) => <Wrench color={color} />,
        }}
      />
    </Tabs>
  );

}
