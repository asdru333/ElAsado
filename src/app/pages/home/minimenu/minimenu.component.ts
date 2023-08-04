import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {
  }

}
