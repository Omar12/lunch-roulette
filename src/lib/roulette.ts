import type { LunchPlace } from "@/types";

export function getEligiblePlaces(places: LunchPlace[]): LunchPlace[] {
  return places.filter((p) => !p.isTemporarilyExcluded);
}

export function pickPlace(
  eligible: LunchPlace[],
  lastPickedId: string | null
): LunchPlace | null {
  if (eligible.length === 0) return null;
  if (eligible.length === 1) return eligible[0];

  const pool =
    lastPickedId !== null
      ? eligible.filter((p) => p.id !== lastPickedId)
      : eligible;

  const candidates = pool.length > 0 ? pool : eligible;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function buildSpinReel(
  eligible: LunchPlace[],
  winner: LunchPlace,
  spinCount = 30
): string[] {
  if (eligible.length === 0) return [winner.name];
  const reel: string[] = [];
  for (let i = 0; i < spinCount - 1; i++) {
    reel.push(eligible[i % eligible.length].name);
  }
  reel.push(winner.name);
  return reel;
}
