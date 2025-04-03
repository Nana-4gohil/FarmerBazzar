import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import {firebaseConfig} from '../environments/environment'
import { faL } from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private SECRET_KEY = firebaseConfig.SECRET_KEY
  private SIGNATURE_KEY = firebaseConfig.SIGNATURE_KEY
  constructor() { }

  encryptToken(token:string):string{
      return CryptoJS.AES.encrypt(token,this.SECRET_KEY).toString();
  }

  generateSignature(token:string):string{
      return CryptoJS.HmacSHA256(token,this.SIGNATURE_KEY).toString()
  }

  decryptToken(encryptedToken:string):string | null{
       try{
           const bytes = CryptoJS.AES.decrypt(encryptedToken,this.SECRET_KEY)
           return bytes.toString(CryptoJS.enc.Utf8) || null
       }catch(error){
            return null;
       }
  }

  storeToken(token:string):void{
       const encryptedToken = this.encryptToken(token)
       const signature = this.generateSignature(encryptedToken)
       localStorage.setItem("token",encryptedToken)
       localStorage.setItem("signature",signature)
  }

  isTokenValid(): boolean {
    const encryptedToken = localStorage.getItem("token");
    const storedSignature = localStorage.getItem("signature");

    if (!encryptedToken || !storedSignature) return false;

    const expectedSignature = this.generateSignature(encryptedToken);
    return storedSignature === expectedSignature;
  }
  getToken(): string | null {
    if (!this.isTokenValid()) {
      this.removeToken();
      return null;
    }
    const token = this.decryptToken(localStorage.getItem("token")!)
    if (token) {
       this.storeToken(token)
    }
  return token
  }
   // Remove token
   removeToken(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("signature");
  }

}