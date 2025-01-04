import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crop-recommendations',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './crop-recommendations.component.html',
  styleUrls: ['./crop-recommendations.component.css']
})
export class CropRecommendationsComponent {
  cropForm: FormGroup;
  recommendedCrop = '';
  loading = false;
  error = '';
  cropImage = 'assets/croprec.avif'; // Placeholder image
  showConfetti = false;

  constructor() {
    this.cropForm = new FormGroup({
      soil_ph: new FormControl('', [Validators.required, Validators.min(0), Validators.max(14)]),
      soil_moisture: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      temperature: new FormControl('', [Validators.required, Validators.min(-50), Validators.max(60)]),
      rainfall: new FormControl('', [Validators.required, Validators.min(0), Validators.max(500)]),
      humidity: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    });
  }

  get formControls() {
    return this.cropForm.controls;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    if (this.cropForm.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.showConfetti = false;
    try {
      switch (this.recommendedCrop) {
        case 'Wheat':
          this.cropImage = './assets/wheat.jpg';
          break;
        case 'Rice':
          this.cropImage = './assets/rice.jpg';
          break;
        case 'Barley':
          this.cropImage = './assets/barley.jpg';
          break;
        case 'Maize':
          this.cropImage = './assets/maize.jpg';
          break;
        case 'Sugarcane':
          this.cropImage = './assets/sugarcane.avif';
          break;
        default:
          this.cropImage = './assets/croprec.avif';
      }

      this.showConfetti = true;
      setTimeout(() => this.showConfetti = false, 3000); // Hide confetti after 3 seconds
    } catch (error) {
      this.error = 'Error fetching recommendation. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  handleClear() {
    this.cropForm.reset();
    this.recommendedCrop = '';
    this.error = '';
    this.cropImage = './assets/croprec.avif';
    this.showConfetti = false;
  }
}
