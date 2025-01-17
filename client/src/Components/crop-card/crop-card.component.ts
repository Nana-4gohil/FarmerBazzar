import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { differenceInHours, differenceInMinutes } from 'date-fns';
@Component({
  selector: 'app-crop-card',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './crop-card.component.html',
  styleUrl: './crop-card.component.css'
})
export class CropCardComponent {
  @Input() product: any;
  constructor() {}
  getTimeAgo(timestamp: string): string {
    const inputTime = new Date(timestamp);
    const diffInHours = differenceInHours(new Date(), inputTime);
    const diffInMinutes = differenceInMinutes(new Date(), inputTime);
    if (diffInHours < 1) {
      if (diffInMinutes < 1) {
        return 'Just now';
      } else if (diffInMinutes === 1) {
        return '1 minute ago';
      } else {
        return `${diffInMinutes} minutes ago`;
      }
    } else if (diffInHours === 1) {
      return '1 hour ago';
    } else {
      return `${diffInHours} hours ago`;
    }
  }
}
