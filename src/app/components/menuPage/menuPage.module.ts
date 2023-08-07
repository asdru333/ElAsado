import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPageComponent } from './menuPage.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuPageComponent],
  exports: [MenuPageComponent]
})
export class MenuPageModule { }
