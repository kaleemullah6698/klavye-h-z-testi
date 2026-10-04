import React from 'react';
import {
  Volume2,
  VolumeX,
  Keyboard as KeyboardIcon,
  Clock,
  Type,
  Quote,
  Hash,
  AtSign,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  ContentLanguage,
  InterfaceLocale,
  KeyboardLayoutName,
  SoundType,
  TestDuration,
  TestMode,
  WordCount,
} from '../../types';
import { useTranslation } from '../../messages/i18n';

interface TestConfigBarProps {
  locale: InterfaceLocale;
  mode: TestMode;
  onModeChange: (m: TestMode) => void;
  duration: TestDuration;
  onDurationChange: (d: TestDuration) => void;
  wordCount: WordCount;
  onWordCountChange: (w: WordCount) => void;
  contentLanguage: ContentLanguage;
  onContentLanguageChange: (lang: ContentLanguage) => void;
  keyboardLayout: KeyboardLayoutName;
  onKeyboardLayoutChange: (layout: KeyboardLayoutName) => void;
  soundType: SoundType;
  onSoundTypeChange: (s: SoundType) => void;
  includePunctuation: boolean;
  onTogglePunctuation: () => void;
  includeNumbers: boolean;
  onToggleNumbers: () => void;
  zenMode: boolean;
  onToggleZenMode: () => void;
  showKeyboard: boolean;
  onToggleKeyboard: () => void;
  disabled?: boolean;
}

export const TestConfigBar: React.FC<TestConfigBarProps> = ({
  locale,
  mode,
  onModeChange,
  duration,
  onDurationChange,
  wordCount,
  onWordCountChange,
  contentLanguage,
  onContentLanguageChange,
  keyboardLayout,
  onKeyboardLayoutChange,
  soundType,
  onSoundTypeChange,
  includePunctuation,
  onTogglePunctuation,
  includeNumbers,
  onToggleNumbers,
  zenMode,
  onToggleZenMode,
  showKeyboard,
  onToggleKeyboard,
  disabled = false,
}) => {
  const t = useTranslation(locale);

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 p-2 sm:p-2.5 rounded-2xl bg-[#111827] border border-[#334155] shadow-sm flex flex-wrap items-center justify-between gap-2.5 text-xs transition-opacity duration-300">
      {/* Left section: Modifier Toggles (@ punctuation, # numbers) */}
      <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-xl border border-[#334155]">
        <button
          type="button"
          disabled={disabled}
          onClick={onTogglePunctuation}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-medium transition-colors ${
            includePunctuation
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
          title="Noktalama işaretlerini dahil et"
        >
          <AtSign className="w-3.5 h-3.5" />
          <span>noktalama</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={onToggleNumbers}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-medium transition-colors ${
            includeNumbers
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
          title="Rakamları dahil et"
        >
          <Hash className="w-3.5 h-3.5" />
          <span>sayılar</span>
        </button>
      </div>

      {/* Middle section: Mode Buttons (Time, Words, Quote) */}
      <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-xl border border-[#334155]">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onModeChange('time')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            mode === 'time'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{t.config.time}</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onModeChange('words')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            mode === 'words'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>{t.config.words}</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onModeChange('quote')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors ${
            mode === 'quote'
              ? 'bg-[#0284c7] text-white font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          <Quote className="w-3.5 h-3.5" />
          <span>{t.config.quote}</span>
        </button>
      </div>

      {/* Mode Sub-Pills (Duration or Word Count) */}
      {mode === 'time' && (
        <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-xl border border-[#334155] font-mono">
          {([15, 30, 60, 180, 300, 600] as const).map((d) => {
            const label =
              d >= 60
                ? `${d / 60}${locale === 'tr' ? 'dk' : 'm'}`
                : `${d}s`;
            return (
              <button
                key={d}
                type="button"
                disabled={disabled}
                onClick={() => onDurationChange(d)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                  duration === d
                    ? 'bg-[#0284c7] text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {mode === 'words' && (
        <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-xl border border-[#334155] font-mono">
          {([25, 50, 100] as const).map((count) => (
            <button
              key={count}
              type="button"
              disabled={disabled}
              onClick={() => onWordCountChange(count)}
              className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                wordCount === count
                  ? 'bg-[#0284c7] text-white font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-[#1e293b]'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      )}

      {/* Right section: Language, Layout, Sound, Zen, Keyboard */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Language (TR / EN) */}
        <div className="flex items-center bg-[#0a0e17] p-0.5 rounded-xl border border-[#334155] font-mono text-[11px]">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onContentLanguageChange('tr')}
            className={`px-2 py-1 rounded-lg transition-colors font-bold ${
              contentLanguage === 'tr'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            TR
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onContentLanguageChange('en')}
            className={`px-2 py-1 rounded-lg transition-colors font-bold ${
              contentLanguage === 'en'
                ? 'bg-[#0284c7] text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>

        {/* Layout */}
        <select
          disabled={disabled}
          value={keyboardLayout}
          onChange={(e) => onKeyboardLayoutChange(e.target.value as KeyboardLayoutName)}
          className="bg-[#0a0e17] border border-[#334155] rounded-xl px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#0284c7] cursor-pointer font-medium"
        >
          <option value="tr-q">Türkçe Q</option>
          <option value="tr-f">Türkçe F</option>
          <option value="en-qwerty">QWERTY</option>
        </select>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={() => {
            const nextMap: Record<SoundType, SoundType> = {
              mechanical: 'thock',
              thock: 'typewriter',
              typewriter: 'beep',
              beep: 'off',
              off: 'mechanical',
            };
            onSoundTypeChange(nextMap[soundType]);
          }}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-colors ${
            soundType !== 'off'
              ? 'bg-[#0284c7] text-white border-[#0284c7] font-medium'
              : 'bg-[#0a0e17] text-slate-300 border-[#334155] hover:text-white hover:bg-[#1e293b]'
          }`}
          title={`Ses: ${soundType}`}
        >
          {soundType !== 'off' ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : (
            <VolumeX className="w-3.5 h-3.5" />
          )}
        </button>

        {/* Zen Focus Mode Toggle */}
        <button
          type="button"
          onClick={onToggleZenMode}
          className={`p-1.5 rounded-xl border transition-colors ${
            zenMode
              ? 'bg-[#0284c7] text-white border-[#0284c7]'
              : 'bg-[#0a0e17] text-slate-300 border-[#334155] hover:text-white hover:bg-[#1e293b]'
          }`}
          title={zenMode ? 'Zen Odak Modu: Açık (Yazarken çevreyi karartır)' : 'Zen Odak Modu: Kapalı'}
        >
          {zenMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>

        {/* Virtual Keyboard Toggle */}
        <button
          type="button"
          onClick={onToggleKeyboard}
          className={`p-1.5 rounded-xl border transition-colors ${
            showKeyboard
              ? 'bg-[#0284c7] text-white border-[#0284c7]'
              : 'bg-[#0a0e17] text-slate-300 border-[#334155] hover:text-white hover:bg-[#1e293b]'
          }`}
          title={showKeyboard ? t.keyboard.hideKeyboard : t.keyboard.showKeyboard}
        >
          <KeyboardIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
