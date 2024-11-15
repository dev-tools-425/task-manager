// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // Marking AppComponent as standalone
  imports: [CommonModule, RouterModule],  // Importing CommonModule and RouterModule
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Management App';
  selectedIndex: number = 0;  // Initially, the first tab is selected

  constructor(private router: Router) {}

  

}
