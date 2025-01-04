import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingCart,faHeart,faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-crop-card',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './crop-card.component.html',
  styleUrl: './crop-card.component.css'
})
export class CropCardComponent {
  @Input() product: any;
  totalData: number = 0; // Total number of products, should be fetched from API
  fashop = faShoppingCart
  faheart = faHeart
  fastar = faStar
  constructor() {}

  ngOnInit(): void {
    // this.fetchProducts();
  }

  fetchProducts(): void {
    // Fetch initial products from your service
    // Example:
    // this.dataService.getProducts().subscribe((response) => {
    //   this.data = response.products;
    //   this.totalData = response.totalData;
    // });
  }

  addToCart(product: any): void {
    // Handle add to cart logic here
    console.log('Added to cart:', product);
  }

  // loadMore(): void {
  //   // Handle load more functionality here
  //   console.log('Load more products...');
  // }
}
