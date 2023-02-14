import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private loginService:LoginService,private toastr:ToastrService) { }

  loginForm!:FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.min(3),Validators.max(20)]],
      role:['admin']
    })
  }

  login(){
    this.loginService.login( this.loginForm.value).subscribe(res=>{},error =>{});   
  }

}
