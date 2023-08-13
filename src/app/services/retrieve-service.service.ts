import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, getDoc, deleteDoc } from '@angular/fire/firestore';
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
    docs.forEach((doc) => {mainDocs.push({name: doc.get("name"), description: doc.get("description"), price: doc.get("price"), img: doc.get("img"), quantity: 1, message: ""})});
    return mainDocs;
  }

  async getAllDocsCart(id : string) {
    let itemList: any[] = [];
    const ref = collection(this.db, id);
    const docs =  await getDocs(ref);
    docs.forEach((doc) => {itemList.push({name: doc.get("name"), type: doc.get("type"), quantity: doc.get("quantity")});});
    return itemList;
  }

  async getDoc(collection: string, id: string) {
    return getDoc(doc(this.db, collection, id));
  }

  async deleteDocument(collection: string, id: string) {
    deleteDoc(doc(this.db, collection, id))
  }

  async deleteUserCart(user: string) {
    let path : string = "users/" + user +"/cart"
    const ref = collection(this.db, path);
    const docs =  await getDocs(ref);
    docs.forEach((doc) => deleteDoc(doc.ref))
  }
}
