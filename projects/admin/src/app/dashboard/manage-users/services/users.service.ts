import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpService:HttpClient
  ) { }

  userData=new BehaviorSubject({});

  getUsers(filter:any){
    let params=new HttpParams();
    if(filter)
    {
      Object.entries(filter).forEach(([key,value]:any)=>{
        if(value){
          params=params.append(key,value);
        }
      });
    }
    return this.httpService.get(environment.baseApi.replace('tasks','auth')+'/users',{params});
  }

  changeUserStatus(MODEL:any){
    return this.httpService.put(environment.baseApi.replace('tasks','auth')+'/user-status',MODEL);
  }

  deleteUser(id:any){
    return this.httpService.delete(environment.baseApi.replace('tasks','auth')+'/user/'+id);
  }

  getAllUsers(model?:any){
    this.getUsers(model).subscribe((res:any)=>{
      this.userData.next({
        data:res.users,
        total:res.totalItems
      });
    });
  }
}
