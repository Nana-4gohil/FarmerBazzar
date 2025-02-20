import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CropService } from '../../Services/crop.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CropCardComponent } from '../crop-card/crop-card.component';
import { PulseLoaderComponent } from '../../utils/pulse-loader/pulse-loader.component';
import { MapComponent } from '../../utils/map/map.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink,CropCardComponent,PulseLoaderComponent,
  MapComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent {
  constructor(private route: ActivatedRoute, private cropService: CropService, private router: Router
    ,    private modalService: NgbModal,
  ) {
  }
  @ViewChild('ReviewModel') ReviewModel: any;
  product: any;
  data: any;
  @Input() avgReviews: any;
  loading: boolean = false;
  reviews: any;
  canAdd: boolean = true;
  related: any[] = [];
  isAuthenticated = false;
  ratings = [1, 2, 3, 4, 5]; // Rating options
  reviewForm = {
    review: '',
    rating: null as number | null,
  };
  openReviewModal() {
    if(!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
    this.modalService.open(this.ReviewModel, { centered: true });;
  }

 
  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.isAuthenticated = true;
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProductById(id);
  }
  fetchRelatedProducts(productCategory:string) : void {
    this.cropService.getCropByCategoriy(productCategory).subscribe({
      next: (res) => {
        // console.log(res.products);
        this.related = res.products;

      },
      error: (err) => {
        console.error('Error fetching related products:', err);
      },
  });
}
  fetchProductById(id: any): void {
    this.loading = true;
    this.cropService.getCropById(id).subscribe({
      next: (res) => {
        const { product } = res;
        this.product = product?.data;
        this.reviews = this.product?.reviews || [];
        this.fetchRelatedProducts(this.product?.productCategory);
        // this.reviews.find((review: any) => {
        //   if (review.userId === this.product.sellerId) {
        //     this.canAdd = false;
        //   }
        // });
      },
      error: (err) => {
        //  this.toast.danger(err.error.error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
 
  submitReview() {
    if (this.reviewForm.review && this.reviewForm.rating) {
      // Call your API to save the review
      this.reviewForm.rating = +this.reviewForm.rating;
      this.cropService.addReview(this.reviewForm,this.product.productId).subscribe({
        next: (res) => {
          this.reviews = res?.data?.reviews || [];
        },
        error: (err) => {
          console.error('Error submitting review:', err);
        },
      });
      console.log('Submitting Review:', this.reviewForm);
      this.resetForm();
    }
  }

  resetForm() {
    this.reviewForm = {
      review: '',
      rating: null,
    };
  }
}
