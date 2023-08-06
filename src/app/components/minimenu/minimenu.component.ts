import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minimenu',
  templateUrl: './minimenu.component.html',
  styleUrls: ['./minimenu.component.css']
})
export class MinimenuComponent{

  @Input() imgSrc: string = "";
  @Input() title: string = "";
  @Input() imgSrc2: string = "";
  @Input() title2: string = "";
  @Input() link: string = "";
  @Input() link2: string = "";

  constructor(private router: Router) {
  }

  navTo(link: string) {
    this.router.navigate([link])
  }

}
