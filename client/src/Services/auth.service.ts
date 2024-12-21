import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth,private http:HttpClient) {}
  private url:string = 'http://localhost:8080/api/v1/auth'

  Login(user:any) : Observable<any>{
       return this.http.post(`${this.url}/login`,user)
  }
  Signup(user:any):Observable<any>{
     return this.http.post(`${this.url}/signup`,user)
  }
  // Sign in with Google
  async loginWithGoogle(): Promise<any> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      return result.user
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error; // Optionally rethrow to handle elsewhere
    }
  }

  // Sign out
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error; // Optionally rethrow to handle elsewhere
    }
  }

  // Get current user state as an observable
  getUser(): Observable<any> {
    return authState(this.auth);
  }


}
