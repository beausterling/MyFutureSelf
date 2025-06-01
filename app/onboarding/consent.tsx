import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Switch, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SquareCheck as CheckSquare, Square } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

export default function ConsentScreen() {
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  });

  const toggleAgreement = (key: keyof typeof agreements) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setAgreements(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFinish = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    // In a real app, we would submit the user's data and preferences here
    router.push('/(tabs)');
  };

  const allRequiredChecked = agreements.terms && agreements.privacy;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <ProgressBar currentStep={5} totalSteps={5} />
        <Text style={styles.stepText}>Step 5 of 5</Text>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.content}>
          <Text style={styles.title}>Almost there!</Text>
          <Text style={styles.subtitle}>
            Review your selections and agree to the terms to get started
          </Text>

          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>Your Setup</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Goal:</Text>
              <Text style={styles.summaryValue}>Exercise</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Contact Method:</Text>
              <Text style={styles.summaryValue}>Phone Call</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Voice Persona:</Text>
              <Text style={styles.summaryValue}>Supportive Friend</Text>
            </View>
          </View>

          <View style={styles.agreementsContainer}>
            <Text style={styles.sectionTitle}>Agreements</Text>
            
            <Pressable 
              style={styles.agreementRow}
              onPress={() => toggleAgreement('terms')}
            >
              {agreements.terms ? 
                <CheckSquare size={24} color="#1EBEA5" /> : 
                <Square size={24} color="#666666" />
              }
              <Text style={styles.agreementText}>
                I agree to the <Text style={styles.link}>Terms of Service</Text>
              </Text>
            </Pressable>
            
            <Pressable 
              style={styles.agreementRow}
              onPress={() => toggleAgreement('privacy')}
            >
              {agreements.privacy ? 
                <CheckSquare size={24} color="#1EBEA5" /> : 
                <Square size={24} color="#666666" />
              }
              <Text style={styles.agreementText}>
                I agree to the <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </Pressable>
            
            <Pressable 
              style={styles.agreementRow}
              onPress={() => toggleAgreement('marketing')}
            >
              {agreements.marketing ? 
                <CheckSquare size={24} color="#1EBEA5" /> : 
                <Square size={24} color="#666666" />
              }
              <Text style={styles.agreementText}>
                I'm okay with receiving marketing emails
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.button, !allRequiredChecked && styles.buttonDisabled]}
            onPress={handleFinish}
            disabled={!allRequiredChecked}
          >
            <Text style={styles.buttonText}>Finish</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
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
  summaryContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#121B2F',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#666666',
    width: 140,
  },
  summaryValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#121B2F',
    flex: 1,
  },
  agreementsContainer: {
    marginBottom: 32,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agreementText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#121B2F',
    marginLeft: 12,
    flex: 1,
  },
  link: {
    color: '#1EBEA5',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#1EBEA5',
    borderRadius: 30,
    paddingVertical: 16,
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
  },
});