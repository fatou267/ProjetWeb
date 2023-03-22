import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/views/authentication/login/login.component';
import { SignupComponent } from 'src/app/views/authentication/signup/signup.component';
import { HomeComponent } from 'src/app/views/home/home.component';
import { canActivate } from 'src/app/core/guards/auth_guard';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './views/authentication/forgot-password/forgot-password.component';
import { ActionComponent } from './views/authentication/action/action.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'action',
    component: ActionComponent,
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [canActivate],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
