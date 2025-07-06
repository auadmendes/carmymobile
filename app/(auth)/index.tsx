import { useEffect, useState, useCallback, useRef, SetStateAction } from 'react';
import { Link } from 'expo-router';
import { 
  Text, 
  View, 
  ActivityIndicator, 
  FlatList, 
  DeviceEventEmitter, 
  TextInput,
  KeyboardAvoidingView,
  Platform,

} from 'react-native';
import api from '~/services/api';
import { useUser } from '@clerk/clerk-expo';
import Carousel from '~/components/events/carousel';
import { StatusBar } from 'expo-status-bar';
import EventCard from '~/components/events/Eventcard';
import CategoryFilter from '~/components/events/CategoryFilter';
import { Picker } from '@react-native-picker/picker';

import { DateOnlyPicker } from '../../components/events/DateOnlyPicker';
import { categories } from '~/utils/catergories';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface EventProps {
  _id: string;
  title: string;
  location: string;
  date: string;
  link: string;
  image: string;
  font?: string;
  category?: string;
  highlighted?: string;	
  UF?: string;
  likes?: number; // ✅ add this
}

export default function Home() {
  const { user, isLoaded } = useUser();
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedFont, setSelectedFont] = useState('Todos');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [date, setDate] = useState<Date>(new Date());
  
  const EVENTS_CACHE_KEY = 'cached_events';
  const CACHE_EXPIRATION_MINUTES = 10;

  const highlightedEvents = events
    .filter(e => e.highlighted === "true")
    .slice(0, 10); // show first 10 highlighted events, or however many you want


  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };


  const filteredEvents = events.filter(event => {
    const categoryMatch =
      selectedCategory === 'Todos' ||
      event.category?.toLowerCase() === selectedCategory.toLowerCase();

    const fontMatch =
      selectedFont === 'Todos' || event.font === selectedFont;

    const searchMatch = [event.title, event.location]
      .some(field =>
        field?.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // ✅ Normalize dates for comparison
    const selectedFilterDate = new Date(date);
    selectedFilterDate.setHours(0, 0, 0, 0);

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    const dateMatch = eventDate >= selectedFilterDate;

    return categoryMatch && fontMatch && searchMatch && dateMatch;
  });


  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('scrollToTop', scrollToTop);
    return () => sub.remove();
 
  }, []);

const fetchEvents = useCallback(async (pageNumber = 1) => {
  try {
    const todayISO = new Date().toISOString();

    const response = await api.get('/events', {
      params: {
        page: pageNumber,
        limit: 10,
        minDate: todayISO,
      },
    });

    const newEvents = response.data.map((event: any) => ({
      ...event,
      _id: event._id?.$oid || event._id,
    }));

    return newEvents; // ✅ return events, do not update state here

  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}, []);


  const loadMoreEvents = async () => {
    const filtersApplied = selectedCategory !== 'Todos' || selectedFont !== 'Todos' || searchQuery.trim() !== '';
    const insufficientFilteredResults = page > 1 && filteredEvents.length < 10;

    if (loadingMore || !hasMore || filtersApplied || insufficientFilteredResults) {
      console.log('Skipped loading more:', { loadingMore, hasMore, filtersApplied, insufficientFilteredResults });
      return;
    }

    setLoadingMore(true);

    const nextPage = page + 1;
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newEvents = await fetchEvents(nextPage);

    const ids = new Set(events.map(e => e._id));
    const uniqueNewEvents = newEvents.filter((e: { _id: string }) => !ids.has(e._id));

    console.log("Unique new events on page", nextPage, ":", uniqueNewEvents.length);

    setHasMore(uniqueNewEvents.length > 0);
    setEvents(prev => [...prev, ...uniqueNewEvents]);
    setPage(nextPage);
    setLoadingMore(false);
  };


useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);

      // Check cache first
      const cachedData = await AsyncStorage.getItem(EVENTS_CACHE_KEY);
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);

        const cacheAge = (Date.now() - timestamp) / 1000 / 60;
        if (cacheAge < CACHE_EXPIRATION_MINUTES) {
          console.log('Loaded events from cache');
          setEvents(data);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data if no cache or cache expired
      const freshEvents = await fetchEvents(1);
      setEvents(freshEvents);
      setPage(1);

      // Save to cache
      await AsyncStorage.setItem(
        EVENTS_CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: freshEvents })
      );

      console.log('Fetched events and updated cache');
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [fetchEvents]);



useEffect(() => {
  const sub = DeviceEventEmitter.addListener('scrollToTop', scrollToTop);

  return () => {
    sub.remove(); // ✅ Detach the listener on unmount
  };
}, []);


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setDate(new Date());

    const newEvents = await fetchEvents(1);
    setEvents(newEvents);

    // Update cache with fresh data
    await AsyncStorage.setItem(
      EVENTS_CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: newEvents })
    );

    setHasMore(true);
    setRefreshing(false);
  }, [fetchEvents]);



  const allFonts = ['Todos', ...Array.from(new Set(events.map(event => event.font).filter(Boolean)))];

  // const filteredEvents = events.filter(event => {
  //   const categoryMatch = selectedCategory === 'Todos' || event.category?.toLowerCase() === selectedCategory.toLowerCase();
  //   const fontMatch = selectedFont === 'Todos' || event.font === selectedFont;
  //   return categoryMatch && fontMatch;
  // });

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#4B5563" />
        <Text className="mt-2 text-gray-600">Loading events...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 100} // adjust this offset if needed
  >
      <View className="flex-1 bg-gray-100 justify-center">
        <StatusBar style="dark" />
        <FlatList
          ref={flatListRef}
          data={filteredEvents}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => <EventCard {...item} />}
          onEndReached={loadMoreEvents}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            
            <View>
              <View className="flex flex-col items-start p-3 gap-1">
                <Text className="text-lg text-third font-light">Welcome Back!</Text>
                <Link href="/UserProfile">
                  <Text className="text-2xl text-secondary font-bold">{isLoaded ? user?.fullName || 'User' : '...'}</Text>
                </Link>
              </View>

              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              
              <View className="my-2 h-32 ">
                {/* <Text className="text-lg text-secondary font-semibold px-4">Eventos em Destaque</Text> */}
                <Carousel events={highlightedEvents} />
              </View>

              <View className="px-4">
                <Text className="mb-1 text-sm text-gray-700">Fonte:</Text>
                <View className="border border-gray-300 rounded-md overflow-hidden bg-white">
                  <Picker
                    selectedValue={selectedFont}
                    onValueChange={(itemValue: SetStateAction<string>) => setSelectedFont(itemValue)}
                  >
                    {allFonts.map((fontOption, index) => (
                      <Picker.Item key={`${fontOption}-${index}`} label={fontOption} value={fontOption} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View className="px-4 py-2">
                <Text className="text-sm text-gray-700">Início</Text>
                <DateOnlyPicker value={date} onChange={setDate} />
              </View>

              <View className="px-4 py-2">
                <Text className="text-sm text-gray-700 mb-1">Pesquisar evento:</Text>
                <TextInput
                  placeholder="Buscar por título ou local"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  className="bg-white border border-gray-300 rounded-md px-3 py-2 text-base"
                />
              </View>

              <View className="flex p-3 flex-row items-center gap-2">
                <Text className="text-lg text-secondary font-semibold">Event</Text>
                <Text className="text-lg text-third font-semibold">ES</Text>
                <Text className='text-xs font-extralight text-gray-600'>{filteredEvents.length}</Text>
              </View>
            </View>
          }
          ListFooterComponent={
            <View className="p-4">
              {loadingMore && <ActivityIndicator size="small" color="#888" />}
              {!hasMore && filteredEvents.length === 0 && (
                <Text className="text-center text-gray-500 mt-10">No events found.</Text>
              )}
            </View>
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </KeyboardAvoidingView>
  );
}