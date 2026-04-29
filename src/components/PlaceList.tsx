"use client";

import { AnimatePresence } from "framer-motion";
import PlaceCard from "./PlaceCard";
import type { LunchPlace } from "@/types";

interface PlaceListProps {
  places: LunchPlace[];
  onEdit: (place: LunchPlace) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onToggleExcluded: (id: string) => void;
}

export default function PlaceList({
  places,
  onEdit,
  onDelete,
  onToggleFavorite,
  onToggleExcluded,
}: PlaceListProps) {
  const sorted = [...places].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <section aria-label="Your lunch places">
      <h2 className="text-sm font-semibold text-brand-muted uppercase tracking-widest mb-3">
        Your Places
      </h2>
      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {sorted.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
              onToggleExcluded={onToggleExcluded}
            />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
