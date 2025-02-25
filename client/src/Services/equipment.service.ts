// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EquipmentService {
//    url:string = "https://nominatim.openstreetmap.org/reverse";
//    baseUrl:string = "http://localhost:8080/api/v1/equipment";
//   constructor(private http : HttpClient) { }
//   getVillageFromCoordinates(lat: number, lon: number): Observable<any> {
//     return this.http.get(`${this.url}?lat=${lat}&lon=${lon}&format=json`);
//   }
//   getCurrentLocation(): Observable<{ latitude: number; longitude: number }> {
//     return new Observable(observer => {
//       if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             observer.next({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude
//             });
//             observer.complete();
//           },
//           (error) => {
//             observer.error(this.getLocationErrorMessage(error));
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Ensures fresh & accurate data
//         );
//       } else {
//         observer.error('Geolocation is not supported by this browser.');
//       }
//     });
//   }
  
//   /**
//    * Provides human-readable error messages for debugging
//    */
//   private getLocationErrorMessage(error: GeolocationPositionError): string {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         return 'User denied the request for Geolocation. Please enable location access in browser settings.';
//       case error.POSITION_UNAVAILABLE:
//         return 'Location information is unavailable. Try again later or check your internet connection.';
//       case error.TIMEOUT:
//         return 'The request to get user location timed out. Try refreshing the page.';
//       default:
//         return 'An unknown error occurred while fetching location.';
//     }
//   }
//   getNearbyEquipment(lat: number, lon: number, maxKM: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/filter?lat=${lat}&lon=${lon}&maxKM=${maxKM}`);
//   }
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private url: string = "https://nominatim.openstreetmap.org/reverse";
  private baseUrl: string = "http://localhost:8080/api/v1/equipment";

  constructor(private http: HttpClient, private auth: Auth) {}

  // Get the latest Firebase authentication token
  private getAuthToken(): Observable<string> {
    return from(this.auth.currentUser?.getIdToken(true) ?? Promise.resolve(''));
  }

  // Get village details from coordinates (No authentication required)
  getVillageFromCoordinates(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.url}?lat=${lat}&lon=${lon}&format=json`);
  }

  // Get user's current geolocation
  getCurrentLocation(): Observable<{ latitude: number; longitude: number }> {
    return new Observable(observer => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            observer.complete();
          },
          (error) => {
            observer.error(this.getLocationErrorMessage(error));
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Ensures fresh & accurate data
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  // Get nearby equipment (Requires authentication)
  getNearbyEquipment(lat: number, lon: number, maxKM: number): Observable<any> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.baseUrl}/filter?lat=${lat}&lon=${lon}&maxKM=${maxKM}`, { headers });
      })
    );
  }

  // Provides human-readable error messages for debugging
  private getLocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation. Please enable location access in browser settings.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable. Try again later or check your internet connection.';
      case error.TIMEOUT:
        return 'The request to get user location timed out. Try refreshing the page.';
      default:
        return 'An unknown error occurred while fetching location.';
    }
  }
}
