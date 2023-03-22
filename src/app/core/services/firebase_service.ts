import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  parseFirebaseError(error: string): string {
    let message: string | undefined;
    let errors = [
      'auth/wrong-password',
      'auth/network-request-failed',
      'auth/too-many-requests',
      'auth/user-disabled',
      'auth/requires-recent-login',
      'auth/email-already-in-use',
      'auth/user-not-found',
      'auth/phone-number-already-in-use',
      'auth/invalid-phone-number',
      'auth/invalid-email',
      'auth/cannot-delete-own-user-account',
    ];
    let messages = [
      'Identifiants de connexion inccorects',
      'Verifier votre connexion internet',
      "Trop de tentatives détectées à partir de cet appareil. Reessayer plutard s'il vous plait.",
      'Votre compte a été désactivé ou supprimé. Veuillez contacter un administrateur',
      'Reconnectez-vous puis réessayer',
      'Adresse mail déjà utilisée',
      'impossible de trouver un compte associé à cet adresse mail',
      'Ce numéro de téléphone est déja utilisé',
      "Le numéro de téléphone n'est pas un numéro de téléphone valide",
      "L'adresse mail n'est pas une adresse valide",
      'Vous ne pouvez pas supprimer votre compte',
    ];

    for (let index = 0; index < errors.length; index++) {
      const err = errors[index];
      if (error.includes(err)) {
        message = messages[index];
        break;
      }
    }

    return message ?? 'Oops! Un problème est survenu. Réessayer plutard';
  }
}
