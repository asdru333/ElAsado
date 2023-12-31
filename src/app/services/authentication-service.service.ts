import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';

import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return signInWithEmailAndPassword(this.auth, username, password);
  }

  logout() {
    return from(this.auth.signOut())
  }
}
