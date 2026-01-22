import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&X_-$+=<>?';

interface ScrambleOptions {
  duration?: number;
  delay?: number;
  speed?: number;
  active?: boolean;
}

export const useScrambleText = (
  finalText: string,
  { duration = 1.5, delay = 0, speed = 50, active = true }: ScrambleOptions = {},
) => {
  const [displayText, setDisplayText] = useState(() =>
    finalText.replace(/[^\s]/g, ' '),
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);

  const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!active) {
      setDisplayText(finalText.replace(/[^\s]/g, ' '));
      return;
    }

    setDisplayText(
      finalText
        .split('')
        .map((char) => (char === ' ' ? ' ' : randomChar()))
        .join(''),
    );

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      const totalTime = duration * 1000;

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsed / totalTime, 1);
        const charsToReveal = Math.floor(progress * finalText.length);

        const next = finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < charsToReveal) return char;
            return randomChar();
          })
          .join('');

        setDisplayText(next);

        if (progress === 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, speed);
    }, delay * 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [finalText, duration, delay, speed, active]);

  return displayText;
};
