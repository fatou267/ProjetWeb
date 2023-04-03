import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth_service';
import { getUser } from 'src/app/core/shared/current_user';
import { Data } from 'src/app/models/data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RestaurantDetails } from 'src/app/models/details';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedOut: boolean;
  pokemonId: number = 83;
  lis: Data | undefined;
  loading: boolean = false;
  user: any;
  restaurantsVisites: Array<RestaurantDetails> = [];

  constructor(
    private afService: AuthService,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.loggedOut = false;
    this.user = getUser();
  }

  ngOnInit(): void {
    this.loading = true;
  }

  async signout() {
    await this.afService
      .signout()
      .then(() => (this.loggedOut = true))
      .catch((err) => console.log(err));
    if (this.loggedOut) {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  fetchRestaurantVisites() {
    this.firestore
      .collection<RestaurantDetails>('restaurants-consultes')
      .valueChanges().subscribe((res) => {
        if(res) {
          this.restaurantsVisites = res
        }
      });
  }
}
