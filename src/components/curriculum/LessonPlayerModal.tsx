import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
} from 'lucide-react';
import { InterfaceLocale, KeyboardLayoutName, SoundType } from '../../types';
import { Lesson, LessonStep } from '../../types/curriculum';
import { saveLessonAttempt } from '../../lib/curriculum/curriculumService';
import { soundSynthesizer } from '../../lib/audio/soundSynthesizer';
import { calculateAccuracy, calculateNetWpm } from '../../lib/engine/formulas';
import { recordKeystrokeStat } from '../../lib/curriculum/adaptivePractice';

interface LessonPlayerModalProps {
  lesson: Lesson | null;
  locale: InterfaceLocale;
  layout: KeyboardLayoutName;
  soundType: SoundType;
  isOpen: boolean;
  onClose: () => void;
  onLessonCompleted: () => void;
  onNextLesson?: () => void;
}

export const LessonPlayerModal: React.FC<LessonPlayerModalProps> = ({
  lesson,
  locale,
  layout,
  soundType,
  isOpen,
  onClose,
  onLessonCompleted,
  onNextLesson,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<{ wpm: number; accuracy: number; stars: number } | null>(null);

  const startTimeRef = useRef<number>(0);
  const totalKeystrokesRef = useRef<number>(0);
  const correctKeystrokesRef = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentStep: LessonStep | undefined = lesson?.steps[currentStepIdx];
  const targetExerciseText = currentStep?.exerciseText || '';

  const resetStep = useCallback(() => {
    setTypedText('');
    setIsFinished(false);
    setFinalScore(null);
    startTimeRef.current = 0;
    totalKeystrokesRef.current = 0;
    correctKeystrokesRef.current = 0;
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentStepIdx(0);
      resetStep();
    }
  }, [isOpen, lesson, resetStep]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished || !currentStep || currentStep.type !== 'exercise') return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      setTypedText((prev) => prev.slice(0, -1));
      soundSynthesizer.playKeySound(soundType);
      return;
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();

      if (startTimeRef.current === 0) {
        startTimeRef.current = performance.now();
      }

      const nextIdx = typedText.length;
      const expectedChar = targetExerciseText[nextIdx];
      const typedChar = e.key;
      const isMatch = expectedChar === typedChar;

      totalKeystrokesRef.current += 1;
      if (isMatch) {
        correctKeystrokesRef.current += 1;
        soundSynthesizer.playKeySound(soundType);
      } else {
        soundSynthesizer.playErrorSound();
      }

      // Record to adaptive weak-key engine
      recordKeystrokeStat(expectedChar, isMatch);

      const updated = typedText + typedChar;
      setTypedText(updated);

      // Check if finished exercise
      if (updated.length >= targetExerciseText.length) {
        const elapsedSec = (performance.now() - startTimeRef.current) / 1000;
        const netWpm = calculateNetWpm(correctKeystrokesRef.current, 0, elapsedSec);
        const accuracy = calculateAccuracy(correctKeystrokesRef.current, totalKeystrokesRef.current);

        if (lesson) {
          const { stars } = saveLessonAttempt(lesson, netWpm, accuracy);
          setFinalScore({ wpm: netWpm, accuracy, stars });
          setIsFinished(true);

          if (stars >= 2) {
            try {
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ['#00e5ff', '#a855f7', '#22c55e'] });
            } catch (err) {}
          }
          onLessonCompleted();
        }
      }
    }
  };

  if (!isOpen || !lesson || !currentStep) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111827] rounded-3xl p-6 sm:p-8 border border-[#334155] shadow-2xl overflow-hidden flex flex-col justify-between max-h-[92vh]">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#1e293b] text-white border border-[#334155]">
                Ders #{lesson.lessonNumber}
              </span>
              <h2 className="text-lg font-bold text-white font-sans">
                {locale === 'tr' ? lesson.title : lesson.titleEn}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#1e293b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key & Finger Target Badges */}
          {currentStep.keyFocus && (
            <div className="my-4 flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">Hedef Tuşlar:</span>
              {currentStep.keyFocus.map((k) => (
                <span
                  key={k}
                  className="px-2.5 py-0.5 rounded-lg font-mono font-bold text-sm bg-[#0284c7] text-white"
                >
                  {k.toUpperCase()}
                </span>
              ))}
            </div>
          )}

          {/* Step Content / Instructions */}
          <div className="p-4 rounded-2xl bg-[#0a0e17] border border-[#334155] my-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
            {currentStep.content}
          </div>

          {/* Interactive Typing Exercise Area */}
          {currentStep.type === 'exercise' && !isFinished && (
            <div
              onClick={() => inputRef.current?.focus()}
              className="p-6 rounded-2xl bg-[#0a0e17] border border-[#0284c7] my-4 cursor-text relative"
            >
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
              />

              <div className="text-xl sm:text-2xl font-mono leading-relaxed tracking-wider break-all select-none">
                {targetExerciseText.split('').map((char, idx) => {
                  const typedChar = typedText[idx];
                  let colorClass = 'text-slate-400';
                  if (typedChar !== undefined) {
                    colorClass = typedChar === char ? 'text-sky-400 font-bold' : 'text-rose-400 underline bg-rose-950/40';
                  } else if (idx === typedText.length) {
                    colorClass = 'text-white underline font-bold';
                  }

                  return (
                    <span key={idx} className={colorClass}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completion Score Screen */}
          {isFinished && finalScore && (
            <div className="p-6 rounded-3xl bg-[#0a0e17] border border-emerald-500/40 my-4 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-7 h-7 ${
                      s <= finalScore.stars
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[#1e293b] fill-transparent'
                    }`}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  {finalScore.stars >= 2 ? 'Tebrikler! Dersi Başarıyla Geçtiniz' : 'Pratik Tamamlandı'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-medium">
                  Hedef Doğruluk: %{currentStep.targetAccuracy || 90} | Ulaşılan: %{finalScore.accuracy}
                </p>
              </div>

              <div className="flex justify-center gap-6 font-mono text-sm">
                <div className="p-3 rounded-xl bg-[#111827] border border-[#334155] min-w-[100px]">
                  <span className="text-xs text-slate-300 block font-sans font-medium">Hız</span>
                  <span className="text-2xl font-bold text-sky-400">{finalScore.wpm} WPM</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111827] border border-[#334155] min-w-[100px]">
                  <span className="text-xs text-slate-300 block font-sans font-medium">Doğruluk</span>
                  <span className="text-2xl font-bold text-emerald-400">%{finalScore.accuracy}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#334155] flex items-center justify-between gap-3 mt-4">
          <button
            type="button"
            onClick={resetStep}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e293b] text-white hover:bg-[#334155] border border-[#334155] text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
            <span>Tekrar Et</span>
          </button>

          {isFinished && onNextLesson && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNextLesson();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
            >
              <span>Sonraki Ders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
