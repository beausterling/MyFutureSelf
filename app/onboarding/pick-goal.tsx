import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowRight, Dumbbell, Brain, Wallet, Briefcase, Book, Heart, Salad, Moon, Plus } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';

const goalOptions = {
  Exercise: [
    'Go to the gym 3x per week',
    'Run 5km weekly',
    'Daily 30-min workout',
    'Weekly yoga session',
  ],
  'Mental Fitness': [
    'Daily meditation',
    'Weekly therapy session',
    'Journal every morning',
    'Practice mindfulness',
  ],
  Finances: [
    'Save $500 monthly',
    'Track daily expenses',
    'Invest 10% of income',
    'Create emergency fund',
  ],
  Relationships: [
    'Weekly date night',
    'Call family weekly',
    'Monthly friend meetup',
    'Better work-life balance',
  ],
  Learning: [
    'Read 2 books monthly',
    'Take online course',
    'Learn new language',
    'Practice coding daily',
  ],
  Project: [
    'Complete side project',
    'Launch MVP',
    'Write documentation',
    'Weekly progress update',
  ],
  Nutrition: [
    'Meal prep weekly',
    'Eat more vegetables',
    'Reduce sugar intake',
    'Track macros daily',
  ],
  Sleep: [
    '8 hours sleep daily',
    'Consistent bedtime',
    'No screens before bed',
    'Morning routine',
  ],
};

const goals = [
  { id: 1, title: 'Exercise', icon: Dumbbell, color: '#F97316' },
  { id: 2, title: 'Mental Fitness', icon: Brain, color: '#8B5CF6' },
  { id: 3, title: 'Finances', icon: Wallet, color: '#10B981' },
  { id: 4, title: 'Relationships', icon: Heart, color: '#EF4444' },
  { id: 5, title: 'Learning', icon: Book, color: '#EC4899' },
  { id: 6, title: 'Project', icon: Briefcase, color: '#1EBEA5' },
  { id: 7, title: 'Nutrition', icon: Salad, color: '#22C55E' },
  { id: 8, title: 'Sleep', icon: Moon, color: '#3B82F6' },
];

export default function PickGoalScreen() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const [showGoals, setShowGoals] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<Record<string, string[]>>({});
  const [customGoals, setCustomGoals] = useState<Record<string, string[]>>({});
  const [newGoal, setNewGoal] = useState<Record<string, string>>({});

  const handleCategorySelect = (goalId: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(goalId)) {
      newSelected.delete(goalId);
      const category = goals.find(g => g.id === goalId)?.title || '';
      const newSelectedGoals = { ...selectedGoals };
      delete newSelectedGoals[category];
      setSelectedGoals(newSelectedGoals);
    } else {
      newSelected.add(goalId);
    }
    setSelectedCategories(newSelected);
  };

  const handleContinue = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (!showGoals) {
      setShowGoals(true);
    } else {
      router.push('/onboarding/call-style');
    }
  };

  const handleGoalSelect = (category: string, goal: string) => {
    const currentGoals = selectedGoals[category] || [];
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(g => g !== goal)
      : [...currentGoals, goal];
    setSelectedGoals({ ...selectedGoals, [category]: newGoals });
  };

  const handleAddCustomGoal = (category: string) => {
    if (!newGoal[category]?.trim()) return;
    
    const currentCustomGoals = customGoals[category] || [];
    const updatedCustomGoals = [...currentCustomGoals, newGoal[category]];
    setCustomGoals({ ...customGoals, [category]: updatedCustomGoals });
    
    const currentSelectedGoals = selectedGoals[category] || [];
    setSelectedGoals({ 
      ...selectedGoals, 
      [category]: [...currentSelectedGoals, newGoal[category]]
    });
    
    setNewGoal({ ...newGoal, [category]: '' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.header}>
        <ProgressBar currentStep={2} totalSteps={5} />
        <Text style={styles.stepText}>Step 2 of 5</Text>
      </Animated.View>

      <ScrollView style={styles.scrollView}>
        <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.content}>
          <Text style={styles.title}>
            {showGoals ? 'Set your specific goals' : 'What do you want to achieve?'}
          </Text>
          <Text style={styles.subtitle}>
            {showGoals 
              ? 'Choose specific goals for each category or add your own'
              : 'Choose goal categories you want your future self to hold you accountable for. You can update these later'
            }
          </Text>

          {!showGoals ? (
            <View style={styles.goalsGrid}>
              {goals.map((goal) => (
                <Pressable
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    selectedCategories.has(goal.id) && styles.goalCardSelected,
                  ]}
                  onPress={() => handleCategorySelect(goal.id)}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${goal.color}20` }]}>
                    <goal.icon size={28} color={goal.color} />
                  </View>
                  <Text style={styles.goalTitle}>{goal.title}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={styles.categoriesContainer}>
              {Array.from(selectedCategories).map((categoryId) => {
                const category = goals.find(g => g.id === categoryId);
                if (!category) return null;
                
                return (
                  <View key={category.id} style={styles.categorySection}>
                    <View style={styles.categoryHeader}>
                      <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
                        <category.icon size={24} color={category.color} />
                      </View>
                      <Text style={styles.categoryTitle}>{category.title}</Text>
                    </View>
                    
                    <View style={styles.goalsList}>
                      {goalOptions[category.title].map((goal, index) => (
                        <Pressable
                          key={index}
                          style={[
                            styles.goalOption,
                            (selectedGoals[category.title] || []).includes(goal) && styles.goalOptionSelected
                          ]}
                          onPress={() => handleGoalSelect(category.title, goal)}
                        >
                          <Text style={styles.goalOptionText}>{goal}</Text>
                        </Pressable>
                      ))}
                      
                      {(customGoals[category.title] || []).map((goal, index) => (
                        <Pressable
                          key={`custom-${index}`}
                          style={[
                            styles.goalOption,
                            (selectedGoals[category.title] || []).includes(goal) && styles.goalOptionSelected
                          ]}
                          onPress={() => handleGoalSelect(category.title, goal)}
                        >
                          <Text style={styles.goalOptionText}>{goal}</Text>
                        </Pressable>
                      ))}
                      
                      <View style={styles.addCustomGoal}>
                        <TextInput
                          style={styles.customGoalInput}
                          placeholder="Add custom goal..."
                          value={newGoal[category.title] || ''}
                          onChangeText={(text) => setNewGoal({ ...newGoal, [category.title]: text })}
                          onSubmitEditing={() => handleAddCustomGoal(category.title)}
                        />
                        <Pressable
                          style={styles.addButton}
                          onPress={() => handleAddCustomGoal(category.title)}
                        >
                          <Plus size={20} color="#1EBEA5" />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <Pressable
            style={[
              styles.button,
              (!showGoals && selectedCategories.size === 0) && styles.buttonDisabled
            ]}
            onPress={handleContinue}
            disabled={!showGoals && selectedCategories.size === 0}
          >
            <Text style={styles.buttonText}>
              {showGoals ? 'Continue' : 'Next'}
            </Text>
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
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categorySection: {
    marginBottom: 24,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#121B2F',
    marginLeft: 12,
  },
  goalsList: {
    gap: 8,
  },
  goalOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  goalOptionSelected: {
    backgroundColor: '#F0FFFD',
    borderColor: '#1EBEA5',
  },
  goalOptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#121B2F',
  },
  addCustomGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  customGoalInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FFFD',
    justifyContent: 'center',
    alignItems: 'center',
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