import React, { useMemo, useState, useEffect } from 'react';
import { FINGER_COLORS, findKeyForChar, KEYBOARD_LAYOUTS } from '../../lib/keyboard/layouts';
import { InterfaceLocale, KeyboardLayoutName } from '../../types';

interface KeyboardVisualizerProps {
  layoutName: KeyboardLayoutName;
  activeChar?: string;
  lastPressedCode?: string;
  locale: InterfaceLocale;
  showHands?: boolean;
}

export const KeyboardVisualizer: React.FC<KeyboardVisualizerProps> = ({
  layoutName,
  activeChar = '',
  lastPressedCode = '',
  locale,
  showHands = true,
}) => {
  const [eventChar, setEventChar] = useState<string>(activeChar);
  const [eventCode, setEventCode] = useState<string>(lastPressedCode);

  useEffect(() => {
    const handleChar = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setEventChar(customEvent.detail || '');
    };
    const handleKey = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setEventCode(customEvent.detail || '');
    };

    window.addEventListener('kht:active-char', handleChar);
    window.addEventListener('kht:keypress', handleKey);

    return () => {
      window.removeEventListener('kht:active-char', handleChar);
      window.removeEventListener('kht:keypress', handleKey);
    };
  }, []);

  const currentLayout = KEYBOARD_LAYOUTS[layoutName] || KEYBOARD_LAYOUTS['tr-q'];
  const effectiveChar = eventChar || activeChar;
  const effectiveCode = eventCode || lastPressedCode;

  const targetKey = useMemo(() => {
    if (!effectiveChar) return undefined;
    if (effectiveChar === ' ') {
      return currentLayout.keys.find((k) => k.code === 'Space');
    }
    return findKeyForChar(effectiveChar, layoutName);
  }, [effectiveChar, layoutName, currentLayout]);

  const targetFinger = targetKey ? targetKey.finger : undefined;
  const targetFingerInfo = targetFinger ? FINGER_COLORS[targetFinger] : undefined;

  const rows = useMemo(() => {
    const r1 = currentLayout.keys.filter((k) => k.row === 'number');
    const r2 = currentLayout.keys.filter((k) => k.row === 'top');
    const r3 = currentLayout.keys.filter((k) => k.row === 'home');
    const r4 = currentLayout.keys.filter((k) => k.row === 'bottom');
    const r5 = currentLayout.keys.filter((k) => k.row === 'space');
    return [r1, r2, r3, r4, r5];
  }, [currentLayout]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-4 rounded-3xl bg-[#111827] border border-[#334155] shadow-sm relative select-none">
      {/* Top Layout & Target Key Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 px-2 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-lg font-mono font-semibold bg-[#1e293b] text-white border border-[#334155]">
            {currentLayout.label}
          </span>
          <span className="text-slate-300 hidden sm:inline text-xs font-medium">
            {currentLayout.description}
          </span>
        </div>

        {targetKey && targetFingerInfo && (
          <div className="flex items-center gap-2 bg-[#111827] px-3 py-1 rounded-lg border border-[#334155]">
            <span className="text-slate-300 font-medium">
              {locale === 'tr' ? 'Hedef Tuş:' : 'Target:'}
            </span>
            <span className="font-mono font-bold text-white text-sm px-1.5 py-0.5 bg-[#0284c7] rounded">
              {effectiveChar === ' ' ? 'Space ␣' : effectiveChar}
            </span>
            <span className="text-slate-300 font-medium ml-1">
              ({locale === 'tr' ? targetFingerInfo.labelTr : targetFingerInfo.labelEn})
            </span>
          </div>
        )}
      </div>

      {/* Hero Keyboard Plate */}
      <div className="relative">
        <div className="hero-kb-plate">
          <div className="flex flex-col gap-1.5 overflow-x-auto">
            {rows.map((rowKeys, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1.5 min-w-[620px]">
                {rowKeys.map((keyDef) => {
                  const isTarget = targetKey?.code === keyDef.code;
                  const isPressed = effectiveCode === keyDef.code;
                  const widthStyle = keyDef.width ? { flex: keyDef.width } : { flex: 1 };

                  return (
                    <div
                      key={keyDef.code}
                      style={widthStyle}
                      className={`
                        hero-key relative h-11 flex flex-col items-center justify-center font-mono
                        text-xs font-semibold
                        ${isPressed || isTarget ? 'hero-key-active' : ''}
                      `}
                    >
                      {/* Shifted character */}
                      {keyDef.shiftKey && (
                        <span className="text-[10px] leading-tight text-slate-300 font-medium">
                          {keyDef.shiftKey}
                        </span>
                      )}
                      <span className="leading-none">
                        {keyDef.label || keyDef.defaultKey}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hand Finger Placement Guide */}
      {showHands && (
        <div className="mt-4 pt-3 border-t border-[#334155] flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold">
              {locale === 'tr' ? 'Sol El:' : 'Left Hand:'}
            </span>
            {(['left-pinky', 'left-ring', 'left-middle', 'left-index'] as const).map(
              (f) => (
                <span
                  key={f}
                  className={`px-1.5 py-0.5 rounded border text-[11px] font-mono transition-colors ${
                    targetFinger === f
                      ? 'bg-[#0284c7] text-white font-semibold border-[#0284c7]'
                      : 'bg-[#111827] text-slate-300 border-[#334155]'
                  }`}
                >
                  {locale === 'tr' ? FINGER_COLORS[f].labelTr : FINGER_COLORS[f].labelEn}
                </span>
              )
            )}
          </div>

          <div className="h-3 w-px bg-[#334155] hidden sm:block" />

          <div className="flex items-center gap-1.5">
            <span className="text-white font-bold">
              {locale === 'tr' ? 'Sağ El:' : 'Right Hand:'}
            </span>
            {(['right-index', 'right-middle', 'right-ring', 'right-pinky'] as const).map(
              (f) => (
                <span
                  key={f}
                  className={`px-1.5 py-0.5 rounded border text-[11px] font-mono transition-colors ${
                    targetFinger === f
                      ? 'bg-[#0284c7] text-white font-semibold border-[#0284c7]'
                      : 'bg-[#111827] text-slate-300 border-[#334155]'
                  }`}
                >
                  {locale === 'tr' ? FINGER_COLORS[f].labelTr : FINGER_COLORS[f].labelEn}
                </span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};
