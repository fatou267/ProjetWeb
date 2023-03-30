import { mapboxEnv } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson } from 'src/app/models/geojson';
import { MapAPIService } from 'src/app/repositories/map_api_service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  markers: GeoJson | undefined;
  center = new mapboxgl.LngLat(1.872409, 50.951);
  loading: boolean;
  loadingText: string;

  constructor(private mapAPIService: MapAPIService) {
    this.loading = false;
    this.loadingText = '';
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yvantatsi/clfqa8d9q002u01nisuktqjuc',
      zoom: 8,
      accessToken: mapboxEnv.accessToken,
      center: [this.center.lng, this.center.lat],
    });
    const control = this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    console.log(control)

    this.map.on('load', () => {
      // this.addMarker(this.center, 'blue');
    });
  }

  addMarker(pos: mapboxgl.LngLat, color: string = 'blue') {
    new mapboxgl.Marker({
      color: color,
    })
      .setLngLat(pos)
      .addTo(this.map!);
  }

  drawPathToLocation(route: Array<Array<number>>, color: string = 'blue') {
    this.map!.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      },
    });

    this.map?.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': 'blue',
        'line-width': 8,
      },
    });

    const tmp = route[route.length - 1];

    this.addMarker(new mapboxgl.LngLat(tmp[0], tmp[1]), color);
  }
}
