import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CropService } from '../../Services/crop.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent {
  product:any;
  constructor(private route: ActivatedRoute,
    private cropService:CropService
  ) {
   
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProductById(id);
  }
  fetchProductById(id: any): void {
    // this.loading = true;
    this.cropService.getCropById(id).subscribe({
      next: (res) => {
        const {product} = res;
        this.product = product?.data;
      },
      error: (err) => {
      //  this.toast.danger(err.error.error);
      },
      complete: () => {
        // console.log('Signup observable complete');
        // this.showModal = false;
      },
  });
  }
}
