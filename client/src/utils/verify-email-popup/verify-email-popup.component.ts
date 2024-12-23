import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-verify-email-popup',
  standalone:true,
  imports:[FormsModule,CommonModule],
  animations:[

  ],
  templateUrl: './verify-email-popup.component.html',
  styleUrls: ['./verify-email-popup.component.css']
})
export class VerifyEmailPopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userData: any },
  private router: Router,private authService: AuthService,
  private toast:NgToastService
) {}
  @Output() verificationResult: EventEmitter<boolean> = new EventEmitter<boolean>();
  showModal = false
  otp = '';
  errorMessage = '';
  user: any;
  ngOnInit(): void {
      this.user = this.data.userData
      
      this.authService.RequestOTP(this.user.email).subscribe({
        next: (res) => {
          this.showModal = true
          console.log('Response:', res);
        },
        error: (err) => {
          this.showModal = false;
          this.toast.success(err.error.error);
        },
        complete: () => {
          console.log('RequestOTP observable complete');
        },
      });
      
  }
  resendEmail(){

  }
  closeModal(){
    this.showModal = false
    this.errorMessage = ''
  }
  verifyOtp() {
    this.user.otp = this.otp
    this.authService.Signup(this.user).subscribe({
      next: (res) => {
        // console.log('Response:', res);
        // this.verificationResult.emit(true)
        // alert('Email verified successfully! Redirecting to login page.');
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage = 'The email is not verified. Please try again.';
        this.verificationResult.emit(false); 
        this.showModal = false;
      },
      complete: () => {
        console.log('Signup observable complete');
        this.showModal = false;
      },
     
    });
    
  }
}
