// src/app/task-list/task-list.component.ts
import { OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';  // MatTableModule for the table
import { ReactiveFormsModule } from '@angular/forms';  // Reactive Forms for filter
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone:true,
  imports:[
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  newTaskDescription = '';
  newTaskTitle='';
  status = "NOT ASSIGNED"
  private taskUpdateSubscription:any
  constructor(private taskService: TaskService,private router: Router) {
  }

  ngOnInit():void {

    // this.loadTasks();
    // Listen for real-time task updates from the WebSocket server
    this.taskUpdateSubscription = this.taskService.listenForUpdates((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks)
    });
    
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.tasks = res
      },
      (error) => alert(error.error.msg)
  );
  
  
  }
  
  addTask() {
    if (this.newTaskDescription) {

      this.taskService.createTask(this.newTaskTitle,this.newTaskDescription).subscribe((res:any) => {
        debugger
        this.loadTasks();
        this.newTaskDescription = '';
        this.newTaskTitle = '';
      },
      (error)=>alert(error.error.msg)
    );
    }
  }

  updateTask(task: any) {
    
    this.taskService.updateTask(task._id, { status:task.status }).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.taskUpdateSubscription) {
      this.taskUpdateSubscription.unsubscribe();
    }
  }
}
