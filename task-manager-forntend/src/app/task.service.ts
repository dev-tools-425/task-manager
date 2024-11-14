// src/app/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3001/api/task';  // Backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'authorization': "Bearer "+token || '' }) };
  }

  getTasks(): Observable<any> {

    return this.http.get(`${this.apiUrl}/tasks`, this.getAuthHeaders());
  }

  createTask(description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks`, { description }, this.getAuthHeaders());
  }

  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/tasks/${id}`, taskData, this.getAuthHeaders());
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`, this.getAuthHeaders()); 
  }
}
