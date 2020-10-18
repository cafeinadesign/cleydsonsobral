import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(public afAuth: AngularFireAuth) {}

  login(): Promise<auth.UserCredential> {
    this.afAuth.languageCode = new Promise(() => 'pt');
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginAnonimo(): Promise<auth.UserCredential> {
    return this.afAuth.signInAnonymously();
  }
}
