import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Zap,
  Target,
  Flame,
  Star,
  BookOpen,
  Calendar,
  Lock,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { InterfaceLocale } from '../../types';
import { ALL_ACHIEVEMENTS } from '../../content/curriculum/achievements';
import { loadUserProfile } from '../../lib/curriculum/userService';
import { useTranslation } from '../../messages/i18n';

interface AchievementsModalProps {
  locale: InterfaceLocale;
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  locale,
  isOpen,
  onClose,
}) => {
  const t = useTranslation(locale);
  const profile = loadUserProfile();
  const [filter, setFilter] = useState<'all' | 'speed' | 'accuracy' | 'streak' | 'lessons' | 'special'>('all');

  const filteredBadges = ALL_ACHIEVEMENTS.filter(
    (b) => filter === 'all' || b.category === filter
  );

  const unlockedCount = ALL_ACHIEVEMENTS.filter((b) =>
    profile.unlockedBadgeIds.includes(b.id)
  ).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-sans">
                  {locale === 'tr' ? 'Rozetler ve Başarılar' : 'Badges & Achievements'}
                </h2>
                <p className="text-xs text-slate-300 font-medium">
                  {unlockedCount} / {ALL_ACHIEVEMENTS.length} Rozet Açıldı
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

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 my-4">
            {(['all', 'speed', 'accuracy', 'streak', 'lessons', 'special'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
                  filter === cat
                    ? 'bg-[#0284c7] text-white font-semibold'
                    : 'bg-[#0a0e17] text-slate-300 hover:text-white border border-[#334155]'
                }`}
              >
                {cat === 'all' ? 'Tümü' : cat === 'speed' ? 'Hız' : cat === 'accuracy' ? 'Doğruluk' : cat === 'streak' ? 'Seri' : cat === 'lessons' ? 'Dersler' : 'Özel'}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[52vh] overflow-y-auto pr-1">
            {filteredBadges.map((badge) => {
              const isUnlocked = profile.unlockedBadgeIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`
                    p-4 rounded-2xl border transition-colors flex items-start gap-3
                    ${
                      isUnlocked
                        ? 'bg-[#0a0e17] border-amber-500/40'
                        : 'bg-[#0a0e17] border-[#334155] opacity-60'
                    }
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border
                      ${
                        isUnlocked
                          ? 'bg-amber-950/40 text-amber-400 border-amber-500/40'
                          : 'bg-[#111827] text-slate-400 border-[#334155]'
                      }
                    `}
                  >
                    {isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{locale === 'tr' ? badge.title : badge.titleEn}</span>
                      {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">
                      {locale === 'tr' ? badge.description : badge.descriptionEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#334155] flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
