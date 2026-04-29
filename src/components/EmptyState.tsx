"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <span className="text-7xl mb-6 select-none" role="img" aria-label="Fork and knife">
        🍽️
      </span>
      <h2 className="text-2xl font-bold text-brand-text mb-2">No places yet!</h2>
      <p className="text-brand-muted text-base mb-8 max-w-xs">
        Add your favourite lunch spots and let the roulette decide where you eat today.
      </p>
      <button
        onClick={onAdd}
        className="px-8 py-4 rounded-3xl bg-brand-orange text-white text-lg font-bold shadow-primary active:scale-95 transition-transform"
      >
        Add Your First Place
      </button>
    </motion.div>
  );
}
