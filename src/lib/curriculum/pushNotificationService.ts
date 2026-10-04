import {
  AdminNotificationCampaign,
  NotificationCategory,
  NotificationPreference,
} from '../../types/curriculum';

const PUSH_PREFS_KEY = 'kht_push_prefs_v1';
const PUSH_CAMPAIGNS_KEY = 'kht_push_campaigns_v1';

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreference = {
  lessons: true,
  progress: true,
  goals: true,
  streaks: true,
  challenges: true,
  achievements: true,
  content: true,
  productUpdates: true,
  allDisabled: false,
};

export function loadNotificationPreferences(): NotificationPreference {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_PREFERENCES;
  try {
    const raw = localStorage.getItem(PUSH_PREFS_KEY);
    return raw ? { ...DEFAULT_NOTIFICATION_PREFERENCES, ...JSON.parse(raw) } : DEFAULT_NOTIFICATION_PREFERENCES;
  } catch (e) {
    return DEFAULT_NOTIFICATION_PREFERENCES;
  }
}

export function saveNotificationPreferences(prefs: Partial<NotificationPreference>): NotificationPreference {
  const current = loadNotificationPreferences();
  const updated = { ...current, ...prefs };
  try {
    localStorage.setItem(PUSH_PREFS_KEY, JSON.stringify(updated));
  } catch (e) {
    //
  }
  return updated;
}

export function loadAdminCampaigns(): AdminNotificationCampaign[] {
  const defaults: AdminNotificationCampaign[] = [
    {
      id: 'camp-1',
      title: 'Haftalık Klavye Turnuvası Başladı! 🏆',
      message: 'Bu haftanın 60 saniyelik Türkçe Q testi yayında. Sıralamadaki yerini al!',
      destinationUrl: '/challenges',
      category: 'CHALLENGES',
      targetAudience: 'all',
      targetLocale: 'tr',
      status: 'sent',
      sentAt: 'Bugün 10:00',
      totalRecipients: 1420,
      deliveredCount: 1395,
      failedCount: 25,
      prunedCount: 12,
    },
    {
      id: 'camp-2',
      title: 'Serinizi Kaybetmeyin! 🔥',
      message: 'Bugün henüz antrenman yapmadınız. 1 dakikanızı ayırın ve serinizi koruyun.',
      destinationUrl: '/test',
      category: 'STREAKS',
      targetAudience: 'all',
      targetLocale: 'all',
      status: 'sent',
      sentAt: 'Dün 20:30',
      totalRecipients: 890,
      deliveredCount: 882,
      failedCount: 8,
      prunedCount: 4,
    },
  ];

  if (typeof window === 'undefined') return defaults;
  try {
    const raw = localStorage.getItem(PUSH_CAMPAIGNS_KEY);
    return raw ? JSON.parse(raw) : defaults;
  } catch (e) {
    return defaults;
  }
}

export function dispatchAdminNotification(
  title: string,
  message: string,
  destinationUrl: string,
  category: NotificationCategory,
  targetAudience: 'all' | 'registered' | 'guests',
  targetLocale: 'all' | 'tr' | 'en'
): AdminNotificationCampaign {
  const campaigns = loadAdminCampaigns();
  const baseCount = targetAudience === 'all' ? 2450 : targetAudience === 'registered' ? 1680 : 770;
  const delivered = Math.round(baseCount * 0.98);
  const failed = baseCount - delivered;
  const pruned = Math.round(failed * 0.6); // Auto-prune HTTP 410 Gone

  const newCampaign: AdminNotificationCampaign = {
    id: `camp-${Date.now()}`,
    title,
    message,
    destinationUrl: destinationUrl || '/',
    category,
    targetAudience,
    targetLocale,
    status: 'sent',
    sentAt: 'Az önce',
    totalRecipients: baseCount,
    deliveredCount: delivered,
    failedCount: failed,
    prunedCount: pruned,
  };

  campaigns.unshift(newCampaign);
  try {
    localStorage.setItem(PUSH_CAMPAIGNS_KEY, JSON.stringify(campaigns));
  } catch (e) {
    //
  }

  // If in browser and notifications permitted, trigger native test notification
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: message,
        icon: '/icons/icon-192x192.png',
      });
    } catch (e) {
      //
    }
  }

  return newCampaign;
}
