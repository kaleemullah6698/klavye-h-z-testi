import { Lesson, LessonProgress, CurriculumModule } from '../../types/curriculum';
import { KeyboardLayoutName } from '../../types';
import { TURKISH_Q_MODULES } from '../../content/curriculum/turkishQLessons';
import { TURKISH_F_MODULES } from '../../content/curriculum/turkishFLessons';
import { ENGLISH_QWERTY_MODULES } from '../../content/curriculum/englishQwertyLessons';

const PROGRESS_STORAGE_KEY = 'kht_curriculum_progress_v1';

export function getModulesForLayout(layout: KeyboardLayoutName): CurriculumModule[] {
  switch (layout) {
    case 'tr-f':
      return TURKISH_F_MODULES;
    case 'en-qwerty':
      return ENGLISH_QWERTY_MODULES;
    case 'tr-q':
    default:
      return TURKISH_Q_MODULES;
  }
}

export function loadAllLessonProgress(): Record<string, LessonProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load lesson progress', e);
    return {};
  }
}

export function saveLessonAttempt(
  lesson: Lesson,
  wpm: number,
  accuracy: number
): { progress: LessonProgress; isCompleted: boolean; stars: number } {
  const allProgress = loadAllLessonProgress();
  const current = allProgress[lesson.id] || {
    lessonId: lesson.id,
    status: 'not_started',
    attempts: 0,
    bestWpm: 0,
    bestAccuracy: 0,
    stars: 0,
  };

  const targetAccuracy = lesson.steps[lesson.steps.length - 1]?.targetAccuracy || 90;
  const targetWpm = lesson.steps[lesson.steps.length - 1]?.targetWpm || 20;

  const isCompleted = accuracy >= targetAccuracy;
  let stars = 0;
  if (isCompleted) {
    stars = 1;
    if (wpm >= targetWpm) stars = 2;
    if (accuracy >= 95 && wpm >= targetWpm + 5) stars = 3;
  }

  const updated: LessonProgress = {
    lessonId: lesson.id,
    status: isCompleted ? (stars === 3 ? 'mastered' : 'completed') : 'in_progress',
    attempts: current.attempts + 1,
    bestWpm: Math.max(current.bestWpm, wpm),
    bestAccuracy: Math.max(current.bestAccuracy, accuracy),
    stars: Math.max(current.stars, stars),
    completedAt: isCompleted ? new Date().toISOString() : current.completedAt,
  };

  allProgress[lesson.id] = updated;

  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(allProgress));
  } catch (e) {
    console.error('Failed to save lesson progress', e);
  }

  return { progress: updated, isCompleted, stars };
}

export function isLessonUnlocked(lesson: Lesson, allProgress: Record<string, LessonProgress>): boolean {
  if (!lesson.prerequisiteIds || lesson.prerequisiteIds.length === 0) {
    return true;
  }
  return lesson.prerequisiteIds.every(
    (preId) => allProgress[preId]?.status === 'completed' || allProgress[preId]?.status === 'mastered'
  );
}
