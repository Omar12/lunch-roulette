"use client";

import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import type { LunchPlace, PlaceFormValues } from "@/types";
import {
  loadPlaces,
  savePlaces,
  loadLastPickedId,
  saveLastPickedId,
} from "@/lib/localStorage";

export function useLunchPlaces() {
  const [places, setPlaces] = useState<LunchPlace[]>([]);
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setPlaces(loadPlaces());
    setLastPickedId(loadLastPickedId());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      savePlaces(places);
    }
  }, [places, isHydrated]);

  const addPlace = useCallback((values: PlaceFormValues) => {
    const now = new Date().toISOString();
    const newPlace: LunchPlace = {
      id: uuidv4(),
      name: values.name.trim(),
      category: values.category.trim() || undefined,
      priceLevel: values.priceLevel || undefined,
      notes: values.notes.trim() || undefined,
      address: values.address.trim() || undefined,
      distance: values.distance || undefined,
      mapUrl: values.mapUrl.trim() || undefined,
      isFavorite: false,
      isTemporarilyExcluded: false,
      createdAt: now,
      updatedAt: now,
      timesPicked: 0,
    };
    setPlaces((prev) => [newPlace, ...prev]);
  }, []);

  const updatePlace = useCallback((id: string, values: PlaceFormValues) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: values.name.trim(),
              category: values.category.trim() || undefined,
              priceLevel: values.priceLevel || undefined,
              notes: values.notes.trim() || undefined,
              address: values.address.trim() || undefined,
              distance: values.distance || undefined,
              mapUrl: values.mapUrl.trim() || undefined,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  }, []);

  const deletePlace = useCallback((id: string) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, isFavorite: !p.isFavorite, updatedAt: new Date().toISOString() }
          : p
      )
    );
  }, []);

  const toggleExcluded = useCallback((id: string) => {
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isTemporarilyExcluded: !p.isTemporarilyExcluded,
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  }, []);

  const recordPick = useCallback((id: string) => {
    const now = new Date().toISOString();
    setPlaces((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              lastPickedAt: now,
              timesPicked: p.timesPicked + 1,
              updatedAt: now,
            }
          : p
      )
    );
    setLastPickedId(id);
    saveLastPickedId(id);
  }, []);

  return {
    places,
    lastPickedId,
    isHydrated,
    addPlace,
    updatePlace,
    deletePlace,
    toggleFavorite,
    toggleExcluded,
    recordPick,
  };
}
