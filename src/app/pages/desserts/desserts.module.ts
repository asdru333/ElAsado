import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DessertsComponent } from './desserts.component';
import { MenuPageModule } from 'src/app/components/menuPage/menuPage.module';

@NgModule({
  imports: [
    CommonModule,
    MenuPageModule,
  ],
  declarations: [DessertsComponent]
})
export class DessertsModule { }
