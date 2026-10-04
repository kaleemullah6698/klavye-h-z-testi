import { WpmSample } from '../../types';

export interface GhostRacerState {
  ghostWpm: number;
  ghostProgressPercent: number; // 0 - 100
  userProgressPercent: number; // 0 - 100
  wordsAhead: number; // positive = user ahead, negative = ghost ahead
}

/**
 * Computes ghost car position and user position comparison in real time.
 */
export function calculateGhostRaceState(
  ghostTimeline: WpmSample[],
  elapsedSeconds: number,
  totalDurationSeconds: number,
  userTypedChars: number,
  targetCharsTotal: number
): GhostRacerState {
  if (!ghostTimeline || ghostTimeline.length === 0 || totalDurationSeconds <= 0) {
    const userPct = targetCharsTotal > 0 ? (userTypedChars / targetCharsTotal) * 100 : 0;
    return {
      ghostWpm: 0,
      ghostProgressPercent: (elapsedSeconds / Math.max(1, totalDurationSeconds)) * 100,
      userProgressPercent: Math.min(100, userPct),
      wordsAhead: 0,
    };
  }

  // Find corresponding sample in ghost timeline
  const currentSec = Math.floor(elapsedSeconds);
  let activeSample = ghostTimeline[0];

  for (const sample of ghostTimeline) {
    if (sample.time <= currentSec) {
      activeSample = sample;
    } else {
      break;
    }
  }

  // Ghost progress based on timeline or time ratio
  const ghostPct = Math.min(100, (elapsedSeconds / totalDurationSeconds) * 100);
  const userPct = targetCharsTotal > 0 ? Math.min(100, (userTypedChars / targetCharsTotal) * 100) : 0;

  // Approximate words difference
  const userWords = userTypedChars / 5;
  const ghostWords = (activeSample.wpm / 60) * elapsedSeconds;
  const wordsAhead = Math.round((userWords - ghostWords) * 10) / 10;

  return {
    ghostWpm: activeSample.wpm,
    ghostProgressPercent: ghostPct,
    userProgressPercent: userPct,
    wordsAhead,
  };
}
