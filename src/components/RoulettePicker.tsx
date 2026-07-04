"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildSpinReel } from "@/lib/roulette";
import type { LunchPlace } from "@/types";

interface RoulettePickerProps {
  eligible: LunchPlace[];
  winner: LunchPlace;
  onComplete: () => void;
}

const SPIN_DURATION_MS = 2400;
const MIN_INTERVAL_MS = 60;
const MAX_INTERVAL_MS = 380;

export default function RoulettePicker({
  eligible,
  winner,
  onComplete,
}: RoulettePickerProps) {
  // Read synchronously at mount: framer's useReducedMotion resolves a tick late,
  // which would let the full spin start before the preference is known.
  const [prefersReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const reel = buildSpinReel(eligible, winner, 30);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayName, setDisplayName] = useState(reel[0]);
  const startTimeRef = useRef<number>(Date.now());
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(Date.now());
  const indexRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    // Reduced motion: skip the spinning ceremony, crossfade straight to the winner.
    if (prefersReduced) {
      indexRef.current = reel.length - 1;
      doneRef.current = true;
      setDisplayName(winner.name);
      setCurrentIndex(reel.length - 1);
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }

    startTimeRef.current = Date.now();
    lastTickRef.current = Date.now();

    function tick() {
      if (doneRef.current) return;

      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / SPIN_DURATION_MS, 1);
      const interval =
        MIN_INTERVAL_MS + (MAX_INTERVAL_MS - MIN_INTERVAL_MS) * progress * progress;

      if (now - lastTickRef.current >= interval) {
        lastTickRef.current = now;

        if (indexRef.current < reel.length - 1) {
          indexRef.current += 1;
          setDisplayName(reel[indexRef.current]);
          setCurrentIndex(indexRef.current);
        }

        if (progress >= 1 || indexRef.current >= reel.length - 1) {
          doneRef.current = true;
          setTimeout(onComplete, 600);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isWinner = doneRef.current && displayName === winner.name;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-brand-bg flex flex-col items-center justify-center px-6"
    >
      <p className="text-brand-muted text-sm font-medium mb-8 tracking-widest uppercase">
        {prefersReduced ? "Your pick" : "Spinning…"}
      </p>

      <div className="relative w-full max-w-sm">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 border-y-2 border-brand-orange/30 bg-brand-orange/5 z-0 rounded-2xl" />

        <div className="py-24 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={displayName + currentIndex}
              initial={{ y: -40, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.12 }}
              className="text-center"
            >
              <span
                className={`text-3xl font-extrabold leading-tight block text-balance break-words px-4 ${
                  isWinner ? "text-brand-orange" : "text-brand-text"
                }`}
              >
                {displayName}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {!prefersReduced && (
        <p className="text-brand-muted text-xs mt-6">Deciding your fate…</p>
      )}
    </motion.div>
  );
}
