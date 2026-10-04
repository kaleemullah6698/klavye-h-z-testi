import React from 'react';
import { Settings, X, Globe, Keyboard, Volume2, Palette, Sliders } from 'lucide-react';
import {
  CaretStyle,
  ContentLanguage,
  InterfaceLocale,
  KeyboardLayoutName,
  SoundType,
  ThemeMode,
  UserPreferences,
} from '../../types';
import { useTranslation } from '../../messages/i18n';

interface SettingsModalProps {
  locale: InterfaceLocale;
  isOpen: boolean;
  preferences: UserPreferences;
  onClose: () => void;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  locale,
  isOpen,
  preferences,
  onClose,
  onUpdatePreferences,
}) => {
  const t = useTranslation(locale);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#111827] border border-[#334155] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#334155]">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-sky-400" />
              <h2 className="text-lg font-bold text-white font-sans">
                {t.settings.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-[#1e293b]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Settings Sections */}
          <div className="space-y-5 my-5 overflow-y-auto pr-2 max-h-[60vh]">
            {/* 1. Language & Layout */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00e5ff] uppercase tracking-wider">
                <Globe className="w-4 h-4" />
                <span>{locale === 'tr' ? 'Dil ve Klavye Düzeni' : 'Language & Keyboard'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5">
                    {t.settings.interfaceLanguage}
                  </label>
                  <select
                    value={preferences.interfaceLocale}
                    onChange={(e) =>
                      onUpdatePreferences({
                        interfaceLocale: e.target.value as InterfaceLocale,
                      })
                    }
                    className="w-full bg-[#111827] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[#e4e8f1] focus:outline-none focus:border-[#00e5ff]"
                  >
                    <option value="tr">Türkçe (Varsayılan)</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5">
                    {t.settings.contentLanguage}
                  </label>
                  <select
                    value={preferences.contentLanguage}
                    onChange={(e) =>
                      onUpdatePreferences({
                        contentLanguage: e.target.value as ContentLanguage,
                      })
                    }
                    className="w-full bg-[#111827] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[#e4e8f1] focus:outline-none focus:border-[#00e5ff]"
                  >
                    <option value="tr">Türkçe Metinler</option>
                    <option value="en">English Texts</option>
                  </select>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b] sm:col-span-2">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5">
                    {t.settings.keyboardLayout}
                  </label>
                  <select
                    value={preferences.keyboardLayout}
                    onChange={(e) =>
                      onUpdatePreferences({
                        keyboardLayout: e.target.value as KeyboardLayoutName,
                      })
                    }
                    className="w-full bg-[#111827] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[#e4e8f1] focus:outline-none focus:border-[#00e5ff] font-medium"
                  >
                    <option value="tr-q">Türkçe Q (Standart Türkiye Q Klavyeleri)</option>
                    <option value="tr-f">Türkçe F (Milli Standart Hızlı F Klavye)</option>
                    <option value="en-qwerty">İngilizce QWERTY (US Standard Layout)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Sounds & Feedback */}
            <div className="space-y-3 pt-3 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#a855f7] uppercase tracking-wider">
                <Volume2 className="w-4 h-4" />
                <span>{locale === 'tr' ? 'Ses ve Efektler' : 'Sound & Audio'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5">
                    {t.settings.soundType}
                  </label>
                  <select
                    value={preferences.soundType}
                    onChange={(e) =>
                      onUpdatePreferences({
                        soundType: e.target.value as SoundType,
                      })
                    }
                    className="w-full bg-[#111827] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[#e4e8f1] focus:outline-none focus:border-[#00e5ff]"
                  >
                    <option value="mechanical">{t.settings.soundMechanical}</option>
                    <option value="thock">{t.settings.soundThock}</option>
                    <option value="typewriter">{t.settings.soundTypewriter}</option>
                    <option value="beep">{t.settings.soundBeep}</option>
                    <option value="off">{t.settings.soundOff}</option>
                  </select>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5 flex items-center justify-between">
                    <span>{t.settings.soundVolume}</span>
                    <span className="font-mono text-[#00e5ff]">
                      %{Math.round(preferences.soundVolume * 100)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    disabled={preferences.soundType === 'off'}
                    value={preferences.soundVolume}
                    onChange={(e) =>
                      onUpdatePreferences({
                        soundVolume: parseFloat(e.target.value),
                      })
                    }
                    className="w-full accent-[#00e5ff]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Appearance & Caret */}
            <div className="space-y-3 pt-3 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00e5ff] uppercase tracking-wider">
                <Palette className="w-4 h-4" />
                <span>{locale === 'tr' ? 'Görünüm ve İmleç' : 'Appearance & Caret'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5">
                    {t.settings.caretStyle}
                  </label>
                  <select
                    value={preferences.caretStyle}
                    onChange={(e) =>
                      onUpdatePreferences({
                        caretStyle: e.target.value as CaretStyle,
                      })
                    }
                    className="w-full bg-[#111827] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[#e4e8f1] focus:outline-none focus:border-[#00e5ff]"
                  >
                    <option value="line">{t.settings.caretLine}</option>
                    <option value="block">{t.settings.caretBlock}</option>
                    <option value="underline">{t.settings.caretUnderline}</option>
                  </select>
                </div>

                <div className="p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b]">
                  <label className="block text-[#e4e8f1] font-medium mb-1.5">
                    {t.settings.theme}
                  </label>
                  <select
                    value={preferences.theme}
                    onChange={(e) =>
                      onUpdatePreferences({
                        theme: e.target.value as ThemeMode,
                      })
                    }
                    className="w-full bg-[#111827] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-[#e4e8f1] focus:outline-none focus:border-[#00e5ff]"
                  >
                    <option value="dark">TypingFastest Obsidian Dark</option>
                    <option value="midnight">Cyberpunk Midnight Blue</option>
                    <option value="solarized">Solarized Dark</option>
                    <option value="cyberpunk">Neon Cyberpunk</option>
                    <option value="light">Aydınlık (Light)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Visual Helpers */}
            <div className="space-y-2 pt-3 border-t border-[#1e293b] text-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#a855f7] uppercase tracking-wider mb-2">
                <Sliders className="w-4 h-4" />
                <span>{t.settings.visualHelpers}</span>
              </div>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b] cursor-pointer hover:border-[#00e5ff]/40 transition-all">
                <span className="text-[#e4e8f1]">{t.settings.showKeyboardVisualizer}</span>
                <input
                  type="checkbox"
                  checked={preferences.showKeyboard}
                  onChange={(e) =>
                    onUpdatePreferences({ showKeyboard: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#00e5ff] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b] cursor-pointer hover:border-[#00e5ff]/40 transition-all">
                <span className="text-[#e4e8f1]">{t.settings.showHandIndicator}</span>
                <input
                  type="checkbox"
                  checked={preferences.showHands}
                  onChange={(e) =>
                    onUpdatePreferences({ showHands: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#00e5ff] rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl bg-[#0a0e17]/80 border border-[#1e293b] cursor-pointer hover:border-[#00e5ff]/40 transition-all">
                <span className="text-[#e4e8f1]">{t.settings.stopOnError}</span>
                <input
                  type="checkbox"
                  checked={preferences.stopOnError}
                  onChange={(e) =>
                    onUpdatePreferences({ stopOnError: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#00e5ff] rounded"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#334155] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-xs transition-colors"
          >
            {t.settings.close}
          </button>
        </div>
      </div>
    </div>
  );
};
