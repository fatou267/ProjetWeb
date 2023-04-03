import { mapboxEnv } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapAPIService } from 'src/app/http_services/map_api_service';
import { RestaurantDetails } from 'src/app/models/details';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getUser } from 'src/app/core/shared/current_user';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MatDialog],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  center = new mapboxgl.LngLat(0, 0);
  loading: boolean;
  loadingText: string;
  alreadyShowRoute: boolean = false;
  radius: number = 20;

  constructor(
    private mapAPIService: MapAPIService,
    public dialog: MatDialog,
    private firestore: AngularFirestore
  ) {
    this.loading = false;
    this.loadingText = '';
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/yvantatsi/clfqa8d9q002u01nisuktqjuc',
      zoom: 5,
      accessToken: mapboxEnv.token,
      center: this.center,
    });

    this.map.on('load', async () => {
      this.getUserLocation();
      setTimeout(() => {
        this.getRestaurant(10);
      }, 5000);
    });
  }

  onChange() {
    console.log(this.radius)
  }

  async getRestaurant(radius: number) {
    this.map?.setZoom(15 - Math.log2(radius / 50));

    this.mapAPIService
      .getRestaurant(radius, this.center.lat, this.center.lng)
      .subscribe((res) => {
        this.loading = true;
        this.loadingText = 'Récuperation des restaurants autour de vous';

        if (res) {
          this.loading = false;
          this.loadingText = '';
          if (res.businesses.length == 0) {
            this.loading = true;
            this.loadingText =
              'Aucun restaurant à ' +
              radius * 1000 +
              'km. Augmenter le périmètre de recherche';
          }
          res.businesses.forEach((restaurant) => {
            this.addMarkerRestaurant(
              new mapboxgl.LngLat(
                restaurant.coordinates.longitude,
                restaurant.coordinates.latitude
              ),
              restaurant
            );
          });
        }
      });
  }

  addMarker(pos: mapboxgl.LngLat) {
    new mapboxgl.Marker({
      color: 'blue',
    })
      .setLngLat(pos)
      .addTo(this.map!);
  }

  addMarkerRestaurant(pos: mapboxgl.LngLat, restaurant: RestaurantDetails) {
    const marker = new mapboxgl.Marker({
      color: 'red',
    })
      .setLngLat(pos)
      .addTo(this.map!);

    marker
      .getElement()
      .addEventListener('click', () => this.openDetails(restaurant));
  }

  drawPathToLocation(route: Array<Array<number>>, color: string = 'blue') {
    this.alreadyShowRoute = true;
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
  }

  getUserLocation() {
    this.loading = true;
    this.loadingText = 'Récupération de votre position';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.center.lng = longitude;
        this.center.lat = latitude;
        this.map?.flyTo({ center: this.center });
        this.addMarker(this.center);
        this.loading = false;
        this.loadingText = 'Récupération de votre position';
      });
    } else {
      console.log('No support for geolocation');
    }
  }

  openDetails(restaurant: RestaurantDetails): void {
    if (this.alreadyShowRoute) {
      this.map?.removeLayer('route');

      this.map?.removeSource('route');
      this.alreadyShowRoute = false;
    }
    const dialogRef = this.dialog.open(ModalComponent, {
      data: restaurant!,
    });

    this.writeOnFirestore(restaurant);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mapAPIService
          .computeRoute(
            'driving',
            this.center,
            new mapboxgl.LngLat(
              restaurant.coordinates.longitude,
              restaurant.coordinates.latitude
            )
          )
          .subscribe((a) => {
            if (a) {
              if (a.routes.length != 0) {
                this.drawPathToLocation(a.routes[0].geometry.coordinates);
              }
            }
          });
      }
    });
  }

  writeOnFirestore(restaurant: RestaurantDetails) {
    this.firestore
      .collection('restaurants-consultes')
      .add({
        restaurant: restaurant,
        user: getUser()?.email ?? '',
      })
      .then(() => console.log('Restaurant ajouté', restaurant))
      .catch((err) =>
        console.error(
          "erreur lors de l'ajout du restaurant " + restaurant.alias + ' : ',
          err
        )
      );
  }
}
