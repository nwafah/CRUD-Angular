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
   return this.http.post('https://crud-4n6y.onrender.com/auth/login',model);
  }
}
