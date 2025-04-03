import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private token: any;
  url:string = 'http://localhost:8080/api/v1/crop'
  constructor(private http:HttpClient,private tokeService:TokenService) {
          this.token = tokeService.getToken();
   }
  GetProductBySId(SellerId:any):Observable<any>{
    return this.http.get(`${this.url}/GetProductBySellerId/${SellerId}`);
  }
  GetUserByUid(uid:any): Observable<any>{
     return this.http.get(`${this.url}/GetUser/${uid}`)
  }
  MarkProductAsSold(productId:string):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete(`${this.url}/delete/${productId}`,{headers})
 }

}
