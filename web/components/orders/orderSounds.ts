// Notification sounds for the staff order feed, synthesized with Web Audio (no audio files).
// Browsers keep audio locked until the user interacts with the page, so the context is resumed on
// the first click or key press; until then a sound is silently skipped (the toast still shows).

export type OrderSound = "new" | "cancelled";

// [frequency Hz, start offset s]: new orders rise (E6 → A6), cancellations fall (A5 → E5).
const NOTES: Record<OrderSound, { type: OscillatorType; notes: [number, number][] }> = {
  new: { type: "sine", notes: [[1318.5, 0], [1760, 0.14]] },
  cancelled: { type: "triangle", notes: [[880, 0], [659.3, 0.18]] },
};
const NOTE_SECONDS = 0.22;
const VOLUME = 0.25;

let context: AudioContext | undefined;

const getContext = () => {
  if (typeof window === "undefined" || !("AudioContext" in window)) return undefined;
  context ??= new AudioContext();
  return context;
};

// Call once on mount; resumes the audio context on the first interaction with the page.
export const unlockOrderSounds = () => {
  const resume = () => {
    void getContext()?.resume();
  };
  const options = { capture: true, once: true } as const;
  window.addEventListener("pointerdown", resume, options);
  window.addEventListener("keydown", resume, options);
  return () => {
    window.removeEventListener("pointerdown", resume, options);
    window.removeEventListener("keydown", resume, options);
  };
};

export const playOrderSound = (sound: OrderSound) => {
  const audio = getContext();
  if (!audio || audio.state !== "running") return;

  const { type, notes } = NOTES[sound];
  for (const [frequency, offset] of notes) {
    const start = audio.currentTime + offset;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    // Short attack and exponential decay: a soft "ding" rather than a beep.
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(VOLUME, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + NOTE_SECONDS);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start);
    oscillator.stop(start + NOTE_SECONDS);
  }
};

// The mute switch, per browser, read through useSyncExternalStore. Kept in memory as well, so it
// still works (until a reload) where storage throws.
const STORAGE_KEY = "ps-order-sounds";
const listeners = new Set<() => void>();
let enabled: boolean | undefined;

export const subscribeSoundSetting = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const isSoundEnabled = () => {
  if (enabled === undefined) {
    try {
      enabled = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
};

// On by default; the server can't know this browser's choice.
export const isSoundEnabledOnServer = () => true;

export const setSoundEnabled = (value: boolean) => {
  enabled = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {
    // Storage blocked: the in-memory value still applies.
  }
  for (const listener of listeners) listener();
};

// Turning sound on is itself a click, so the context can resume right away for the preview.
export const enableAndPreview = async () => {
  setSoundEnabled(true);
  await getContext()?.resume();
  playOrderSound("new");
};
