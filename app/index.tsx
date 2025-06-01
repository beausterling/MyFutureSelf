import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { useSignUp, useAuth } from '@clerk/clerk-expo';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay 
} from 'react-native-reanimated';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function WelcomeScreen() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signUp, setActive } = useSignUp();
  const buttonScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const subTextOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const loginOpacity = useSharedValue(0);

  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
  });

  useEffect(() => {
    // Animate elements in sequence
    textOpacity.value = withDelay(300, withSpring(1, { damping: 20 }));
    subTextOpacity.value = withDelay(600, withSpring(1, { damping: 20 }));
    buttonOpacity.value = withDelay(900, withSpring(1, { damping: 20 }));
    loginOpacity.value = withDelay(1200, withSpring(1, { damping: 20 }));
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/(tabs)');
    }
  }, [isSignedIn]);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: withSpring(textOpacity.value * 0 + (1 - textOpacity.value) * 20) }]
  }));

  const animatedSubTextStyle = useAnimatedStyle(() => ({
    opacity: subTextOpacity.value,
    transform: [{ translateY: withSpring(subTextOpacity.value * 0 + (1 - subTextOpacity.value) * 20) }]
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [
      { scale: buttonScale.value },
      { translateY: withSpring(buttonOpacity.value * 0 + (1 - buttonOpacity.value) * 20) }
    ]
  }));

  const animatedLoginStyle = useAnimatedStyle(() => ({
    opacity: loginOpacity.value,
  }));

  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Animate button press
    buttonScale.value = withSequence(
      withSpring(0.95, { damping: 10, stiffness: 300 }),
      withDelay(100, withSpring(1, { damping: 15, stiffness: 300 }))
    );
    
    try {
      // Create a new user with a placeholder email (we'll update this later)
      const result = await signUp.create({
        emailAddress: `user-${Date.now()}@example.com`,
        password: `temp-${Date.now()}`,
      });

      // Set the newly created user as active
      await setActive({ session: result.createdSessionId });
      
      // Navigate to onboarding
      router.push('/onboarding/verify-phone');
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  const handleLoginPress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Navigate to sign in screen (to be implemented)
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#121B2F', '#1A3A5F', '#1EBEA5']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.title, animatedTextStyle]}>
              Accountability that actually works.
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, animatedSubTextStyle]}>
              Your future self is calling 📞
            </Animated.Text>
          </View>

          <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
            <Pressable 
              style={styles.button} 
              onPress={handlePress}
              android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: false }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
          </Animated.View>
          
          <Animated.View style={[styles.loginContainer, animatedLoginStyle]}>
            <Pressable onPress={handleLoginPress}>
              <Text style={styles.loginText}>Log In</Text>
            </Pressable>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'InterRegular',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    color: '#1A3A5F',
    fontWeight: '600',
  },
  loginContainer: {
    position: 'absolute',
    bottom: 40,
  },
  loginText: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});