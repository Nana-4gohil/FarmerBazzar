import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from '../../Services/equipment.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-equipment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent implements OnInit {

  equipment = {
    name: '',
    type: '',
    address: '',
    latitude: 0,
    longitude: 0
  };
  map: any;
  marker: any;
  constructor(private equipmentService: EquipmentService) { }
  saveEquipment(): void {
    console.log(this.equipment);
  }

  ngOnInit(): void {
    this.initMap();
    this.getUserLocation();
  }
  initMap(): void {
    this.map = L.map('map').setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([20.5937, 78.9629], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.equipment.latitude = position.lat;
      this.equipment.longitude = position.lng;

      this.equipmentService.getVillageFromCoordinates(position.lat, position.lng)
        .subscribe(data => {
          this.equipment.address = data.display_name || "Unknown Location";
        });
    });
  }
  getUserLocation(): void {
    this.equipmentService.getCurrentLocation().subscribe({
      next: (position: any) => {
        this.equipment.latitude = position.latitude;
        this.equipment.longitude = position.longitude;
        //  this.getAddressFromCoordinates();

        // Set map view to user's location
        this.map.setView([position.latitude, position.longitude], 15);
        this.marker.setLatLng([position.latitude, position.longitude]);
        // Add a marker for the user
        L.marker([this.equipment.latitude, this.equipment.longitude], {
          icon: L.icon({
            iconUrl: 'https://static.vecteezy.com/system/resources/previews/021/495/912/non_2x/google-map-symbol-logo-red-design-illustration-free-vector.jpg',
            iconSize: [30, 50]
          })
        })
          .addTo(this.map)
          .bindPopup('You are here!')
          .openPopup()
      },
      error: (error) => console.error('Error getting location:', error)
    });
  }
}
