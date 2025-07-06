import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const SAVED_EVENTS_KEY = 'saved_events';

export const saveEvent = async (event: EventCardProps) => {
  const existing = await AsyncStorage.getItem(SAVED_EVENTS_KEY);
  const savedEvents = existing ? JSON.parse(existing) : [];

  const alreadySaved = savedEvents.find((e: EventCardProps) => e._id === event._id);
  if (!alreadySaved) {
    savedEvents.push(event);
    await AsyncStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(savedEvents));
  }
};

export const getSavedEvents = async (): Promise<EventCardProps[]> => {
  const data = await AsyncStorage.getItem(SAVED_EVENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const removeSavedEvent = async (eventId: string) => {
  const data = await AsyncStorage.getItem(SAVED_EVENTS_KEY);
  const savedEvents = data ? JSON.parse(data) : [];
  const filtered = savedEvents.filter((e: EventCardProps) => e._id !== eventId);
  await AsyncStorage.setItem(SAVED_EVENTS_KEY, JSON.stringify(filtered));
};
