export type OnboardingStep = 'verify-phone' | 'pick-goal' | 'call-style' | 'choose-voice' | 'consent';

export type Goal = {
  id: number;
  title: string;
  icon: any;
  color: string;
};

export type CallStyle = {
  id: number;
  title: string;
  icon: any;
  description: string;
};

export type VoicePersona = {
  id: number;
  title: string;
  icon: any;
  description: string;
};

export type UserPreferences = {
  goal?: Goal;
  callStyle?: CallStyle;
  voicePersona?: VoicePersona;
  phoneNumber?: string;
  agreements?: {
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
  };
};

export type UpcomingCall = {
  id: number;
  time: string;
  day: string;
  title: string;
  type?: string;
  duration?: string;
};