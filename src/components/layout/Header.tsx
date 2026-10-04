import React from 'react';
import {
  Keyboard,
  Globe,
  Settings as SettingsIcon,
  Trophy,
  BookOpen,
  FileText,
  Zap,
  GraduationCap,
  Flame,
  Award,
  Bell,
  Activity,
  User,
} from 'lucide-react';
import { InterfaceLocale } from '../../types';
import { useTranslation } from '../../messages/i18n';

export type NavView =
  | 'test'
  | 'curriculum'
  | 'challenges'
  | 'leaderboard'
  | 'weakkeys'
  | 'guide'
  | 'layouts'
  | 'articles'
  | 'admin';

interface HeaderProps {
  locale: InterfaceLocale;
  onToggleLocale: (locale: InterfaceLocale) => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onOpenAchievements: () => void;
  onOpenProfile: () => void;
  onSelectNav: (view: NavView) => void;
  activeNav: NavView;
  streakCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  locale,
  onToggleLocale,
  onOpenSettings,
  onOpenHistory,
  onOpenAchievements,
  onOpenProfile,
  onSelectNav,
  activeNav,
  streakCount,
}) => {
  const t = useTranslation(locale);

  return (
    <>
      <header className="w-full max-w-5xl mx-auto pt-4 pb-3 px-4 flex items-center justify-between border-b border-[#1e293b] bg-[#0a0e17]">
      {/* Brand Logo with Solid Production Identity */}
      <div
        onClick={() => onSelectNav('test')}
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <div className="w-9 h-9 rounded-xl bg-[#0284c7] flex items-center justify-center text-white shadow-sm group-hover:bg-[#0369a1] transition-colors">
          <Keyboard className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold font-sans tracking-tight text-white">
              {t.appTitle}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono tracking-wider hidden sm:inline">
            öğren • yarış • ustalaş
          </span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#111827] border border-[#334155] text-xs">
        <button
          onClick={() => onSelectNav('test')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeNav === 'test'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          {t.nav.test}
        </button>

        <button
          onClick={() => onSelectNav('curriculum')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeNav === 'curriculum'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Dersler</span>
        </button>

        <button
          onClick={() => onSelectNav('challenges')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeNav === 'challenges'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Meydan Okuma</span>
        </button>

        <button
          onClick={() => onSelectNav('leaderboard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeNav === 'leaderboard'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Sıralama</span>
        </button>

        <button
          onClick={() => onSelectNav('weakkeys')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeNav === 'weakkeys'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Zayıf Tuşlar</span>
        </button>

        <button
          onClick={() => onSelectNav('articles')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeNav === 'articles'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Rehber</span>
        </button>
      </nav>

      {/* Action Controls: Streak, Language, Profile, Achievements, Admin Studio, Settings */}
      <div className="flex items-center gap-2">
        {/* Streak Counter Badge */}
        {streakCount > 0 && (
          <div
            onClick={onOpenProfile}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#111827] border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold cursor-pointer hover:bg-[#1e293b] transition-colors"
            title={`${streakCount} Günlük Seri`}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>{streakCount}</span>
          </div>
        )}

        {/* Language Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-[#111827] border border-[#334155] text-xs font-mono">
          <button
            onClick={() => onToggleLocale('tr')}
            className={`px-2 py-1 rounded-lg font-bold transition-colors ${
              locale === 'tr'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            TR
          </button>
          <button
            onClick={() => onToggleLocale('en')}
            className={`px-2 py-1 rounded-lg font-bold transition-colors ${
              locale === 'en'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>

        {/* Achievements Badge Button */}
        <button
          onClick={onOpenAchievements}
          className="p-2 text-slate-300 hover:text-white hover:bg-[#1e293b] bg-[#111827] rounded-xl border border-[#334155] transition-colors"
          title="Rozetler ve Başarılar"
        >
          <Award className="w-4 h-4 text-amber-400" />
        </button>

        {/* User Profile Button */}
        <button
          onClick={onOpenProfile}
          className="p-2 text-slate-300 hover:text-white hover:bg-[#1e293b] bg-[#111827] rounded-xl border border-[#334155] transition-colors"
          title="Profil ve Hesap"
        >
          <User className="w-4 h-4 text-[#38bdf8]" />
        </button>

        {/* Admin Notification Studio Button */}
        <button
          onClick={() => onSelectNav('admin')}
          className={`p-2 rounded-xl border transition-colors ${
            activeNav === 'admin'
              ? 'bg-[#7c3aed] text-white border-[#7c3aed]'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b] bg-[#111827] border-[#334155]'
          }`}
          title="Admin Bildirim Stüdyosu"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-300 hover:text-white hover:bg-[#1e293b] bg-[#111827] rounded-xl border border-[#334155] transition-colors"
          title={t.nav.settings}
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </header>

    {/* Mobile Responsive Navigation Row */}
    <div className="w-full max-w-5xl mx-auto px-4 flex lg:hidden overflow-x-auto gap-1.5 pt-2 pb-1 text-xs">
      <button
        onClick={() => onSelectNav('test')}
        className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
          activeNav === 'test'
            ? 'bg-[#0284c7] text-white font-semibold'
            : 'text-slate-300 hover:text-white bg-[#111827] border border-[#334155]'
        }`}
      >
        {t.nav.test}
      </button>
      <button
        onClick={() => onSelectNav('curriculum')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
          activeNav === 'curriculum'
            ? 'bg-[#0284c7] text-white font-semibold'
            : 'text-slate-300 hover:text-white bg-[#111827] border border-[#334155]'
        }`}
      >
        <GraduationCap className="w-3.5 h-3.5" />
        <span>Dersler</span>
      </button>
      <button
        onClick={() => onSelectNav('challenges')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
          activeNav === 'challenges'
            ? 'bg-[#0284c7] text-white font-semibold'
            : 'text-slate-300 hover:text-white bg-[#111827] border border-[#334155]'
        }`}
      >
        <Flame className="w-3.5 h-3.5 text-amber-400" />
        <span>Meydan Okuma</span>
      </button>
      <button
        onClick={() => onSelectNav('leaderboard')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
          activeNav === 'leaderboard'
            ? 'bg-[#0284c7] text-white font-semibold'
            : 'text-slate-300 hover:text-white bg-[#111827] border border-[#334155]'
        }`}
      >
        <Trophy className="w-3.5 h-3.5 text-amber-400" />
        <span>Sıralama</span>
      </button>
      <button
        onClick={() => onSelectNav('weakkeys')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
          activeNav === 'weakkeys'
            ? 'bg-[#0284c7] text-white font-semibold'
            : 'text-slate-300 hover:text-white bg-[#111827] border border-[#334155]'
        }`}
      >
        <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
        <span>Zayıf Tuşlar</span>
      </button>
      <button
        onClick={() => onSelectNav('articles')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
          activeNav === 'articles'
            ? 'bg-[#0284c7] text-white font-semibold'
            : 'text-slate-300 hover:text-white bg-[#111827] border border-[#334155]'
        }`}
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span>Rehber</span>
      </button>
    </div>
    </>
  );
};
