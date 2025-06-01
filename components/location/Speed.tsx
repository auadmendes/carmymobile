import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export function Speed() {
  const [speed, setSpeed] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000, // update every second
          distanceInterval: 1, // or every 1 meter
        },
        (location) => {
          const currentSpeed = location.coords.speed;

          // Optional: check GPS accuracy
          const accuracy = location.coords.accuracy;

          if (
            currentSpeed != null &&
            currentSpeed > 0.5 &&
            accuracy != null &&
            accuracy < 30
          ) {
            // Only consider valid speeds (ignore < 0.5 m/s ≈ 1.8 km/h)
            setSpeed(Math.round(currentSpeed * 3.6));
          } else {
            setSpeed(0);
          }
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove(); // cleanup when unmounted
      }
    };
  }, []);

  return (
    <View className="p-3">
      <Text className="text-white text-sm mb-2">Speed</Text>
      {errorMsg ? (
        <Text className="text-red-500">{errorMsg}</Text>
      ) : (
        <Text className="text-white text-xl">{speed ?? '...'} km/h</Text>
      )}
    </View>
  );
}
