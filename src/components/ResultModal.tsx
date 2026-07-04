"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useModalA11y } from "@/hooks/useModalA11y";
import type { LunchPlace } from "@/types";

interface ResultModalProps {
  place: LunchPlace;
  onClose: () => void;
}

const PRICE_COLORS: Record<string, string> = {
  $: "text-green-600 bg-green-50",
  $$: "text-yellow-600 bg-yellow-50",
  $$$: "text-orange-500 bg-orange-50",
  $$$$: "text-red-500 bg-red-50",
};

const CONFETTI_EMOJIS = ["🎉", "🎊", "✨", "🍔", "🥗", "🍕", "🌮", "🍜"];

export default function ResultModal({ place, onClose }: ResultModalProps) {
  const prefersReduced = useReducedMotion();
  const cardRef = useModalA11y<HTMLDivElement>(onClose);
  const confetti = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
        x: 10 + i * 11,
        delay: i * 0.05,
        duration: 0.9 + (i % 3) * 0.2,
      })),
    []
  );

  return (
    <AnimatePresence>
      <motion.div
        key="result-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
        onClick={onClose}
      >
        {!prefersReduced && confetti.map((c, i) => (
          <motion.span
            key={i}
            className="fixed text-2xl pointer-events-none select-none"
            style={{ left: `${c.x}%`, top: "-5%" }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: "110vh", opacity: 0 }}
            transition={{ delay: c.delay, duration: c.duration + 0.8, ease: "easeIn" }}
          >
            {c.emoji}
          </motion.span>
        ))}

        <motion.div
          ref={cardRef}
          key="result-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="result-place-name"
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-green rounded-t-3xl" />

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", damping: 12, stiffness: 200 }}
              className="text-6xl mb-4 select-none"
              role="img"
              aria-label="Tada"
            >
              🎉
            </motion.div>

            <p className="text-sm font-semibold text-brand-muted uppercase tracking-widest mb-2">
              Today you&apos;re eating at
            </p>

            <motion.h2
              id="result-place-name"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold text-brand-text mb-3 leading-tight"
            >
              {place.name}
            </motion.h2>

            <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
              {place.category && (
                <span className="text-sm text-brand-muted bg-gray-100 rounded-full px-3 py-1">
                  {place.category}
                </span>
              )}
              {place.priceLevel && (
                <span
                  className={`text-sm font-bold rounded-full px-3 py-1 ${
                    PRICE_COLORS[place.priceLevel]
                  }`}
                >
                  {place.priceLevel}
                </span>
              )}
              {place.distance && (
                <span className="text-sm text-brand-muted bg-gray-100 rounded-full px-3 py-1 capitalize">
                  {place.distance}
                </span>
              )}
              {place.isFavorite && (
                <span className="text-sm text-yellow-600 bg-yellow-50 rounded-full px-3 py-1">
                  ★ Favourite
                </span>
              )}
            </div>

            {place.notes && (
              <p className="text-sm text-brand-muted italic mb-4 line-clamp-3">
                &ldquo;{place.notes}&rdquo;
              </p>
            )}

            {place.address && (
              <div className="mb-5">
                <p className="text-sm text-brand-muted">{place.address}</p>
                {place.mapUrl && (
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-orange underline mt-1 inline-block"
                  >
                    Open in Maps →
                  </a>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-brand-orange text-white text-lg font-bold shadow-primary active:scale-95 transition-transform mt-2"
            >
              Sounds Delicious!
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
