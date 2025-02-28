import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false; // Update based on user authentication logic

  searchQuery: string = '';
  dropdownOpen = false;
  constructor(
    private router:Router,
    private tokenService : TokenService 
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = false;
    if(localStorage.getItem('token') !== null) {
      this.isAuthenticated = true;
    }
  }
  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.tokenService.removeToken()
    this.router.navigate(['/login']);
  }
  searchProducts(event:Event): void {
    event.preventDefault();
    event.preventDefault();
    const query = this?.searchQuery?.trim();
    console.log(query)
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
}
