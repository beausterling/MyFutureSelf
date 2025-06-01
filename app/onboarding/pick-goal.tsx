import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowRight, Dumbbell, Brain, Wallet, Briefcase, Book, Heart, Salad, Moon } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

const goals = [
  { id: 1, title: 'Exercise', icon: Dumbbell, color: '#F97316' },
  { id: 2, title: 'Mental Fitness', icon: Brain, color: '#8B5CF6' },
  { id: 3, title: 'Finances', icon: Wallet, color: '#10B981' },
  { id: 4, title: 'Project', icon: Briefcase, color: '#1EBEA5' },
  { id: 5, title: 'Learning', icon: Book, color: '#EC4899' },
  { id: 6, title: 'Relationships', icon: Heart, color: '#EF4444' },
  { id: 7, title: 'Nutrition', icon: Salad, color: '#22C55E' },
  { id: 8, title: 'Sleep', icon: Moon, color: '#3B82F6' },
];

export default function PickGoalScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const handleGoalSelect = (goalId: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/onboarding/call-style');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <ProgressBar currentStep={2} totalSteps={5} />
        <Text style={styles.stepText}>Step 2 of 5</Text>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.content}>
          <Text style={styles.title}>What do you want to achieve?</Text>
          <Text style={styles.subtitle}>
            Choose a goal you want your future self to hold you accountable for
          </Text>

          <View style={styles.goalsGrid}>
            {goals.map((goal) => (
              <Pressable
                key={goal.id}
                style={[
                  styles.goalCard,
                  selectedGoal === goal.id && styles.goalCardSelected,
                ]}
                onPress={() => handleGoalSelect(goal.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${goal.color}20` }]}>
                  <goal.icon size={28} color={goal.color} />
                </View>
                <Text style={styles.goalTitle}>{goal.title}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={[styles.button, !selectedGoal && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={!selectedGoal}
          >
            <Text style={styles.buttonText}>Next</Text>
            <ArrowRight size={20} color="#FFFFFF" style={styles.buttonIcon} />
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
    paddingBottom: 32,
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
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  goalCard: {
    width: '48%',
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F9F9F9',
  },
  goalCardSelected: {
    borderColor: '#1EBEA5',
    backgroundColor: '#F0FFFD',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#121B2F',
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