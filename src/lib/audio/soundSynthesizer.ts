import { SoundType } from '../../types';

class SoundSynthesizer {
  private audioCtx: AudioContext | null = null;
  private isMuted = false;
  private volume = 0.5;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public playKeySound(type: SoundType) {
    if (this.isMuted || type === 'off') return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    // Add slight random pitch jitter for realistic physical key feel
    const pitchJitter = 0.95 + Math.random() * 0.1;

    switch (type) {
      case 'mechanical': {
        // Cherry MX Blue style: crisp dual-impulse click
        // First impulse (tactile click)
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1800 * pitchJitter, now);
        osc1.frequency.exponentialRampToValueAtTime(300, now + 0.02);

        gainNode.gain.setValueAtTime(0.25 * this.volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc1.connect(gainNode);
        osc1.start(now);
        osc1.stop(now + 0.035);

        // Second low bottom-out impulse
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(180 * pitchJitter, now + 0.008);
        osc2.frequency.exponentialRampToValueAtTime(60, now + 0.04);

        const gainNode2 = ctx.createGain();
        gainNode2.connect(ctx.destination);
        gainNode2.gain.setValueAtTime(0.2 * this.volume, now + 0.008);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc2.connect(gainNode2);
        osc2.start(now + 0.008);
        osc2.stop(now + 0.05);
        break;
      }

      case 'thock': {
        // Lubricated Holy Panda / Linear switch: deep low resonant thock
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

        // Filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);

        osc.connect(filter);
        filter.connect(gainNode);

        gainNode.gain.setValueAtTime(0.35 * this.volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'typewriter': {
        // Vintage typewriter metallic strike
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(850 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

        // High pass for metallic snap
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.Q.setValueAtTime(3, now);

        osc.connect(filter);
        filter.connect(gainNode);

        gainNode.gain.setValueAtTime(0.3 * this.volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'beep': {
        // Subtle soft retro terminal beep
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(750, now);

        gainNode.gain.setValueAtTime(0.15 * this.volume, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
    }
  }

  public playErrorSound() {
    if (this.isMuted) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.08);

    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.08);
  }
}

export const soundSynthesizer = new SoundSynthesizer();
