import { UserProfile } from '../../types/curriculum';
import { ALL_ACHIEVEMENTS } from '../../content/curriculum/achievements';
import { loadTestHistory, loadPersonalBests } from '../storage/localStorage';
import { loadAllLessonProgress } from './curriculumService';
import { loadStreakState } from './streakService';

const USER_PROFILE_KEY = 'kht_user_profile_v1';

export function loadUserProfile(): UserProfile {
  const defaultProfile: UserProfile = {
    id: 'user-guest-001',
    username: 'hizli_typist',
    displayName: 'Misafir Typist',
    isPublic: false, // Default private per U-2
    createdAt: new Date().toISOString(),
    currentStreak: 1,
    longestStreak: 1,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    totalTestsCompleted: 0,
    totalLessonsCompleted: 0,
    dailyGoalMinutes: 15,
    dailyMinutesTyped: 0,
    unlockedBadgeIds: ['first-step'],
  };

  if (typeof window === 'undefined') return defaultProfile;

  try {
    const raw = localStorage.getItem(USER_PROFILE_KEY);
    const parsed = raw ? JSON.parse(raw) : defaultProfile;

    // Refresh streak and test counts
    const history = loadTestHistory();
    const streak = loadStreakState();
    const lessonProgress = loadAllLessonProgress();
    const completedLessons = Object.values(lessonProgress).filter(
      (p) => p.status === 'completed' || p.status === 'mastered'
    ).length;

    // Evaluate unlocked achievements
    const unlocked: string[] = ['first-step'];
    const bestWpm = history.length > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
    const bestAcc = history.length > 0 ? Math.max(...history.map((h) => h.accuracy)) : 0;
    const bestCons = history.length > 0 ? Math.max(...history.map((h) => h.consistency)) : 0;

    if (bestWpm >= 40) unlocked.push('wpm-40');
    if (bestWpm >= 60) unlocked.push('wpm-60');
    if (bestWpm >= 80) unlocked.push('wpm-80');
    if (bestWpm >= 100) unlocked.push('wpm-100');
    if (bestAcc >= 98) unlocked.push('accuracy-98');
    if (bestAcc >= 100) unlocked.push('accuracy-100');
    if (bestCons >= 90) unlocked.push('consistency-90');
    if (streak.currentStreak >= 3) unlocked.push('streak-3');
    if (streak.currentStreak >= 7) unlocked.push('streak-7');
    if (streak.currentStreak >= 30) unlocked.push('streak-30');
    if (completedLessons >= 4) unlocked.push('lesson-module-1');
    if (completedLessons >= 5) unlocked.push('lesson-master');
    if (history.length >= 50) unlocked.push('typingfastest-elite');

    return {
      ...parsed,
      totalTestsCompleted: history.length,
      totalLessonsCompleted: completedLessons,
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      unlockedBadgeIds: Array.from(new Set([...(parsed.unlockedBadgeIds || []), ...unlocked])),
    };
  } catch (e) {
    return defaultProfile;
  }
}

export function saveUserProfile(profile: Partial<UserProfile>): UserProfile {
  const current = loadUserProfile();
  const updated = { ...current, ...profile };
  try {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updated));
  } catch (e) {
    //
  }
  return updated;
}

export function migrateGuestDataToAccount(newUsername: string, email: string): { success: boolean; migratedCount: number } {
  const history = loadTestHistory();
  const pbs = loadPersonalBests();

  const profile = saveUserProfile({
    username: newUsername,
    displayName: newUsername,
    email,
    isPublic: false,
    totalTestsCompleted: history.length,
  });

  return {
    success: true,
    migratedCount: history.length,
  };
}
