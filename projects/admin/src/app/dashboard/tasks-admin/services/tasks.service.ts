import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { CreateTask } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(environment.baseApi + '/all-tasks');
  }

  createTask(model: any) {
    return this.http.post(environment.baseApi + '/add-task', model);
  }
}
