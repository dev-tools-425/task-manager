// src/app/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3001/api/task';  // Backend URL
  private socket: Socket;

  constructor(private http: HttpClient) {
    //initail connection
    this.socket = io('http://localhost:7001');
    this.socket.on("connect", () => {
      console.log("got connection")
    });
  } 

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'authorization': "Bearer "+token || '' }) };
  }

  getTasks(): Observable<any> {
    debugger
    return this.http.get(`${this.apiUrl}/tasks`, this.getAuthHeaders());
  }

  createTask(title: string, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, { title, description }, this.getAuthHeaders());
  }

  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/tasks/${id}`, taskData, this.getAuthHeaders());
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, this.getAuthHeaders()); 
  }
  // Listen for task updates in real-time
  listenForUpdates(callback: (tasks:[]) => void) {
    this.socket.on('taskList', (tasks) => {
      callback(tasks);
    });
  }
  // Clean up socket when service is destroyed
  ngOnDestroy() {
    this.socket.disconnect();
  }
}
