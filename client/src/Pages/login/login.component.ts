import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PulseLoaderComponent } from '../../utils/pulse-loader/pulse-loader.component';
import { AuthService } from '../../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';



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
      this.authService.Login(userData).subscribe({
        next: (res) => {
          this.toast.success('Login successful');
          this.router.navigate(['/dashboard'])
        },
        error: (err) => {
           this.toast.danger(err.error.error);
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
      localStorage.setItem('email', user?.email || '');
      this.router.navigate(['/dashboard']);
    }catch(err){
      console.log(err);
    }

  }
}