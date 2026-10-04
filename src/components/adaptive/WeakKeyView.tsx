import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Target,
} from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName } from '../../types';
import {
  generateWeakKeyDrillText,
  getRankedWeakKeys,
} from '../../lib/curriculum/adaptivePractice';
import { useTranslation } from '../../messages/i18n';

interface WeakKeyViewProps {
  locale: InterfaceLocale;
  layout: KeyboardLayoutName;
  onStartCustomDrill: (drillText: string) => void;
}

export const WeakKeyView: React.FC<WeakKeyViewProps> = ({
  locale,
  layout,
  onStartCustomDrill,
}) => {
  const t = useTranslation(locale);
  const weakKeys = getRankedWeakKeys(layout);
  const topWeak = weakKeys.slice(0, 6);

  const handleStartDrill = () => {
    const drillText = generateWeakKeyDrillText(40);
    onStartCustomDrill(drillText);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-8 animate-in fade-in duration-300">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-sky-400 tracking-wider uppercase font-mono">
            Adaptif Akıllı Algoritma
          </p>
          <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-[#f8fafc]">
            {locale === 'tr' ? 'Zayıf Tuş Analizi ve Özel Alıştırma' : 'Weak Key Analysis & Adaptive Drills'}
          </h1>
          <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-lg font-medium">
            {locale === 'tr'
              ? 'Yazarken en çok takıldığınız veya hata yaptığınız harfleri tespit eder ve bu harfleri içeren özel Türkçe kelime listeleri üretir.'
              : 'Pinpoints problematic keys and dynamically generates personalized drills focusing on your highest error rates.'}
          </p>
        </div>

        <button
          onClick={handleStartDrill}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs shadow-sm transition-all hover:brightness-105 shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Zayıf Tuş Antrenmanı Başlat</span>
        </button>
      </div>

      {/* Top Problematic Keys Heatmap Cards */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#f8fafc] font-sans flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>En Çok Zorlanılan Harfler (Hata Oranına Göre)</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {topWeak.map((k) => (
            <div
              key={k.key}
              className="p-4 rounded-2xl bg-[#111827] border border-[#334155] text-center space-y-2 hover:border-[#64748b] transition-all"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#1e293b] border border-[#334155] flex items-center justify-center text-xl font-black font-mono text-white">
                {k.key.toUpperCase()}
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#ef4444] block">
                  %{k.errorRate} Hata
                </span>
                <span className="text-xs text-[#cbd5e1] font-sans font-medium">
                  {k.errorCount} Yanlış / {k.totalHits} Vuruş
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Key Analysis Table */}
      <div className="p-6 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#f8fafc] font-sans">
          Tüm Klavye Tuş Hata Dağılımı
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono max-h-[300px] overflow-y-auto pr-2">
          {weakKeys.map((item) => (
            <div
              key={item.key}
              className="p-2.5 rounded-xl bg-[#0a0e17]/60 border border-[#334155] flex items-center justify-between"
            >
              <span className="font-bold text-sm text-[#f8fafc]">{item.key.toUpperCase()}</span>
              <span
                className={`font-bold ${
                  item.errorRate > 15
                    ? 'text-[#ef4444]'
                    : item.errorRate > 5
                    ? 'text-amber-400'
                    : 'text-[#22c55e]'
                }`}
              >
                %{item.errorRate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
