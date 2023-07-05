import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private router:Router,
    private toastrService:ToastrService
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
    this.loginService.login(this.loginForm.value).subscribe((reg:any)=>{
      localStorage.setItem('token',reg.token);
      this.router.navigate(['/tasks']);
      this.toastrService.success("Login Success!","Success");
    });
  }
}
