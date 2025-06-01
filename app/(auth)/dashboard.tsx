import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Activity, BugIcon, BatteryCharging, Scan, Car } from 'lucide-react-native';

import { Card } from '~/components/Card';
import { CustomIcon } from '~/components/CustomIcon';
import { Ionicons } from '@expo/vector-icons';
import { Speed } from '~/components/location/Speed';
import { Weather } from '~/components/location/Weather';

export default function Dashboard() {
  return (
    <View className="p-1 gap-2 flex-1 bg-primary">
      <View className="flex mt-10 p-3">
          <Text className='text-2xl text-textdark font-bold'>My Dashboard</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ padding: 10 }} className='flex w-full flex-col'>  
        <View className="flex-row flex-wrap justify-between gap-1">
          
          <View className="flex flex-row w-full h-28 justify-between items-center gap-1">
            
           <Card title="Speed" className='w-1/2 h-full bg-red-300 rounded-xl '>
              <View className="flex-row justify-center items-center -mt-4">
                <CustomIcon icon={Ionicons} name="flash" color="#8B5FBF" />
                <Speed />
              </View>
            </Card>

            <Card title="Oil" className="w-1/2 h-full bg-secondary rounded-xl p-3">
              <View className="flex-row justify-between items-center">
                <CustomIcon icon={Ionicons} name="water" color="#180A73" />
                <Text className='text-white font-semibold'>Last change May 15, 2025</Text>
              </View>
            </Card>

          </View>

         <Card title="Weather" className="w-full h-52 bg-secondary rounded-xl p-3">
            <View className="flex-row w-full py-10 justify-around items-center">
              <CustomIcon icon={Ionicons} size={52} key={1}  name="partly-sunny-outline" color="#FFF" />
              <View className='flex justify-center items-center'>
                <Text className='text-white text-2xl font-semibold'>25°C</Text>
                <Text className='text-white text-sm font-semibold'>Sunny</Text>
              </View>
              {/* <Weather /> */}
            </View>
          </Card>
          <View className='flex flex-row w-full gap-1'>
            <Card title="Oil" className="flex-1 bg-secondary rounded-xl p-3">
              <View className="flex-row justify-between items-center">
                <CustomIcon icon={Ionicons} name="water" color="#FFF" />
                <Text className='text-white text-sm font-semibold'>Last change 60 days</Text>
              </View>
            </Card>

            <Card title="Scan" className="w-auto bg-secondary rounded-xl p-3">
              <View className="flex-row justify-between items-center gap-1">
                <CustomIcon icon={Ionicons} name="scan" color="#FFF" />
                <Text className='text-white text-sm font-semibold'>Last: 120 days</Text>
              </View>
            </Card>
          </View>

          <View className='flex w-full gap-1'>
            <Card title="Engine health" className="flex-1 bg-secondary rounded-xl p-3">
              <View className="flex-row justify-between items-center">
                {/* <CustomIcon icon={Ionicons} name="water" color="#8B5FBF" /> */}
                <Activity color="#FFF" size={48}/>
                <Text className='text-white text-sm font-semibold'>Engine revised no occurrencies.</Text>
              </View>
            </Card>

            <Card title="Issues" className="w-auto bg-red-300 p-3">
              <View className="flex-row justify-between items-center">
                {/* <CustomIcon icon={Ionicons} name="water" color="#FFF" /> */}
                <BugIcon color="#FFF" size={48}/>
                <Text className='text-white text-sm font-semibold'>Issues found: 0</Text>
              </View>
            </Card>
            {/* <Card title="Re-Scan" className="p-4 w-auto">
              <View className="flex-row justify-between items-center">
                <ScanEye color="#8B5FBF" size={48}/>
                <Text className='text-white text-sm'>Engine revised no occurrencies.</Text>
              </View>
            </Card> */}
            <Card title="Engine health" className="flex-1 bg-secondary rounded-xl p-3">
              <View className="flex-row justify-between items-center">
                {/* <CustomIcon icon={Ionicons} name="water" color="#8B5FBF" /> */}
                <Car color="#FFF" size={48}/>
                <Text className='text-white text-sm font-semibold'>Scan my car again.</Text>
              </View>
            </Card>
          </View>

          <Card title="Engine health" className="flex-1 bg-secondary rounded-xl p-3">
            <View className="flex-row justify-between items-center gap-1">
              <Activity color="#FFF" size={48}/>
              <Text className='text-white text-sm font-semibold'>Engine revised no occurrencies.</Text>
            </View>
          </Card>

          <Card title="Battery health" className="w-1/2 bg-green-400 rounded-xl p-3">
            <View className="flex-row justify-between items-center">
              {/* <CustomIcon icon={Ionicons} name="water" color="#8B5FBF" /> */}
              <BatteryCharging color="#FFF" size={48}/>
              <Text className='text-white text-sm'>Status: Full.</Text>
            </View>
          </Card>
          
        </View>
       
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
}

