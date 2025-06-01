import React from 'react';

// Generic type accepting any valid icon props from icon sets like Ionicons, etc.
type CustomIconProps<P extends { size?: number }> = {
  icon: React.ComponentType<P>;
  size?: number;
} & Omit<P, 'size'>;

export function CustomIcon<P extends { size?: number }>({
  icon: Icon,
  size = 28,
  ...props
}: CustomIconProps<P>) {
  return <Icon {...(props as unknown as P)} size={size} />;
}
