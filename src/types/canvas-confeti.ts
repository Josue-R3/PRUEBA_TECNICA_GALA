// src/types/canvas-confetti.d.ts
declare module 'canvas-confetti' {
    interface ConfettiOptions {
      particleCount?: number;
      angle?: number;
      spread?: number;
      origin?: { x?: number; y?: number };
      colors?: string[];
      zIndex?: number;
    }
  
    type Confetti = (options?: ConfettiOptions) => void;
  
    const confetti: Confetti;
  
    export default confetti;
  }
  