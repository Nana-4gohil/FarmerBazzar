import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

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
