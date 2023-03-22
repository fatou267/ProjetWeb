import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth_service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loggedOut: boolean;
  constructor(private afService: AuthService, private router: Router) {
    this.loggedOut = false;
  }

  async signout() {
    console.log('deconnexoin en cours');
    await this.afService
      .signout()
      .then(() => (this.loggedOut = true))
      .catch((err) => console.log(err));
    if (this.loggedOut) {
      this.router.navigate(['/login']);
    }
  }
}
