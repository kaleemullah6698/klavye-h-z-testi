/**
 * Turkish language text helpers and casing rules.
 * Turkish has unique dotted and dotless 'i' rules:
 * - Lowercase 'i' -> Uppercase 'İ' (U+0130)
 * - Lowercase 'ı' (U+0131) -> Uppercase 'I' (U+0049)
 * - Uppercase 'İ' (U+0130) -> Lowercase 'i' (U+0069)
 * - Uppercase 'I' (U+0049) -> Lowercase 'ı' (U+0131)
 */

export function toUpperTurkish(str: string): string {
  if (!str) return '';
  return str
    .replace(/i/g, 'İ')
    .replace(/ı/g, 'I')
    .toLocaleUpperCase('tr-TR');
}

export function toLowerTurkish(str: string): string {
  if (!str) return '';
  return str
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr-TR');
}

/**
 * Checks if two characters match under Turkish character rules.
 * The typing engine expects exact matching for punctuation and casing in tests,
 * but case-insensitive comparisons can use this helper.
 */
export function areCharactersEqual(
  expected: string,
  typed: string,
  caseSensitive = true
): boolean {
  if (expected === typed) return true;
  if (!caseSensitive) {
    return toLowerTurkish(expected) === toLowerTurkish(typed);
  }
  return false;
}

/**
 * Normalizes input text by replacing exotic whitespace and quote marks with standard ascii forms.
 */
export function normalizeTypingText(text: string): string {
  return text
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
