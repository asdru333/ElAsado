import { Component, OnInit } from '@angular/core';
import { Link } from './models/links';
import { AuthenticationServiceService} from 'src/app/services/authentication-service.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpenMenu: boolean;
  isOpenServices: boolean;
  isLogin: boolean

  linksOne: Link[];
  menu: Link[];

  user$: Observable<User | null>;

  constructor(public authenticationService : AuthenticationServiceService, private router: Router) {
    this.isOpenMenu = false;
    this.isOpenServices = false;
    this.isLogin = false
    this.user$ = this.authenticationService.getCurrentUser();
    this.linksOne = [
      {name:"HOME",link:""},
      {name:"SOBRE NOSOTROS",link:"about"},
    ];

    this.menu = [
      {name:"Entradas", link:"menu/entries"},
      {name:"Platos principales", link:"menu/mainDishes"},
      {name:"Postres", link:"menu/desserts"},
      {name:"Bebidas", link:"menu/beverages"},
    ];
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  toggleNavbar(): void {
    this.isOpenMenu = !this.isOpenMenu
  }

  openDropdown(): void {
    if (window.innerWidth >= 1024) {
      this.isOpenServices = true
    }
  }

  fullScreen(): number {
    return window.innerWidth
  }

  closeDropdown(): void {
    if (window.innerWidth >= 1024) {
      this.isOpenServices = false
    }
  }

  toggleDropdown(): void {
    this.isOpenServices = !this.isOpenServices
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
