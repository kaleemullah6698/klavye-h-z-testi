import { PersonalBest, TestResult, UserPreferences } from '../../types';

const STORAGE_KEYS = {
  PREFERENCES: 'kht_user_preferences_v1',
  HISTORY: 'kht_test_history_v1',
  PERSONAL_BESTS: 'kht_personal_bests_v1',
} as const;

export const DEFAULT_PREFERENCES: UserPreferences = {
  interfaceLocale: 'tr',
  contentLanguage: 'tr',
  keyboardLayout: 'tr-q',
  testMode: 'time',
  testDuration: 60,
  wordCount: 50,
  soundType: 'mechanical',
  soundVolume: 0.4,
  caretStyle: 'line',
  theme: 'dark',
  showKeyboard: true,
  showHands: true,
  showLiveWpm: true,
  showLiveAccuracy: true,
  showLiveTimer: true,
  stopOnError: false,
  includePunctuation: false,
  includeNumbers: false,
  zenMode: true,
  paceCaret: false,
  paceWpm: 75,
};

export function loadPreferences(): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch (e) {
    console.error('Failed to parse preferences from localStorage', e);
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const current = loadPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save preferences to localStorage', e);
    return DEFAULT_PREFERENCES;
  }
}

export function loadTestHistory(): TestResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
    return [];
  }
}

export function loadPersonalBests(): Record<string, PersonalBest> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PERSONAL_BESTS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load personal bests from localStorage', e);
    return {};
  }
}

export function saveTestResult(result: TestResult): { isNewPb: boolean } {
  if (typeof window === 'undefined') return { isNewPb: false };
  try {
    // 1. Update history (keep last 50)
    const history = loadTestHistory();
    history.unshift(result);
    if (history.length > 50) {
      history.length = 50;
    }
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

    // 2. Check and update Personal Best
    const pbs = loadPersonalBests();
    const pbKey = `${result.mode}_${result.modeValue}_${result.contentLanguage}_${result.keyboardLayout}`;
    const currentPb = pbs[pbKey];

    let isNewPb = false;
    if (!currentPb || result.wpm > currentPb.wpm) {
      pbs[pbKey] = {
        wpm: result.wpm,
        accuracy: result.accuracy,
        date: result.completedAt,
      };
      localStorage.setItem(STORAGE_KEYS.PERSONAL_BESTS, JSON.stringify(pbs));
      isNewPb = true;
    }

    return { isNewPb };
  } catch (e) {
    console.error('Failed to save test result', e);
    return { isNewPb: false };
  }
}

export function clearAllTestHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.PERSONAL_BESTS);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function exportHistoryAsJson(): string {
  const history = loadTestHistory();
  const pbs = loadPersonalBests();
  const data = {
    exportDate: new Date().toISOString(),
    personalBests: pbs,
    history,
  };
  return JSON.stringify(data, null, 2);
}
