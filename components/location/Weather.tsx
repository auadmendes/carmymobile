import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = 'deab31150b5bc00755a194d3abfc0395' //process.env.OPENWEATHER_API_KEY as string;
export function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();

        if (response.ok) {
          setWeather(data);
        } else {
          setErrorMsg(data.message || 'Failed to fetch weather data');
        }
      } catch (err) {
        setErrorMsg('Failed to fetch weather data');
      }
    })();
  }, []);

  return (
    <View className="rounded-xl p-3 w-48 h-24 justify-center ">
      {errorMsg ? (
        <Text className="text-red-500">{errorMsg}</Text>
      ) : weather?.main && weather.weather ? (
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-white text-sm">{weather.name}</Text>
            <Text className="text-white text-lg font-bold">
              {Math.round(weather.main.temp)}°C
            </Text>
            <Text className="text-white text-xs capitalize">
              {weather.weather[0].description}
            </Text>
          </View>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      ) : (
        <Text className="text-white">Loading...</Text>
      )}
    </View>
  );
}
