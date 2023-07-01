import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  loginForm!:FormGroup;
  createForm(){
    this.loginForm=this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      role:['user']
    });
  }
  login(){
    this.loginService.login(this.loginForm.value).subscribe(reg=>{
      this.router.navigate(['/tasks']);
    });
  }
}
