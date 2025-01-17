import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgToastModule , ToasterPosition} from 'ng-angular-popup';
import { NavbarComponent } from '../utils/navbar/navbar.component';

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
  imports: [RouterOutlet,NgToastModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'FirmarBarzzar';
  TOP_RIGHT = ToasterPosition.TOP_RIGHT
   
}
