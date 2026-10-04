import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Target,
  Activity,
  Calendar,
  Filter,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { ContentLanguage, InterfaceLocale, KeyboardLayoutName } from '../../types';
import { getLeaderboard } from '../../lib/curriculum/leaderboardService';
import { loadPersonalBests } from '../../lib/storage/localStorage';
import { useTranslation } from '../../messages/i18n';

interface LeaderboardViewProps {
  locale: InterfaceLocale;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ locale }) => {
  const t = useTranslation(locale);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'alltime'>('daily');
  const [layoutFilter, setLayoutFilter] = useState<KeyboardLayoutName | 'all'>('all');
  const [langFilter, setLangFilter] = useState<ContentLanguage | 'all'>('all');

  const pbs = loadPersonalBests();
  const bestKey = Object.keys(pbs)[0];
  const userBest = bestKey ? { wpm: pbs[bestKey].wpm, accuracy: pbs[bestKey].accuracy, consistency: 88 } : undefined;

  const users = getLeaderboard(
    timeframe,
    layoutFilter === 'all' ? undefined : layoutFilter,
    langFilter === 'all' ? undefined : langFilter,
    userBest
  );

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-sky-400 tracking-wider uppercase font-mono">
            Resmi Sıralama ve Rekorlar
          </p>
          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#f8fafc]">
            {locale === 'tr' ? 'Liderlik Tablosu' : 'Leaderboard'}
          </h1>
          <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-lg font-medium">
            {locale === 'tr'
              ? 'En hızlı Türk ve uluslararası typistlerin WPM dereceleri. Geçerlilik barajı: En az %90 doğruluk.'
              : 'Verified rankings of the fastest typists. Eligibility requirement: minimum 90% accuracy.'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0a0e17] border border-[#334155] text-xs">
          <button
            onClick={() => setTimeframe('daily')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              timeframe === 'daily'
                ? 'bg-[#0284c7] text-white font-bold'
                : 'text-[#cbd5e1] hover:text-white'
            }`}
          >
            Günlük
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              timeframe === 'weekly'
                ? 'bg-[#0284c7] text-white font-bold'
                : 'text-[#cbd5e1] hover:text-white'
            }`}
          >
            Haftalık
          </button>
          <button
            onClick={() => setTimeframe('alltime')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              timeframe === 'alltime'
                ? 'bg-[#0284c7] text-white font-bold'
                : 'text-[#cbd5e1] hover:text-white'
            }`}
          >
            Tüm Zamanlar
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-[#111827] border border-[#334155] shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#0284c7]" />
          <span className="text-[#cbd5e1] font-semibold">Filtrele:</span>

          <select
            value={layoutFilter}
            onChange={(e) => setLayoutFilter(e.target.value as any)}
            className="bg-[#0a0e17] border border-[#334155] rounded-xl px-2.5 py-1 text-xs text-[#f8fafc] font-medium"
          >
            <option value="all">Tüm Düzenler</option>
            <option value="tr-q">Türkçe Q</option>
            <option value="tr-f">Türkçe F</option>
            <option value="en-qwerty">QWERTY</option>
          </select>

          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value as any)}
            className="bg-[#0a0e17] border border-[#334155] rounded-xl px-2.5 py-1 text-xs text-[#f8fafc] font-medium"
          >
            <option value="all">Tüm Diller</option>
            <option value="tr">Türkçe Metinler</option>
            <option value="en">English Texts</option>
          </select>
        </div>

        <div className="text-xs text-[#22c55e] flex items-center gap-1 font-mono font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Baraj: Min. %90 Doğruluk</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="p-6 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm overflow-hidden">
        <div className="space-y-2.5">
          {users.map((user) => {
            const isTop3 = user.rank <= 3;
            const rankBadgeColor =
              user.rank === 1
                ? 'bg-amber-400 text-slate-950 font-black'
                : user.rank === 2
                ? 'bg-slate-200 text-slate-950 font-black'
                : user.rank === 3
                ? 'bg-amber-600 text-white font-black'
                : 'bg-[#111827] text-[#cbd5e1] font-mono font-bold border border-[#334155]';

            return (
              <div
                key={`${user.rank}-${user.username}`}
                className={`
                  p-3.5 rounded-2xl border flex items-center justify-between gap-4 text-xs transition-all
                  ${
                    user.isCurrentUser
                      ? 'bg-[#1e293b] border-[#0284c7]'
                      : isTop3
                      ? 'bg-[#0a0e17] border-[#334155] hover:border-[#64748b]'
                      : 'bg-[#0a0e17] border-[#334155] hover:border-[#475569]'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${rankBadgeColor}`}
                  >
                    #{user.rank}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#f8fafc]">
                        {user.displayName}
                      </span>
                      {user.isCurrentUser && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00e5ff] text-[#03121a]">
                          SEN
                        </span>
                      )}
                      <span className="text-xs font-mono text-[#cbd5e1] uppercase">
                        @{user.username}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#cbd5e1] mt-0.5">
                      <span className="px-1.5 py-0.2 rounded bg-[#111827] text-[#00e5ff] border border-[#00e5ff]/30 uppercase font-semibold">
                        {user.layout}
                      </span>
                      <span>•</span>
                      <span>{user.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-right">
                  <div>
                    <span className="text-xl font-black text-[#00e5ff] [text-shadow:0_0_12px_rgba(0,229,255,0.3)]">
                      {user.wpm}
                    </span>
                    <span className="text-xs text-[#cbd5e1] block font-sans font-medium">WPM</span>
                  </div>

                  <div className="hidden sm:block">
                    <span className="text-sm font-bold text-[#22c55e]">
                      %{user.accuracy}
                    </span>
                    <span className="text-xs text-[#cbd5e1] block font-sans font-medium">Doğruluk</span>
                  </div>

                  <div className="hidden md:block">
                    <span className="text-sm font-bold text-[#c084fc]">
                      %{user.consistency}
                    </span>
                    <span className="text-xs text-[#cbd5e1] block font-sans font-medium">Ritim</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
