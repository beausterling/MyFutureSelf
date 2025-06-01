import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowRight, User, UserCheck, Coffee } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

const voicePersonas = [
  { 
    id: 1, 
    title: 'Supportive Friend', 
    icon: UserCheck, 
    description: 'Encouraging and understanding, helps you stay motivated with kindness' 
  },
  { 
    id: 2, 
    title: 'Tough Coach', 
    icon: User, 
    description: 'Direct and challenging, pushes you to reach your full potential' 
  },
  { 
    id: 3, 
    title: 'Calm Mentor', 
    icon: Coffee, 
    description: 'Wise and patient, guides you with thoughtful perspective' 
  },
];

export default function ChooseVoiceScreen() {
  const router = useRouter();
  const [selectedVoice, setSelectedVoice] = useState<number | null>(null);

  const handleVoiceSelect = (voiceId: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedVoice(voiceId);
  };

  const handleContinue = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/onboarding/consent');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <ProgressBar currentStep={4} totalSteps={5} />
        <Text style={styles.stepText}>Step 4 of 5</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.content}>
        <Text style={styles.title}>Choose your voice persona</Text>
        <Text style={styles.subtitle}>
          Select how your future self should sound when speaking to you
        </Text>

        <View style={styles.cardsContainer}>
          {voicePersonas.map((persona) => (
            <Pressable
              key={persona.id}
              style={[
                styles.card,
                selectedVoice === persona.id && styles.cardSelected,
              ]}
              onPress={() => handleVoiceSelect(persona.id)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <persona.icon size={24} color="#1EBEA5" />
                </View>
                <Text style={styles.cardTitle}>{persona.title}</Text>
              </View>
              <Text style={styles.cardDescription}>{persona.description}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.button, !selectedVoice && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedVoice}
        >
          <Text style={styles.buttonText}>Next</Text>
          <ArrowRight size={20} color="#FFFFFF" style={styles.buttonIcon} />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  stepText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#121B2F',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 24,
  },
  cardsContainer: {
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#F9F9F9',
  },
  cardSelected: {
    borderColor: '#1EBEA5',
    backgroundColor: '#F0FFFD',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F9F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#121B2F',
  },
  cardDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1EBEA5',
    borderRadius: 30,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1EBEA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0.1,
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});