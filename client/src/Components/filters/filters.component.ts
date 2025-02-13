import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
 minMaxKM: { km_min: number; km_max: number } = {
    km_min: 100,
    km_max: 50000,
  };
  cats: { category__id: number; category__title: string }[] = [
    { category__id: 1, category__title: 'Electronics' },
    { category__id: 2, category__title: 'Furniture' },
    { category__id: 3, category__title: 'Clothing' },
  ];

  @Output() filterChange = new  EventEmitter<any>();
  selectedFilters: { [key: string]: any } = {
    maxKM: 0,
    categories: new Set<number>(),
  };

  constructor() {}

  ngOnInit() {
    this.selectedFilters['maxKM'] = this.minMaxKM?.km_max || 0;
  }

  updateKM(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedFilters['maxKM'] = Number(inputElement.value);
    
  }

  toggleSelection(filterType: string, value: number) {
    if (this.selectedFilters[filterType].has(value)) {
      this.selectedFilters[filterType].delete(value);
    } else {
      this.selectedFilters[filterType].add(value);
    }
    this.emitFilterChange();
  }

  emitFilterChange() {
    this.filterChange.emit(this.selectedFilters);
  }
}