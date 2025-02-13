import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnChanges {
  @Input() activeSection!: string;
  @Output() sectionChange = new EventEmitter<string>();
  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeSection']) {
     this.activeSection =  changes['activeSection'].currentValue
      // You can update the local state or perform other actions here
    }
  }

  handleSectionChange(section: string): void {
    this.sectionChange.emit(section);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

