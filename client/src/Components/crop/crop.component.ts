import { Component, OnInit } from '@angular/core';
import { CropCardComponent } from '../crop-card/crop-card.component';
import { CropService } from '../../Services/crop.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [CropCardComponent,RouterLink],
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.css'
})
export class CropComponent implements OnInit{
  constructor(private cropService:CropService){
  }
  products: any[] = [];
  // crops = [
  //   // {
  //   //   id: 1,
  //   //   image: 'assets/images/rice.jpg',
  //   //   name: 'Rice',
  //   //   quantity: '500kg',
  //   //   price: 1200,
  //   //   unit: 'quintal',
  //   //   location: 'Kolkata, West Bengal',
  //   //   updatedTime: '5 hours ago',
  //   // },
  //   // {
  //   //   id: 2,
  //   //   image: 'assets/images/wheat.jpg',
  //   //   name: 'Wheat',
  //   //   quantity: '300kg',
  //   //   price: 1100,
  //   //   unit: 'quintal',
  //   //   location: 'Ahmedabad, Gujarat',
  //   //   updatedTime: '2 hours ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/cow2.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  //   // {
  //   //   id: 3,
  //   //   image: 'assets/images/corn.jpg',
  //   //   name: 'Corn',
  //   //   quantity: '200kg',
  //   //   price: 900,
  //   //   unit: 'quintal',
  //   //   location: 'Nagpur, Maharashtra',
  //   //   updatedTime: '1 day ago',
  //   // },
  // ];
  ngOnInit(): void {
    this.getAllCrops();
  }
  getAllCrops():void{
    this.cropService.getAllCrops().subscribe({
      next: (res) => {
        const {products} = res;
        console.log(products)
        this.products = products;
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
