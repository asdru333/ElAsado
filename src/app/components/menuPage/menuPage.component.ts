import { Component, OnInit, Input } from '@angular/core';
import { RetrieveServiceService } from 'src/app/services/retrieve-service.service';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menuItem';

@Component({
  selector: 'app-menuPage',
  templateUrl: './menuPage.component.html',
  styleUrls: ['./menuPage.component.css']
})
export class MenuPageComponent implements OnInit {

  @Input() collection: string = "";
  @Input() index : number = 0;
  items!: any[];
  isLogin: boolean;
  hasLoaded: boolean = false
  user$: Observable<User | null>;


  constructor(private router : Router, private retrieveService : RetrieveServiceService, private authenticationService: AuthenticationServiceService,
    private registerService: RegisterServiceService) {
    this.isLogin = false;
    this.user$ = this.authenticationService.getCurrentUser();
  }

  ngOnInit(): void {
    this.retrieveService.getAllDocs(this.collection).then((mainDocs) => {this.items = mainDocs; this.hasLoaded = true}).catch((error) => {console.log(error)})
    this.user$.subscribe(user => {
      if (user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
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

  async addToCart(item : any) {
    let uid : string = this.authenticationService.getCurrentUserId();
    if (!uid) {
      console.log("user id error");
      return;
    }
    let type: string = ""
    switch (this.index) {
      case 0:
        type = "entries";
        break;
      case 1:
        type = "mainDishes";
        break;
      case 2:
        type = "desserts";
        break;
      case 3:
        type = "beverages";
        break;
      default:
        console.log("food type error")
        return;
    }
    const menuItem : MenuItem = {name : item.name, type: type, quantity: item.quantity, userId: uid};
    item.message = await this.registerService.addCart(menuItem);
    if (item.message.length > 0) {
      console.log(item.message)
      setTimeout(() => {item.message = ""}, 5000)
    }
  }
}
