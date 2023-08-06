import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState, createUserWithEmailAndPassword, updateProfile, UserInfo, UserCredential, sendPasswordResetEmail } from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return signInWithEmailAndPassword(this.auth, username, password);
  }

  logout() {
    return from(this.auth.signOut())
  }

  getCurrentUser() {
    return this.currentUser$;
  }

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  forgotPassword(email: string) : string {
    let message : string = 'Hubo un error'
    sendPasswordResetEmail(this.auth, email)
    .then(() => {message = 'Se le envió un correo electrónico para restaurar su contraseña'})
    .catch(() => {message = 'Hubo un error, verifique que haya ingresado el correo correcto y que esté registrado en nuestra página'});
    return message
  }
}
