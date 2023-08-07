import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs } from '@angular/fire/firestore';
import { MenuItem } from '../models/menuItem';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrieveServiceService {

  constructor(private db : Firestore) { }

  async getAllDocs(id : string) {
    let mainDocs: any[] = [];
    const ref = collection(this.db, id);
    const docs =  await getDocs(ref);
    docs.forEach((doc) => {mainDocs.push({name: doc.get("name"), description: doc.get("description"), price: doc.get("price"), img: doc.get("img")})});
    return mainDocs;
  }
}
