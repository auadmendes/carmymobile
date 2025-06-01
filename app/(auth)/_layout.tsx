import { Link, Tabs } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';

import { Wrench } from 'lucide-react-native';

import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { useEffect } from 'react';

import { Slot, useRouter } from 'expo-router';
import UserButton from '~/components/user/UserButton';
import { View } from 'react-native';



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
        tabBarActiveTintColor: '#8B5FBF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingRight: 12 }}>
            {/* Modal Button */}
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>

            {/* User Avatar Button */}
            <UserButton />
          </View>
    ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        
        options={{
          title: 'AI Chat',
          headerShown: false,
          tabBarIcon: ({ color }) => <Wrench color={color} />,
        }}
      />
    </Tabs>
  );
}
