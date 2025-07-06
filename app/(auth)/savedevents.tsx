import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { getSavedEvents } from '~/utils/storage_events';
import SavedEventCard from '~/components/events/SavedEventCard';

interface EventCardProps {
  _id: string;
  title: string;
  location: string;
  date: string;
  link: string;
  image: string;
  font?: string;
  category?: string;
  UF?: string;
  onPress?: () => void;
}

export default function SavedEvents() {
  const [savedEvents, setSavedEvents] = useState<EventCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadSaved = async () => {
    try {
      const events = await getSavedEvents();
      setSavedEvents(events);
    } catch (err) {
      console.error('Error loading saved events:', err);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSaved();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadSaved();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="mt-10 px-4">
        <Text className="text-2xl font-bold text-secondary">Meus Eventos</Text>
        <Text className="text-2xl font-bold text-third">Salvos</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {savedEvents.length === 0 ? (
          <Text className="text-center text-gray-500 mt-4">Nenhum evento salvo ainda.</Text>
        ) : (
          savedEvents.map(event => (
            <SavedEventCard key={event._id} {...event} />
          ))
        )}
      </ScrollView>

      <StatusBar style="dark" />
    </View>
  );
}
