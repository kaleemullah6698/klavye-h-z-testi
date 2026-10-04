import { ContentLanguage, Finger, KeyboardLayoutName, TestResult } from './index';

export type LessonStepType = 'instruction' | 'exercise' | 'keyboard-demo' | 'rest';

export interface LessonStep {
  type: LessonStepType;
  content: string; // Turkish / English instruction
  keyFocus?: string[]; // e.g. ['f', 'j']
  fingerFocus?: Finger[];
  exerciseText?: string;
  targetWpm?: number;
  targetAccuracy?: number; // e.g. 90%
}

export interface Lesson {
  id: string; // e.g. 'tr-q-m1-l1'
  layout: KeyboardLayoutName;
  module: number;
  lessonNumber: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  objectives: string[];
  steps: LessonStep[];
  estimatedMinutes: number;
  prerequisiteIds: string[];
}

export interface CurriculumModule {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  level: 'beginner' | 'elementary' | 'intermediate' | 'advanced';
  lessons: Lesson[];
}

export interface LessonProgress {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'mastered';
  attempts: number;
  bestWpm: number;
  bestAccuracy: number;
  stars: number; // 1, 2, or 3 stars
  completedAt?: string;
}

export interface WeakKeyStat {
  key: string;
  finger: Finger;
  totalHits: number;
  errorCount: number;
  errorRate: number; // percentage 0-100
  avgResponseMs?: number;
}

export interface DailyChallenge {
  id: string; // e.g. 'daily-2026-10-02'
  type: 'daily' | 'weekly';
  title: string;
  description: string;
  passage: string;
  durationSeconds: number;
  minAccuracy: number;
  expiresAt: string; // UTC+3 midnight
  participantCount: number;
}

export interface ChallengeEntry {
  id: string;
  challengeId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  wpm: number;
  accuracy: number;
  submittedAt: string;
  rank?: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  category: 'speed' | 'accuracy' | 'streak' | 'lessons' | 'special';
  unlockedAt?: string;
  progress?: { current: number; max: number };
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  displayName: string;
  avatarUrl?: string;
  wpm: number;
  accuracy: number;
  consistency: number;
  layout: KeyboardLayoutName;
  contentLang: ContentLanguage;
  date: string;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  isPublic: boolean; // default false per U-2
  createdAt: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalTestsCompleted: number;
  totalLessonsCompleted: number;
  dailyGoalMinutes: number;
  dailyMinutesTyped: number;
  unlockedBadgeIds: string[];
}

export type NotificationCategory =
  | 'LESSONS'
  | 'PROGRESS'
  | 'GOALS'
  | 'STREAKS'
  | 'CHALLENGES'
  | 'ACHIEVEMENTS'
  | 'CONTENT'
  | 'PRODUCT_UPDATES';

export interface NotificationPreference {
  lessons: boolean;
  progress: boolean;
  goals: boolean;
  streaks: boolean;
  challenges: boolean;
  achievements: boolean;
  content: boolean;
  productUpdates: boolean;
  allDisabled: boolean;
}

export interface AdminNotificationCampaign {
  id: string;
  title: string;
  message: string;
  destinationUrl: string;
  category: NotificationCategory;
  targetAudience: 'all' | 'registered' | 'guests';
  targetLocale: 'all' | 'tr' | 'en';
  status: 'draft' | 'sending' | 'sent';
  sentAt?: string;
  totalRecipients: number;
  deliveredCount: number;
  failedCount: number;
  prunedCount: number;
}
