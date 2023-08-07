import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDishesComponent } from './mainDishes.component';
import { MenuPageModule } from 'src/app/components/menuPage/menuPage.module';

@NgModule({
  imports: [
    CommonModule,
    MenuPageModule
  ],
  declarations: [MainDishesComponent]
})
export class MainDishesModule { }
