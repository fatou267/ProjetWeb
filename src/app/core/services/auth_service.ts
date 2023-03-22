import { Injectable, InjectionToken } from '@angular/core';
import { FacebookAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase_service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState: any;
  user: any;
  constructor(private afAuth: AngularFireAuth, private fs: FirebaseService) {
    this.authState = afAuth.authState;
    this.user = null;
  }

  async login(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => (this.user = res.user))
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }

  async signup(email: string, password: string) {
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        await this.sendVerificationMail(email)
          .then(() => (this.user = res))
          .catch((err) => {
            throw Error(this.fs.parseFirebaseError(err.message));
          });
      })
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }

  async sendVerificationMail(email: string) {
    return await this.afAuth.currentUser
      .then((user) => {
        return user
          ?.sendEmailVerification()
          .then(() => {})
          .catch((err) => err);
      })
      .catch((err) => err);
  }

  async signout() {
    return await this.afAuth
      .signOut()
      .then(() => (this.user = null))
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }

  async resetPassword(email: string) {
    return await this.afAuth
      .sendPasswordResetEmail(email)
      .then(() => true)
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }

  async setNewPassword(code: string, password: string) {
    return await this.afAuth
      .confirmPasswordReset(code, password)
      .then(() => true)
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }

  async verifyEmail() {
    return await this.afAuth.currentUser
      .then((user) => {
        if (user) {
          let newUser = user;
          newUser.emailVerified = true;
          this.afAuth.updateCurrentUser(newUser);
        }
      })
      .catch((err) => err);
  }

  async loginWithFcbk() {
    return await this.afAuth
      .signInWithPopup(new FacebookAuthProvider())
      .then((res) => (this.user = res.user))
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }

  async loginWithGoogle() {
    return await this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((res) => (this.user = res.user))
      .catch((err) => {
        throw Error(this.fs.parseFirebaseError(err.message));
      });
  }
}
