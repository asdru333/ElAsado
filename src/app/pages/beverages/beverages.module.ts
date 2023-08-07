import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeveragesComponent } from './beverages.component';
import { MenuPageModule } from 'src/app/components/menuPage/menuPage.module';

@NgModule({
  imports: [
    CommonModule,
    MenuPageModule
  ],
  declarations: [BeveragesComponent]
})
export class BeveragesModule { }
