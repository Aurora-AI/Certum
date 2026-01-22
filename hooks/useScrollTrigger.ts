import { useLayoutEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollTriggerOptions {
  trigger?: RefObject<HTMLElement> | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onUpdate?: (self: ScrollTrigger) => void;
  onEnter?: (self: ScrollTrigger) => void;
  onLeave?: (self: ScrollTrigger) => void;
}

export function useScrollTrigger(
  animation: (ctx: gsap.Context) => void,
  options: UseScrollTriggerOptions = {}
) {
  const scopeRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animation(ctx);
    }, scopeRef);

    return () => ctx.revert();
  }, [animation]);

  return scopeRef;
}

// Parallax hook
export function useParallax(
  elementRef: RefObject<HTMLElement>,
  options: { speed?: number; start?: string; end?: string } = {}
) {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options;

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const tween = gsap.to(element, {
      yPercent: 50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [elementRef, speed, start, end]);
}

// Reveal animation hook
export function useRevealAnimation(
  triggerRef: RefObject<HTMLElement>,
  options: { stagger?: number; delay?: number } = {}
) {
  const { stagger = 0.1, delay = 0 } = options;

  useLayoutEffect(() => {
    if (!triggerRef.current) return;

    const elements = triggerRef.current.querySelectorAll('[data-reveal]');

    const tween = gsap.from(elements, {
      y: 60,
      opacity: 0,
      stagger,
      duration: 0.8,
      ease: 'power2.out',
      delay,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 70%',
      },
    });

    return () => {
      tween.kill();
    };
  }, [triggerRef, stagger, delay]);
}
