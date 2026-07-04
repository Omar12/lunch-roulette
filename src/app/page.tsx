"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { useLunchPlaces } from "@/hooks/useLunchPlaces";
import { getEligiblePlaces, pickPlace } from "@/lib/roulette";
import PlaceList from "@/components/PlaceList";
import AddPlaceForm from "@/components/AddPlaceForm";
import EditPlaceForm from "@/components/EditPlaceForm";
import RoulettePicker from "@/components/RoulettePicker";
import ResultModal from "@/components/ResultModal";
import EmptyState from "@/components/EmptyState";
import type { LunchPlace } from "@/types";

export default function HomePage() {
  const {
    places,
    lastPickedId,
    isHydrated,
    addPlace,
    updatePlace,
    deletePlace,
    toggleFavorite,
    toggleExcluded,
    recordPick,
  } = useLunchPlaces();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlace, setEditingPlace] = useState<LunchPlace | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pickedPlace, setPickedPlace] = useState<LunchPlace | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [allExcluded, setAllExcluded] = useState(false);

  const eligible = getEligiblePlaces(places);

  function handlePickLunch() {
    if (isSpinning) return;

    if (eligible.length === 0) {
      setAllExcluded(true);
      return;
    }

    setAllExcluded(false);
    const winner = pickPlace(eligible, lastPickedId);
    if (!winner) return;

    setPickedPlace(winner);
    setIsSpinning(true);
  }

  function handleSpinComplete() {
    setIsSpinning(false);
    if (pickedPlace) {
      recordPick(pickedPlace.id);
      setShowResult(true);
    }
  }

  function handleResultClose() {
    setShowResult(false);
    setPickedPlace(null);
  }

  if (!isHydrated) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-brand-bg"
        role="status"
        aria-label="Loading your places"
      >
        <span className="text-4xl animate-spin-slow" aria-hidden="true">🍽️</span>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
    <main className="flex min-h-screen flex-col bg-brand-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-brand-bg/90 backdrop-blur-sm border-b border-orange-100 px-4 py-4">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-brand-text tracking-tight">
              🍔 Lunch Roulette
            </h1>
            <p className="text-xs text-brand-muted mt-0.5">
              {places.length === 0
                ? "Add a place to get started"
                : `${places.length} place${places.length !== 1 ? "s" : ""} · ${eligible.length} eligible`}
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-full bg-brand-orange text-white w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-primary active:scale-95 transition-transform"
            aria-label="Add new place"
          >
            +
          </button>
        </div>
      </header>

      {/* Roulette spinner overlay */}
      {isSpinning && pickedPlace && (
        <RoulettePicker
          eligible={eligible}
          winner={pickedPlace}
          onComplete={handleSpinComplete}
        />
      )}

      {/* Main content */}
      {!isSpinning && (
        <div className="flex-1 flex flex-col mx-auto w-full max-w-lg px-4 pb-8">
          {/* Pick Lunch CTA */}
          <div className="py-6 flex flex-col items-center gap-2">
            <button
              onClick={handlePickLunch}
              disabled={isSpinning}
              className="w-full max-w-xs py-5 rounded-3xl bg-brand-orange text-white text-xl font-bold shadow-primary active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed select-none"
              aria-label="Pick a random lunch place"
            >
              🎲 Pick Lunch!
            </button>
            {allExcluded && eligible.length === 0 && places.length > 0 && (
              <p className="text-sm text-brand-muted mt-1 text-center">
                All places are excluded — un-exclude some to spin!
              </p>
            )}
          </div>

          {/* Place list or empty state */}
          {places.length === 0 ? (
            <EmptyState onAdd={() => setShowAddForm(true)} />
          ) : (
            <PlaceList
              places={places}
              onEdit={setEditingPlace}
              onDelete={deletePlace}
              onToggleFavorite={toggleFavorite}
              onToggleExcluded={toggleExcluded}
            />
          )}
        </div>
      )}

      {/* Modals */}
      {showAddForm && (
        <AddPlaceForm
          onSubmit={(values) => {
            addPlace(values);
            setShowAddForm(false);
          }}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingPlace && (
        <EditPlaceForm
          place={editingPlace}
          onSubmit={(values) => {
            updatePlace(editingPlace.id, values);
            setEditingPlace(null);
          }}
          onClose={() => setEditingPlace(null)}
        />
      )}

      {showResult && pickedPlace && (
        <ResultModal place={pickedPlace} onClose={handleResultClose} />
      )}
    </main>
    </MotionConfig>
  );
}
