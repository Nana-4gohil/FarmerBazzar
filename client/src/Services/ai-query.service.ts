import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiQueryService {
  private apiUrl = 'http://localhost:8080/api/v1/query'; // Your backend endpoint

  constructor(private http: HttpClient) {}

  getAiResponse(userQuery: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { userQuery });
  }
}
