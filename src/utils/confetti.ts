// src/utils/confetti.ts
import confetti from 'canvas-confetti';

export const launchConfetti = () => {
  const end = Date.now() + 1 * 1000; // Duración ajustada a 3 segundos

  // Define los colores del confeti
  const colors = ['#ffffff', '#1A1112', '#FEC300']; // Blanco y amarillo

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
};
