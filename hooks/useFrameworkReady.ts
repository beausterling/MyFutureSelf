import { useEffect } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    // Only execute on web platform
    const isWeb = Platform.OS === 'web';
    if (isWeb) {
      window.frameworkReady?.();
    }
  }, []);
}