import React, { useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Share2,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Target,
  Activity,
  Calendar,
  X,
  Zap,
} from 'lucide-react';
import { InterfaceLocale, TestResult } from '../../types';
import { useTranslation } from '../../messages/i18n';

interface ResultsModalProps {
  locale: InterfaceLocale;
  result: TestResult | null;
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onOpenHistory: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  locale,
  result,
  isOpen,
  onClose,
  onRestart,
  onOpenHistory,
}) => {
  const t = useTranslation(locale);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && result?.isPersonalBest) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00e5ff', '#a855f7', '#22c55e', '#ffffff'],
        });
      } catch (e) {
        // Fallback
      }
    }
  }, [isOpen, result]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onRestart]);

  const handleShare = () => {
    if (!result) return;
    const text = `⚡ ${t.appTitle}\n🚀 Hız: ${result.wpm} WPM (Net)\n🎯 Doğruluk: %${result.accuracy}\n📊 Tutarlılık: %${result.consistency}\n⏱️ Süre: ${result.durationSeconds}s | Düzen: ${result.keyboardLayout.toUpperCase()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const chartPoints = useMemo(() => {
    if (!result || !result.wpmOverTime || result.wpmOverTime.length < 2) {
      return null;
    }
    const samples = result.wpmOverTime;
    const maxWpm = Math.max(60, ...samples.map((s) => s.wpm));
    const width = 500;
    const height = 120;
    const padding = 20;

    const points = samples.map((s, idx) => {
      const x = padding + (idx / (samples.length - 1)) * (width - 2 * padding);
      const y = height - padding - (s.wpm / maxWpm) * (height - 2 * padding);
      return `${x},${y}`;
    });

    return {
      polyline: points.join(' '),
      maxWpm,
      width,
      height,
    };
  }, [result]);

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#1e293b] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Personal Best Celebration Banner */}
        {result.isPersonalBest && (
          <div className="mb-6 py-2 px-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center gap-2 text-amber-400 font-semibold text-sm">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{t.results.personalBest}</span>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-white">
            {t.results.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-medium">{t.results.subtitle}</p>
        </div>

        {/* Hero Metric Cards (WPM, Accuracy, Consistency) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>{t.test.wpm}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
              {result.wpm}
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              {t.results.wpmDetail}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
              <Target className="w-3.5 h-3.5" />
              <span>{t.test.accuracy}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-emerald-400">
              %{result.accuracy}
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              {t.results.accuracyDetail}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] text-center flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>{t.test.consistency}</span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-200">
              %{result.consistency}
            </div>
            <div className="text-[11px] text-slate-300 font-medium mt-1">
              {t.results.consistencyDetail}
            </div>
          </div>
        </div>

        {/* WPM Speed Over Time Chart */}
        {chartPoints && (
          <div className="mb-6 p-4 rounded-2xl bg-[#0a0e17] border border-[#334155]">
            <div className="text-xs text-slate-200 font-semibold mb-2 flex items-center justify-between">
              <span>{t.results.wpmOverTime}</span>
              <span className="font-mono text-sky-400 font-bold">
                Peak: {chartPoints.maxWpm} WPM
              </span>
            </div>
            <div className="w-full h-24 overflow-hidden flex items-center justify-center">
              <svg
                viewBox={`0 0 ${chartPoints.width} ${chartPoints.height}`}
                className="w-full h-full stroke-sky-400"
              >
                <line
                  x1="20"
                  y1={chartPoints.height / 2}
                  x2={chartPoints.width - 20}
                  y2={chartPoints.height / 2}
                  stroke="#334155"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <polyline
                  fill="none"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartPoints.polyline}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Secondary Details Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-[#0a0e17] border border-[#334155] text-xs font-mono mb-6">
          <div className="flex flex-col">
            <span className="text-slate-300 font-medium">{t.test.rawWpm}:</span>
            <span className="text-white font-bold text-sm">
              {result.rawWpm}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-300 font-medium">{t.test.characters}:</span>
            <span className="text-white font-bold text-sm">
              <span className="text-emerald-400">{result.charsCorrect}</span> /{' '}
              <span className="text-rose-400">{result.charsIncorrect}</span> /{' '}
              <span className="text-amber-400">{result.charsExtra}</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-300 font-medium">{t.results.duration}:</span>
            <span className="text-white font-bold text-sm">
              {result.durationSeconds}s
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-slate-300 font-medium">{t.results.layout}:</span>
            <span className="text-sky-400 font-bold text-sm uppercase">
              {result.keyboardLayout} ({result.contentLanguage.toUpperCase()})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#334155] bg-[#1e293b] text-white hover:bg-[#334155] text-xs font-medium transition-colors"
          >
            <Calendar className="w-4 h-4 text-slate-300" />
            <span>{t.results.viewHistory}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#334155] bg-[#1e293b] text-white hover:bg-[#334155] text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{t.results.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-sky-400" />
                  <span>{t.results.shareButton}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.results.againButton}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
