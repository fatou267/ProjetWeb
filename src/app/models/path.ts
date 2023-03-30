export interface Path {
  routes: Array<Route>;
  waypoints: Array<WayPoint>;
  code: string;
}

export interface Route {
  distance: number;
  duration: number;
  geometry: Geo;
}

interface Geo {
  coordinates: Array<Array<number>>;
}

interface WayPoint {
  distance: number;
  name: string;
  location: Array<number>;
}
