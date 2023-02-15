import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private toastrService:ToastrService,
    private router:Router,
    private spinner: NgxSpinnerService,
    ) { }

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
    this.spinner.show();
    this.loginService.login( this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem('token',res.token);
      this.toastrService.success('Success','Login Success !');
      this.router.navigate(['/tasks']);
      this.spinner.hide();
    },error =>{
      this.toastrService.error(error['message'],error);
      this.spinner.hide();
    });   
  }

}
