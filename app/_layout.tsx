import '../global.css';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache'

import { router, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

const PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;

function InitialLayout() {
  const {isSignedIn, isLoaded} = useAuth();
  
  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(auth)');
    } 

    else if (isLoaded) { 
      // If not signed in and loaded, redirect to the login page
      router.replace('/(auth)');
    }

    if (isSignedIn) {
      router.replace('/(auth)');
    }
  }, [isSignedIn, isLoaded]);

  // if (isSignedIn) {
  //   router.replace("/(auth)");
  // }

    return <Slot />;
  }

export default function RootLayout() {
 
  
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <InitialLayout />
        <StatusBar style="dark" />
    </ClerkProvider>
  );
}


