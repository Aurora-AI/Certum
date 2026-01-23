import { useState, useEffect } from 'react';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

interface ScrambleOptions {
  duration?: number;
  delay?: number;
  speed?: number;
}

export const useScrambleText = (text: string, options: ScrambleOptions = {}) => {
  const [displayText, setDisplayText] = useState('');
  const { delay = 0, speed = 30 } = options;

  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    // Start empty to prevent hydration mismatch if possible, or just scramble immediately
    // For this specific hook usage, we initiate scramble after delay
    
    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, speed);
    };

    const timeout = setTimeout(startScramble, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, speed]);

  return displayText;
};