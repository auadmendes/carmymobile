// components/UserButton.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';

export default function UserButton() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  if (!user) return null;

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} className="flex-row items-center space-x-2">
        {user.imageUrl && (
          <Image
            source={{ uri: user.imageUrl }}
            className="w-8 h-8 rounded-full"
          />
        )}
        <AntDesign name="down" size={14} color="#333" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-xl p-6 w-4/5 items-center">
            {user.imageUrl && (
              <Image
                source={{ uri: user.imageUrl }}
                className="w-16 h-16 rounded-full mb-4"
              />
            )}
            <Text className="text-lg font-semibold mb-1">{user.fullName || user.username}</Text>
            <Text className="text-gray-500 mb-6">{user.primaryEmailAddress?.emailAddress}</Text>

            <TouchableOpacity
              onPress={async () => {
                await signOut();
                setModalVisible(false);
              }}
              className="bg-red-500 px-6 py-3 rounded-xl w-full"
            >
              <Text className="text-white text-center font-semibold">Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4"
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
