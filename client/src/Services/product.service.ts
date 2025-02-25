import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token: any;
  url:string = 'http://localhost:8080/api/v1/crop'
  constructor(private http:HttpClient) {
   }
  GetProductBySId(SellerId:any):Observable<any>{
    return this.http.get(`${this.url}/GetProductBySellerId/${SellerId}`);
  }
  GetUserByUid(uid:any): Observable<any>{
     return this.http.get(`${this.url}/`)
  }
  MarkProductAsSold(productId:string):Observable<any>{
    return this.http.delete(`${this.url}/delete/${productId}`)
 }

}
