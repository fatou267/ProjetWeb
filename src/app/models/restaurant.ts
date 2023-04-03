import { RestaurantDetails } from './details';

export interface Restaurant {
  businesses: Array<RestaurantDetails>;
  total: number;
}
