export type TestMode = 'time' | 'words' | 'quote';
export type TestDuration = 15 | 30 | 60 | 180 | 300 | 600;
export type WordCount = 25 | 50 | 100;
export type ContentLanguage = 'tr' | 'en';
export type InterfaceLocale = 'tr' | 'en';
export type KeyboardLayoutName = 'tr-q' | 'tr-f' | 'en-qwerty';
export type CaretStyle = 'line' | 'block' | 'underline';
export type SoundType = 'mechanical' | 'thock' | 'typewriter' | 'beep' | 'off';
export type ThemeMode = 'dark' | 'midnight' | 'solarized' | 'cyberpunk' | 'light';

export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export interface KeyDefinition {
  code: string;
  defaultKey: string;
  shiftKey?: string;
  altGrKey?: string;
  finger: Finger;
  row: 'number' | 'top' | 'home' | 'bottom' | 'space';
  width?: number; // relative width (1 = 1u, 1.5 = 1.5u, etc.)
  label?: string;
}

export interface KeyboardLayout {
  name: KeyboardLayoutName;
  label: string;
  shortLabel: string;
  description: string;
  keys: KeyDefinition[];
}

export interface WpmSample {
  time: number; // elapsed seconds
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface TestResult {
  id: string;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  durationSeconds: number;
  mode: TestMode;
  modeValue: number; // duration or word count
  contentLanguage: ContentLanguage;
  keyboardLayout: KeyboardLayoutName;
  charsCorrect: number;
  charsIncorrect: number;
  charsExtra: number;
  charsMissed: number;
  uncorrectedErrors: number;
  totalKeystrokes: number;
  wpmOverTime: WpmSample[];
  completedAt: string; // ISO string
  isPersonalBest?: boolean;
}

export interface PersonalBest {
  wpm: number;
  accuracy: number;
  date: string;
}

export interface UserPreferences {
  interfaceLocale: InterfaceLocale;
  contentLanguage: ContentLanguage;
  keyboardLayout: KeyboardLayoutName;
  testMode: TestMode;
  testDuration: TestDuration;
  wordCount: WordCount;
  soundType: SoundType;
  soundVolume: number; // 0 to 1
  caretStyle: CaretStyle;
  theme: ThemeMode;
  showKeyboard: boolean;
  showHands: boolean;
  showLiveWpm: boolean;
  showLiveAccuracy: boolean;
  showLiveTimer: boolean;
  stopOnError: boolean;
  includePunctuation: boolean;
  includeNumbers: boolean;
  zenMode: boolean;
  paceCaret: boolean;
  paceWpm: number;
}

export interface QuoteItem {
  id: string;
  text: string;
  author: string;
  source?: string;
  language: ContentLanguage;
  difficulty?: 'easy' | 'medium' | 'hard';
}
