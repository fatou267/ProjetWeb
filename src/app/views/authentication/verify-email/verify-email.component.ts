import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth_service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  sec: number;
  constructor(
    private router: Router,
    private afService: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    this.sec = 3000;
    this.redirection();
  }

  redirection() {
    this.afService.verifyEmail();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
