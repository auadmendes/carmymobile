// app/login.tsx
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../store/auth'; // assuming zustand store

import { Car, Wind } from 'lucide-react-native';

import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from 'react';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: 'oauth_google' })
  async function onGoogleSignIn() {
    try {
      setIsLoading(true);
      const oAuthFlow = await googleOAuth.startOAuthFlow()
      
      if(oAuthFlow.authSessionResult?.type === 'success'){
        if(oAuthFlow.setActive){
          // Set the active session if available
          oAuthFlow.setActive({ session: oAuthFlow.createdSessionId});
        }
      }else {
        setIsLoading(false);
        console.error("OAuth flow did not complete successfully:", oAuthFlow.authSessionResult);
      }

    } catch (error) {
      console.error("Error during Google Sign-In:", error); 
      setIsLoading(false);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    }
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white gap-4">
      <View className='flex flex-row gap-1'>
        <Wind size={64} color="#8B5FBF" />
        <Car size={64} color="#8B5FBF" />
      </View>
    </View>
  );
}
