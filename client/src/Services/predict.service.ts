import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  constructor(private http:HttpClient) { }
  url:string = 'http://localhost:8080/api/v1/predict'
  apiUrl:string = 'https://newsapi.org/v2/everything?q=farming&apiKey=714ef9b8a6ef47d19b4bda6f4f0d100f';
  CropPredict(data:any):Observable<any>{
    return this.http.post(`${this.url}/recommend`,data)
  }
  getNews():Observable<any>{
    return this.http.get(this.apiUrl)
  }
  getAiResponse(userQuery: string): Observable<any> {
    return this.http.post<any>(`${this.url}/query`, { userQuery });
  }
}
