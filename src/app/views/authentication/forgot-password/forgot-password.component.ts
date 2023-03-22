import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth_service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  err: string;
  warning: string;
  res: string;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afService: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
    });

    this.err = '';
    this.warning = '';
    this.res = '';
  }

  async resetPassword() {
    const email = this.loginForm.value.email;
    if (!email || email == '') {
      this.warning = "Veuillez renseigner l'adresse mail";
    } else {
      this.warning = '';
      this.err = '';
      this.afService
        .resetPassword(email)
        .then((res) => {
          this.res =
            'Un mail vous a été envoyé pour réinitialiser votre mot de passe';
          setTimeout(() => {
            this.res = '';
            this.router.navigate(['/login']);
          }, 3000);
        })
        .catch((err) => (this.err = err));
      this.loginForm.reset();
    }
  }
}
