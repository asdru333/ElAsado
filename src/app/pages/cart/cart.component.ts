import { Component, OnInit, Input } from '@angular/core';
import { RetrieveServiceService } from 'src/app/services/retrieve-service.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemNames!: any[];
  items: any[] = [];
  isLogin: boolean;
  hasLoaded: boolean = false
  userId!: string;
  user$: Observable<User | null>;

  constructor(private router : Router, private retrieveService : RetrieveServiceService, private authenticationService: AuthenticationServiceService,
    private registerService: RegisterServiceService) {
    this.isLogin = false;
    this.user$ = this.authenticationService.getCurrentUser();
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.loadPage()
      }
    });
  }

  async loadPage() {
    this.userId = this.authenticationService.getCurrentUserId();
    let collection : string = "users/" + this.userId + "/" + "cart";
    console.log(collection);
    await this.retrieveService.getAllDocsCart(collection).then((itemList) => {this.itemNames = itemList; this.hasLoaded = true}).catch((error) => {console.log(error)})
    this.itemNames.forEach((ref) => {this.retrieveService.getDoc(ref.type, ref.name).then((item) => {this.items.push({name : item.get('name'),
    img : item.get('img'), price : item.get('price'), quantity: ref.quantity})})});
    console.log(this.itemNames)
  }

  navigateTo(link : string) {
    this.router.navigate([link])
  }

  addQuantity(item : any) {
    if (item.quantity+1 < 10) {
      item.quantity = item.quantity + 1;
    }
  }

  subtractQuantity(item : any) {
    if (item.quantity-1 > 0) {
      item.quantity = item.quantity - 1;
    }
  }
}
