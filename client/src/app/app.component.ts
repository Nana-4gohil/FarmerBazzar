import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '../Pages/login/login.component';
import { SignupComponent } from '../Pages/signup/signup.component';
import { DashboardComponent } from '../Pages/dashboard/dashboard.component';
import {NgToastModule , ToasterPosition} from 'ng-angular-popup';

//  ToasterPosition {
//   TOP_LEFT = 'toaster-top-left',
//   TOP_CENTER = 'toaster-top-center',
//   TOP_RIGHT = 'toaster-top-right',
//   BOTTOM_LEFT = 'toaster-bottom-left',
//   BOTTOM_CENTER = 'toaster-bottom-center',
//   BOTTOM_RIGHT = 'toaster-bottom-right'
// }
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent, SignupComponent ,DashboardComponent,NgToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'client';
  TOP_RIGHT = ToasterPosition.TOP_RIGHT
   
}
