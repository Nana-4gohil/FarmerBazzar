import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private http:HttpClient) { }
   url:string = 'http://localhost:8080/api/v1/crop'
   getAllCrops():Observable<any>{
    return this.http.get(`${this.url}/GetAllProducts`);
   }
   getCropById(CropId : any):Observable<any>{
    return this.http.get(`${this.url}/GetProductById/${CropId}`);
   }
   AddCrop(data:any):Observable<any>{
    return this.http.post(`${this.url}/Add`,data);
  }
   getCropByCategoriy(category:any):Observable<any>{
    return of(1);
   }
}
