// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {

//    private provider = new GoogleAuthProvider()
//   constructor(private auth: Auth,private http:HttpClient) {
//      this.provider.setCustomParameters({
//        prompt: 'select_account', // This forces the account selection prompt
//      });
//   }
//   private url:string = 'http://localhost:8080/api/v1/auth'

//   Login(user:any) : Observable<any>{
//        return this.http.post(`${this.url}/login`,user)
//   }
//   RequestOTP(email:any):Observable<any>{
//      return this.http.post(`${this.url}/signup/request-otp`,{email})
//   }
//   Signup(user:any):Observable<any>{
//     return this.http.post(`${this.url}/signup/verify-and-complete`,user)
//   }

//   UserById(uid:any):Observable<any>{
//     return this.http.get(`${this.url}/GetUser/${uid}`)
//   }
//   // Sign in with Google
 
//   async loginWithGoogle(): Promise<any> {
//     // Force the user to select an account every time
//     try {
//       // const provider = new GoogleAuthProvider();
//       // provider.setCustomParameters({
//       //   prompt: 'select_account', // This forces the account selection prompt
//       // });
//       const result = await signInWithPopup(this.auth,this.provider);
//       return result.user
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       throw error; // Optionally rethrow to handle elsewhere
//     }
//   }

//   // Sign out
//   async logout(): Promise<void> {
//     try {
//       await signOut(this.auth);
//       console.log('User signed out');
//     } catch (error) {
//       console.error('Error during sign-out:', error);
//       throw error; // Optionally rethrow to handle elsewhere
//     }
//   }

//   // Get current user state as an observable
//   getUser(): Observable<any> {
//     return authState(this.auth);
//   }

 
// }


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private provider = new GoogleAuthProvider();
  private url: string = 'http://localhost:8080/api/v1/auth';

  constructor(private auth: Auth, private http: HttpClient) {
    this.provider.setCustomParameters({
      prompt: 'select_account', // Forces account selection
    });
  }

  // Get the latest Firebase authentication token
  private getAuthToken(): Observable<string> {
    return from(this.auth.currentUser?.getIdToken(true) ?? Promise.resolve(''));
  }

  // Login
  Login(user: any): Observable<any> {
    return this.http.post(`${this.url}/login`, user);
  }

  // Request OTP
  RequestOTP(email: any): Observable<any> {
    return this.http.post(`${this.url}/signup/request-otp`, { email });
  }

  // Signup
  Signup(user: any): Observable<any> {
    return this.http.post(`${this.url}/signup/verify-and-complete`, user);
  }

  // Get User By ID (Requires Auth Token)
  UserById(uid: any): Observable<any> {
    return this.getAuthToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(`${this.url}/GetUser/${uid}`, { headers });
      })
    );
  }

  // Sign in with Google
  async loginWithGoogle(): Promise<any> {
    try {
      const result = await signInWithPopup(this.auth, this.provider);
      return result.user;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }

  // Sign out
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }

  // Get current user state as an observable
  getUser(): Observable<any> {
    return authState(this.auth);
  }
}

