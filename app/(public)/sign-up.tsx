import {
    useEffect,
    useState,
} from 'react'
import { useOAuth, useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Eye, EyeOff } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const googleOAuth = useOAuth({ strategy: 'oauth_google' });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    console.log(emailAddress, password)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
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
            <Text className="text-2xl font-bold text-gray-800 mb-6">Sign Up</Text>

            <TextInput
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl text-base text-gray-800 bg-gray-50"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9CA3AF"
              onChangeText={setEmailAddress}
            />

            <View className="w-full mb-6">
                <TextInput
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl text-base text-gray-800 bg-gray-50"
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    onPress={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-3.5"
                >
                    {showPassword ? (
                    <EyeOff size={20} color="#6B7280" />
                    ) : (
                    <Eye size={20} color="#6B7280" />
                    )}
                </TouchableOpacity>
                
            </View>

            <TouchableOpacity
              onPress={onSignUpPress}
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
                    {isGoogleLoading ? 'Signing in...' : 'Sign Up with Google'}
                </Text>
                <FontAwesome name="google" size={20} color="white" style={{ marginRight: 8 }} />
            </TouchableOpacity>

            <View className="flex-row mt-2 gap-2">
              <Text className="text-gray-600">Already have an account?</Text>
              <Link href="/(public)/sign-in" asChild>
                <Text className="text-blue-600 font-semibold">Sign in</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}