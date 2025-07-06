import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuList } from '~/components/MenuList';

import { ScreenContent } from '~/components/ScreenContent';

// const CarmyLogo = require('../assets/eventsLogo.png');

export default function Modal() {
  return (
    // <>
    //   {/* <ScreenContent path="app/modal.tsx" title="Modal"></ScreenContent> */}
    //   <View className='flex w-full bg-secondary p-3 mt-24' style={{ height: 120 }}>
    //     <Text className='text-2xl mt-10'>Menu</Text>
    //   </View>
    //   <MenuList />
    //   <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    // </>
      <SafeAreaView className='flex flex-col w-full h-full p-3 bg-third'>
        {/* <View className='flex w-full bg-secondary p-3 mt-8' style={{ height: 120 }}>
          <Text className='text-2xl font-extrabold text-white'>Menu</Text>
        </View> */}
        <View className='flex w-full items-center justify-center my-6'>
          {/* <Image
            source={ CarmyLogo }
            style={{ width: '100%', height: 160 }}            
            contentFit="contain"
          /> */}
          <View className='flex flex-row justify-center items-center gap-1'>
            <Text className='text-2xl font-extrabold text-white'>Event</Text>
            <Text className='text-2xl font-extrabold text-secondary bg-white'>ES</Text>
          </View>
        </View>
        <MenuList />
        <StatusBar style='light' />
      </SafeAreaView>
  );
}
