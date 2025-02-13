import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PulseLoaderComponent } from '../../utils/pulse-loader/pulse-loader.component';
import { ErrorBoundaryComponent } from '../errorboundary/errorboundary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle, faCircleQuestion ,faFile,
  faRightFromBracket,faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TempChartComponent } from '../temp-chart/temp-chart.component';
import { CropComponent } from '../../Components/crop/crop.component';
import { CropRecommendationsComponent } from '../../Predict/crop-recommendations/crop-recommendations.component';
import { SellCropComponent } from '../../Components/sell-crop/sell-crop.component';
import { NewsComponent } from '../news/news.component';
import { AddEquipmentComponent } from '../../Components/add-equipment/add-equipment.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,PulseLoaderComponent,ErrorBoundaryComponent,
    SidebarComponent,
    TempChartComponent,
    CropComponent,
    CropRecommendationsComponent,
    SellCropComponent,
    NewsComponent,
    AddEquipmentComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  fque = faQuestionCircle
  faFile = faFile 
  faLogout = faRightFromBracket
  faHelp = faCircleQuestion
  faChevronDown = faChevronDown
  loading = true;
  activeSection = 'dashboard';
  showUserProfile = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    if(localStorage.getItem('token') === null){
      this.router.navigate(['/login']);
    }
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
  toggleUserProfile(): void {
    this.showUserProfile = !this.showUserProfile;
  }

  handleSectionChange(section: string): void {
    this.activeSection = section;
  }

  viewProfile(): void {
    this.router.navigate(['/dashboard/terms-and-conditions']);
  }

  feedback(): void {
    this.router.navigate(['/dashboard/community-forum']);
  }

  faqs(): void {
    this.router.navigate(['/dashboard/faqs']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

