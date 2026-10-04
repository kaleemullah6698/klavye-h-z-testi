import { WeakKeyStat } from '../../types/curriculum';
import { KeyboardLayoutName } from '../../types';
import { KEYBOARD_LAYOUTS } from '../keyboard/layouts';
import { TURKISH_COMMON_WORDS } from '../../content/dictionaries/turkishWords';

const WEAK_KEYS_STORAGE_KEY = 'kht_weak_keys_stats_v1';

export function loadWeakKeyStats(): Record<string, { hits: number; errors: number }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(WEAK_KEYS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function recordKeystrokeStat(key: string, isCorrect: boolean): void {
  if (!key || key.length !== 1) return;
  const lower = key.toLocaleLowerCase('tr-TR');
  const stats = loadWeakKeyStats();
  if (!stats[lower]) {
    stats[lower] = { hits: 0, errors: 0 };
  }
  stats[lower].hits += 1;
  if (!isCorrect) {
    stats[lower].errors += 1;
  }
  // Trim window if over 500 hits per key
  if (stats[lower].hits > 500) {
    stats[lower].hits = Math.round(stats[lower].hits * 0.7);
    stats[lower].errors = Math.round(stats[lower].errors * 0.7);
  }
  try {
    localStorage.setItem(WEAK_KEYS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    // Graceful
  }
}

export function getRankedWeakKeys(layoutName: KeyboardLayoutName = 'tr-q'): WeakKeyStat[] {
  const stats = loadWeakKeyStats();
  const layout = KEYBOARD_LAYOUTS[layoutName] || KEYBOARD_LAYOUTS['tr-q'];

  const results: WeakKeyStat[] = [];

  layout.keys.forEach((k) => {
    if (k.defaultKey.length === 1 && k.defaultKey !== ' ') {
      const char = k.defaultKey.toLocaleLowerCase('tr-TR');
      const item = stats[char] || { hits: 0, errors: 0 };
      const errorRate = item.hits > 0 ? Math.round((item.errors / item.hits) * 100) : 0;

      results.push({
        key: k.defaultKey,
        finger: k.finger,
        totalHits: item.hits,
        errorCount: item.errors,
        errorRate,
      });
    }
  });

  // Sort by error rate descending, then by error count
  return results.sort((a, b) => b.errorRate - a.errorRate || b.errorCount - a.errorCount);
}

/**
 * Generates an adaptive practice text focused heavily on the user's weak keys.
 */
export function generateWeakKeyDrillText(count = 35): string {
  const weakKeys = getRankedWeakKeys()
    .filter((k) => k.totalHits >= 3 && k.errorRate > 8)
    .slice(0, 4)
    .map((k) => k.key.toLocaleLowerCase('tr-TR'));

  // If no weak keys found yet, select Turkish specific keys as fallback
  const targets = weakKeys.length > 0 ? weakKeys : ['ğ', 'ş', 'ü', 'ç', 'ı', 'ö'];

  // Filter words that contain at least one target key
  const relevantWords = TURKISH_COMMON_WORDS.filter((word) =>
    targets.some((char) => word.includes(char))
  );

  const pool = relevantWords.length > 10 ? relevantWords : TURKISH_COMMON_WORDS;
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    result.push(pool[idx]);
  }

  return result.join(' ');
}
