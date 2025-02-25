// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CropService {
//   token: any;
//   url:string = 'http://localhost:8080/api/v1/crop'
//   constructor(private http:HttpClient) {
//     this.token = localStorage.getItem('token');
//    }
//    getAllCrops(): Observable<any> {
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${this.token}`, // Include the token in the Authorization header
//     });

//     return this.http.get(`${this.url}/GetAllProducts`, { headers });
//   }
//    getCropById(CropId : any):Observable<any>{
//     return this.http.get(`${this.url}/GetProductById/${CropId}`);
//    }
//    AddCrop(data:any):Observable<any>{
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${this.token}`, // Include the token in the Authorization header
//     });
//     return this.http.post(`${this.url}/Add`,data,{ headers });
//   }
//    getCropByCategoriy(category:any):Observable<any>{
//     return this.http.get(`${this.url}/ProductCategory/${category}`);
//    }
//    getCropByName(name:string):Observable<any>{
//     return this.http.get(`${this.url}/ProductName/${name}`);
//    }
//    addReview(data:any,productId:string):Observable<any>{
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${this.token}`, // Include the token in the Authorization header
//     });
//     return this.http.post(`${this.url}/AddReview/${productId}`,data,{ headers });
//    }
//     getReviews(productId:string):Observable<any>{
//       return this.http.get(`${this.url}/GetReviews/${productId}`);
//     }


// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CropService {
  private url: string = 'http://localhost:8080/api/v1/crop';

  constructor(private http: HttpClient, private auth: Auth) {}

  // Function to get the latest Firebase Token
  private getAuthToken(): Observable<string> {
    return from(this.auth.currentUser?.getIdToken(true) ?? Promise.resolve(''));
  }

  // Get All Crops
  getAllCrops(): Observable<any> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.url}/GetAllProducts`, { headers });
      })
    );
  }

  // Get Crop By ID
  getCropById(CropId: any): Observable<any> {
    return this.http.get(`${this.url}/GetProductById/${CropId}`);
  }

  // Add Crop
  AddCrop(data: any): Observable<any> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.url}/Add`, data, { headers });
      })
    );
  }

  // Get Crop By Category
  getCropByCategoriy(category: any): Observable<any> {
    return this.http.get(`${this.url}/ProductCategory/${category}`);
  }

  // Get Crop By Name
  getCropByName(name: string): Observable<any> {
    return this.http.get(`${this.url}/ProductName/${name}`);
  }
  
  // Add Review
  addReview(data: any, productId: string): Observable<any> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(`${this.url}/AddReview/${productId}`, data, { headers });
      })
    );
  }

  // Get Reviews
  getReviews(productId: string): Observable<any> {
    return this.http.get(`${this.url}/GetReviews/${productId}`);
  }
}
