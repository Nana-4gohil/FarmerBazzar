import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PulseLoaderComponent } from '../../utils/pulse-loader/pulse-loader.component';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import {TokenService} from '../../Services/token.service'

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,RouterLink,PulseLoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  showPassword: boolean = false;
  emailError: string = '';
  passwordError: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
   private authService: AuthService,
   private tokenService : TokenService,
   private toast:NgToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  ngOnInit(): void {}

  passwordValidator(control: any) {
    const value = control.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{2,}$/;
    return regex.test(value) ? null : { invalidPassword: true };
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  async handleLogin(): Promise<void> {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.loading = true;
      await this.authService.logout().toPromise();
      this.authService.Login(userData).subscribe({
        next: (res) => {
          const {token} = res
          this.tokenService.storeToken(token)
          localStorage.setItem("loginMethod","manual")
          //localStorage.setItem('token', token);
          this.toast.success('Login successful');
          this.router.navigate(['/'])
        },
        error: (err) => {
           this.toast.danger(err.error.error || 'Internal Server Error..');
           this.loading = false;
        },
      
      })
    }else{
      return;
    }

  }

  async handleGoogleSignIn(): Promise<void> {
    try{
      var user = await this.authService.loginWithGoogle();
      const idToken = await user.getIdToken(true);
      this.tokenService.storeToken(idToken)
      localStorage.setItem("loginMethod","Google")
    //  localStorage.setItem('token', idToken);
      await this.router.navigate(['/']);
    }catch(err:any){
      console.log(err);
       // Handle specific errors with user-friendly messages
       if (err.code === 'auth/popup-closed-by-user') {
        console.warn('Sign-In was canceled by the user.');
      } else if (err.code === 'auth/network-request-failed') {
        alert('Network error. Please check your connection and try again.');
      } else {
        console.error('Unhandled error during sign-in:', err);
      }
    }

  }
}