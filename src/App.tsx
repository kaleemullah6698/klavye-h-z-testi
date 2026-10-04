import React, { useState, useEffect, useCallback } from 'react';
import {
  CaretStyle,
  ContentLanguage,
  InterfaceLocale,
  KeyboardLayoutName,
  SoundType,
  TestDuration,
  TestMode,
  TestResult,
  UserPreferences,
  WordCount,
} from './types';
import {
  loadPreferences,
  loadTestHistory,
  loadPersonalBests,
  savePreferences,
  saveTestResult,
} from './lib/storage/localStorage';
import { soundSynthesizer } from './lib/audio/soundSynthesizer';
import { Header, NavView } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { TestConfigBar } from './components/typing/TestConfigBar';
import { TypingEngine } from './components/typing/TypingEngine';
import { KeyboardVisualizer } from './components/typing/KeyboardVisualizer';
import { ResultsModal } from './components/typing/ResultsModal';
import { HistoryDrawer } from './components/typing/HistoryDrawer';
import { SettingsModal } from './components/typing/SettingsModal';
import { SeoPages } from './components/seo/SeoPages';
import { LandingInfoSection } from './components/landing/LandingInfoSection';
import { TurkishLanguageSection } from './components/landing/TurkishLanguageSection';

// Curriculum, Gamification & Practice components
import { CurriculumView } from './components/curriculum/CurriculumView';
import { LessonPlayerModal } from './components/curriculum/LessonPlayerModal';
import { ChallengeView } from './components/challenges/ChallengeView';
import { WeakKeyView } from './components/adaptive/WeakKeyView';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { AchievementsModal } from './components/gamification/AchievementsModal';
import { GhostRacerBar } from './components/gamification/GhostRacerBar';
import { ProfileModal } from './components/profile/ProfileModal';
import { AdminNotificationStudio } from './components/admin/AdminNotificationStudio';

// Services
import { Lesson, DailyChallenge } from './types/curriculum';
import { loadUserProfile } from './lib/curriculum/userService';
import { loadStreakState, recordCompletedSessionTime } from './lib/curriculum/streakService';
import { calculateGhostRaceState, GhostRacerState } from './lib/curriculum/ghostRaceService';
import { submitLeaderboardScore } from './lib/curriculum/leaderboardService';
import { useTranslation } from './messages/i18n';
import { Flame, Ghost, Zap } from 'lucide-react';

export default function App() {
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    loadPreferences()
  );

  const [history, setHistory] = useState<TestResult[]>(() => loadTestHistory());
  const [pbs, setPbs] = useState(() => loadPersonalBests());
  const [userProfile, setUserProfile] = useState(() => loadUserProfile());
  const [streakState, setStreakState] = useState(() => loadStreakState());

  const [activeNav, setActiveNav] = useState<NavView>('test');

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isResultsOpen, setIsResultsOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Lesson player state
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLessonPlayerOpen, setIsLessonPlayerOpen] = useState<boolean>(false);

  // Test state & ghost racer
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);
  const [testKey, setTestKey] = useState<number>(0);
  const [isActivelyTyping, setIsActivelyTyping] = useState<boolean>(false);
  const [customPassage, setCustomPassage] = useState<string>('');
  const [isGhostRaceEnabled, setIsGhostRaceEnabled] = useState<boolean>(true);

  const [ghostState, setGhostState] = useState<GhostRacerState>({
    ghostWpm: 0,
    ghostProgressPercent: 0,
    userProgressPercent: 0,
    wordsAhead: 0,
  });

  const t = useTranslation(preferences.interfaceLocale);

  // Find relevant PB for Ghost Racer
  const pbKey = `${preferences.testMode}_${preferences.testDuration}_${preferences.contentLanguage}_${preferences.keyboardLayout}`;
  const currentPb = pbs[pbKey];
  const pbHistoryItem = history.find(
    (h) =>
      h.mode === preferences.testMode &&
      h.wpm === currentPb?.wpm &&
      h.wpmOverTime &&
      h.wpmOverTime.length > 0
  );

  useEffect(() => {
    soundSynthesizer.setVolume(preferences.soundVolume);
    soundSynthesizer.setMuted(preferences.soundType === 'off');
  }, [preferences.soundVolume, preferences.soundType]);

  const handleUpdatePreferences = useCallback(
    (updated: Partial<UserPreferences>) => {
      const newPrefs = savePreferences(updated);
      setPreferences(newPrefs);
    },
    []
  );

  const handleTestComplete = useCallback(
    (result: TestResult) => {
      setIsActivelyTyping(false);
      const { isNewPb } = saveTestResult(result);
      const enrichedResult: TestResult = {
        ...result,
        isPersonalBest: isNewPb,
      };

      setLatestResult(enrichedResult);
      const freshHistory = loadTestHistory();
      setHistory(freshHistory);
      setPbs(loadPersonalBests());

      // Update streaks and daily goal minutes
      const updatedStreak = recordCompletedSessionTime(result.durationSeconds);
      setStreakState(updatedStreak);

      // Submit to leaderboard if accuracy >= 90%
      if (result.accuracy >= 90) {
        submitLeaderboardScore(
          userProfile.username,
          userProfile.displayName,
          result.wpm,
          result.accuracy,
          result.consistency,
          result.keyboardLayout,
          result.contentLanguage
        );
      }

      // Refresh profile (evaluates unlocked achievement badges!)
      setUserProfile(loadUserProfile());
      setIsResultsOpen(true);
    },
    [userProfile]
  );

  const handleRestartTest = useCallback(() => {
    setIsResultsOpen(false);
    setIsActivelyTyping(false);
    setTestKey((prev) => prev + 1);
  }, []);

  const handleProgressUpdate = useCallback(
    (typedChars: number, totalChars: number, elapsedSec: number) => {
      if (pbHistoryItem?.wpmOverTime) {
        const race = calculateGhostRaceState(
          pbHistoryItem.wpmOverTime,
          elapsedSec,
          preferences.testDuration,
          typedChars,
          totalChars
        );
        setGhostState(race);
      }
    },
    [pbHistoryItem, preferences.testDuration]
  );

  const handleStartChallenge = (challenge: DailyChallenge) => {
    setCustomPassage(challenge.passage);
    handleUpdatePreferences({
      testMode: 'time',
      testDuration: challenge.durationSeconds as TestDuration,
    });
    setActiveNav('test');
    setTestKey((prev) => prev + 1);
  };

  const handleStartCustomDrill = (drillText: string) => {
    setCustomPassage(drillText);
    handleUpdatePreferences({
      testMode: 'words',
      wordCount: 50,
    });
    setActiveNav('test');
    setTestKey((prev) => prev + 1);
  };

  const isZenDimmed = isActivelyTyping && preferences.zenMode;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0a0e17] text-[#e4e8f1] relative overflow-x-hidden selection:bg-[#0284c7] selection:text-white">
      {/* Top Header Navigation */}
      <div className={`transition-opacity duration-300 ${isZenDimmed ? 'opacity-15 pointer-events-none' : 'opacity-100'}`}>
        <Header
          locale={preferences.interfaceLocale}
          onToggleLocale={(newLocale) =>
            handleUpdatePreferences({ interfaceLocale: newLocale })
          }
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenAchievements={() => setIsAchievementsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onSelectNav={setActiveNav}
          activeNav={activeNav}
          streakCount={streakState.currentStreak}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* NAV VIEW: HIZ TESTİ */}
        {activeNav === 'test' && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
            {/* Hero Banner */}
            <div className={`text-center mb-6 transition-opacity duration-300 ${isZenDimmed ? 'opacity-15 pointer-events-none' : 'opacity-100'}`}>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white">
                {preferences.interfaceLocale === 'tr'
                  ? 'Klavye Hız Testi'
                  : 'Typing Speed Test'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto font-medium">
                {preferences.interfaceLocale === 'tr'
                  ? 'Türkçe Q, Türkçe F ve İngilizce QWERTY klavyede WPM hızınızı, doğruluğunuzu ve ritminizi canlı ölçün.'
                  : 'Measure your net WPM speed, accuracy, and typing consistency with millisecond precision.'}
              </p>
            </div>

            {/* Test Configuration Bar */}
            <div className={`w-full transition-opacity duration-300 ${isZenDimmed ? 'opacity-15 pointer-events-none' : 'opacity-100'}`}>
              <TestConfigBar
                locale={preferences.interfaceLocale}
                mode={preferences.testMode}
                onModeChange={(m) => {
                  setCustomPassage('');
                  handleUpdatePreferences({ testMode: m });
                }}
                duration={preferences.testDuration}
                onDurationChange={(d) => {
                  setCustomPassage('');
                  handleUpdatePreferences({ testDuration: d });
                }}
                wordCount={preferences.wordCount}
                onWordCountChange={(w) => {
                  setCustomPassage('');
                  handleUpdatePreferences({ wordCount: w });
                }}
                contentLanguage={preferences.contentLanguage}
                onContentLanguageChange={(lang) =>
                  handleUpdatePreferences({ contentLanguage: lang })
                }
                keyboardLayout={preferences.keyboardLayout}
                onKeyboardLayoutChange={(layout) =>
                  handleUpdatePreferences({ keyboardLayout: layout })
                }
                soundType={preferences.soundType}
                onSoundTypeChange={(s) =>
                  handleUpdatePreferences({ soundType: s })
                }
                includePunctuation={preferences.includePunctuation}
                onTogglePunctuation={() =>
                  handleUpdatePreferences({
                    includePunctuation: !preferences.includePunctuation,
                  })
                }
                includeNumbers={preferences.includeNumbers}
                onToggleNumbers={() =>
                  handleUpdatePreferences({
                    includeNumbers: !preferences.includeNumbers,
                  })
                }
                zenMode={preferences.zenMode}
                onToggleZenMode={() =>
                  handleUpdatePreferences({
                    zenMode: !preferences.zenMode,
                  })
                }
                showKeyboard={preferences.showKeyboard}
                onToggleKeyboard={() =>
                  handleUpdatePreferences({
                    showKeyboard: !preferences.showKeyboard,
                  })
                }
              />
            </div>

            {/* Ghost Racer Track (Shows if user has a PB in this mode) */}
            {isGhostRaceEnabled && pbHistoryItem && currentPb && (
              <div className={`w-full transition-opacity duration-300 ${isZenDimmed ? 'opacity-80' : 'opacity-100'}`}>
                <GhostRacerBar state={ghostState} pbWpm={currentPb.wpm} />
              </div>
            )}

            {/* High Performance Typing Engine */}
            <TypingEngine
              key={`${testKey}-${preferences.testMode}-${preferences.testDuration}-${preferences.wordCount}-${preferences.contentLanguage}-${preferences.keyboardLayout}-${preferences.includePunctuation}-${preferences.includeNumbers}-${customPassage ? 'custom' : 'std'}`}
              locale={preferences.interfaceLocale}
              mode={preferences.testMode}
              duration={preferences.testDuration}
              wordCount={preferences.wordCount}
              contentLanguage={preferences.contentLanguage}
              keyboardLayout={preferences.keyboardLayout}
              soundType={preferences.soundType}
              caretStyle={preferences.caretStyle}
              showLiveWpm={preferences.showLiveWpm}
              showLiveAccuracy={preferences.showLiveAccuracy}
              showLiveTimer={preferences.showLiveTimer}
              stopOnError={preferences.stopOnError}
              includePunctuation={preferences.includePunctuation}
              includeNumbers={preferences.includeNumbers}
              customPassage={customPassage}
              onActiveCharChange={() => {}}
              onKeypressEvent={() => {}}
              onTestComplete={handleTestComplete}
              onTypingStateChange={setIsActivelyTyping}
              onProgressUpdate={handleProgressUpdate}
            />

            {/* 3D Virtual Mechanical Keyboard */}
            {preferences.showKeyboard && (
              <div className={`w-full transition-opacity duration-300 ${isZenDimmed ? 'opacity-35' : 'opacity-100'}`}>
                <KeyboardVisualizer
                  layoutName={preferences.keyboardLayout}
                  locale={preferences.interfaceLocale}
                  showHands={preferences.showHands}
                />
              </div>
            )}

            {/* Turkish Landing Page Info, WPM Tiers & FAQ Section */}
            <div className={`w-full transition-opacity duration-300 ${isZenDimmed ? 'opacity-10 pointer-events-none' : 'opacity-100'}`}>
              <LandingInfoSection
                locale={preferences.interfaceLocale}
                onStartTest={(dur, layout) => {
                  setCustomPassage('');
                  handleUpdatePreferences({
                    testMode: 'time',
                    testDuration: dur,
                    ...(layout ? { keyboardLayout: layout } : {}),
                  });
                  setTestKey((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenCurriculum={() => {
                  setActiveNav('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenWeakKeys={() => {
                  setActiveNav('weakkeys');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              {/* Turkish Language Section Just Above Footer in Landing Page */}
              <TurkishLanguageSection
                locale={preferences.interfaceLocale}
                onStartTest={(dur, layout) => {
                  setCustomPassage('');
                  handleUpdatePreferences({
                    testMode: 'time',
                    testDuration: dur,
                    ...(layout ? { keyboardLayout: layout } : {}),
                  });
                  setTestKey((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenCurriculum={() => {
                  setActiveNav('curriculum');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenWeakKeys={() => {
                  setActiveNav('weakkeys');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        )}

        {/* NAV VIEW: DERSLER (Curriculum) */}
        {activeNav === 'curriculum' && (
          <CurriculumView
            locale={preferences.interfaceLocale}
            layout={preferences.keyboardLayout}
            onSelectLesson={(lesson) => {
              setSelectedLesson(lesson);
              setIsLessonPlayerOpen(true);
            }}
          />
        )}

        {/* NAV VIEW: MEYDAN OKUMA (Daily & Weekly Challenges) */}
        {activeNav === 'challenges' && (
          <ChallengeView
            locale={preferences.interfaceLocale}
            onStartChallenge={handleStartChallenge}
          />
        )}

        {/* NAV VIEW: SIRALAMA (Leaderboard) */}
        {activeNav === 'leaderboard' && (
          <LeaderboardView locale={preferences.interfaceLocale} />
        )}

        {/* NAV VIEW: ZAYIF TUŞLAR (Adaptive Weak-Key Analysis) */}
        {activeNav === 'weakkeys' && (
          <WeakKeyView
            locale={preferences.interfaceLocale}
            layout={preferences.keyboardLayout}
            onStartCustomDrill={handleStartCustomDrill}
          />
        )}

        {/* NAV VIEW: ADMIN BİLDİRİM STÜDYOSU */}
        {activeNav === 'admin' && (
          <AdminNotificationStudio locale={preferences.interfaceLocale} />
        )}

        {/* NAV VIEWS: REHBER, KLAVYE DÜZENLERİ, MAKALELER */}
        {(activeNav === 'guide' || activeNav === 'layouts' || activeNav === 'articles') && (
          <SeoPages
            view={activeNav}
            locale={preferences.interfaceLocale}
            onStartTestWithConfig={(dur, layout) => {
              if (dur) handleUpdatePreferences({ testDuration: dur });
              if (layout) handleUpdatePreferences({ keyboardLayout: layout });
              setActiveNav('test');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <div className={`transition-opacity duration-300 ${isZenDimmed ? 'opacity-15 pointer-events-none' : 'opacity-100'}`}>
        <Footer
          locale={preferences.interfaceLocale}
          onSelectDurationTest={(dur) => {
            setCustomPassage('');
            handleUpdatePreferences({ testMode: 'time', testDuration: dur });
            setActiveNav('test');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectLayoutTest={(layout) => {
            setCustomPassage('');
            handleUpdatePreferences({ keyboardLayout: layout });
            setActiveNav('test');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectNav={(view) => {
            setActiveNav(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Results Modal */}
      <ResultsModal
        locale={preferences.interfaceLocale}
        result={latestResult}
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        onRestart={handleRestartTest}
        onOpenHistory={() => {
          setIsResultsOpen(false);
          setIsHistoryOpen(true);
        }}
      />

      {/* History Drawer */}
      <HistoryDrawer
        locale={preferences.interfaceLocale}
        isOpen={isHistoryOpen}
        history={history}
        onClose={() => setIsHistoryOpen(false)}
        onHistoryUpdated={() => setHistory(loadTestHistory())}
      />

      {/* Settings Modal */}
      <SettingsModal
        locale={preferences.interfaceLocale}
        isOpen={isSettingsOpen}
        preferences={preferences}
        onClose={() => setIsSettingsOpen(false)}
        onUpdatePreferences={handleUpdatePreferences}
      />

      {/* Lesson Player Modal */}
      <LessonPlayerModal
        lesson={selectedLesson}
        locale={preferences.interfaceLocale}
        layout={preferences.keyboardLayout}
        soundType={preferences.soundType}
        isOpen={isLessonPlayerOpen}
        onClose={() => setIsLessonPlayerOpen(false)}
        onLessonCompleted={() => setUserProfile(loadUserProfile())}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        locale={preferences.interfaceLocale}
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
      />

      {/* Profile & Guest Migration Modal */}
      <ProfileModal
        locale={preferences.interfaceLocale}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onProfileUpdated={() => {
          setUserProfile(loadUserProfile());
          setHistory(loadTestHistory());
        }}
      />
    </div>
  );
}
