import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private http:HttpClient) { }
   url:string = 'http://localhost:8080/api/v1/crop'
   token = localStorage.getItem('token');
   getAllCrops(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Include the token in the Authorization header
    });

    return this.http.get(`${this.url}/GetAllProducts`, { headers });
  }
   getCropById(CropId : any):Observable<any>{
    return this.http.get(`${this.url}/GetProductById/${CropId}`);
   }
   AddCrop(data:any):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Include the token in the Authorization header
    });
    return this.http.post(`${this.url}/Add`,data,{ headers });
  }
   getCropByCategoriy(category:any):Observable<any>{
    return of(1);
   }
}
