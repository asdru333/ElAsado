import { Component, OnInit } from '@angular/core';
import { Link } from './models/links';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpenMenu: boolean;
  isOpenServices: boolean;
  isLogin: boolean;

  linksOne: Link[];
  linksTwo: Link[];
  menu: Link[];

  constructor() {
    this.isOpenMenu = false;
    this.isOpenServices = false;
    this.isLogin = true;
    this.linksOne = [
      {name:"HOME",link:""},
      {name:"SOBRE NOSOTROS",link:"/about"},
    ];

    this.linksTwo = [
      {name:"PROYECTOS",link:"/Proyectos"},
      {name:"CONTACTO",link:"/Contacto"}
    ];

    this.menu = [
      {name:"Entradas", link:"/Servicios/Diseno-electrico-tramites-planos"},
      {name:"Platos principales", link:"/Servicios/Diagnostico-instalaciones-eléctricas"},
      {name:"Postres", link:"/Servicios/Medicion-calidad-energia"},
      {name:"Bebidas", link:"/Servicios/Pararrayos-mallas-puesta-tierra"},
    ];
  }

  ngOnInit(): void {
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
}
