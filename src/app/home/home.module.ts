import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { MinimenuComponent } from './minimenu/minimenu.component';
import { MyCarouselComponent } from './my-carousel/my-carousel.component';

@NgModule({
  declarations: [
      HomeComponent,
      MinimenuComponent,
      MyCarouselComponent
   ],
  imports: [
    BrowserModule,
  ],
  exports : [
    HomeComponent,
    MinimenuComponent,
    MyCarouselComponent
  ]
})
export class HomeModule { }
