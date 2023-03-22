import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth_service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService],
})
export class SignupComponent {
  user: any;
  err: string;
  warning: string;
  loginForm: FormGroup;
  res: string;

  constructor(
    private fb: FormBuilder,
    private afService: AuthService,
  ) {
    const value = JSON.parse(localStorage.getItem('sign-formValue')!);

    this.loginForm = fb.group({
      email: [(value && value.email) || '', Validators.required],
      password: [(value && value.password) || '', Validators.required],
      cguAccepted: [(value && value.cguAccepted) || false, Validators.required],
    });

    this.loginForm.valueChanges.subscribe((value) => {
      localStorage.setItem('signup-formValue', JSON.stringify(this.loginForm.value));
    });

    this.err = '';
    this.warning = '';
    this.res = '';
  }

  async signup() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const cguAccepted = this.loginForm.value.cguAccepted;

    if (!email || email == '') {
      this.warning = "Veuillez renseigner l'adresse mail";
    } else if (!password || password == '') {
      this.warning = 'Veuillez renseigner le mot de passe';
    } else if (cguAccepted == false) {
      this.warning = 'Veuillez accepter les cgu';
    } else {
      this.warning = '';
      this.err = '';
      this.afService
        .signup(email, password)
        .then((res) => (this.user = res))
        .catch((err) => (this.err = err));
      if (this.user != null) {
        localStorage.removeItem('signup-formValue');
        this.loginForm.reset();

        this.res = 'Compte créé avec succès. Un mail de validation vous a été envoyé pour activer votre compte'
      }
    }
  }
}
