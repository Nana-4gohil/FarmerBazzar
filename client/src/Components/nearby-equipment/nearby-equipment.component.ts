import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { EquipmentService } from '../../Services/equipment.service';
import { FiltersComponent } from '../filters/filters.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphService } from '../../Services/graph.service';
@Component({
  selector: 'app-nearby-equipment',
  standalone: true,
  imports: [FiltersComponent, CommonModule, FormsModule],
  templateUrl: './nearby-equipment.component.html',
  styleUrl: './nearby-equipment.component.css'
})
export class NearbyEquipmentComponent implements AfterViewInit {
  @ViewChild('bookingModal') bookingModal: any;
  booking = {
    equipmentId: '',
    userId: 'user_123', // Replace with actual logged-in user ID
    date: '',
    duration: 1
  };

  private map1!: L.Map;
  filters: any
  private markers: L.Marker[] = [];
  userLatitude!: number;
  userLongitude!: number;
  customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Location Pin Icon
    iconSize: [40, 40],  // Icon size
    iconAnchor: [20, 40], // Positioning
    popupAnchor: [0, -35] // Popup positioning
  });


  constructor(
    // private geolocationService: GeolocationService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.initMap();
    this.getUserLocation();
    // this.fetchRoadPolylines()
  }

  private initMap(): void {
    this.map1 = L.map('map1').setView([23.022505, 72.5713621], 5); // Default center: India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map1);

    this.map1.on("load", () => {
      this.graphService.extractGraphFromMap(this.map1);
    });
  }

  private getUserLocation(): void {
    this.equipmentService.getCurrentLocation().subscribe({
      next: (position: any) => {
        this.userLatitude = position.latitude;
        this.userLongitude = position.longitude;
        // console.log('User location:', this.userLatitude, this.userLongitude);
        // this.getAddressFromCoordinates();

        // Set map view to user's location
        this.map1.flyTo([this.userLatitude, this.userLongitude], 12, {
          animate: true,
          duration: 2 // Smooth transition time in seconds
        });

        // Add a marker for the user
        L.marker([this.userLatitude, this.userLongitude], { icon: this.customIcon })
          .addTo(this.map1)
          .bindPopup('You are here!')
          .openPopup();

        // this.loadNearbyEquipment();
      },
      error: (error) => console.error('Error getting location:', error)
    });
  }

  //  private fetchRoadPolylines(): void {
  //       const overpassQuery = `
  //         [out:json];
  //         way["highway"](23.00,72.50,23.05,72.60); // Bounding box (Ahmedabad region)
  //         out geom;
  //       `;
    
  //       // const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
  //       // fetch(url)
  //       //   .then(response => response.json())
  //       //   .then(data => {
  //       //     this.processOSMData(data);
  //       //   })
  //       //   .catch(error => console.error("Error fetching road data:", error));
  //     }
    
  //     // ✅ Process OSM Data and Draw Polylines
  //     // private processOSMData(data: any): void {
  //     //   data.elements.forEach((element: any) => {
  //     //     if (element.type === "way" && element.geometry) {
  //     //       const latLngs = element.geometry.map((point: any) => [point.lat, point.lon]);
    
  //     //       // Draw polyline on map
  //     //       const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(this.map1);
    
  //     //       // ✅ Extract Graph Data
  //     //       // this.extractGraphFromMap(polyline);
  //     //       // this.graphService.extractGraphFromMap(this.map1);
  //     //     }
  //     //   });
    
  //       // console.log("Road Graph Extracted:", this.roadGraph);
  //     }
  




  private loadNearbyEquipment(): void {
    this.equipmentService.getNearbyEquipment(this.userLatitude, this.userLongitude, this.filters?.maxKM).subscribe({
      next: (response) => {
        // console.log('Nearby equipment:', response);
        // 🔹 Clear existing markers before adding new ones
        this.markers.forEach(marker => this.map1.removeLayer(marker));
        this.markers = []; // Reset marker array

        response?.data?.forEach((equipment: any) => {
          const marker = L.marker([equipment.latitude, equipment.longitude], { icon: this.customIcon })
            .addTo(this.map1)
            .bindPopup(`
              <div style="text-align: center;">
                <strong>${equipment.name}</strong><br/>
                <span>📍 ${equipment.latitude}, ${equipment.longitude}</span><br/>
                <span>💰 ₹${equipment.price_per_day}/day</span><br/>
                 ${equipment.availability
                ? `<button id="bookBtn-${equipment.name.replace(/\s+/g, '')}" class="btn btn-primary btn-sm mt-2">Book Now</button>`
                : '<span style="color: red;">🔴 Not Available</span>'}
              </div>
            `)
          marker.on("popupopen", () => {
            if (equipment.availability) {
              const buttonId = `bookBtn-${equipment.name.replace(/\s+/g, '')}`; // Unique ID for button
              const bookBtn = document.getElementById(buttonId);
              if (bookBtn) {
                bookBtn.addEventListener("click", () => {
                  this.bookEquipment(equipment); // ✅ Open modal when button is clicked
                });
              }
            }
          });
          this.markers.push(marker); // Store new marker
        });
      },
      error: (error) => console.error('Error getting nearby equipment:', error)
    });
  }
  getAddressFromCoordinates(): void {
    this.equipmentService.getVillageFromCoordinates(this.userLatitude, this.userLongitude).subscribe({
      next: (response) => {
        console.log('Village:', response.address.village);
        console.log('State:', response.address);
      },
      error: (error) => console.error('Error getting village:', error)
    });
  }
  applyFilters(filters: any) {
    this.filters = filters;
    this.loadNearbyEquipment();
    // Apply API filtering logic here
  }
  bookEquipment(content: any) {
    this.modalService.open(this.bookingModal, { centered: true });;
  }
  confirmBooking() {
    const newBooking = {
      equipmentId: this.booking.equipmentId,
      userId: this.booking.userId,
      date: this.booking.date,
      duration: this.booking.duration
    };
    console.log('Booking:', newBooking);

    // this.equipmentService.bookEquipment(newBooking).subscribe({
    //   next: () => {
    //     alert('Booking Confirmed!');
    //     // Refresh equipment availability
    //     this.loadNearbyEquipment();
    //   },
    //   error: (error) => console.error('Error booking equipment:', error)
    // });
  }

}