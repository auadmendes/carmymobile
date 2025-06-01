import { Stack } from 'expo-router';

import { Text, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';
import { Search } from '~/components/Search';

import { useUser } from '@clerk/clerk-expo';

export default function Home() {
  const { user, isLoaded } = useUser();

  return (
    <>
      <Stack.Screen options={{ title: 'Carmy' }} />
      <View className='flex-1 bg-gray-100'>
        
        {/*Welcome*/}
        <View className='flex flex-col items-start p-3 gap-1'>
          <Text className='text-lg text-textdark font-light'>
            Welcome Back!
          </Text>
          <Text className='text-2xl text-secondary font-bold'>
            {isLoaded ? user?.fullName || 'User' : '...'}
          </Text>
        </View> 

      </View>
    </>
  );
}
