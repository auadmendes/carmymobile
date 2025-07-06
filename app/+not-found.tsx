import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className={styles.container}>
        <Text className={styles.title}>{"This screen doesn't exist."}</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>Go to home screen!</Text>
        </Link>
        <Text className={styles.reviewtext}>I need to review this page and link.</Text>
        <Link href="/(auth)" className={styles.link}>
          <Text className={styles.linkText}>Please use this link meanwhile!</Text>
        </Link>
        <StatusBar style="dark" />
      </View>
    </>
  );
}

const styles = {
  container: `items-center flex-1 justify-center p-5`,
  title: `text-xl font-bold`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
  reviewtext: `text-sm text-red-500`,
};
