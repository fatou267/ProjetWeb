import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Observable, of } from 'rxjs';
import { mapboxEnv, yelpEnv } from 'src/environments/environment';
import { Path } from '../models/path';
import { Restaurant } from '../models/restaurant';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapAPIService {
  constructor(private http: HttpClient) {}

  getRestaurant(
    radius: number,
    latitude: number,
    longitude: number
  ): Observable<Restaurant> {
    console.log(latitude, longitude)
    return this.http
      .get<Restaurant>(
        `/api/businesses/search?radius=${radius*1000}&latitude=${latitude}&longitude=${longitude}&categories=restaurants`,
        {
          headers: new HttpHeaders({
            accept: 'application/json',
            Authorization: 'Bearer ' + yelpEnv.token,
          }),
          withCredentials: true
        }
      )
      .pipe(
        catchError(this.handleError<Restaurant>('getRestaurant', undefined))
      );
  }

  computeRoute(
    transportMode: string,
    dep: mapboxgl.LngLat,
    arr: mapboxgl.LngLat
  ): Observable<Path> {
    return this.http.get<Path>(
      `${mapboxEnv.baseUrl}/directions/v5/mapbox/${transportMode}/${dep.lng}%2C${dep.lat}%3B${arr.lng}%2C${arr.lat}?alternatives=true&geometries=geojson&language=fr&overview=simplified&steps=true&access_token=${mapboxEnv.token}`
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(operation + ' with error: ' + error.error);
      console.warn(error);

      return of(result as T);
    };
  }
}
