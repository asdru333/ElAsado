import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MinimenuModule } from 'src/app/components/minimenu/minimenu.module';

@NgModule({
  imports: [
    CommonModule,
    MinimenuModule
  ],
  declarations: [
    MenuComponent,
  ]
})
export class MenuModule { }
