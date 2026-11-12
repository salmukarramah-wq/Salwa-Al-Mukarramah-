/**
 * Audio Synthesizer and Voice Narration for "Jelajah Sejarah Sulawesi Selatan".
 * Features:
 * 1. Traditional South Sulawesi Folk Music Synthesizer (Anging Mammiri & Gandrang Pakarena)
 * 2. Text-to-Speech (TTS) voice narration for educational materials in Indonesian (id-ID)
 * 3. Interactive UI Sound Effects
 */

export type BgmTheme = 'anging_mammiri' | 'gandrang_pakarena' | 'marimba_santai';

interface MelodicNote {
  freq: number;
  duration: number; // in beats/seconds
}

// Melody of "Anging Mammiri" (Lagu Daerah Sulawesi Selatan)
// Transcribed in C-Major/Pentatonic with authentic phrase contours
const ANGING_MAMMIRI_NOTES: MelodicNote[] = [
  // "Ang-ing mam-mi-ri ku-pa-sang"
  { freq: 329.63, duration: 0.6 }, // E4 (Ang-)
  { freq: 392.00, duration: 0.6 }, // G4 (-ing)
  { freq: 440.00, duration: 0.9 }, // A4 (mam-)
  { freq: 392.00, duration: 0.5 }, // G4 (-mi-)
  { freq: 329.63, duration: 0.9 }, // E4 (-ri)
  { freq: 293.66, duration: 0.5 }, // D4 (ku-)
  { freq: 261.63, duration: 0.9 }, // C4 (-pa-)
  { freq: 293.66, duration: 0.5 }, // D4 (-sang)
  { freq: 329.63, duration: 1.2 }, // E4

  // "Pi-tu-ju-i ton-tong-an-na"
  { freq: 392.00, duration: 0.6 }, // G4 (Pi-)
  { freq: 440.00, duration: 0.6 }, // A4 (-tu-)
  { freq: 523.25, duration: 0.9 }, // C5 (-ju-)
  { freq: 440.00, duration: 0.5 }, // A4 (-i)
  { freq: 392.00, duration: 0.9 }, // G4 (ton-)
  { freq: 329.63, duration: 0.5 }, // E4 (-tong-)
  { freq: 392.00, duration: 1.2 }, // G4 (-an-na)

  // "Tu-sar-ro ma-ra-eng"
  { freq: 440.00, duration: 0.6 }, // A4 (Tu-)
  { freq: 392.00, duration: 0.6 }, // G4 (-sar-)
  { freq: 329.63, duration: 0.9 }, // E4 (-ro)
  { freq: 293.66, duration: 0.6 }, // D4 (ma-)
  { freq: 261.63, duration: 1.4 }, // C4 (-ra-eng)

  // Short pause/rest
  { freq: 0, duration: 0.8 },
];

// Rhythmic Gandrang Bulo & Tari Pakarena traditional drum/melody pattern
const PAKARENA_NOTES: MelodicNote[] = [
  { freq: 440.00, duration: 0.35 }, // A4
  { freq: 440.00, duration: 0.2 },
  { freq: 523.25, duration: 0.4 },  // C5
  { freq: 392.00, duration: 0.35 }, // G4
  { freq: 440.00, duration: 0.6 },
  { freq: 329.63, duration: 0.35 }, // E4
  { freq: 392.00, duration: 0.35 }, // G4
  { freq: 293.66, duration: 0.5 },  // D4
  { freq: 261.63, duration: 0.7 },  // C4
  { freq: 0, duration: 0.4 },
];

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentBgm: BgmTheme = 'anging_mammiri';
  private isBgmPlaying: boolean = false;
  private bgmTimeoutId: number | null = null;
  private currentNoteIndex: number = 0;

  // Speech Synthesis state
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlySpeaking: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      if (this.isBgmPlaying) this.stopBGM();
      this.stopSpeaking();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setBgmTheme(theme: BgmTheme) {
    this.currentBgm = theme;
    this.currentNoteIndex = 0;
    if (this.isBgmPlaying) {
      this.stopBGM();
      this.startBGM();
    }
  }

  public getBgmTheme(): BgmTheme {
    return this.currentBgm;
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying;
  }

  public toggleBGM(): boolean {
    if (this.isBgmPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  public startBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.initCtx();
    this.isBgmPlaying = true;
    this.playNextBgmNote();
  }

  private playNextBgmNote() {
    if (!this.isBgmPlaying || this.isMuted) return;
    this.initCtx();

    const notes =
      this.currentBgm === 'anging_mammiri'
        ? ANGING_MAMMIRI_NOTES
        : this.currentBgm === 'gandrang_pakarena'
        ? PAKARENA_NOTES
        : [
            { freq: 293.66, duration: 0.6 },
            { freq: 349.23, duration: 0.6 },
            { freq: 392.00, duration: 0.6 },
            { freq: 440.00, duration: 0.8 },
            { freq: 523.25, duration: 0.8 },
          ];

    const note = notes[this.currentNoteIndex % notes.length];
    const durationMs = note.duration * 1000;

    if (note.freq > 0 && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        // Warm kecapi/suling timbre using combined harmonics
        const osc = this.ctx.createOscillator();
        const oscHarmonic = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Kecapi / Suling soft flute timbre
        osc.type = this.currentBgm === 'gandrang_pakarena' ? 'triangle' : 'sine';
        oscHarmonic.type = 'sine';

        osc.frequency.setValueAtTime(note.freq, now);
        oscHarmonic.frequency.setValueAtTime(note.freq * 2, now); // 2nd harmonic shimmer

        const volume = this.currentBgm === 'gandrang_pakarena' ? 0.05 : 0.04;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.duration * 0.95);

        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        oscHarmonic.start(now);
        osc.stop(now + note.duration);
        oscHarmonic.stop(now + note.duration);
      } catch {
        // Ignore
      }
    }

    this.currentNoteIndex++;
    this.bgmTimeoutId = window.setTimeout(() => {
      this.playNextBgmNote();
    }, durationMs);
  }

  public stopBGM() {
    if (this.bgmTimeoutId !== null) {
      clearTimeout(this.bgmTimeoutId);
      this.bgmTimeoutId = null;
    }
    this.isBgmPlaying = false;
  }

  // ================= TEXT-TO-SPEECH (TTS) NARRATION =================

  public speakText(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ) {
    if (typeof window === 'undefined') return;

    // Stop any ongoing speech
    this.stopSpeaking();

    // Play subtle opening chime
    this.playClick();

    if (!('speechSynthesis' in window)) {
      // Browser fallback: simulated chime feedback
      this.playCorrect();
      if (onEnd) setTimeout(onEnd, 2000);
      return;
    }

    try {
      const cleanText = text
        .replace(/[#*•_\-💡⭐🦅🌟]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95; // Clear natural storytelling pace for elementary students
      utterance.pitch = 1.05; // Friendly warm tone

      // Try to pick an Indonesian voice if available
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(
        (v) => v.lang.startsWith('id') || v.lang.includes('ID') || v.name.toLowerCase().includes('indonesia')
      );
      if (idVoice) {
        utterance.voice = idVoice;
      }

      utterance.onstart = () => {
        this.isCurrentlySpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isCurrentlySpeaking = false;
        this.activeUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isCurrentlySpeaking = false;
        this.activeUtterance = null;
        if (onError) onError();
      };

      this.activeUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isCurrentlySpeaking = false;
      if (onError) onError();
    }
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isCurrentlySpeaking = false;
    this.activeUtterance = null;
  }

  public isSpeaking(): boolean {
    return this.isCurrentlySpeaking;
  }

  // ================= SFX CHIMES =================

  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  public playBadgeUnlock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major
      arpeggio.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.18, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } catch {
      // Ignore
    }
  }

  public playVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [1046.5, 1318.51, 1567.98],
      ];
      chords.forEach((chord, step) => {
        chord.forEach((freq) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + step * 0.22);
          gain.gain.setValueAtTime(0.1, now + step * 0.22);
          gain.gain.exponentialRampToValueAtTime(0.001, now + step * 0.22 + 0.45);
          osc.connect(gain);
          gain.connect(this.ctx!.destination);
          osc.start(now + step * 0.22);
          osc.stop(now + step * 0.22 + 0.45);
        });
      });
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundController();
