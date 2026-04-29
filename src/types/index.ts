export type PriceLevel = "$" | "$$" | "$$$" | "$$$$";
export type Distance = "close" | "far" | "very far";

export type LunchPlace = {
  id: string;
  name: string;
  category?: string;
  priceLevel?: PriceLevel;
  notes?: string;
  address?: string;
  distance?: Distance;
  mapUrl?: string;
  isFavorite: boolean;
  isTemporarilyExcluded: boolean;
  createdAt: string;
  updatedAt: string;
  lastPickedAt?: string;
  timesPicked: number;
};

export type PlaceFormValues = {
  name: string;
  category: string;
  priceLevel: PriceLevel | "";
  notes: string;
  address: string;
  distance: Distance | "";
  mapUrl: string;
};
