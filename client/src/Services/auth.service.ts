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
  RequestOTP(email:any):Observable<any>{
     return this.http.post(`${this.url}/signup/request-otp`,{email})
  }
  Signup(user:any):Observable<any>{
    return this.http.post(`${this.url}/signup/verify-and-complete`,user)
  }
  // Sign in with Google
 
  async loginWithGoogle(): Promise<any> {
    // Force the user to select an account every time
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account', // This forces the account selection prompt
      });
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
