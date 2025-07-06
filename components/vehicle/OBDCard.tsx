import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

interface OBDData {
  [key: string]: string | number;
}

// 🛠 FIX: Add children support
interface CardProps {
  title?: string;
  data?: OBDData;
  children?: React.ReactNode; // <-- Add this line
  className?: string;
  style?: ViewStyle;
}

export function OBDCard({ title, data, children, className = '', style }: CardProps) {
  return (
    <View className={`rounded-xl p-3 bg-gray-800 ${className}`} style={style}>
      {title && <Text className="text-white text-base font-bold mb-3">{title}</Text>}
      {data &&
        Object.entries(data).map(([key, value]) => (
          <View key={key} className="flex-row justify-between mb-2">
            <Text className="text-gray-300 text-sm">{key}</Text>
            <Text className="text-white text-sm font-medium">{value}</Text>
          </View>
        ))}
      {children}
    </View>
  );
}