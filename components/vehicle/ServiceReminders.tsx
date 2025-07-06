import { View, Text } from 'react-native';

const reminders = [
  { title: 'Oil Change', due: 'Jun 15, 2025' },
  { title: 'Tire Rotation', due: 'Jul 01, 2025' },
];

export default function ServiceReminders() {
  return (
    <View className="bg-white rounded-2xl shadow-md mb-4 p-4">
      <Text className="text-base font-bold text-gray-800 mb-2">Service Reminders</Text>

      {reminders.map((reminder, index) => (
        <View key={index} className="flex-row justify-between items-center py-1">
          <Text className="text-sm text-gray-600">{reminder.title}</Text>
          <Text className="text-sm text-gray-800 font-medium">{reminder.due}</Text>
        </View>
      ))}
    </View>
  );
}
