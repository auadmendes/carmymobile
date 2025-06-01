import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native'

import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';

import { FontAwesome } from '@expo/vector-icons';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onGoogleSignIn = async () => {
    try {
        setIsGoogleLoading(true);
        const result = await googleOAuth.startOAuthFlow();

        if (result.authSessionResult?.type === 'success') {
        if (result.setActive) {
            await result.setActive({ session: result.createdSessionId });
            router.replace('/');
        }
        } else {
        console.error("OAuth flow failed:", result.authSessionResult);
        }
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    } finally {
        setIsGoogleLoading(false);
    }
 };

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
        WebBrowser.coolDownAsync();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-6">
            <Text className="text-2xl font-bold text-gray-800 mb-6">Sign In</Text>

            <TextInput
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-gray-50"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmailAddress}
            />

            <TextInput
              className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-gray-50"
              value={password}
              placeholder="Enter password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={onSignInPress}
              className="w-full bg-blue-600 py-3 rounded-xl mb-4"
            >
              <Text className="text-center text-white text-base font-semibold">
                Continue
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onGoogleSignIn}
                className="w-full bg-red-600 py-3 rounded-xl mb-4 flex-row items-center justify-center gap-2"
                disabled={isGoogleLoading}
                >
                <Text className="text-white text-base font-semibold">
                    {isGoogleLoading ? 'Signing in...' : 'Continue with Google'}
                </Text>
                <FontAwesome name="google" size={20} color="white" style={{ marginRight: 8 }} />
            </TouchableOpacity>

            <View className="flex-row mt-2 gap-2">
              <Text className="text-gray-600">Don't have an account?</Text>
              <Link href="/(public)/sign-up" asChild>
                <Text className="text-blue-600 font-semibold">Sign up</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}