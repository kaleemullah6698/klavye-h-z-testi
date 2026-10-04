import React from 'react';
import { Flame, Ghost, Zap } from 'lucide-react';
import { GhostRacerState } from '../../lib/curriculum/ghostRaceService';

interface GhostRacerBarProps {
  state: GhostRacerState;
  pbWpm: number;
}

export const GhostRacerBar: React.FC<GhostRacerBarProps> = ({ state, pbWpm }) => {
  const isAhead = state.wordsAhead >= 0;

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 p-3 rounded-2xl bg-[#111827] border border-[#334155] select-none">
      <div className="flex items-center justify-between text-xs mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-sky-400">
            <Zap className="w-3.5 h-3.5 fill-sky-400" />
            <span>Sen</span>
          </span>
          <span className="text-slate-400 font-bold">vs.</span>
          <span className="flex items-center gap-1 font-medium text-slate-300">
            <Ghost className="w-3.5 h-3.5 text-slate-400" />
            <span>Kişisel Rekor Hayaletin ({pbWpm} WPM)</span>
          </span>
        </div>

        <div className="font-mono font-semibold text-xs">
          {isAhead ? (
            <span className="text-emerald-400">+{state.wordsAhead} kelime öndesin</span>
          ) : (
            <span className="text-rose-400">{state.wordsAhead} kelime geridesin</span>
          )}
        </div>
      </div>

      {/* Track */}
      <div className="space-y-1.5">
        {/* User Track */}
        <div className="relative h-2.5 w-full bg-[#0a0e17] rounded-md overflow-hidden border border-[#1e293b]">
          <div
            className="h-full bg-[#0284c7] rounded-md transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(2, state.userProgressPercent))}%` }}
          />
        </div>

        {/* Ghost Track */}
        <div className="relative h-2 w-full bg-[#0a0e17] rounded-md overflow-hidden border border-[#1e293b]/70 opacity-80">
          <div
            className="h-full bg-slate-500 rounded-md transition-all duration-150"
            style={{ width: `${Math.min(100, Math.max(2, state.ghostProgressPercent))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
