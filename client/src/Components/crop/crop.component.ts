import { Component } from '@angular/core';
import { CropCardComponent } from '../crop-card/crop-card.component';


@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [CropCardComponent],
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.css'
})
export class CropComponent {
  crops = [
    {
      id: 1,
      image: 'assets/images/rice.jpg',
      name: 'Rice',
      quantity: '500kg',
      price: 1200,
      unit: 'quintal',
      location: 'Kolkata, West Bengal',
      updatedTime: '5 hours ago',
    },
    {
      id: 2,
      image: 'assets/images/wheat.jpg',
      name: 'Wheat',
      quantity: '300kg',
      price: 1100,
      unit: 'quintal',
      location: 'Ahmedabad, Gujarat',
      updatedTime: '2 hours ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/cow2.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
    {
      id: 3,
      image: 'assets/images/corn.jpg',
      name: 'Corn',
      quantity: '200kg',
      price: 900,
      unit: 'quintal',
      location: 'Nagpur, Maharashtra',
      updatedTime: '1 day ago',
    },
  ];
  constructor(){
    this.crops.forEach(c => {
      c.image = './assets/rice.jpg'
    });
  }
 
  
}
