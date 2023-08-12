import { Component, OnInit, Input } from '@angular/core';
import { RetrieveServiceService } from 'src/app/services/retrieve-service.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menuItem';
import { PayItem } from 'src/app/models/payItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemNames!: any[];
  items: any[];
  originalItems: any[];
  deletedItems: any[];
  isLogin: boolean;
  hasLoaded: boolean = false
  userId!: string;
  user$: Observable<User | null>;
  totalPrice : number;
  originalTotalPrice : number;
  hasChanged : boolean;

  constructor(private router : Router, private retrieveService : RetrieveServiceService, private authenticationService: AuthenticationServiceService,
    private registerService: RegisterServiceService) {
    this.isLogin = false;
    this.user$ = this.authenticationService.getCurrentUser();
    this.totalPrice = 0;
    this.originalTotalPrice = 0
    this.hasChanged = false;
    this.items = [];
    this.originalItems = [];
    this.deletedItems = [];
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.loadPage();
      }
    });
  }

  async loadPage() {
    this.userId = this.authenticationService.getCurrentUserId();
    let collection : string = "users/" + this.userId + "/cart";
    await this.retrieveService.getAllDocsCart(collection).then((itemList) => {this.itemNames = itemList; this.hasLoaded = true}).catch((error) => {console.log(error)})
    this.itemNames.forEach((ref) => {this.retrieveService.getDoc(ref.type, ref.name).then((item) => {this.items.push({name : item.get('name'),
    img : item.get('img'), price : item.get('price'), quantity: ref.quantity, type: ref.type, isModified: false});
    this.totalPrice = this.totalPrice + ( ref.quantity * item.get('price'));
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    this.originalTotalPrice = this.totalPrice;
    this.originalItems = structuredClone(this.items);})});
  }

  navigateTo(link : string) {
    this.router.navigate([link])
  }

  addQuantity(item : any) {
    if (item.quantity+1 < 10) {
      item.quantity = item.quantity + 1;
      item.isModified = true;
      this.totalPrice = this.totalPrice + item.price;
      this.totalPrice = Math.round(this.totalPrice * 100) /100
      this.hasChanged = true;
    }
  }

  subtractQuantity(item : any) {
    if (item.quantity-1 > 0) {
      item.quantity = item.quantity - 1;
      item.isModified = true;
      this.totalPrice = this.totalPrice - item.price;
      this.totalPrice = Math.round(this.totalPrice * 100) / 100
      this.hasChanged = true;
    }
  }

  revertChanges() {
    this.items = structuredClone(this.originalItems);
    this.totalPrice = this.originalTotalPrice;
    this.hasChanged = false;
  }

  deleteItem(item : any) {
    item.isModified = false;
    this.deletedItems.push(item);
    this.totalPrice = this.totalPrice - (item.price * item.quantity)
    this.totalPrice = Math.round(this.totalPrice * 100) / 100
    this.items.splice(this.items.indexOf(item), 1);
    this.hasChanged = true;
  }

  async navigateToPay() {
    let allProducts : string = ""
    this.items.forEach((item) => {allProducts = allProducts + (item.name + " x" + item.quantity + "\n")})
    let payItem : PayItem = {products : allProducts, totalPrice: this.totalPrice, userId: this.userId};
    await this.registerService.addPay(payItem)
    this.router.navigate(['payInformation']);
  }

  saveChanges() {
    this.deletedItems.forEach((item) => {this.retrieveService.deleteDoc("users/"+this.userId+"/cart", item.name).catch((error) => {console.log(error); return})})
    let message = ""
    this.items.forEach(async (item) => {
      if (item.isModified) {
        let menuItem : MenuItem = {name: item.name, type: item.type, quantity: item.quantity, userId: this.userId};
        message = await this.registerService.updateCart(menuItem);
        if (message.length > 0 && !message.includes("error")) {
          this.originalTotalPrice = this.totalPrice;
          this.originalItems= structuredClone(this.items);
        }
      }
    });
    this.hasChanged = false;
  }
}
