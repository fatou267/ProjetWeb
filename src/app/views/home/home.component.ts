import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth_service';
import { Data } from 'src/app/models/data';

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

  constructor(
    private afService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.loggedOut = false;
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
      this.router.navigate(['/login']);
    }
  }
}
