import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropCardComponent } from '../crop-card/crop-card.component';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule,FormsModule,CropCardComponent,RouterLink],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {
   
  soldProducts: any[] = [];  // Array of products
  productName: string = "";
  userId: string | null = null;
  isDropdownOpen = false;

  constructor(
    private productService: ProductService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        this.loadSoldProducts();
      } else {
        console.log("No user logged in");
      }
    });
     
  }

  loadSoldProducts() {
    // Fetch the products based on the userId and assign the result to soldProducts array
    this.productService.GetProductBySId(this.userId).subscribe(
      (response) => {
         this.soldProducts = response.products.data
      },
      (error) => {
        console.error('Error fetching sold products:', error);
      }
    );
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
   
}
