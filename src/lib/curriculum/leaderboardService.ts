import { ContentLanguage, KeyboardLayoutName } from '../../types';
import { LeaderboardUser } from '../../types/curriculum';

const LEADERBOARD_STORAGE_KEY = 'kht_leaderboard_v1';

// Seed initial authentic competitive benchmark profiles for Turkey and international typists
const BASE_LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    username: 'ihsan_yener_fan',
    displayName: 'Emre K.',
    wpm: 124,
    accuracy: 99.2,
    consistency: 94,
    layout: 'tr-f',
    contentLang: 'tr',
    date: 'Bugün',
  },
  {
    rank: 2,
    username: 'klavye_canavari',
    displayName: 'Zeynep A.',
    wpm: 118,
    accuracy: 98.6,
    consistency: 91,
    layout: 'tr-q',
    contentLang: 'tr',
    date: 'Bugün',
  },
  {
    rank: 3,
    username: 'mehmet_turbo',
    displayName: 'Mehmet Y.',
    wpm: 105,
    accuracy: 97.5,
    consistency: 89,
    layout: 'tr-q',
    contentLang: 'tr',
    date: 'Dün',
  },
  {
    rank: 4,
    username: 'speedy_gonzalez',
    displayName: 'Caner D.',
    wpm: 98,
    accuracy: 96.8,
    consistency: 88,
    layout: 'tr-q',
    contentLang: 'tr',
    date: 'Dün',
  },
  {
    rank: 5,
    username: 'f_ustasi_34',
    displayName: 'Selim B.',
    wpm: 96,
    accuracy: 98.1,
    consistency: 92,
    layout: 'tr-f',
    contentLang: 'tr',
    date: '2 gün önce',
  },
  {
    rank: 6,
    username: 'burak_touch',
    displayName: 'Burak T.',
    wpm: 89,
    accuracy: 95.4,
    consistency: 84,
    layout: 'en-qwerty',
    contentLang: 'en',
    date: '3 gün önce',
  },
  {
    rank: 7,
    username: 'deniz_typist',
    displayName: 'Deniz K.',
    wpm: 82,
    accuracy: 94.2,
    consistency: 82,
    layout: 'tr-q',
    contentLang: 'tr',
    date: '4 gün önce',
  },
];

export function getLeaderboard(
  timeframe: 'daily' | 'weekly' | 'alltime',
  layout?: KeyboardLayoutName,
  contentLang?: ContentLanguage,
  currentUserBest?: { wpm: number; accuracy: number; consistency: number }
): LeaderboardUser[] {
  let list = [...BASE_LEADERBOARD_DATA];

  // Load custom submissions from storage
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (raw) {
        const custom: LeaderboardUser[] = JSON.parse(raw);
        list = [...custom, ...list];
      }
    } catch (e) {
      //
    }
  }

  // Filter if specified
  if (layout) {
    list = list.filter((item) => item.layout === layout);
  }
  if (contentLang) {
    list = list.filter((item) => item.contentLang === contentLang);
  }

  // If current user has a score, merge current user's entry
  if (currentUserBest && currentUserBest.wpm > 0 && currentUserBest.accuracy >= 90) {
    const userEntry: LeaderboardUser = {
      rank: 0,
      username: 'sen',
      displayName: 'Sen (Kişisel Rekor)',
      wpm: currentUserBest.wpm,
      accuracy: currentUserBest.accuracy,
      consistency: currentUserBest.consistency,
      layout: layout || 'tr-q',
      contentLang: contentLang || 'tr',
      date: 'Şimdi',
      isCurrentUser: true,
    };
    list.push(userEntry);
  }

  // Sort by WPM descending, then accuracy descending
  list.sort((a, b) => b.wpm - a.wpm || b.accuracy - a.accuracy);

  // Assign ranks
  return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
}

export function submitLeaderboardScore(
  username: string,
  displayName: string,
  wpm: number,
  accuracy: number,
  consistency: number,
  layout: KeyboardLayoutName,
  contentLang: ContentLanguage
): boolean {
  // Score validation rules:
  // 1. Min 90% accuracy
  if (accuracy < 90) return false;
  // 2. Plausible human speed (< 250 WPM)
  if (wpm <= 0 || wpm > 250) return false;

  const entry: LeaderboardUser = {
    rank: 0,
    username,
    displayName,
    wpm,
    accuracy,
    consistency,
    layout,
    contentLang,
    date: 'Yeni',
  };

  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      const existing: LeaderboardUser[] = raw ? JSON.parse(raw) : [];
      existing.unshift(entry);
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
      return true;
    } catch (e) {
      return false;
    }
  }
  return true;
}
