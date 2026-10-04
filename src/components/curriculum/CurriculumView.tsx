import React, { useState } from 'react';
import {
  GraduationCap,
  Star,
  Lock,
  Play,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName } from '../../types';
import { CurriculumModule, Lesson, LessonProgress } from '../../types/curriculum';
import {
  getModulesForLayout,
  isLessonUnlocked,
  loadAllLessonProgress,
} from '../../lib/curriculum/curriculumService';
import { useTranslation } from '../../messages/i18n';

interface CurriculumViewProps {
  locale: InterfaceLocale;
  layout: KeyboardLayoutName;
  onSelectLesson: (lesson: Lesson) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  locale,
  layout,
  onSelectLesson,
}) => {
  const t = useTranslation(locale);
  const [selectedLayout, setSelectedLayout] = useState<KeyboardLayoutName>(layout);
  const modules = getModulesForLayout(selectedLayout);
  const allProgress = loadAllLessonProgress();

  // Aggregate completion stats
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = Object.values(allProgress).filter(
    (p) => p.status === 'completed' || p.status === 'mastered'
  ).length;
  const totalStars = Object.values(allProgress).reduce((acc, p) => acc + (p.stars || 0), 0);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-8 animate-in fade-in duration-300">
      {/* Header Banner & Stats */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#334155] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-sky-400 tracking-wider uppercase font-mono">
              Adım Adım On Parmak Müfredatı
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-white">
              {locale === 'tr' ? 'Dokunmadan Yazma Dersleri' : 'Touch Typing Curriculum'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg font-medium">
              {locale === 'tr'
                ? 'Ev sırasından ileri düzey hız antrenmanlarına kadar adım adım klavye ustalığı kazanın.'
                : 'Progressive structured lessons from home row fundamentals to high-velocity typing.'}
            </p>
          </div>

          {/* Progress Counters */}
          <div className="flex items-center gap-3 sm:gap-4 bg-[#0a0e17] p-3.5 rounded-2xl border border-[#334155]">
            <div className="text-center px-3">
              <span className="text-xs text-slate-300 block font-sans font-medium">Tamamlanan</span>
              <span className="text-2xl font-bold font-mono text-white">
                {completedLessons}/{totalLessons}
              </span>
            </div>
            <div className="w-px h-8 bg-[#334155]" />
            <div className="text-center px-3">
              <span className="text-xs text-slate-300 block font-sans font-medium">Kazanılan Yıldız</span>
              <span className="text-2xl font-bold font-mono text-amber-400 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{totalStars}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Layout Switcher Tabs */}
        <div className="mt-6 pt-5 border-t border-[#334155] flex items-center gap-2">
          <span className="text-xs text-slate-300 font-semibold mr-1">
            {locale === 'tr' ? 'Müfredat Düzeni:' : 'Curriculum:'}
          </span>
          {(['tr-q', 'tr-f', 'en-qwerty'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setSelectedLayout(l)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedLayout === l
                  ? 'bg-[#0284c7] text-white'
                  : 'bg-[#1e293b] text-slate-300 hover:text-white border border-[#334155]'
              }`}
            >
              {l === 'tr-q' ? 'Türkçe Q' : l === 'tr-f' ? 'Türkçe F' : 'QWERTY'}
            </button>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {modules.map((module) => {
          const modCompleted = module.lessons.filter(
            (l) => allProgress[l.id]?.status === 'completed' || allProgress[l.id]?.status === 'mastered'
          ).length;

          return (
            <div
              key={module.id}
              className="p-6 rounded-3xl bg-[#111827] border border-[#334155] space-y-4"
            >
              {/* Module Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#334155]">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold uppercase text-slate-400 tracking-wider">
                      {module.level}
                    </span>
                    <span className="text-slate-600">·</span>
                    <h2 className="text-base sm:text-lg font-bold text-white font-sans">
                      {locale === 'tr' ? module.title : module.titleEn}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    {locale === 'tr' ? module.description : module.descriptionEn}
                  </p>
                </div>

                <div className="text-xs font-mono text-slate-300 font-semibold bg-[#0a0e17] px-3 py-1.5 rounded-xl border border-[#334155]">
                  {modCompleted} / {module.lessons.length} Tamamlandı
                </div>
              </div>

              {/* Lesson Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {module.lessons.map((lesson) => {
                  const unlocked = isLessonUnlocked(lesson, allProgress);
                  const prog = allProgress[lesson.id];
                  const isDone = prog?.status === 'completed' || prog?.status === 'mastered';
                  const stars = prog?.stars || 0;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => unlocked && onSelectLesson(lesson)}
                      className={`
                        p-4 rounded-2xl border transition-colors select-none
                        ${
                          !unlocked
                            ? 'bg-[#0a0e17] border-[#1e293b] opacity-50 cursor-not-allowed'
                            : isDone
                            ? 'bg-[#0a0e17] border-emerald-500/40 hover:border-emerald-500 cursor-pointer'
                            : 'bg-[#0a0e17] border-[#334155] hover:border-[#0284c7] cursor-pointer'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-sky-400">
                              #{lesson.lessonNumber}
                            </span>
                            <h3 className="text-sm font-bold text-white">
                              {locale === 'tr' ? lesson.title : lesson.titleEn}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-snug line-clamp-2">
                            {locale === 'tr' ? lesson.description : lesson.descriptionEn}
                          </p>
                        </div>

                        {/* Status Icon & Stars */}
                        <div className="shrink-0 flex flex-col items-end gap-1">
                          {!unlocked ? (
                            <div className="p-1.5 rounded-lg bg-[#1e293b] text-slate-400">
                              <Lock className="w-4 h-4" />
                            </div>
                          ) : isDone ? (
                            <div className="p-1 rounded-lg bg-emerald-950 text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="p-1.5 rounded-lg bg-[#0284c7] text-white">
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </div>
                          )}

                          {/* Star Rating */}
                          <div className="flex items-center gap-0.5 mt-1">
                            {[1, 2, 3].map((starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-3 h-3 ${
                                  starIdx <= stars
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-[#334155] fill-transparent'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Best score badge if completed */}
                      {prog && prog.bestWpm > 0 && (
                        <div className="mt-3 pt-2 border-t border-[#334155] flex items-center justify-between text-xs font-mono text-slate-300">
                          <span>En İyi: <strong className="text-sky-400">{prog.bestWpm} WPM</strong></span>
                          <span>Doğruluk: <strong className="text-emerald-400">%{prog.bestAccuracy}</strong></span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
