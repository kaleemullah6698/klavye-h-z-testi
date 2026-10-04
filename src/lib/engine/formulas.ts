/**
 * Typing Engine Metric Formulas
 * Evaluates Net WPM, Raw WPM, Accuracy, and Consistency.
 */

/**
 * Standard competitive Net WPM formula:
 * (net correct characters / 5) / elapsed time in minutes
 * Uncorrected errors penalize net WPM.
 */
export function calculateNetWpm(
  correctChars: number,
  uncorrectedErrors: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  const elapsedMinutes = elapsedSeconds / 60;
  const netChars = Math.max(0, correctChars - uncorrectedErrors * 5);
  const words = netChars / 5;
  const wpm = words / elapsedMinutes;
  return Math.max(0, Math.round(wpm));
}

/**
 * Raw WPM formula:
 * all typed characters / 5 / elapsed minutes
 */
export function calculateRawWpm(
  totalCharsTyped: number,
  elapsedSeconds: number
): number {
  if (elapsedSeconds <= 0) return 0;
  const elapsedMinutes = elapsedSeconds / 60;
  const words = totalCharsTyped / 5;
  const rawWpm = words / elapsedMinutes;
  return Math.max(0, Math.round(rawWpm));
}

/**
 * Accuracy percentage formula:
 * (correct keystrokes / total keystrokes) * 100
 */
export function calculateAccuracy(
  correctKeystrokes: number,
  totalKeystrokes: number
): number {
  if (totalKeystrokes <= 0) return 100;
  const accuracy = (correctKeystrokes / totalKeystrokes) * 100;
  return Math.min(100, Math.max(0, Math.round(accuracy * 10) / 10));
}

/**
 * Consistency calculation based on Inter-Keystroke Intervals (IKI):
 * 100 - (coefficient of variation of inter-keystroke intervals * 100)
 */
export function calculateConsistency(ikis: number[]): number {
  if (!ikis || ikis.length < 5) return 100;

  // Filter out any anomalous pauses (> 2000ms e.g., reading pauses) to avoid skewing consistency artificially
  const validIkis = ikis.filter((iki) => iki > 10 && iki < 2000);
  if (validIkis.length < 5) return 100;

  const sum = validIkis.reduce((acc, val) => acc + val, 0);
  const mean = sum / validIkis.length;

  if (mean <= 0) return 100;

  const variance =
    validIkis.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    validIkis.length;
  const stdDev = Math.sqrt(variance);
  const cov = stdDev / mean; // Coefficient of variation

  // Higher coefficient of variation = less consistent typing
  const consistency = Math.round((1 - Math.min(1, cov)) * 100);
  return Math.max(0, Math.min(100, consistency));
}
