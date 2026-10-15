'use client';

import { useRef } from 'react';
import { useAnimationFrame, useInView, useMotionValue, useReducedMotion } from 'framer-motion';

/**
 * Animations run only while the element is on screen (whileInView) and never
 * with prefers-reduced-motion.
 */
export function useLiveMotion<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: '120px 0px' });
  const reduce = useReducedMotion();
  return { ref, active: inView && !reduce };
}

/**
 * Looping progress 0 → 1 every `seconds`, advanced by Framer Motion's frame loop.
 * Pauses in place (no jump back) while `active` is false.
 */
export function useLoop(active: boolean, seconds: number) {
  const progress = useMotionValue(0);
  useAnimationFrame((_, delta) => {
    if (active) progress.set((progress.get() + delta / (seconds * 1000)) % 1);
  });
  return progress;
}
