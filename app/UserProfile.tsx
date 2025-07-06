import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

import { 
    View, 
    Text, 
    Image, 
    TextInput, 
    ScrollView, 
    TouchableOpacity, 
    Switch
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack } from 'expo-router';
import Slider from '@react-native-community/slider';
import { Button } from '~/components/Button';
import { ChevronLeft } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function UserProfile() {
    const { user, isLoaded } = useUser();
    const [gender, setGender] = useState('');
    const [knowledgeLevel, setKnowledgeLevel] = useState(1);
    const [drivingHabits, setDrivingHabits] = useState<string[]>([]);
    const [preferredVehicle, setPreferredVehicle] = useState('');
    const [diyExperience, setDiyExperience] = useState(false);
    const [vehicleUse, setVehicleUse] = useState('');
    const [repairBudget, setRepairBudget] = useState(100);

    const handleToggleHabit = (habit: string) => {
        setDrivingHabits((prev) =>
        prev.includes(habit)
            ? prev.filter((h) => h !== habit)
            : [...prev, habit]
        );
    };

  if (!isLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <Stack.Screen options={{ title: 'User Profile' }} />
      <ScrollView 
        className="px-4 mt-10"

        >
        <View className="items-center mb-6">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-24 h-24 rounded-full mb-2"
          />
          <Text className="text-xl font-semibold text-secondary">
            {user?.firstName} {user?.lastName}
          </Text>
          <Text className="text-gray-600">{user?.primaryEmailAddress?.emailAddress}</Text>
          <View>
            <Link href="/(auth)">
              <Text className='text-md text-secondary font-semibold'>Go Home</Text>
            </Link>
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">First Name</Text>
          <TextInput
            value={user?.firstName || ''}
            editable={false}
            className="border rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">Last Name</Text>
          <TextInput
            value={user?.lastName || ''}
            editable={false}
            className="border rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </View>

        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">Email</Text>
          <TextInput
            value={user?.primaryEmailAddress?.emailAddress || ''}
            editable={false}
            className="border rounded px-3 py-2 bg-gray-100 text-gray-800"
          />
        </View>

        
        <View className=' mb-4'>
            {/* Gender */}
            <Text className="font-semibold text-xl text-secondary">Gender</Text>
            {['Male', 'Female', 'Prefer not to say'].map((option) => (
            <TouchableOpacity key={option} onPress={() => setGender(option)}>
                <Text className={`py-1 px-2 rounded ${gender === option ? 'bg-violet-200' : 'bg-gray-100'}`}>
                {option}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        <View className=' mb-4'>
            {/* Knowledge Level */}
            <Text className="font-semibold text-xl text-secondary">Car Knowledge Level</Text>
            <Slider
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={knowledgeLevel}
            onValueChange={setKnowledgeLevel}
            />
            <Text>Level: {knowledgeLevel}</Text>
        </View>

        <View className=' mb-4'>
            {/* Driving Habits */}
            <Text className="font-semibold text-xl text-secondary">Driving Habits</Text>
            {['City', 'Highway', 'Off-road', 'Long-distance'].map((habit) => (
            <TouchableOpacity key={habit} onPress={() => handleToggleHabit(habit)}>
                <Text className={`py-1 px-2 rounded ${drivingHabits.includes(habit) ? 'bg-violet-200' : 'bg-gray-100'}`}>
                {habit}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        <View className=' mb-4'>
            {/* Preferred Vehicle */}
            <Text className="font-semibold text-xl text-secondary">Preferred Vehicle Type</Text>
            {['SUV', 'Sedan', 'Truck', 'Electric', 'Hybrid'].map((type) => (
            <TouchableOpacity key={type} onPress={() => setPreferredVehicle(type)}>
                <Text className={`py-1 px-2 rounded ${preferredVehicle === type ? 'bg-violet-200' : 'bg-gray-100'}`}>
                {type}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        <View className=' mb-4'>
            {/* DIY Experience */}
            <View className="flex-row justify-between items-center mt-4">
            <Text className="font-semibold text-xl text-secondary">DIY Repair Experience</Text>
            <Switch value={diyExperience} onValueChange={setDiyExperience} />
            </View>
        </View>

        <View className=' mb-4'>
            {/* Vehicle Use */}
            <Text className="font-semibold text-xl text-secondary">Primary Vehicle Use</Text>
            {['Commuting', 'Business', 'Racing', 'Family', 'Delivery'].map((use) => (
            <TouchableOpacity key={use} onPress={() => setVehicleUse(use)}>
                <Text className={`py-1 px-2 rounded ${vehicleUse === use ? 'bg-violet-200' : 'bg-gray-100'}`}>
                {use}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        <View className=' mb-4'>
            {/* Repair Budget */}
            <Text className="font-semibold text-xl text-secondary">Repair Budget ($)</Text>
            <Slider
            minimumValue={0}
            maximumValue={2000}
            step={50}
            value={repairBudget}
            onValueChange={setRepairBudget}
            />
            <Text>Budget: ${repairBudget}</Text>
        </View>

        <View className="mt-6">
          <Button title="Save Profile" onPress={() => {
            // You can save data to context, localStorage, or backend here
            console.log({
              gender,
              knowledgeLevel,
              drivingHabits,
              preferredVehicle,
              diyExperience,
              vehicleUse,
              repairBudget,
            });
          }} />
        </View>

      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
