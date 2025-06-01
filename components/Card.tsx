import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  style?: ViewStyle;
}

export function Card({ title, children, className = '', style }: CardProps) {
  return (
    <View className={`rounded-xl p-3 ${className}`}>
      {title && <Text className="text-white text-sm mb-4 font-semibold">{title}</Text>}
      {children}
    </View>
  );
}
