"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PlaceFormValues, PriceLevel, Distance } from "@/types";

interface AddPlaceFormProps {
  onSubmit: (values: PlaceFormValues) => void;
  onClose: () => void;
}

const EMPTY_FORM: PlaceFormValues = {
  name: "",
  category: "",
  priceLevel: "",
  notes: "",
  address: "",
  distance: "",
  mapUrl: "",
};

const PRICE_OPTIONS: PriceLevel[] = ["$", "$$", "$$$", "$$$$"];
const DISTANCE_OPTIONS: Distance[] = ["close", "far", "very far"];

export default function AddPlaceForm({ onSubmit, onClose }: AddPlaceFormProps) {
  const [values, setValues] = useState<PlaceFormValues>(EMPTY_FORM);
  const [nameError, setNameError] = useState("");

  function field(key: keyof PlaceFormValues, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key === "name" && nameError) setNameError("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) {
      setNameError("Name is required");
      return;
    }
    onSubmit(values);
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          key="sheet"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-brand-text">Add a Place</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl active:scale-90 transition-transform"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-sm font-medium text-brand-text mb-1"
                htmlFor="add-name"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="add-name"
                type="text"
                value={values.name}
                onChange={(e) => field("name", e.target.value)}
                placeholder="e.g. The Pizza Place"
                className={`w-full rounded-xl border px-4 py-3 text-base text-brand-text bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange ${
                  nameError ? "border-red-400" : "border-gray-200"
                }`}
                autoFocus
              />
              {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-brand-text mb-1"
                htmlFor="add-category"
              >
                Category
              </label>
              <input
                id="add-category"
                type="text"
                value={values.category}
                onChange={(e) => field("category", e.target.value)}
                placeholder="e.g. Italian, Sushi, Café…"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-brand-text bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-1">
                Price Level
              </label>
              <div className="flex gap-2">
                {PRICE_OPTIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => field("priceLevel", values.priceLevel === p ? "" : p)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${
                      values.priceLevel === p
                        ? "bg-brand-orange text-white border-brand-orange"
                        : "border-gray-200 text-brand-muted bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-1">
                Distance
              </label>
              <div className="flex gap-2">
                {DISTANCE_OPTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => field("distance", values.distance === d ? "" : d)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-colors capitalize ${
                      values.distance === d
                        ? "bg-brand-orange text-white border-brand-orange"
                        : "border-gray-200 text-brand-muted bg-gray-50"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-brand-text mb-1"
                htmlFor="add-address"
              >
                Address
              </label>
              <input
                id="add-address"
                type="text"
                value={values.address}
                onChange={(e) => field("address", e.target.value)}
                placeholder="123 Main St"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-brand-text bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-brand-text mb-1"
                htmlFor="add-mapurl"
              >
                Map URL
              </label>
              <input
                id="add-mapurl"
                type="url"
                value={values.mapUrl}
                onChange={(e) => field("mapUrl", e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-brand-text bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-brand-text mb-1"
                htmlFor="add-notes"
              >
                Notes
              </label>
              <textarea
                id="add-notes"
                value={values.notes}
                onChange={(e) => field("notes", e.target.value)}
                placeholder="Any tips, must-order dishes…"
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base text-brand-text bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
              />
            </div>

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-base font-semibold text-brand-muted active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-brand-orange text-white text-base font-bold shadow-primary active:scale-95 transition-transform"
              >
                Add Place
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
