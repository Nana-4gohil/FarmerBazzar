// import { Component } from '@angular/core';
// import { ProductService } from '../../Services/product.service';
// import { Auth, onAuthStateChanged } from '@angular/fire/auth';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CropCardComponent } from '../crop-card/crop-card.component';
// import { RouterLink } from '@angular/router';



// @Component({
//   selector: 'app-transaction',
//   standalone: true,
//   imports: [CommonModule,FormsModule,CropCardComponent,RouterLink],
//   templateUrl: './transaction.component.html',
//   styleUrl: './transaction.component.css'
// })
// export class TransactionComponent {
   
//   pendingProducts: any[] = [];  // Array of products
//   soldProducts: any[] = [];
//   productName: string = "";
//   userId: string | null = null;
//   isDropdownOpen = false;
//   isSoldDropdownOpen = false

//   constructor(
//     private productService: ProductService,
//     private auth: Auth
//   ) {}

//   ngOnInit(): void {
//     onAuthStateChanged(this.auth, (user) => {
//       if (user) {
//         this.userId = user.uid;
//         this.loadSoldProducts();
//       } else {
//         console.log("No user logged in");
//       }
//     });
     
//   }

//   loadProducts() {
//     if (!this.userId) return;

//     this.productService.GetProductBySId(this.userId).subscribe(
//       (response) => {
//         if (response.products && response.products.data) {
//           this.pendingProducts = response.products.data.filter((product: any) => !product.isSold);
//           this.soldProducts = response.products.data.filter((product: any) => product.isSold);
//         }
//       },
//       (error) => {
//         console.error('Error fetching products:', error);
//       }
//     );
//   }
//   toggleDropdown() {
//     this.isDropdownOpen = !this.isDropdownOpen;
//   }
   
//   toggleSoldDropdown(){
//       this.isSoldDropdownOpen = !this.isSoldDropdownOpen
//   }
// }


import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropCardComponent } from '../crop-card/crop-card.component';
import { RouterLink } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, CropCardComponent, RouterLink],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  pendingProducts: any[] = [];
  soldProducts: any[] = [];
  userId: string | null = null;
  isDropdownOpen = false;
  isSoldDropdownOpen = false;

  constructor(
    private productService: ProductService,
    private auth: Auth,
    private toast:NgToastService
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.loadProducts();
      } else {
        console.log("No user logged in");
      }
    });
  }

  loadProducts() {
    if (!this.userId) return;

    this.productService.GetProductBySId(this.userId).subscribe(
      (response) => {
        if (response.products && response.products.data) {
          const products = response.products.data;
          this.soldProducts = products.filter((product: any) => product.isSold && product.sellerId === this.userId);
          this.pendingProducts = products.filter((product: any) => !product.isSold && product.sellerId === this.userId);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSoldDropdown() {
    this.isSoldDropdownOpen = !this.isSoldDropdownOpen;
  }

  markAsSold(productId: string) {
    if (!this.userId) return;

    this.productService.MarkProductAsSold(productId).subscribe(
      () => {
        // Find the product in pendingProducts and move it to soldProducts
        const productIndex = this.pendingProducts.findIndex(p => p.productId === productId);
        if (productIndex > -1) {
          const product = this.pendingProducts[productIndex];
          product.isSold = true;

          // Move product to soldProducts list
          this.soldProducts.unshift(product);
          this.pendingProducts.splice(productIndex, 1);
        }
      },
      (error) => {
        console.error('Error marking product as sold:', error);
      }
    );
  }
}
