import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-verify-email-popup',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './verify-email-popup.component.html',
  styleUrls: ['./verify-email-popup.component.css']
})
export class VerifyEmailPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userData: any },
  private router: Router,private authService: AuthService
) {}
  @Output() verificationResult: EventEmitter<boolean> = new EventEmitter<boolean>();
  showModal = false
  otp = '';
  errorMessage = '';
  user: any;
  ngOnInit(): void {
      this.user = this.data.userData
      this.showModal = true
      
  }
  resendEmail(){

  }
  closeModal(){
    this.showModal = false
    this.errorMessage = ''
  }
  verifyOtp() {
    this.user.otp = this.otp
    console.log(this.user)
    this.authService.Signup(this.user).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.verificationResult.emit(true)
        alert('Email verified successfully! Redirecting to login page.');
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'The email is not verified. Please try again.';
        this.verificationResult.emit(false); 
      },
      complete: () => {
        console.log('Signup observable complete');
        this.showModal = false;
      },
     
    });
    
  }
}
