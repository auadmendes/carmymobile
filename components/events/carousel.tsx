import { FlatList, View, Text, Dimensions } from 'react-native';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

interface CarouselProps {
  events: {
    _id: string;
    title: string;
    image: string;
  }[];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Carousel({ events }: CarouselProps) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemWidth = width * 0.9;
  const shuffledEvents = useMemo(() => shuffleArray(events), [events]);

  useEffect(() => {
    if (shuffledEvents.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % shuffledEvents.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * itemWidth,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, shuffledEvents.length]);

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={shuffledEvents}
      keyExtractor={(item) => item._id}
      showsHorizontalScrollIndicator={false}
      pagingEnabled // ✅ Enforces one full item at a time
      snapToInterval={itemWidth} // ✅ Required for precise snapping
      decelerationRate="fast"
      bounces={false}
      snapToAlignment="start"
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      })}
      // contentContainerStyle={{
      //   paddingHorizontal: (width - itemWidth) / 2, // ✅ Center first and last item
      // }}
      renderItem={({ item }) => (
        <View
          className=" bg-white rounded-2xl border-2 border-primary overflow-hidden"
          style={{ width: itemWidth }} // ✅ No margin here
        >
          <View className="relative bg-white rounded-2xl shadow-md overflow-hidden">
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 160 }}
              className="rounded-t-2xl"
              contentFit="cover"
            />
            <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 rounded-t-2xl" />
            <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
              <Text className="text-white text-xl font-bold text-center px-2">
                {item.title}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}
