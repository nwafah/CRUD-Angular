import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  loginForm!:FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm=this.fb.group({
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.min(3),Validators.max(20)]]
    })
  }

  login(){
    console.log(this.loginForm.value);
  }

}
