const STREAK_STORAGE_KEY = 'kht_user_streak_v1';

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD in UTC+3
  dailyGoalMinutes: number;
  todayMinutesTyped: number;
}

export function getTodayTurkeyDate(): string {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const turkey = new Date(utc + 3600000 * 3);
  return turkey.toISOString().slice(0, 10);
}

export function loadStreakState(): StreakState {
  const defaultState: StreakState = {
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: getTodayTurkeyDate(),
    dailyGoalMinutes: 15,
    todayMinutesTyped: 2.5,
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);

    const today = getTodayTurkeyDate();
    // Check if day changed
    if (parsed.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (parsed.lastActiveDate === yesterdayStr) {
        // Streak is preserved
        parsed.todayMinutesTyped = 0;
      } else {
        // Streak broke
        parsed.currentStreak = 0;
        parsed.todayMinutesTyped = 0;
      }
    }
    return { ...defaultState, ...parsed };
  } catch (e) {
    return defaultState;
  }
}

export function recordCompletedSessionTime(durationSeconds: number): StreakState {
  const state = loadStreakState();
  const today = getTodayTurkeyDate();

  if (state.lastActiveDate !== today) {
    state.currentStreak += 1;
    state.longestStreak = Math.max(state.longestStreak, state.currentStreak);
    state.lastActiveDate = today;
    state.todayMinutesTyped = durationSeconds / 60;
  } else {
    state.todayMinutesTyped += durationSeconds / 60;
  }

  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    //
  }

  return state;
}
