/**
 * Common English word list for English typing tests.
 */
export const ENGLISH_COMMON_WORDS: string[] = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'keyboard', 'typing', 'speed', 'practice', 'focus', 'accuracy', 'minute', 'word', 'flow', 'letter',
  'mind', 'habit', 'finger', 'touch', 'smooth', 'screen', 'light', 'clean', 'quick', 'sharp',
  'great', 'learn', 'grow', 'energy', 'future', 'moment', 'today', 'create', 'system', 'skill',
  'simple', 'motion', 'rhythm', 'balance', 'master', 'steady', 'stream', 'listen', 'effort', 'result',
  'travel', 'world', 'nature', 'forest', 'ocean', 'river', 'sky', 'sun', 'moon', 'stars',
  'bright', 'clear', 'calm', 'quiet', 'peace', 'courage', 'patience', 'wonder', 'dream', 'memory',
  'story', 'voice', 'sound', 'music', 'color', 'space', 'action', 'change', 'power', 'strong'
];

export interface EnglishWordGenerationOptions {
  punctuation?: boolean;
  numbers?: boolean;
}

/**
 * Returns a randomized list of English words of given count with optional punctuation and numbers.
 */
export function getRandomEnglishWords(
  count = 50,
  options?: EnglishWordGenerationOptions
): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    if (options?.numbers && Math.random() < 0.15) {
      const num = Math.floor(Math.random() * 999) + 1;
      result.push(num.toString());
      continue;
    }

    const randomIndex = Math.floor(Math.random() * ENGLISH_COMMON_WORDS.length);
    let word = ENGLISH_COMMON_WORDS[randomIndex];

    if (options?.punctuation) {
      const pRand = Math.random();
      if (pRand < 0.08) {
        word = word + ',';
      } else if (pRand < 0.16) {
        word = word + '.';
      } else if (pRand < 0.20) {
        word = `"${word}"`;
      } else if (pRand < 0.23) {
        word = word + '?';
      } else if (pRand < 0.25) {
        word = word + '!';
      }
    }

    result.push(word);
  }
  return result;
}
