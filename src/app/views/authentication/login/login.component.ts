import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderImageService } from '../../../core/services/provider_image_service';
import { AuthService } from 'src/app/core/services/auth_service';
import { isEmpty } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent {
  user: any;
  err: string;
  warning: string;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afService: AuthService,
    private router: Router
  ) {
    const value = JSON.parse(localStorage.getItem('login-formValue')!);

    this.loginForm = fb.group({
      email: [(value && value.email) || '', Validators.required],
      password: [(value && value.password) || '', Validators.required],
      rememberMe: [(value && value.rememberMe) || false, Validators.required],
    });

    this.loginForm.valueChanges.subscribe((value) => {
      localStorage.setItem(
        'login-formValue',
        JSON.stringify(this.loginForm.value)
      );
    });

    this.err = '';
    this.warning = '';
  }

  async login() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const rememberMe = this.loginForm.value.rememberMe;

    if (!email || email == '') {
      this.warning = "Veuillez renseigner l'adresse mail";
    } else if (!password || password == '') {
      this.warning = 'Veuillez renseigner le mot de passe';
    } else {
      this.warning = '';
      this.err = '';
      this.afService
        .login(email, password)
        .then((res) => (this.user = res))
        .catch((err) => (this.err = err));
      if (this.user != null) {
        console.log(this.user);
        if (!rememberMe) {
          localStorage.removeItem('login-formValue');
          this.loginForm.reset();
        }

        this.router.navigate(['/home']);
      }
    }
  }

  async loginWithFcbk() {
    await this.afService
      .loginWithFcbk()
      .then((res) => (this.user = res))
      .catch((err) => (this.err = err));
    if (this.user != null) {
      this.router.navigate(['/home']);
    }
  }

  async loginWithGoogle() {
    await this.afService
      .loginWithGoogle()
      .then((res) => (this.user = res))
      .catch((err) => (this.err = err));
    if (this.user != null) {
      this.router.navigate(['/home']);
    }
  }
}
