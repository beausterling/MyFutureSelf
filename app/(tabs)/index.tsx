import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Bell, Calendar, PhoneCall } from 'lucide-react-native';

export default function HomeScreen() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric' 
  });

  // Placeholder data for upcoming calls
  const upcomingCalls = [
    { id: 1, time: '9:00 AM', day: 'Today', title: 'Morning Exercise Check-in' },
    { id: 2, time: '5:30 PM', day: 'Tomorrow', title: 'Evening Reflection' },
    { id: 3, time: '8:00 AM', day: 'Thu, Jun 3', title: 'Weekly Progress Review' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient
        colors={['#1EBEA5', '#1A3A5F']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.greeting}>Hello, Alex</Text>
          </View>
          <View style={styles.iconContainer}>
            <Bell color="#FFFFFF" size={24} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.statusCard}
          >
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>Goal Status</Text>
              <Text style={styles.statusSubtitle}>Exercise</Text>
            </View>
            <View style={styles.statusBody}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '40%' }]} />
                </View>
                <Text style={styles.progressText}>2 of 5 workouts completed</Text>
              </View>
              <Text style={styles.encouragement}>
                You're making progress! Keep it up to reach your weekly goal.
              </Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.sectionContainer}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Check-ins</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
            
            {upcomingCalls.map((call) => (
              <View key={call.id} style={styles.callCard}>
                <View style={styles.callTimeContainer}>
                  <Text style={styles.callTime}>{call.time}</Text>
                  <Text style={styles.callDay}>{call.day}</Text>
                </View>
                <View style={styles.callDetails}>
                  <Text style={styles.callTitle}>{call.title}</Text>
                  <Text style={styles.callType}>Voice call • 5 min</Text>
                </View>
                <View style={styles.callIconContainer}>
                  <PhoneCall size={20} color="#1EBEA5" />
                </View>
              </View>
            ))}
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(600).duration(600)}
            style={styles.sectionContainer}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Activity Insights</Text>
            </View>
            <View style={styles.insightCard}>
              <Text style={styles.insightTitle}>
                You're 68% more likely to exercise on days when you schedule a morning check-in
              </Text>
              <Text style={styles.insightMessage}>
                Consider adding more morning check-ins to your schedule
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  greeting: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#FFFFFF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    marginBottom: 16,
  },
  statusTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#121B2F',
    marginBottom: 4,
  },
  statusSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
  },
  statusBody: {},
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1EBEA5',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
  },
  encouragement: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#121B2F',
    lineHeight: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#121B2F',
  },
  seeAll: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: '#1EBEA5',
  },
  callCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  callTimeContainer: {
    marginRight: 16,
  },
  callTime: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#121B2F',
    marginBottom: 2,
  },
  callDay: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666666',
  },
  callDetails: {
    flex: 1,
  },
  callTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#121B2F',
    marginBottom: 4,
  },
  callType: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666666',
  },
  callIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0FFFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightCard: {
    backgroundColor: '#F0FFFD',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1EBEA5',
  },
  insightTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#121B2F',
    marginBottom: 8,
    lineHeight: 20,
  },
  insightMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666666',
  },
});