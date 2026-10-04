import React, { useMemo } from 'react';
import {
  Trophy,
  Activity,
  Target,
  Download,
  Trash2,
  X,
  Clock,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { InterfaceLocale, TestResult } from '../../types';
import { useTranslation } from '../../messages/i18n';
import {
  clearAllTestHistory,
  exportHistoryAsJson,
} from '../../lib/storage/localStorage';

interface HistoryDrawerProps {
  locale: InterfaceLocale;
  isOpen: boolean;
  history: TestResult[];
  onClose: () => void;
  onHistoryUpdated: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  locale,
  isOpen,
  history,
  onClose,
  onHistoryUpdated,
}) => {
  const t = useTranslation(locale);

  const stats = useMemo(() => {
    if (!history || history.length === 0) {
      return { bestWpm: 0, avgWpm: 0, avgAccuracy: 0, totalTests: 0 };
    }
    const bestWpm = Math.max(...history.map((h) => h.wpm));
    const totalWpm = history.reduce((acc, h) => acc + h.wpm, 0);
    const avgWpm = Math.round(totalWpm / history.length);
    const totalAcc = history.reduce((acc, h) => acc + h.accuracy, 0);
    const avgAccuracy = Math.round((totalAcc / history.length) * 10) / 10;

    return {
      bestWpm,
      avgWpm,
      avgAccuracy,
      totalTests: history.length,
    };
  }, [history]);

  const handleClear = () => {
    if (window.confirm(t.history.clearConfirm)) {
      clearAllTestHistory();
      onHistoryUpdated();
    }
  };

  const handleExport = () => {
    const jsonStr = exportHistoryAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `klavye-hiz-testi-gecmis-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 animate-in fade-in duration-200">
      <div className="w-full max-w-lg h-full bg-[#111827] border-l border-[#334155] p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white font-sans">
                {t.history.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#1e293b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-[#334155]">
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.history.bestWpm}</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {stats.bestWpm}{' '}
                <span className="text-xs text-slate-300 font-sans font-medium">WPM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-[#334155]">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{t.history.averageWpm}</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {stats.avgWpm}{' '}
                <span className="text-xs text-slate-300 font-sans font-medium">WPM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
              <div className="flex items-center gap-1.5 text-xs text-[#22c55e] font-semibold mb-1">
                <Target className="w-3.5 h-3.5" />
                <span>{t.history.averageAccuracy}</span>
              </div>
              <div className="text-2xl font-bold font-mono text-[#22c55e]">
                %{stats.avgAccuracy}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>{t.history.testsCompleted}</span>
              </div>
              <div className="text-2xl font-bold font-mono text-[#e4e8f1]">
                {stats.totalTests}
              </div>
            </div>
          </div>

          {/* Test List Table */}
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {locale === 'tr' ? 'Son Tamamlanan Testler' : 'Recent Completed Tests'}
            </h3>

            {history.length === 0 ? (
              <div className="py-12 text-center text-sm text-slate-300">
                {t.history.empty}
              </div>
            ) : (
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[#0a0e17]/70 border border-[#1e293b] hover:border-[#00e5ff]/40 flex items-center justify-between text-xs transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#00e5ff]">
                          {item.wpm} WPM
                        </span>
                        <span className="text-slate-300 font-mono font-medium">
                          %{item.accuracy}
                        </span>
                        <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#111827] text-[#00e5ff] font-mono border border-[#00e5ff]/20">
                          {item.keyboardLayout}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-300 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.durationSeconds}s</span>
                        <span>•</span>
                        <span>{new Date(item.completedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>

                    <div className="text-right font-mono text-[11px] text-slate-300">
                      <div>
                        {locale === 'tr' ? 'Ham' : 'Raw'}: {item.rawWpm}
                      </div>
                      <div>
                        {locale === 'tr' ? 'Ritim' : 'Cons'}: %{item.consistency}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between gap-3 mt-4">
          <button
            type="button"
            onClick={handleExport}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#111827] text-[#e4e8f1] hover:border-[#00e5ff]/40 border border-[#1e293b] text-xs font-semibold disabled:opacity-50 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>{t.history.exportJson}</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ef4444]/10 text-[#ef4444] hover:bg-[#ef4444]/20 border border-[#ef4444]/30 text-xs font-semibold disabled:opacity-50 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.history.clearHistory}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
