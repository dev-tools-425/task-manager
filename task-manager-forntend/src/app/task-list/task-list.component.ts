// src/app/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  standalone:true,
  imports:[FormsModule,CommonModule],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTaskDescription = '';

  constructor(private taskService: TaskService,private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.tasks =res
      },
      (error) => alert(error.error.msg)
  );
  }

  addTask() {
    if (this.newTaskDescription) {
      this.taskService.createTask(this.newTaskDescription).subscribe(() => {
        this.loadTasks();
        this.newTaskDescription = '';
      });
    }
  }

  updateTask(task: any) {
    debugger
    this.taskService.updateTask(task._id, { completed: !task.completed }).subscribe(() => {
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
}
