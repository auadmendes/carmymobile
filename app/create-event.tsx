import { useState } from "react";
import { useUser } from '@clerk/clerk-expo';
import { Link, Stack } from "expo-router";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



import { ChevronLeft } from 'lucide-react-native';
import { StatusBar } from "expo-status-bar";

export default function CreateEvent() {
  const { user, isLoaded } = useUser();



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'My Vehicles' }} />
        {/*Welcome*/}
        <View className='flex flex-row items-start p-3 gap-4'>
          <View>
            <Link href="/(auth)">
              <ChevronLeft size={24} color='#8456FD'/>              
            </Link>
          </View>
          <View>
            <Text className='text-lg text-textdark font-light'>
              Welcome to your Car Profile!
            </Text>
            <Link href={'/UserProfile'}>
              <Text className='text-2xl text-secondary font-bold'>
                {isLoaded ? user?.fullName || 'User' : '...'}
              </Text>
            </Link>
          </View>
        </View> 
      <ScrollView className="px-4 py-4">

        

      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
