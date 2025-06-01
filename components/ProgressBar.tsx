import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const { width } = Dimensions.get('window');

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = useSharedValue(0);
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  React.useEffect(() => {
    progress.value = withTiming(progressPercentage / 100, { duration: 800 });
  }, [currentStep, totalSteps]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ['#83D6CA', '#4BCAB0', '#1EBEA5']
      ),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.progress, progressStyle]} />
      </View>
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.step, 
              index < currentStep ? styles.completedStep : {}
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 2,
  },
  step: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  completedStep: {
    backgroundColor: '#1EBEA5',
  },
});

export default ProgressBar;