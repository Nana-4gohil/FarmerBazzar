import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PulseLoaderComponent } from '../../utils/pulse-loader/pulse-loader.component';
@NgModule({
 
  imports: [
    CommonModule,           // Provides common directives like ngIf and ngFor
    FormsModule,            // Template-driven forms
    ReactiveFormsModule,    // Reactive forms  
      // HTTP requests
  ],
  exports: [
    CommonModule,           // Re-export modules for other modules to use
    FormsModule,
    ReactiveFormsModule,
    PulseLoaderComponent,  // Re-export reusable components
  ],
})
export class SharedModule {}