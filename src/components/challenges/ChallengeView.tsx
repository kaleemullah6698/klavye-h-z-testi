import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Clock,
  Flame,
  Award,
  Shield,
  Play,
  Users,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { InterfaceLocale } from '../../types';
import { DailyChallenge } from '../../types/curriculum';
import { getDailyChallenge, getWeeklyChallenge } from '../../content/curriculum/challenges';
import { useTranslation } from '../../messages/i18n';

interface ChallengeViewProps {
  locale: InterfaceLocale;
  onStartChallenge: (challenge: DailyChallenge) => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({
  locale,
  onStartChallenge,
}) => {
  const t = useTranslation(locale);
  const daily = getDailyChallenge();
  const weekly = getWeeklyChallenge();

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(daily.expiresAt).getTime();
      const diff = Math.max(0, target - now);

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [daily.expiresAt]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase font-mono flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span>Türkiye Saati (UTC+3) ile Sıfırlanır</span>
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-white">
            {locale === 'tr' ? 'Meydan Okumalar ve Turnuva' : 'Daily & Weekly Challenges'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-medium">
            {locale === 'tr'
              ? 'Her gün tüm kullanıcılarla birebir aynı metin üzerinde yarışın. Skorunuzu liderlik tablosuna yazdırın.'
              : 'Compete on identical passages with every typist worldwide. Post your verified score to the board.'}
          </p>
        </div>

        {/* UTC+3 Midnight Countdown */}
        <div className="bg-[#0a0e17] p-4 rounded-2xl border border-[#334155] text-center min-w-[160px]">
          <span className="text-xs text-slate-300 block font-sans font-medium mb-1 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Kalan Süre (UTC+3)</span>
          </span>
          <div className="text-2xl font-bold font-mono text-white tracking-widest">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Challenge Card */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-[#334155] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase font-mono text-sky-400">
                Günün Testi (60s)
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-mono font-medium">
                <Users className="w-3.5 h-3.5 text-sky-400" />
                <span>{daily.participantCount} Katılımcı</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-sans">
              {daily.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {daily.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] text-xs font-mono text-slate-200 italic">
              "{daily.passage.slice(0, 110)}..."
            </div>
          </div>

          <div className="pt-4 border-t border-[#334155] flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Min. %{daily.minAccuracy} Doğruluk</span>
            </span>

            <button
              onClick={() => onStartChallenge(daily)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Meydan Okumayı Başlat</span>
            </button>
          </div>
        </div>

        {/* Weekly Marathon Card */}
        <div className="p-6 rounded-3xl bg-[#111827] border border-[#334155] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase font-mono text-indigo-400">
                Haftalık Kupa (180s)
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-300 font-mono font-medium">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>{weekly.participantCount} Katılımcı</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-sans">
              {weekly.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              {weekly.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] text-xs font-mono text-slate-200 italic">
              "{weekly.passage.slice(0, 110)}..."
            </div>
          </div>

          <div className="pt-4 border-t border-[#334155] flex items-center justify-between">
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Min. %{weekly.minAccuracy} Doğruluk</span>
            </span>

            <button
              onClick={() => onStartChallenge(weekly)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Kupaya Katıl</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
