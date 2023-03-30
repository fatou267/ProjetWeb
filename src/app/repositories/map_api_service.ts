import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { baseUrl, mapboxEnv } from 'src/environments/environment';
import { GeoJson } from '../models/geojson';
import { Path } from '../models/path';

@Injectable({
  providedIn: 'root',
})
export class MapAPIService {
  private geojson: GeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [1.8806216424198048, 50.952709378523444],
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776],
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California',
        },
      },
    ],
  };

  constructor(private http: HttpClient) {
    
  }

  getRestaurant(): GeoJson {
    return this.geojson;
  }

  computeRoute(transportMode: string, dep: mapboxgl.LngLat, arr: mapboxgl.LngLat): Observable<Path> {
    // return this.http.get<Path>(`${baseUrl}/directions/v5/mapbox/${transportMode}/${dep.lat}%2C${dep.lng}%3B${arr.lat}%2C${arr.lng}?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${mapboxEnv.accessToken}`)
    return this.http.get<Path>(`https://api.mapbox.com/directions/v5/mapbox/${transportMode}/${dep.lng}%2C${dep.lat}%3B${arr.lng}%2C${arr.lat}?alternatives=true&geometries=geojson&language=fr&overview=simplified&steps=true&access_token=pk.eyJ1IjoieXZhbnRhdHNpIiwiYSI6ImNsZnE3dTZhaTAzMWMzcnFmNW41aDkwcGEifQ.0ZT6TGpq2ZwR-S4DtJbN3g`)
  }
}
