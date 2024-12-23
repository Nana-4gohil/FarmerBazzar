import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../Pages/login/login.component';
import { SignupComponent } from '../Pages/signup/signup.component';
import { DashboardComponent } from '../Pages/dashboard/dashboard.component';
import {NgToastModule} from 'ng-angular-popup';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent, SignupComponent ,DashboardComponent,NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'client';

}
