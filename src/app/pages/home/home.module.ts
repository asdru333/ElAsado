import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { MyCarouselComponent } from './my-carousel/my-carousel.component';
import { MinimenuModule } from 'src/app/components/minimenu/minimenu.module';

@NgModule({
  declarations: [
    HomeComponent,
    MyCarouselComponent,
  ],
  imports: [
    BrowserModule,
    MinimenuModule,
  ],
  exports : [
    HomeComponent,
    MyCarouselComponent
  ]
})
export class HomeModule { }
