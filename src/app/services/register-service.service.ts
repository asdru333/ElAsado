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
import { MenuItem } from '../models/menuItem';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private firestore: Firestore, private authenticationService: AuthenticationServiceService) {}

  addUser(user: UserModel): Observable<void> {
    const ref = doc(this.firestore, 'users', user.id);
    return from(setDoc(ref, user));
  }

  addCart(item : MenuItem) {
    let path :string = ("users" + "/" + item.userId + "/" + "cart");
    const ref = doc(this.firestore, path, item.name);
    console.log(ref)
    let message = getDoc(ref).then((doc) => {let message = "agregado al carrito"
      if (!(doc.exists())) {
        setDoc(ref, {name: item.name, type: item.type, quantity: item.quantity})
        return message;
      } else {
        if (item.quantity + doc.get('quantity') < 10) {
          setDoc(ref, {name: item.name, type: item.type, quantity: item.quantity + doc.get("quantity")})
          return message;
        } else {
          return message = "No puedes tener más de 9 productos en el carrito"
        }
      }
    }).catch(() => {return "error"});
    return message;
  }
}
