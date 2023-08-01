import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-carousel',
  templateUrl: './my-carousel.component.html',
  styleUrls: ['./my-carousel.component.css']
})
export class MyCarouselComponent {

  private imagelist : string[];
  currentImage : string;
  private index : number;
  private autoLoopInterval: any;

  constructor() {
    this.imagelist = [
    "https://recetasespeciales.com/wp-content/uploads/2017/06/carnes-restaurantes.jpg",
    "https://images.unsplash.com/photo-1551014700-0ca41391f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8&w=1000&q=80",
    "https://comecarne.org/wp-content/uploads/2018/07/carne-res-asador.jpg"
    ];
    this.index = 0;
    this.currentImage = this.imagelist[this.index]
  }

  prevSlide() {
    this.index = this.index - 1
    if (this.index < 0) {
      this.index = this.index + this.imagelist.length;
    }
    this.updateCarousel();
    this.resetAutoLoop();
  }

  nextSlide() {
    this.index = (this.index + 1) % this.imagelist.length;
    this.updateCarousel();
    this.resetAutoLoop();
  }

  ngAfterViewInit() {
    this.autoLoop();
  }

  autoLoop() {
    this.autoLoopInterval = setInterval(() => {
      this.index = (this.index + 1) % this.imagelist.length;
      this.updateCarousel();
    }, 3000); // Adjust the interval as needed (in milliseconds)
  }

  resetAutoLoop() {
    clearInterval(this.autoLoopInterval);
    this.autoLoop();
  }

  updateCarousel() {
    this.currentImage = this.imagelist[this.index]
  }
}
