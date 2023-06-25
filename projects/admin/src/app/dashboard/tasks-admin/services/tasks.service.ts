import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { CreateTask } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasks(filter : any) {
    let params=new HttpParams();
   
    // if(filter.keyword){
    // params=params.append('keyword',filter.keyword);
    // }
     //## we will commit this up code and create for loop to gel all filter properties
     Object.entries(filter).forEach(([key,value]:any)=>{
      if(value){
        params=params.append(key,value); 
      }

     });
    return this.http.get(environment.baseApi + '/all-tasks',{params});
  }

  createTask(model: any) {
    return this.http.post(environment.baseApi + '/add-task', model);
  }

  updateTask(model: any,id: any) {
    return this.http.post(environment.baseApi + '/edit-task/'+id, model);
  }

  deleteTask(id:any){
    return this.http.delete(environment.baseApi+'/delete-task/'+id);
  }
}
