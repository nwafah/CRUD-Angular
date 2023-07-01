import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAccount, Login } from '../constant/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient // step : 9
  ) { }
    //step : 10 
  createUser(model:CreateAccount){//step : 11 create DTO in Constant Folder
    return this.http.post(environment.baseApi.replace('/tasks','/auth')+'/createAccount',model); //step : 12 add configuration in  environment.ts in environments Folder 
  }

  login(model:Login){
    return this.http.post(environment.baseApi.replace('/tasks','/auth')+'/login',model); 
  }
}
