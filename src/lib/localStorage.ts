import type { LunchPlace } from "@/types";

const STORAGE_KEY = "lunch-roulette-places";
const LAST_PICKED_KEY = "lunch-roulette-last-picked-id";

export function loadPlaces(): LunchPlace[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as LunchPlace[];
  } catch {
    return [];
  }
}

export function savePlaces(places: LunchPlace[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
  } catch {
    // quota exceeded or unavailable
  }
}

export function loadLastPickedId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(LAST_PICKED_KEY);
  } catch {
    return null;
  }
}

export function saveLastPickedId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LAST_PICKED_KEY, id);
  } catch {
    // ignore
  }
}
