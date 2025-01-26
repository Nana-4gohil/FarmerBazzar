import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  banners = [
    { img: 'assets/banana.jpg' },
    { img: 'assets/cotton.jpg' },
  ];
  currentIndex: number = 0;

  ngOnInit() {
    if (this.banners.length > 0) {
      this.currentIndex = 0;
    }
  }

  goToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  goToPrevious() {
    this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }
}
