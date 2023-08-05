import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthenticationServiceService } from './authentication-service.service';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private firestore: Firestore, private authenticationService: AuthenticationServiceService) {}

  addUser(user: UserModel): Observable<void> {
    const ref = doc(this.firestore, 'users', user.id);
    return from(setDoc(ref, user));
  }
}
