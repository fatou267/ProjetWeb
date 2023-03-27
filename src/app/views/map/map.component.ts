import { environment, mapboxEnv } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/yvantatsi/clfqa8d9q002u01nisuktqjuc';
  lat = 50.952709378523444;
  lng = 1.8806216424198048;
  constructor() {}
  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      accessToken: mapboxEnv.accessToken,
      center: [this.lng, this.lat],
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
