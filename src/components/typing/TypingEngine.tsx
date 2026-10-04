import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { RefreshCw, AlertTriangle, Zap, Target, Gauge, Activity } from 'lucide-react';
import {
  CaretStyle,
  ContentLanguage,
  InterfaceLocale,
  KeyboardLayoutName,
  SoundType,
  TestDuration,
  TestMode,
  TestResult,
  WordCount,
  WpmSample,
} from '../../types';
import { soundSynthesizer } from '../../lib/audio/soundSynthesizer';
import { calculateAccuracy, calculateConsistency, calculateNetWpm, calculateRawWpm } from '../../lib/engine/formulas';
import { getRandomTurkishWords } from '../../content/dictionaries/turkishWords';
import { getRandomEnglishWords } from '../../content/dictionaries/englishWords';
import { getRandomQuote } from '../../content/quotes/quotes';
import { useTranslation } from '../../messages/i18n';

interface TypingEngineProps {
  locale: InterfaceLocale;
  mode: TestMode;
  duration: TestDuration;
  wordCount: WordCount;
  contentLanguage: ContentLanguage;
  keyboardLayout: KeyboardLayoutName;
  soundType: SoundType;
  caretStyle: CaretStyle;
  showLiveWpm: boolean;
  showLiveAccuracy: boolean;
  showLiveTimer: boolean;
  stopOnError: boolean;
  includePunctuation: boolean;
  includeNumbers: boolean;
  customPassage?: string;
  onActiveCharChange: (char: string) => void;
  onKeypressEvent: (code: string) => void;
  onTestComplete: (result: TestResult) => void;
  onTypingStateChange?: (isTyping: boolean) => void;
  onProgressUpdate?: (typedChars: number, totalChars: number, elapsedSec: number) => void;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  locale,
  mode,
  duration,
  wordCount,
  contentLanguage,
  keyboardLayout,
  soundType,
  caretStyle,
  showLiveWpm,
  showLiveAccuracy,
  showLiveTimer,
  stopOnError,
  includePunctuation,
  includeNumbers,
  customPassage,
  onActiveCharChange,
  onKeypressEvent,
  onTestComplete,
  onTypingStateChange,
  onProgressUpdate,
}) => {
  const t = useTranslation(locale);

  // Passage words
  const [words, setWords] = useState<string[]>([]);
  const [quoteAuthor, setQuoteAuthor] = useState<string | null>(null);

  // Live HUD metrics
  const [hudWpm, setHudWpm] = useState<number>(0);
  const [hudRawWpm, setHudRawWpm] = useState<number>(0);
  const [hudAccuracy, setHudAccuracy] = useState<number>(100);
  const [hudBurstWpm, setHudBurstWpm] = useState<number>(0);
  const [hudKps, setHudKps] = useState<number>(0);
  const [hudTimeRemaining, setHudTimeRemaining] = useState<number>(duration);
  const [hudWordsRemaining, setHudWordsRemaining] = useState<number>(wordCount);
  const [testState, setTestState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [isCapsLockOn, setIsCapsLockOn] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(true);

  // Container refs for sub-millisecond hot path
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsWrapperRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Hot path mutable state in refs
  const stateRef = useRef<'idle' | 'running' | 'completed'>('idle');
  const wordsRef = useRef<string[]>([]);
  const currentWordIdxRef = useRef<number>(0);
  const currentCharIdxRef = useRef<number>(0);
  const userTypedWordsRef = useRef<string[]>([]);
  const extraLettersMapRef = useRef<Record<number, string[]>>({});

  // Line scrolling tracking
  const currentLineOffsetRef = useRef<number>(0);
  const lineHeightRef = useRef<number>(44);

  // Keystroke metrics refs
  const startTimeRef = useRef<number>(0);
  const lastKeyTimeRef = useRef<number>(0);
  const wordStartTimeRef = useRef<number>(0);
  const ikisRef = useRef<number[]>([]);
  const totalKeystrokesRef = useRef<number>(0);
  const correctKeystrokesRef = useRef<number>(0);
  const correctCharsRef = useRef<number>(0);
  const incorrectCharsRef = useRef<number>(0);
  const extraCharsRef = useRef<number>(0);
  const missedCharsRef = useRef<number>(0);
  const uncorrectedErrorsRef = useRef<number>(0);
  const wpmSamplesRef = useRef<WpmSample[]>([]);

  // Rolling keystrokes window for live KPS
  const recentKeystrokesRef = useRef<number[]>([]);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const emitActiveChar = useCallback((char: string) => {
    if (onActiveCharChange) onActiveCharChange(char);
    window.dispatchEvent(new CustomEvent('kht:active-char', { detail: char }));
  }, [onActiveCharChange]);

  const emitKeypress = useCallback((code: string) => {
    if (onKeypressEvent) onKeypressEvent(code);
    window.dispatchEvent(new CustomEvent('kht:keypress', { detail: code }));
  }, [onKeypressEvent]);

  /**
   * Generates passage text with optional punctuation & numbers.
   */
  const generatePassage = useCallback(() => {
    let generatedWords: string[] = [];
    let author: string | null = null;

    if (customPassage && customPassage.trim().length > 0) {
      generatedWords = customPassage.trim().split(/\s+/);
    } else if (mode === 'quote') {
      const quote = getRandomQuote(contentLanguage);
      generatedWords = quote.text.split(' ');
      author = quote.author + (quote.source ? ` (${quote.source})` : '');
    } else if (mode === 'words') {
      generatedWords =
        contentLanguage === 'tr'
          ? getRandomTurkishWords(wordCount, {
              punctuation: includePunctuation,
              numbers: includeNumbers,
            })
          : getRandomEnglishWords(wordCount, {
              punctuation: includePunctuation,
              numbers: includeNumbers,
            });
    } else {
      const count = Math.max(140, Math.round(duration * 2.8));
      generatedWords =
        contentLanguage === 'tr'
          ? getRandomTurkishWords(count, {
              punctuation: includePunctuation,
              numbers: includeNumbers,
            })
          : getRandomEnglishWords(count, {
              punctuation: includePunctuation,
              numbers: includeNumbers,
            });
    }

    setWords(generatedWords);
    wordsRef.current = generatedWords;
    setQuoteAuthor(author);
  }, [customPassage, mode, duration, wordCount, contentLanguage, includePunctuation, includeNumbers]);

  /**
   * Smoothly positions the caret and shifts lines (Monkeytype active line scroll).
   */
  const updateCaretPosition = useCallback(() => {
    if (!caretRef.current || !containerRef.current) return;
    const wordIdx = currentWordIdxRef.current;
    const charIdx = currentCharIdxRef.current;
    const extraLetters = extraLettersMapRef.current[wordIdx] || [];

    let targetEl: HTMLElement | null = null;

    if (charIdx < (wordsRef.current[wordIdx]?.length || 0)) {
      targetEl = document.getElementById(`char-${wordIdx}-${charIdx}`);
    } else if (extraLetters.length > 0) {
      targetEl = document.getElementById(
        `extra-${wordIdx}-${extraLetters.length - 1}`
      );
    } else {
      targetEl = document.getElementById(`word-${wordIdx}`);
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const wordEl = document.getElementById(`word-${wordIdx}`);

    if (wordEl && wordsWrapperRef.current) {
      const wordRect = wordEl.getBoundingClientRect();

      // Check vertical line offset for Monkeytype 3-line scroll
      const relativeWordTop = wordEl.offsetTop;
      const firstWord = document.getElementById('word-0');
      const baseTop = firstWord ? firstWord.offsetTop : 0;
      const currentLine = Math.floor((relativeWordTop - baseTop) / lineHeightRef.current);

      if (currentLine > 1) {
        // Shift lines up smoothly
        const targetShift = (currentLine - 1) * lineHeightRef.current;
        if (targetShift !== currentLineOffsetRef.current) {
          currentLineOffsetRef.current = targetShift;
          wordsWrapperRef.current.style.transform = `translate3d(0, -${targetShift}px, 0)`;
        }
      } else if (currentLineOffsetRef.current !== 0 && currentLine <= 1) {
        currentLineOffsetRef.current = 0;
        wordsWrapperRef.current.style.transform = `translate3d(0, 0, 0)`;
      }

      if (targetEl) {
        const spanRect = targetEl.getBoundingClientRect();
        // If at end of word or extra letter, place caret at right edge
        const isAtEnd =
          charIdx >= (wordsRef.current[wordIdx]?.length || 0) ||
          targetEl.classList.contains('extra-char');

        const x = isAtEnd
          ? spanRect.right - containerRect.left
          : spanRect.left - containerRect.left;
        const y = spanRect.top - containerRect.top;

        caretRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        caretRef.current.style.height = `${spanRect.height}px`;
      }
    }
  }, []);

  /**
   * Resets test session.
   */
  const resetTest = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    stateRef.current = 'idle';
    setTestState('idle');
    currentWordIdxRef.current = 0;
    currentCharIdxRef.current = 0;
    userTypedWordsRef.current = [];
    extraLettersMapRef.current = {};
    startTimeRef.current = 0;
    lastKeyTimeRef.current = 0;
    wordStartTimeRef.current = 0;
    currentLineOffsetRef.current = 0;
    ikisRef.current = [];
    totalKeystrokesRef.current = 0;
    correctKeystrokesRef.current = 0;
    correctCharsRef.current = 0;
    incorrectCharsRef.current = 0;
    extraCharsRef.current = 0;
    missedCharsRef.current = 0;
    uncorrectedErrorsRef.current = 0;
    wpmSamplesRef.current = [];
    recentKeystrokesRef.current = [];

    setHudWpm(0);
    setHudRawWpm(0);
    setHudAccuracy(100);
    setHudBurstWpm(0);
    setHudKps(0);
    setHudTimeRemaining(duration);
    setHudWordsRemaining(wordCount);

    if (onTypingStateChange) onTypingStateChange(false);

    generatePassage();

    setTimeout(() => {
      if (wordsWrapperRef.current) {
        wordsWrapperRef.current.style.transform = `translate3d(0, 0, 0)`;
      }
      if (containerRef.current) {
        // Clean extra char spans
        const extras = containerRef.current.querySelectorAll('.extra-char');
        extras.forEach((el) => el.remove());

        const spans = containerRef.current.querySelectorAll('.typing-char');
        spans.forEach((span) => {
          span.className =
            'typing-char font-mono transition-colors duration-75 text-[#94a3b8]';
        });
      }

      if (wordsRef.current.length > 0 && wordsRef.current[0].length > 0) {
        emitActiveChar(wordsRef.current[0][0]);
      }
      updateCaretPosition();
      hiddenInputRef.current?.focus();
    }, 50);
  }, [
    duration,
    wordCount,
    generatePassage,
    emitActiveChar,
    updateCaretPosition,
    onTypingStateChange,
  ]);

  useEffect(() => {
    resetTest();
  }, [mode, duration, wordCount, contentLanguage, includePunctuation, includeNumbers, resetTest]);

  /**
   * Concludes the test.
   */
  const finishTest = useCallback(() => {
    if (stateRef.current === 'completed') return;
    stateRef.current = 'completed';
    setTestState('completed');

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (onTypingStateChange) onTypingStateChange(false);

    const elapsedSeconds = (performance.now() - startTimeRef.current) / 1000;
    const netWpm = calculateNetWpm(
      correctCharsRef.current,
      uncorrectedErrorsRef.current,
      elapsedSeconds
    );
    const rawWpm = calculateRawWpm(
      totalKeystrokesRef.current,
      elapsedSeconds
    );
    const accuracy = calculateAccuracy(
      correctKeystrokesRef.current,
      totalKeystrokesRef.current
    );
    const consistency = calculateConsistency(ikisRef.current);

    const result: TestResult = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `test-${Date.now()}`,
      wpm: netWpm,
      rawWpm: rawWpm,
      accuracy: accuracy,
      consistency: consistency,
      durationSeconds: Math.round(elapsedSeconds),
      mode: mode,
      modeValue: mode === 'time' ? duration : mode === 'words' ? wordCount : wordsRef.current.length,
      contentLanguage: contentLanguage,
      keyboardLayout: keyboardLayout,
      charsCorrect: correctCharsRef.current,
      charsIncorrect: incorrectCharsRef.current,
      charsExtra: extraCharsRef.current,
      charsMissed: missedCharsRef.current,
      uncorrectedErrors: uncorrectedErrorsRef.current,
      totalKeystrokes: totalKeystrokesRef.current,
      wpmOverTime: [...wpmSamplesRef.current],
      completedAt: new Date().toISOString(),
    };

    onTestComplete(result);
  }, [mode, duration, wordCount, contentLanguage, keyboardLayout, onTestComplete, onTypingStateChange]);

  /**
   * Starts the test timer and 150ms metrics sampler.
   */
  const startTest = useCallback(() => {
    stateRef.current = 'running';
    setTestState('running');
    startTimeRef.current = performance.now();
    lastKeyTimeRef.current = startTimeRef.current;
    wordStartTimeRef.current = startTimeRef.current;

    if (onTypingStateChange) onTypingStateChange(true);

    timerIntervalRef.current = setInterval(() => {
      if (stateRef.current !== 'running') return;
      const now = performance.now();
      const elapsedSec = (now - startTimeRef.current) / 1000;

      if (mode === 'time') {
        const remaining = Math.max(0, Math.ceil(duration - elapsedSec));
        setHudTimeRemaining(remaining);
        if (remaining <= 0) {
          finishTest();
          return;
        }
      }

      const currentNetWpm = calculateNetWpm(
        correctCharsRef.current,
        uncorrectedErrorsRef.current,
        elapsedSec
      );
      const currentRawWpm = calculateRawWpm(
        totalKeystrokesRef.current,
        elapsedSec
      );
      const currentAcc = calculateAccuracy(
        correctKeystrokesRef.current,
        totalKeystrokesRef.current
      );

      // Calculate rolling KPS (Keystrokes Per Second) over the last 1.5 seconds
      const cutoff = now - 1500;
      recentKeystrokesRef.current = recentKeystrokesRef.current.filter((t) => t > cutoff);
      const liveKps = Math.round((recentKeystrokesRef.current.length / 1.5) * 10) / 10;

      setHudWpm(currentNetWpm);
      setHudRawWpm(currentRawWpm);
      setHudAccuracy(currentAcc);
      setHudKps(liveKps);

      if (onProgressUpdate) {
        const totalChars = wordsRef.current.join(' ').length || 1;
        onProgressUpdate(correctCharsRef.current + incorrectCharsRef.current, totalChars, elapsedSec);
      }

      const lastSample = wpmSamplesRef.current[wpmSamplesRef.current.length - 1];
      const sampleTime = Math.floor(elapsedSec);
      if (!lastSample || sampleTime > lastSample.time) {
        wpmSamplesRef.current.push({
          time: sampleTime,
          wpm: currentNetWpm,
          rawWpm: currentRawWpm,
          errors: incorrectCharsRef.current + uncorrectedErrorsRef.current,
        });
      }
    }, 150);
  }, [mode, duration, finishTest, onTypingStateChange]);

  /**
   * HOT PATH: Process physical keystroke directly with MonkeyType overflow extra letters & zero latency.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      setIsCapsLockOn(e.getModifierState('CapsLock'));

      if (e.key === 'Tab' || e.key === 'Escape') {
        e.preventDefault();
        resetTest();
        return;
      }

      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.key === 'Shift' ||
        e.key === 'Control' ||
        e.key === 'Alt' ||
        e.key === 'CapsLock' ||
        e.key === 'Meta'
      ) {
        return;
      }

      if (stateRef.current === 'completed') return;

      if (stateRef.current === 'idle') {
        startTest();
      }

      const now = performance.now();
      if (lastKeyTimeRef.current > 0) {
        const iki = now - lastKeyTimeRef.current;
        ikisRef.current.push(iki);
      }
      lastKeyTimeRef.current = now;
      recentKeystrokesRef.current.push(now);

      emitKeypress(e.code);

      const wordIdx = currentWordIdxRef.current;
      const charIdx = currentCharIdxRef.current;
      const currentWord = wordsRef.current[wordIdx] || '';
      let currentTypedWord = userTypedWordsRef.current[wordIdx] || '';
      const extraLetters = extraLettersMapRef.current[wordIdx] || [];

      // --- 1. BACKSPACE (Supports extra letters removal & previous word retreat) ---
      if (e.key === 'Backspace') {
        e.preventDefault();

        // If extra letters exist on this word, pop them first!
        if (extraLetters.length > 0) {
          const removedChar = extraLetters.pop();
          const extraEl = document.getElementById(
            `extra-${wordIdx}-${extraLetters.length}`
          );
          if (extraEl) {
            extraEl.remove();
          }
          userTypedWordsRef.current[wordIdx] = currentTypedWord.slice(0, -1);
          soundSynthesizer.playKeySound(soundType);
          updateCaretPosition();
          return;
        }

        // Regular character backspace
        if (charIdx > 0) {
          currentCharIdxRef.current = charIdx - 1;
          const prevSpan = document.getElementById(`char-${wordIdx}-${charIdx - 1}`);
          if (prevSpan) {
            prevSpan.className =
              'typing-char font-mono transition-colors duration-75 text-[#94a3b8]';
          }
          userTypedWordsRef.current[wordIdx] = currentTypedWord.slice(0, -1);
          soundSynthesizer.playKeySound(soundType);
        } else if (wordIdx > 0 && !stopOnError) {
          // Monkeytype retreat to previous word if it had errors
          const prevWordIdx = wordIdx - 1;
          const prevWord = wordsRef.current[prevWordIdx];
          const prevTyped = userTypedWordsRef.current[prevWordIdx] || '';
          if (prevTyped !== prevWord) {
            currentWordIdxRef.current = prevWordIdx;
            currentCharIdxRef.current = Math.min(prevWord.length, prevTyped.length);
          }
        }

        const targetChar =
          wordsRef.current[currentWordIdxRef.current]?.[
            currentCharIdxRef.current
          ] || ' ';
        emitActiveChar(targetChar);
        updateCaretPosition();
        return;
      }

      // --- 2. SPACE (Advance to next word & compute burst WPM) ---
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (currentTypedWord.length === 0) return;

        totalKeystrokesRef.current += 1;

        // Check if word was left incomplete (uncorrected errors)
        if (charIdx < currentWord.length) {
          const uncompleted = currentWord.length - charIdx;
          missedCharsRef.current += uncompleted;
          uncorrectedErrorsRef.current += uncompleted;

          for (let i = charIdx; i < currentWord.length; i++) {
            const span = document.getElementById(`char-${wordIdx}-${i}`);
            if (span) {
              span.className =
                'typing-char font-mono transition-colors duration-75 text-[#ef4444]/60 underline decoration-[#ef4444]';
            }
          }
        }

        // Calculate instantaneous Word Burst WPM
        const wordDuration = Math.max(0.1, (now - wordStartTimeRef.current) / 1000);
        const burst = Math.round((currentWord.length / 5) / (wordDuration / 60));
        setHudBurstWpm(burst);
        wordStartTimeRef.current = now;

        // Advance word
        currentWordIdxRef.current = wordIdx + 1;
        currentCharIdxRef.current = 0;
        setHudWordsRemaining((prev) => Math.max(0, prev - 1));

        soundSynthesizer.playKeySound(soundType);

        if (currentWordIdxRef.current >= wordsRef.current.length) {
          finishTest();
          return;
        }

        const nextChar = wordsRef.current[currentWordIdxRef.current]?.[0] || ' ';
        emitActiveChar(nextChar);
        updateCaretPosition();
        return;
      }

      // --- 3. TYPING A PRINTABLE CHARACTER ---
      if (e.key.length === 1) {
        e.preventDefault();
        totalKeystrokesRef.current += 1;

        // If user already typed all letters of current word, append EXTRA letter! (MonkeyType pro feature)
        if (charIdx >= currentWord.length) {
          if (!extraLettersMapRef.current[wordIdx]) {
            extraLettersMapRef.current[wordIdx] = [];
          }
          if (extraLettersMapRef.current[wordIdx].length < 10) {
            const extraIdx = extraLettersMapRef.current[wordIdx].length;
            extraLettersMapRef.current[wordIdx].push(e.key);
            userTypedWordsRef.current[wordIdx] = currentTypedWord + e.key;
            extraCharsRef.current += 1;
            uncorrectedErrorsRef.current += 1;

            // Dynamically append extra letter span to DOM
            const wordEl = document.getElementById(`word-${wordIdx}`);
            if (wordEl) {
              const extraSpan = document.createElement('span');
              extraSpan.id = `extra-${wordIdx}-${extraIdx}`;
              extraSpan.className =
                'typing-char extra-char font-mono text-[#ef4444] opacity-85 underline decoration-[#ef4444]';
              extraSpan.textContent = e.key;
              wordEl.appendChild(extraSpan);
            }

            soundSynthesizer.playErrorSound();
            updateCaretPosition();
          }
          return;
        }

        const expectedChar = currentWord[charIdx];
        const typedChar = e.key;
        const isMatch = expectedChar === typedChar;

        if (isMatch) {
          correctKeystrokesRef.current += 1;
          correctCharsRef.current += 1;
          soundSynthesizer.playKeySound(soundType);

          const span = document.getElementById(`char-${wordIdx}-${charIdx}`);
          if (span) {
            span.className =
              'typing-char font-mono transition-colors duration-75 text-[#00e5ff] font-semibold [text-shadow:0_0_12px_rgba(0,229,255,0.4)]';
          }
        } else {
          incorrectCharsRef.current += 1;
          uncorrectedErrorsRef.current += 1;
          soundSynthesizer.playErrorSound();

          const span = document.getElementById(`char-${wordIdx}-${charIdx}`);
          if (span) {
            span.className =
              'typing-char font-mono transition-colors duration-75 text-[#ef4444] underline decoration-[#ef4444] bg-[#ef4444]/20 rounded-xs font-semibold';
          }

          if (stopOnError) {
            return;
          }
        }

        userTypedWordsRef.current[wordIdx] = currentTypedWord + typedChar;
        currentCharIdxRef.current = charIdx + 1;

        const nextChar =
          currentCharIdxRef.current < currentWord.length
            ? currentWord[currentCharIdxRef.current]
            : ' ';
        emitActiveChar(nextChar);

        if (
          wordIdx === wordsRef.current.length - 1 &&
          currentCharIdxRef.current >= currentWord.length
        ) {
          finishTest();
          return;
        }

        updateCaretPosition();
      }
    },
    [
      emitKeypress,
      resetTest,
      startTest,
      finishTest,
      emitActiveChar,
      updateCaretPosition,
      soundType,
      stopOnError,
    ]
  );

  useEffect(() => {
    hiddenInputRef.current?.focus();
  }, [words]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center select-none relative">
      {/* Live Speedometer & HUD Metric Bar */}
      <div className="w-full flex items-center justify-between mb-3.5 px-4 py-2.5 bg-[#111827] rounded-2xl border border-[#334155] text-sm font-mono transition-colors">
        {/* Left: Net WPM, Raw WPM, Accuracy, Burst */}
        <div className="flex items-center gap-4 sm:gap-6">
          {showLiveWpm && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-300 text-xs font-sans font-medium">
                {t.test.wpm}:
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {hudWpm}
              </span>
            </div>
          )}

          {/* Live Burst Speed (Instantaneous Word Velocity) */}
          {hudBurstWpm > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#1e293b] border border-[#334155] text-xs text-slate-300 font-medium">
              <Zap className="w-3 h-3 text-sky-400" />
              <span>Burst: {hudBurstWpm}</span>
            </div>
          )}

          {/* Live KPS (Keystrokes Per Second) */}
          {hudKps > 0 && (
            <div className="hidden md:flex items-center gap-1 text-xs text-slate-300 font-medium">
              <span>{hudKps} kps</span>
            </div>
          )}

          {showLiveAccuracy && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-300 text-xs font-sans font-medium">
                {t.test.accuracy}:
              </span>
              <span className="text-xl font-bold text-emerald-400">
                %{hudAccuracy}
              </span>
            </div>
          )}
        </div>

        {/* Right: CapsLock alert, Countdown Timer & Quick Restart */}
        <div className="flex items-center gap-3">
          {isCapsLockOn && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950 text-rose-300 border border-rose-500/50 text-xs font-sans font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">{t.test.capsLockWarning}</span>
            </div>
          )}

          {showLiveTimer && (
            <div className="text-xl font-bold text-white bg-[#0a0e17] px-3.5 py-1 rounded-xl border border-[#334155]">
              {mode === 'time'
                ? `${hudTimeRemaining}s`
                : `${hudWordsRemaining} ${locale === 'tr' ? 'kelime' : 'words'}`}
            </div>
          )}

          <button
            type="button"
            onClick={resetTest}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1e293b] border border-[#334155] transition-colors"
            title={t.test.restartShortcut}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3-Line Viewport (~140px fixed height) */}
      <div
        onClick={() => {
          hiddenInputRef.current?.focus();
          setIsFocused(true);
        }}
        className={`
          relative w-full h-[140px] overflow-hidden p-6 rounded-3xl
          bg-[#111827] border transition-colors cursor-text select-none
          ${isFocused ? 'border-[#0284c7]' : 'border-[#334155] opacity-90'}
        `}
      >
        <input
          ref={hiddenInputRef}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute -top-96 left-0 opacity-0 pointer-events-none"
        />

        {/* Dynamic Smooth Animated Caret */}
        <div
          ref={caretRef}
          className={`
            absolute pointer-events-none transition-all duration-[70ms] ease-[cubic-bezier(0.1,0.9,0.2,1)] z-20
            ${
              caretStyle === 'line'
                ? `w-0.5 bg-[#0284c7]`
                : caretStyle === 'block'
                ? `w-3 bg-[#0284c7]/25 border border-[#0284c7] rounded-xs`
                : `h-0.5 w-3.5 bg-[#0284c7] self-end -bottom-0.5`
            }
          `}
        />

        {!isFocused && (
          <div className="absolute inset-0 bg-[#0a0e17]/90 flex items-center justify-center z-30 text-sky-400 text-sm font-medium tracking-wide">
            {t.test.startPrompt}
          </div>
        )}

        {/* Smooth Shifting Words Wrapper (Transforms Y on active line changes) */}
        <div
          ref={wordsWrapperRef}
          className="w-full flex flex-wrap gap-x-3 gap-y-2.5 text-2xl font-mono leading-[44px] tracking-wide transition-transform duration-200 ease-out"
        >
          {words.map((word, wIdx) => (
            <div
              key={wIdx}
              id={`word-${wIdx}`}
              className="typing-word flex inline-flex relative"
            >
              {word.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  id={`char-${wIdx}-${cIdx}`}
                  className="typing-char font-mono transition-colors duration-75 text-[#94a3b8]"
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Quote Author if in Quote mode */}
      {quoteAuthor && (
        <div className="w-full text-right mt-2 text-xs text-[#cbd5e1] font-semibold italic font-sans pr-2">
          — {quoteAuthor}
        </div>
      )}

      {/* Restart Keyboard Shortcut Hint */}
      <div className="mt-3.5 flex items-center gap-3 text-xs text-[#cbd5e1]">
        <span className="flex items-center gap-1.5 font-medium">
          <kbd className="px-2 py-0.5 rounded-lg bg-[#1e293b] text-white font-mono text-[11px] border border-[#334155] shadow-xs">
            Tab
          </kbd>
          <span className="text-xs text-[#94a3b8]">+</span>
          <kbd className="px-2 py-0.5 rounded-lg bg-[#1e293b] text-white font-mono text-[11px] border border-[#334155] shadow-xs">
            Enter
          </kbd>
          <span className="text-xs ml-1.5 text-[#cbd5e1]">{t.test.restartShortcut}</span>
        </span>
      </div>
    </div>
  );
};
