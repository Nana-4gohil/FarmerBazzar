import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  registrationSuccess = false;
  passwordVisible = false;
  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
    'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Chandigarh', 'Lakshadweep', 'Delhi', 'Puducherry',
    'Ladakh', 'Jammu and Kashmir', 'Andaman and Nicobar Islands',
  ];

  countryCode = [
    '+91',
    '+92',
    '+93'
  ]

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{10}$/),
  ]);
  state = new FormControl('', Validators.required);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/(?=.*[A-Z])/),
    Validators.pattern(/(?=.*[a-z])/),
    Validators.pattern(/(?=.*\d)/),
    Validators.pattern(/(?=.*[!@#$%^&*])/),
  ]);
  confirmPassword = new FormControl('', Validators.required);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      state: this.state,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  get emailIsInvalid() {
    return this.email.touched && this.email.dirty && this.email.invalid;
  }

  get passwordIsInvalid() {
    return this.password.touched && this.password.dirty && this.password.invalid;
  }

  handleSignup() {
    if (this.signupForm.invalid) {
      return;
    }

    const { password, confirmPassword } = this.signupForm.value;
    if (password !== confirmPassword) {
      this.confirmPassword.setErrors({ mismatch: true });
      return;
    }

    this.loading = true;

    // Simulate API call and navigate
    setTimeout(() => {
      this.loading = false;
      this.registrationSuccess = true;

      const userData = this.signupForm.value;
      console.log('User Data:', userData);

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }, 2000);
  }
}