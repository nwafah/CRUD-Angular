import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(model:Login) {
    console.log("🚀 ~ file: login.service.ts:14 ~ LoginService ~ login ~ model", model)
    
   return this.http.post('https://crud-4n6y.onrender.com/auth/login',model);
  }
}
