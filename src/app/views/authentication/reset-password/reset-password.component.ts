import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth_service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  warning: string;
  err: string;
  res: string;

  constructor(
    private afService: AuthService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });

    this.warning = ""
    this.err = ""
    this.res = ""
  }

  async resetPassword() {
    const mode = this.activeRoute.snapshot.queryParams['mode'];
    const code = this.activeRoute.snapshot.queryParams['oobCode'];
    const password = this.resetForm.value.password;
    const cpassword = this.resetForm.value.cpassword;

    if(cpassword !== password) {
      this.warning = "Les mots de passe ne coincident pas"
    } else {
      await this.afService.setNewPassword(code, password).then(() => {
        this.res = "Mot de passe mis a jour avec succès. Vous allez être redirigé vers la page de connexion."
        setTimeout(() => {
          this.res = ""
          this.route.navigate(['/login'])
        }, 1000)
      }).catch((err) => {this.err = err})
    }
  }
}
