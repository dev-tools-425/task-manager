// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule,MatTabChangeEvent } from '@angular/material/tabs';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSlideToggleModule, MatTabsModule,LoginComponent,RegisterComponent],  // Importing CommonModule and RouterModule
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedIndex: number = 0;  // Initially, the first tab is selected
  constructor(private router: Router) {}

  onTabChange(event: any): void {
    const selectedIndex = event.index;

    // Navigate to different routes based on the tab index
    if (selectedIndex === 0) {
      this.selectedIndex = selectedIndex; 
    } else if (selectedIndex === 1) {
      this.selectedIndex = selectedIndex; 
    }
  }
  addItem(newItem: any) {
    this.onTabChange({index:0});
  }

}
