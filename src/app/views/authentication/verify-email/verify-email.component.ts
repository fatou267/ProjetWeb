import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  sec: number;
  constructor(private router: Router) {
    this.sec = 2000;
    this.redirection();
  }

  redirection() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
