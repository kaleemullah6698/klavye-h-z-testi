import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Download,
  Upload,
  CheckCircle2,
  X,
  Lock,
  Globe,
  Flame,
  Award,
  Calendar,
} from 'lucide-react';
import { InterfaceLocale } from '../../types';
import { loadUserProfile, saveUserProfile, migrateGuestDataToAccount } from '../../lib/curriculum/userService';
import {
  loadNotificationPreferences,
  saveNotificationPreferences,
} from '../../lib/curriculum/pushNotificationService';
import { NotificationPreference } from '../../types/curriculum';
import { useTranslation } from '../../messages/i18n';

interface ProfileModalProps {
  locale: InterfaceLocale;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  locale,
  isOpen,
  onClose,
  onProfileUpdated,
}) => {
  const t = useTranslation(locale);
  const [profile, setProfile] = useState(() => loadUserProfile());
  const [notifPrefs, setNotifPrefs] = useState(() => loadNotificationPreferences());

  const [usernameInput, setUsernameInput] = useState(profile.username);
  const [emailInput, setEmailInput] = useState(profile.email || '');
  const [isMigrated, setIsMigrated] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSaveProfile = () => {
    saveUserProfile({
      username: usernameInput,
      displayName: usernameInput,
      isPublic: profile.isPublic,
      dailyGoalMinutes: profile.dailyGoalMinutes,
    });
    onProfileUpdated();
    onClose();
  };

  const handleTogglePrivacy = (isPublic: boolean) => {
    const updated = saveUserProfile({ isPublic });
    setProfile(updated);
    onProfileUpdated();
  };

  const handleUpdateNotifPref = (key: keyof NotificationPreference, val: boolean) => {
    const updated = saveNotificationPreferences({ [key]: val });
    setNotifPrefs(updated);
  };

  const handleMigrate = () => {
    setFormError(null);
    if (!usernameInput || !emailInput) {
      setFormError(
        locale === 'tr'
          ? 'Lütfen kullanıcı adı ve e-posta adresinizi eksiksiz girin.'
          : 'Please enter both username and email address.'
      );
      return;
    }
    const res = migrateGuestDataToAccount(usernameInput, emailInput);
    if (res.success) {
      setIsMigrated(true);
      setProfile(loadUserProfile());
      onProfileUpdated();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0284c7] flex items-center justify-center text-white font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white font-sans">
                  {locale === 'tr' ? 'Profil ve Hesap Ayarları' : 'Profile & Account'}
                </h2>
                <p className="text-xs text-slate-300 font-medium">
                  {profile.isPublic ? 'Herkese Açık Profil' : 'Gizli Profil (Varsayılan)'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#1e293b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 my-5 overflow-y-auto pr-2 max-h-[64vh]">
            {/* 1. Account Details & Guest Migration */}
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#00e5ff] uppercase tracking-wider font-mono">
                  {locale === 'tr' ? 'Hesap & Misafir Verisi Eşitleme' : 'Account & Guest Sync'}
                </span>
                <span className="text-xs text-[#cbd5e1] font-mono font-medium">
                  {profile.totalTestsCompleted} Test Kayıtlı
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#cbd5e1] mb-1 font-semibold">Kullanıcı Adı</label>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full bg-[#111827] border border-[#334155] rounded-xl px-3 py-2 text-[#f8fafc] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <div>
                  <label className="block text-[#cbd5e1] mb-1 font-semibold">E-Posta (Yedekleme İçin)</label>
                  <input
                    type="email"
                    value={emailInput}
                    placeholder="ornek@mail.com"
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-[#111827] border border-[#334155] rounded-xl px-3 py-2 text-[#f8fafc] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-2.5 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ef4444] text-xs font-medium flex items-center gap-2">
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleMigrate}
                className="w-full py-2.5 rounded-xl bg-[#00e5ff]/15 hover:bg-[#00e5ff]/25 text-[#00e5ff] border border-[#00e5ff]/40 text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                {isMigrated ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                    <span className="text-[#22c55e]">Tüm Yerel Testler Hesaba Eşitlendi!</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Misafir Geçmişini Kalıcı Hesaba Aktar (1-Click Sync)</span>
                  </>
                )}
              </button>
            </div>

            {/* 2. Privacy Setting (KVKK / Decision U-2: Private by default) */}
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c084fc] uppercase tracking-wider font-mono">
                <Shield className="w-4 h-4" />
                <span>Gizlilik Ayarları (KVKK Uyumlu)</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#f8fafc] font-bold block">Profil Görünürlüğü</span>
                  <span className="text-xs text-[#cbd5e1] font-medium">
                    {profile.isPublic
                      ? 'Profiliniz liderlik tablosunda herkese görünür.'
                      : 'Profiliniz gizlidir. Skorlarınız isminiz olmadan anonim kalır.'}
                  </span>
                </div>

                <div className="flex items-center bg-[#111827] p-1 rounded-xl border border-[#334155]">
                  <button
                    type="button"
                    onClick={() => handleTogglePrivacy(false)}
                    className={`px-3 py-1 rounded-lg font-medium text-xs transition-all flex items-center gap-1 ${
                      !profile.isPublic ? 'bg-[#00e5ff] text-[#03121a] font-bold' : 'text-[#cbd5e1]'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Gizli</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTogglePrivacy(true)}
                    className={`px-3 py-1 rounded-lg font-medium text-xs transition-all flex items-center gap-1 ${
                      profile.isPublic ? 'bg-[#00e5ff] text-[#03121a] font-bold' : 'text-[#cbd5e1]'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Açık</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Notification Category Preferences (8 Categories from Document I) */}
            <div className="p-4 rounded-2xl bg-[#0a0e17]/80 border border-[#334155] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00e5ff] uppercase tracking-wider font-mono">
                  <Bell className="w-4 h-4" />
                  <span>Bildirim Tercihleri (8 Kategori)</span>
                </div>
                <span className="text-xs text-[#22c55e] font-semibold">W3C Web Push</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'lessons' as const, label: 'Ders Hatırlatıcıları' },
                  { key: 'progress' as const, label: 'Gelişim & Analizler' },
                  { key: 'goals' as const, label: 'Günlük Hedefler' },
                  { key: 'streaks' as const, label: 'Seri Koruması (Streak)' },
                  { key: 'challenges' as const, label: 'Meydan Okumalar' },
                  { key: 'achievements' as const, label: 'Rozetler & Başarılar' },
                  { key: 'content' as const, label: 'Yeni İçerikler' },
                  { key: 'productUpdates' as const, label: 'Platform Güncellemeleri' },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#111827] border border-[#334155] cursor-pointer hover:border-[#0284c7] transition-colors"
                  >
                    <span className="text-white text-xs font-medium">{label}</span>
                    <input
                      type="checkbox"
                      checked={notifPrefs[key]}
                      onChange={(e) => handleUpdateNotifPref(key, e.target.checked)}
                      className="w-3.5 h-3.5 accent-[#0284c7] rounded"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#334155] flex justify-end">
          <button
            type="button"
            onClick={handleSaveProfile}
            className="px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
          >
            Kaydet ve Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
