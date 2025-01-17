
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CropService } from '../../Services/crop.service';


@Component({
  selector: 'app-sell-crop',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sell-crop.component.html',
  styleUrl: './sell-crop.component.css'
})

export class SellCropComponent implements OnInit {
  sellCropForm!: FormGroup;
  selectedImageFile!: File;

  constructor(private fb: FormBuilder,private cropService:CropService) {}
  onFileChange(event: any): void {
    const file = event?.target?.files[0];
    if (file) {
      this.selectedImageFile = file;
     this.sellCropForm.patchValue({ productImage: file.name }); // Update form control
    }
  }

  ngOnInit(): void {
    this.sellCropForm = this.fb.group({
      productName: ['', Validators.required],
      productImage: ['', Validators.required],
      productPrice: [null, [Validators.required, Validators.min(1)]],
      productDescription: ['', Validators.required],
      productCategory: ['', Validators.required],
      productQuantity: [null, [Validators.required, Validators.min(1)]],
      sellerAddress: ['', Validators.required],
      availableFrom: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.sellCropForm.valid) {
      // console.log('Crop details:', this.sellCropForm.value);
      // alert('Crop sold successfully!');
      this.cropService.AddCrop(this.sellCropForm.value).subscribe({
        next: (data) => {
          console.log('Data:', data);
          alert('Crop sold successfully!');
        },
        error: (error) => {
          console.log('Error:', error);
        },
        complete: () => {

        }

      });
      // this.sellCropForm.reset(); // Reset the form
    } else {
      alert('Please fill in all the required fields correctly!');
    }
  }
}

