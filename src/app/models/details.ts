export interface RestaurantDetails {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Array<Category>;
  rating: number;
  coordinates: Coords;
  location: Loc;
  phone: string;
  display_phone: string;
  distance: number;
}

export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Loc {
  display_address: Array<string>;
}

export interface Category {
  alias: string;
  title: string;
}
