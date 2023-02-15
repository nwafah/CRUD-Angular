import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  getAllTasks(){
    let headers=new HttpHeaders();
    headers= headers.append('Authorization','Bearer '+ localStorage.getItem('token'));
    return this.http.get('https://crud-4n6y.onrender.com/tasks/all-tasks',{headers});
  }
}
