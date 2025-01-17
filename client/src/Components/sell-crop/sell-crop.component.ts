
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CropService } from '../../Services/crop.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-sell-crop',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sell-crop.component.html',
  styleUrl: './sell-crop.component.css'
})

export class SellCropComponent implements OnInit {
  sellCropForm!: FormGroup;
  img: string | null = null;
  constructor(private fb: FormBuilder,private cropService:CropService, private toast:NgToastService) {}

  onFileChange(event: any): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.img = reader.result as string; // Set the image preview URL
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  }

  ngOnInit(): void {

    this.sellCropForm = this.fb.group({
      productName: ['', Validators.required],
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
    const data = {
      productImage: this.img,
      ...this.sellCropForm.value 
    }
      this.cropService.AddCrop(data).subscribe({
        next: (data) => {
          this.toast.success(data.message);
        },
        error: (error) => {
          this.toast.danger(error.error.message || 'Internal Server Error..');
        },
       

      });
      this.sellCropForm.reset()
    } else {
      this.toast.danger('Please fill all the fields');
    }
  }
}

