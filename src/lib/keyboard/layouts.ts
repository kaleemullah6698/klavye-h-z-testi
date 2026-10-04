import { Finger, KeyboardLayout, KeyboardLayoutName, KeyDefinition } from '../../types';

export const FINGER_COLORS: Record<Finger, { bg: string; border: string; labelTr: string; labelEn: string }> = {
  'left-pinky': { bg: 'bg-rose-500/20 text-rose-300', border: 'border-rose-500/40', labelTr: 'Sol Serçe', labelEn: 'Left Pinky' },
  'left-ring': { bg: 'bg-amber-500/20 text-amber-300', border: 'border-amber-500/40', labelTr: 'Sol Yüzük', labelEn: 'Left Ring' },
  'left-middle': { bg: 'bg-emerald-500/20 text-emerald-300', border: 'border-emerald-500/40', labelTr: 'Sol Orta', labelEn: 'Left Middle' },
  'left-index': { bg: 'bg-cyan-500/20 text-cyan-300', border: 'border-cyan-500/40', labelTr: 'Sol İşaret', labelEn: 'Left Index' },
  'thumb': { bg: 'bg-indigo-500/20 text-indigo-300', border: 'border-indigo-500/40', labelTr: 'Başparmak', labelEn: 'Thumb' },
  'right-index': { bg: 'bg-blue-500/20 text-blue-300', border: 'border-blue-500/40', labelTr: 'Sağ İşaret', labelEn: 'Right Index' },
  'right-middle': { bg: 'bg-teal-500/20 text-teal-300', border: 'border-teal-500/40', labelTr: 'Sağ Orta', labelEn: 'Right Middle' },
  'right-ring': { bg: 'bg-orange-500/20 text-orange-300', border: 'border-orange-500/40', labelTr: 'Sağ Yüzük', labelEn: 'Right Ring' },
  'right-pinky': { bg: 'bg-purple-500/20 text-purple-300', border: 'border-purple-500/40', labelTr: 'Sağ Serçe', labelEn: 'Right Pinky' },
};

// Turkish Q Layout (TS 2117 Standard Turkish Q)
export const TURKISH_Q_KEYS: KeyDefinition[] = [
  // Number row
  { code: 'Backquote', defaultKey: '"', shiftKey: 'é', finger: 'left-pinky', row: 'number' },
  { code: 'Digit1', defaultKey: '1', shiftKey: '!', finger: 'left-pinky', row: 'number' },
  { code: 'Digit2', defaultKey: '2', shiftKey: "'", finger: 'left-ring', row: 'number' },
  { code: 'Digit3', defaultKey: '3', shiftKey: '^', finger: 'left-middle', row: 'number' },
  { code: 'Digit4', defaultKey: '4', shiftKey: '+', finger: 'left-index', row: 'number' },
  { code: 'Digit5', defaultKey: '5', shiftKey: '%', finger: 'left-index', row: 'number' },
  { code: 'Digit6', defaultKey: '6', shiftKey: '&', finger: 'right-index', row: 'number' },
  { code: 'Digit7', defaultKey: '7', shiftKey: '/', finger: 'right-index', row: 'number' },
  { code: 'Digit8', defaultKey: '8', shiftKey: '(', finger: 'right-middle', row: 'number' },
  { code: 'Digit9', defaultKey: '9', shiftKey: ')', finger: 'right-ring', row: 'number' },
  { code: 'Digit0', defaultKey: '0', shiftKey: '=', finger: 'right-pinky', row: 'number' },
  { code: 'Minus', defaultKey: '*', shiftKey: '?', finger: 'right-pinky', row: 'number' },
  { code: 'Equal', defaultKey: '-', shiftKey: '_', finger: 'right-pinky', row: 'number' },
  { code: 'Backspace', defaultKey: 'Backspace', label: '⌫', finger: 'right-pinky', row: 'number', width: 2 },

  // Top row
  { code: 'Tab', defaultKey: 'Tab', label: 'Tab ⇥', finger: 'left-pinky', row: 'top', width: 1.5 },
  { code: 'KeyQ', defaultKey: 'q', shiftKey: 'Q', finger: 'left-pinky', row: 'top' },
  { code: 'KeyW', defaultKey: 'w', shiftKey: 'W', finger: 'left-ring', row: 'top' },
  { code: 'KeyE', defaultKey: 'e', shiftKey: 'E', finger: 'left-middle', row: 'top' },
  { code: 'KeyR', defaultKey: 'r', shiftKey: 'R', finger: 'left-index', row: 'top' },
  { code: 'KeyT', defaultKey: 't', shiftKey: 'T', finger: 'left-index', row: 'top' },
  { code: 'KeyY', defaultKey: 'y', shiftKey: 'Y', finger: 'right-index', row: 'top' },
  { code: 'KeyU', defaultKey: 'u', shiftKey: 'U', finger: 'right-index', row: 'top' },
  { code: 'KeyI', defaultKey: 'ı', shiftKey: 'I', finger: 'right-middle', row: 'top' },
  { code: 'KeyO', defaultKey: 'o', shiftKey: 'O', finger: 'right-ring', row: 'top' },
  { code: 'KeyP', defaultKey: 'p', shiftKey: 'P', finger: 'right-pinky', row: 'top' },
  { code: 'BracketLeft', defaultKey: 'ğ', shiftKey: 'Ğ', finger: 'right-pinky', row: 'top' },
  { code: 'BracketRight', defaultKey: 'ü', shiftKey: 'Ü', finger: 'right-pinky', row: 'top' },
  { code: 'Backslash', defaultKey: ',', shiftKey: ';', finger: 'right-pinky', row: 'top', width: 1.5 },

  // Home row
  { code: 'CapsLock', defaultKey: 'CapsLock', label: 'Caps ⇪', finger: 'left-pinky', row: 'home', width: 1.75 },
  { code: 'KeyA', defaultKey: 'a', shiftKey: 'A', finger: 'left-pinky', row: 'home' },
  { code: 'KeyS', defaultKey: 's', shiftKey: 'S', finger: 'left-ring', row: 'home' },
  { code: 'KeyD', defaultKey: 'd', shiftKey: 'D', finger: 'left-middle', row: 'home' },
  { code: 'KeyF', defaultKey: 'f', shiftKey: 'F', finger: 'left-index', row: 'home' },
  { code: 'KeyG', defaultKey: 'g', shiftKey: 'G', finger: 'left-index', row: 'home' },
  { code: 'KeyH', defaultKey: 'h', shiftKey: 'H', finger: 'right-index', row: 'home' },
  { code: 'KeyJ', defaultKey: 'j', shiftKey: 'J', finger: 'right-index', row: 'home' },
  { code: 'KeyK', defaultKey: 'k', shiftKey: 'K', finger: 'right-middle', row: 'home' },
  { code: 'KeyL', defaultKey: 'l', shiftKey: 'L', finger: 'right-ring', row: 'home' },
  { code: 'Semicolon', defaultKey: 'ş', shiftKey: 'Ş', finger: 'right-pinky', row: 'home' },
  { code: 'Quote', defaultKey: 'i', shiftKey: 'İ', finger: 'right-pinky', row: 'home' },
  { code: 'Enter', defaultKey: 'Enter', label: 'Giriş ↵', finger: 'right-pinky', row: 'home', width: 2.25 },

  // Bottom row
  { code: 'ShiftLeft', defaultKey: 'Shift', label: 'Shift ⇧', finger: 'left-pinky', row: 'bottom', width: 2.25 },
  { code: 'KeyZ', defaultKey: 'z', shiftKey: 'Z', finger: 'left-pinky', row: 'bottom' },
  { code: 'KeyX', defaultKey: 'x', shiftKey: 'X', finger: 'left-ring', row: 'bottom' },
  { code: 'KeyC', defaultKey: 'c', shiftKey: 'C', finger: 'left-middle', row: 'bottom' },
  { code: 'KeyV', defaultKey: 'v', shiftKey: 'V', finger: 'left-index', row: 'bottom' },
  { code: 'KeyB', defaultKey: 'b', shiftKey: 'B', finger: 'left-index', row: 'bottom' },
  { code: 'KeyN', defaultKey: 'n', shiftKey: 'N', finger: 'right-index', row: 'bottom' },
  { code: 'KeyM', defaultKey: 'm', shiftKey: 'M', finger: 'right-index', row: 'bottom' },
  { code: 'Comma', defaultKey: 'ö', shiftKey: 'Ö', finger: 'right-middle', row: 'bottom' },
  { code: 'Period', defaultKey: 'ç', shiftKey: 'Ç', finger: 'right-ring', row: 'bottom' },
  { code: 'Slash', defaultKey: '.', shiftKey: ':', finger: 'right-pinky', row: 'bottom' },
  { code: 'ShiftRight', defaultKey: 'Shift', label: 'Shift ⇧', finger: 'right-pinky', row: 'bottom', width: 2.75 },

  // Space row
  { code: 'Space', defaultKey: ' ', label: 'Boşluk (Space)', finger: 'thumb', row: 'space', width: 6.25 },
];

// Turkish F Layout (TS 2117 Standard Turkish F)
export const TURKISH_F_KEYS: KeyDefinition[] = [
  // Number row
  { code: 'Backquote', defaultKey: '+', shiftKey: '*', finger: 'left-pinky', row: 'number' },
  { code: 'Digit1', defaultKey: '1', shiftKey: '!', finger: 'left-pinky', row: 'number' },
  { code: 'Digit2', defaultKey: '2', shiftKey: '"', finger: 'left-ring', row: 'number' },
  { code: 'Digit3', defaultKey: '3', shiftKey: '^', finger: 'left-middle', row: 'number' },
  { code: 'Digit4', defaultKey: '4', shiftKey: '$', finger: 'left-index', row: 'number' },
  { code: 'Digit5', defaultKey: '5', shiftKey: '%', finger: 'left-index', row: 'number' },
  { code: 'Digit6', defaultKey: '6', shiftKey: '&', finger: 'right-index', row: 'number' },
  { code: 'Digit7', defaultKey: '7', shiftKey: "'", finger: 'right-index', row: 'number' },
  { code: 'Digit8', defaultKey: '8', shiftKey: '(', finger: 'right-middle', row: 'number' },
  { code: 'Digit9', defaultKey: '9', shiftKey: ')', finger: 'right-ring', row: 'number' },
  { code: 'Digit0', defaultKey: '0', shiftKey: '=', finger: 'right-pinky', row: 'number' },
  { code: 'Minus', defaultKey: '/', shiftKey: '?', finger: 'right-pinky', row: 'number' },
  { code: 'Equal', defaultKey: '-', shiftKey: '_', finger: 'right-pinky', row: 'number' },
  { code: 'Backspace', defaultKey: 'Backspace', label: '⌫', finger: 'right-pinky', row: 'number', width: 2 },

  // Top row
  { code: 'Tab', defaultKey: 'Tab', label: 'Tab ⇥', finger: 'left-pinky', row: 'top', width: 1.5 },
  { code: 'KeyQ', defaultKey: 'f', shiftKey: 'F', finger: 'left-pinky', row: 'top' },
  { code: 'KeyW', defaultKey: 'g', shiftKey: 'G', finger: 'left-ring', row: 'top' },
  { code: 'KeyE', defaultKey: 'ğ', shiftKey: 'Ğ', finger: 'left-middle', row: 'top' },
  { code: 'KeyR', defaultKey: 'ı', shiftKey: 'I', finger: 'left-index', row: 'top' },
  { code: 'KeyT', defaultKey: 'o', shiftKey: 'O', finger: 'left-index', row: 'top' },
  { code: 'KeyY', defaultKey: 'd', shiftKey: 'D', finger: 'right-index', row: 'top' },
  { code: 'KeyU', defaultKey: 'r', shiftKey: 'R', finger: 'right-index', row: 'top' },
  { code: 'KeyI', defaultKey: 'n', shiftKey: 'N', finger: 'right-middle', row: 'top' },
  { code: 'KeyO', defaultKey: 'h', shiftKey: 'H', finger: 'right-ring', row: 'top' },
  { code: 'KeyP', defaultKey: 'p', shiftKey: 'P', finger: 'right-pinky', row: 'top' },
  { code: 'BracketLeft', defaultKey: 'q', shiftKey: 'Q', finger: 'right-pinky', row: 'top' },
  { code: 'BracketRight', defaultKey: 'w', shiftKey: 'W', finger: 'right-pinky', row: 'top' },
  { code: 'Backslash', defaultKey: 'x', shiftKey: 'X', finger: 'right-pinky', row: 'top', width: 1.5 },

  // Home row
  { code: 'CapsLock', defaultKey: 'CapsLock', label: 'Caps ⇪', finger: 'left-pinky', row: 'home', width: 1.75 },
  { code: 'KeyA', defaultKey: 'u', shiftKey: 'U', finger: 'left-pinky', row: 'home' },
  { code: 'KeyS', defaultKey: 'i', shiftKey: 'İ', finger: 'left-ring', row: 'home' },
  { code: 'KeyD', defaultKey: 'e', shiftKey: 'E', finger: 'left-middle', row: 'home' },
  { code: 'KeyF', defaultKey: 'a', shiftKey: 'A', finger: 'left-index', row: 'home' },
  { code: 'KeyG', defaultKey: 'ü', shiftKey: 'Ü', finger: 'left-index', row: 'home' },
  { code: 'KeyH', defaultKey: 't', shiftKey: 'T', finger: 'right-index', row: 'home' },
  { code: 'KeyJ', defaultKey: 'k', shiftKey: 'K', finger: 'right-index', row: 'home' },
  { code: 'KeyK', defaultKey: 'm', shiftKey: 'M', finger: 'right-middle', row: 'home' },
  { code: 'KeyL', defaultKey: 'l', shiftKey: 'L', finger: 'right-ring', row: 'home' },
  { code: 'Semicolon', defaultKey: 'y', shiftKey: 'Y', finger: 'right-pinky', row: 'home' },
  { code: 'Quote', defaultKey: 'ş', shiftKey: 'Ş', finger: 'right-pinky', row: 'home' },
  { code: 'Enter', defaultKey: 'Enter', label: 'Giriş ↵', finger: 'right-pinky', row: 'home', width: 2.25 },

  // Bottom row
  { code: 'ShiftLeft', defaultKey: 'Shift', label: 'Shift ⇧', finger: 'left-pinky', row: 'bottom', width: 2.25 },
  { code: 'KeyZ', defaultKey: 'j', shiftKey: 'J', finger: 'left-pinky', row: 'bottom' },
  { code: 'KeyX', defaultKey: 'ö', shiftKey: 'Ö', finger: 'left-ring', row: 'bottom' },
  { code: 'KeyC', defaultKey: 'v', shiftKey: 'V', finger: 'left-middle', row: 'bottom' },
  { code: 'KeyV', defaultKey: 'c', shiftKey: 'C', finger: 'left-index', row: 'bottom' },
  { code: 'KeyB', defaultKey: 'ç', shiftKey: 'Ç', finger: 'left-index', row: 'bottom' },
  { code: 'KeyN', defaultKey: 'z', shiftKey: 'Z', finger: 'right-index', row: 'bottom' },
  { code: 'KeyM', defaultKey: 's', shiftKey: 'S', finger: 'right-index', row: 'bottom' },
  { code: 'Comma', defaultKey: 'b', shiftKey: 'B', finger: 'right-middle', row: 'bottom' },
  { code: 'Period', defaultKey: '.', shiftKey: ':', finger: 'right-ring', row: 'bottom' },
  { code: 'Slash', defaultKey: ',', shiftKey: ';', finger: 'right-pinky', row: 'bottom' },
  { code: 'ShiftRight', defaultKey: 'Shift', label: 'Shift ⇧', finger: 'right-pinky', row: 'bottom', width: 2.75 },

  // Space row
  { code: 'Space', defaultKey: ' ', label: 'Boşluk (Space)', finger: 'thumb', row: 'space', width: 6.25 },
];

// US English QWERTY
export const EN_QWERTY_KEYS: KeyDefinition[] = [
  // Number row
  { code: 'Backquote', defaultKey: '`', shiftKey: '~', finger: 'left-pinky', row: 'number' },
  { code: 'Digit1', defaultKey: '1', shiftKey: '!', finger: 'left-pinky', row: 'number' },
  { code: 'Digit2', defaultKey: '2', shiftKey: '@', finger: 'left-ring', row: 'number' },
  { code: 'Digit3', defaultKey: '3', shiftKey: '#', finger: 'left-middle', row: 'number' },
  { code: 'Digit4', defaultKey: '4', shiftKey: '$', finger: 'left-index', row: 'number' },
  { code: 'Digit5', defaultKey: '5', shiftKey: '%', finger: 'left-index', row: 'number' },
  { code: 'Digit6', defaultKey: '6', shiftKey: '^', finger: 'right-index', row: 'number' },
  { code: 'Digit7', defaultKey: '7', shiftKey: '&', finger: 'right-index', row: 'number' },
  { code: 'Digit8', defaultKey: '8', shiftKey: '*', finger: 'right-middle', row: 'number' },
  { code: 'Digit9', defaultKey: '9', shiftKey: '(', finger: 'right-ring', row: 'number' },
  { code: 'Digit0', defaultKey: '0', shiftKey: ')', finger: 'right-pinky', row: 'number' },
  { code: 'Minus', defaultKey: '-', shiftKey: '_', finger: 'right-pinky', row: 'number' },
  { code: 'Equal', defaultKey: '=', shiftKey: '+', finger: 'right-pinky', row: 'number' },
  { code: 'Backspace', defaultKey: 'Backspace', label: '⌫', finger: 'right-pinky', row: 'number', width: 2 },

  // Top row
  { code: 'Tab', defaultKey: 'Tab', label: 'Tab ⇥', finger: 'left-pinky', row: 'top', width: 1.5 },
  { code: 'KeyQ', defaultKey: 'q', shiftKey: 'Q', finger: 'left-pinky', row: 'top' },
  { code: 'KeyW', defaultKey: 'w', shiftKey: 'W', finger: 'left-ring', row: 'top' },
  { code: 'KeyE', defaultKey: 'e', shiftKey: 'E', finger: 'left-middle', row: 'top' },
  { code: 'KeyR', defaultKey: 'r', shiftKey: 'R', finger: 'left-index', row: 'top' },
  { code: 'KeyT', defaultKey: 't', shiftKey: 'T', finger: 'left-index', row: 'top' },
  { code: 'KeyY', defaultKey: 'y', shiftKey: 'Y', finger: 'right-index', row: 'top' },
  { code: 'KeyU', defaultKey: 'u', shiftKey: 'U', finger: 'right-index', row: 'top' },
  { code: 'KeyI', defaultKey: 'i', shiftKey: 'I', finger: 'right-middle', row: 'top' },
  { code: 'KeyO', defaultKey: 'o', shiftKey: 'O', finger: 'right-ring', row: 'top' },
  { code: 'KeyP', defaultKey: 'p', shiftKey: 'P', finger: 'right-pinky', row: 'top' },
  { code: 'BracketLeft', defaultKey: '[', shiftKey: '{', finger: 'right-pinky', row: 'top' },
  { code: 'BracketRight', defaultKey: ']', shiftKey: '}', finger: 'right-pinky', row: 'top' },
  { code: 'Backslash', defaultKey: '\\', shiftKey: '|', finger: 'right-pinky', row: 'top', width: 1.5 },

  // Home row
  { code: 'CapsLock', defaultKey: 'CapsLock', label: 'Caps ⇪', finger: 'left-pinky', row: 'home', width: 1.75 },
  { code: 'KeyA', defaultKey: 'a', shiftKey: 'A', finger: 'left-pinky', row: 'home' },
  { code: 'KeyS', defaultKey: 's', shiftKey: 'S', finger: 'left-ring', row: 'home' },
  { code: 'KeyD', defaultKey: 'd', shiftKey: 'D', finger: 'left-middle', row: 'home' },
  { code: 'KeyF', defaultKey: 'f', shiftKey: 'F', finger: 'left-index', row: 'home' },
  { code: 'KeyG', defaultKey: 'g', shiftKey: 'G', finger: 'left-index', row: 'home' },
  { code: 'KeyH', defaultKey: 'h', shiftKey: 'H', finger: 'right-index', row: 'home' },
  { code: 'KeyJ', defaultKey: 'j', shiftKey: 'J', finger: 'right-index', row: 'home' },
  { code: 'KeyK', defaultKey: 'k', shiftKey: 'K', finger: 'right-middle', row: 'home' },
  { code: 'KeyL', defaultKey: 'l', shiftKey: 'L', finger: 'right-ring', row: 'home' },
  { code: 'Semicolon', defaultKey: ';', shiftKey: ':', finger: 'right-pinky', row: 'home' },
  { code: 'Quote', defaultKey: "'", shiftKey: '"', finger: 'right-pinky', row: 'home' },
  { code: 'Enter', defaultKey: 'Enter', label: 'Enter ↵', finger: 'right-pinky', row: 'home', width: 2.25 },

  // Bottom row
  { code: 'ShiftLeft', defaultKey: 'Shift', label: 'Shift ⇧', finger: 'left-pinky', row: 'bottom', width: 2.25 },
  { code: 'KeyZ', defaultKey: 'z', shiftKey: 'Z', finger: 'left-pinky', row: 'bottom' },
  { code: 'KeyX', defaultKey: 'x', shiftKey: 'X', finger: 'left-ring', row: 'bottom' },
  { code: 'KeyC', defaultKey: 'c', shiftKey: 'C', finger: 'left-middle', row: 'bottom' },
  { code: 'KeyV', defaultKey: 'v', shiftKey: 'V', finger: 'left-index', row: 'bottom' },
  { code: 'KeyB', defaultKey: 'b', shiftKey: 'B', finger: 'left-index', row: 'bottom' },
  { code: 'KeyN', defaultKey: 'n', shiftKey: 'N', finger: 'right-index', row: 'bottom' },
  { code: 'KeyM', defaultKey: 'm', shiftKey: 'M', finger: 'right-index', row: 'bottom' },
  { code: 'Comma', defaultKey: ',', shiftKey: '<', finger: 'right-middle', row: 'bottom' },
  { code: 'Period', defaultKey: '.', shiftKey: '>', finger: 'right-ring', row: 'bottom' },
  { code: 'Slash', defaultKey: '/', shiftKey: '?', finger: 'right-pinky', row: 'bottom' },
  { code: 'ShiftRight', defaultKey: 'Shift', label: 'Shift ⇧', finger: 'right-pinky', row: 'bottom', width: 2.75 },

  // Space row
  { code: 'Space', defaultKey: ' ', label: 'Space', finger: 'thumb', row: 'space', width: 6.25 },
];

export const KEYBOARD_LAYOUTS: Record<KeyboardLayoutName, KeyboardLayout> = {
  'tr-q': {
    name: 'tr-q',
    label: 'Türkçe Q Klavye',
    shortLabel: 'Türkçe Q',
    description: 'Türkiye genelinde en yaygın kullanılan standart Q düzeni.',
    keys: TURKISH_Q_KEYS,
  },
  'tr-f': {
    name: 'tr-f',
    label: 'Türkçe F Klavye',
    shortLabel: 'Türkçe F',
    description: 'Türkçe harf frekanslarına göre bilimsel olarak optimize edilmiş milli klavye düzeni.',
    keys: TURKISH_F_KEYS,
  },
  'en-qwerty': {
    name: 'en-qwerty',
    label: 'İngilizce QWERTY',
    shortLabel: 'QWERTY',
    description: 'Uluslararası standart İngilizce QWERTY klavye düzeni.',
    keys: EN_QWERTY_KEYS,
  },
};

/**
 * Finds the key definition that outputs a given character in the specified layout.
 */
export function findKeyForChar(
  char: string,
  layoutName: KeyboardLayoutName
): KeyDefinition | undefined {
  if (!char) return undefined;
  const layout = KEYBOARD_LAYOUTS[layoutName];
  if (!layout) return undefined;

  const lower = char.toLocaleLowerCase('tr-TR');
  const upper = char.toLocaleUpperCase('tr-TR');

  return layout.keys.find(
    (k) =>
      k.defaultKey === char ||
      k.shiftKey === char ||
      k.defaultKey === lower ||
      k.shiftKey === upper
  );
}
