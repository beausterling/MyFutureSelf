import React from 'react';
import { StyleSheet, Text, Pressable, ViewStyle, TextStyle, PressableProps, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence
} from 'react-native-reanimated';

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

const Button = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  style,
  textStyle,
  onPress,
  disabled,
  loading = false,
  ...rest
}: ButtonProps) => {
  const scale = useSharedValue(1);

  const handlePress = () => {
    if (disabled || loading) return;
    
    // Trigger haptic feedback
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Animate button press
    scale.value = withSequence(
      withSpring(0.95, { damping: 10, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );
    
    // Call the original onPress handler
    onPress && onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
    >
      <Pressable
        style={[
          styles.button,
          styles[`${variant}Button`],
          styles[`${size}Button`],
          disabled && styles.disabledButton,
          disabled && styles[`${variant}DisabledButton`],
        ]}
        onPress={handlePress}
        disabled={disabled || loading}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }}
        {...rest}
      >
        {loading ? (
          <View style={styles.loadingIndicator} />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text
              style={[
                styles.text,
                styles[`${variant}Text`],
                styles[`${size}Text`],
                disabled && styles.disabledText,
                textStyle,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 30,
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  primaryButton: {
    backgroundColor: '#1EBEA5',
  },
  secondaryButton: {
    backgroundColor: '#F0FFFD',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1EBEA5',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    opacity: 0.7,
  },
  primaryDisabledButton: {
    backgroundColor: '#CCCCCC',
  },
  secondaryDisabledButton: {
    backgroundColor: '#F5F5F5',
  },
  outlineDisabledButton: {
    borderColor: '#CCCCCC',
  },
  text: {
    fontFamily: 'Inter_600SemiBold',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#1EBEA5',
  },
  outlineText: {
    color: '#1EBEA5',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: '#999999',
  },
  iconContainer: {
    marginRight: 8,
  },
  loadingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderTopColor: 'transparent',
  },
});

export default Button;