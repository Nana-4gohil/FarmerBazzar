import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PulseLoaderComponent } from '../../utils/pulse-loader/pulse-loader.component';


@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,RouterLink,PulseLoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = true;
  showPassword: boolean = false;
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private afAuth: AngularFireAuth,
    // private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  ngOnInit(): void {}

  passwordValidator(control: any) {
    const value = control.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&#]{8,}$/;
    return regex.test(value) ? null : { invalidPassword: true };
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  async handleLogin(): Promise<void> {
    // if (this.loginForm.valid) {
    //   const { email, password } = this.loginForm.value;
    //   this.loading = true;

    //   try {
    //     // const flag = await this.loginService.loginUser({ email, password });
    //     if (flag) {
    //       localStorage.setItem('email', email);
    //       this.router.navigate(['/dashboard']);
    //     } else {
    //       this.passwordError = 'Invalid email or password';
    //     }
    //   } catch (error) {
    //     console.error('Login error:', error);
    //   } finally {
    //     this.loading = false;
    //   }
    // } else {
    //   this.emailError = this.loginForm.get('email')?.hasError('email')
    //     ? 'Enter a valid Gmail address'
    //     : '';
    //   this.passwordError = this.loginForm.get('password')?.hasError('invalidPassword')
    //     ? 'Password must contain at least one uppercase letter, one number, one lowercase letter, one special character, and be at least 8 characters long'
    //     : '';
    // }
  }

  async handleGoogleSignIn(): Promise<void> {
    // const provider = new GoogleAuthProvider();
    // try {
    //   const result = await this.afAuth.signInWithPopup(provider);
    //   if (result.user) {
    //     localStorage.setItem('email', result.user.email || '');
    //     this.router.navigate(['/dashboard']);
    //   }
    // } catch (error) {
    //   console.error('Google Sign-In error:', error);
    // }
  }
}