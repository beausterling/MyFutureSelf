import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay 
} from 'react-native-reanimated';

export default function WelcomeScreen() {
  const router = useRouter();
  const buttonScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const subTextOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const loginOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate elements in sequence
    textOpacity.value = withDelay(300, withSpring(1, { damping: 20 }));
    subTextOpacity.value = withDelay(600, withSpring(1, { damping: 20 }));
    buttonOpacity.value = withDelay(900, withSpring(1, { damping: 20 }));
    loginOpacity.value = withDelay(1200, withSpring(1, { damping: 20 }));
  }, []);

  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Animate button press
    buttonScale.value = withSequence(
      withSpring(0.95, { damping: 10, stiffness: 300 }),
      withDelay(100, withSpring(1, { damping: 15, stiffness: 300 }))
    );
    
    // Navigate to onboarding
    router.push('/onboarding/verify-phone');
  };

  const handleLoginPress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Navigate to sign in screen (to be implemented)
  };

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
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
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
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#1A3A5F',
    fontWeight: '600',
  },
  loginContainer: {
    position: 'absolute',
    bottom: 40,
  },
  loginText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
});