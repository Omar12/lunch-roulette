"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LunchPlace } from "@/types";

interface PlaceCardProps {
  place: LunchPlace;
  onEdit: (place: LunchPlace) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleExcluded: (id: string) => void;
}

const PRICE_COLORS: Record<string, string> = {
  $: "text-green-600",
  $$: "text-yellow-600",
  $$$: "text-orange-500",
  $$$$: "text-red-500",
};

const DISTANCE_LABELS: Record<string, string> = {
  close: "📍 Close",
  far: "🚶 Far",
  "very far": "🚌 Very Far",
};

export default function PlaceCard({
  place,
  onEdit,
  onDelete,
  onToggleFavorite,
  onToggleExcluded,
}: PlaceCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    onDelete(place.id);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.22 }}
      className={`rounded-2xl bg-brand-card shadow-card p-4 flex flex-col gap-2 border ${
        place.isTemporarilyExcluded
          ? "border-gray-200 opacity-60"
          : place.isFavorite
          ? "border-yellow-300"
          : "border-transparent"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {place.isFavorite && (
              <span className="text-yellow-400 text-base leading-none" aria-label="Favorite">
                ★
              </span>
            )}
            <h3 className="text-base font-bold text-brand-text truncate">{place.name}</h3>
            {place.isTemporarilyExcluded && (
              <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                excluded
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
            {place.category && (
              <span className="text-xs text-brand-muted">{place.category}</span>
            )}
            {place.priceLevel && (
              <span className={`text-xs font-semibold ${PRICE_COLORS[place.priceLevel]}`}>
                {place.priceLevel}
              </span>
            )}
            {place.distance && (
              <span className="text-xs text-brand-muted">
                {DISTANCE_LABELS[place.distance]}
              </span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onToggleFavorite(place.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-transform active:scale-90 ${
              place.isFavorite ? "bg-yellow-50 text-yellow-400" : "bg-gray-50 text-gray-300"
            }`}
            aria-label={place.isFavorite ? "Unfavorite" : "Favorite"}
          >
            ★
          </button>
          <button
            onClick={() => onToggleExcluded(place.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-transform active:scale-90 ${
              place.isTemporarilyExcluded
                ? "bg-orange-50 text-brand-orange"
                : "bg-gray-50 text-gray-400"
            }`}
            aria-label={
              place.isTemporarilyExcluded ? "Include in roulette" : "Exclude from roulette"
            }
            title={place.isTemporarilyExcluded ? "Include" : "Exclude"}
          >
            {place.isTemporarilyExcluded ? "✓" : "–"}
          </button>
          <button
            onClick={() => onEdit(place)}
            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-sm text-gray-500 transition-transform active:scale-90"
            aria-label="Edit place"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-transform active:scale-90 ${
              confirmDelete ? "bg-red-100 text-red-600" : "bg-gray-50 text-gray-400"
            }`}
            aria-label={confirmDelete ? "Confirm delete" : "Delete place"}
          >
            {confirmDelete ? "!" : "🗑️"}
          </button>
        </div>
      </div>

      {place.notes && (
        <p className="text-xs text-brand-muted leading-snug line-clamp-2">{place.notes}</p>
      )}

      {place.address && (
        <div className="flex items-center gap-1">
          <span className="text-xs text-brand-muted truncate">{place.address}</span>
          {place.mapUrl && (
            <a
              href={place.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-orange underline shrink-0"
              aria-label="Open in maps"
            >
              Map
            </a>
          )}
        </div>
      )}

      {place.timesPicked > 0 && (
        <p className="text-xs text-brand-muted">
          Picked {place.timesPicked} time{place.timesPicked !== 1 ? "s" : ""}
          {place.lastPickedAt &&
            ` · Last: ${new Date(place.lastPickedAt).toLocaleDateString()}`}
        </p>
      )}
    </motion.div>
  );
}
