import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CreateAccount } from '../../constant/DTOs';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb:FormBuilder, //step : 1
    private loginService:LoginService //step : 13
  ) { }
  //# Form
  registerForm!:FormGroup; //step : 3
  ngOnInit(): void {
    this.createForm();// step : 2
  }
//step : 2
  createForm(){
    //step : 4
    this.registerForm=this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required],
        confirmPassword:['',Validators.required],
        username:['',Validators.required],
    },{validators:this.checkPassword});// <=step :17 Not validators (v) small not capital 
  }
  //step : 7
   //step : 8 create service 
  createAccount(){
    const MODEL :CreateAccount ={
      email:this.registerForm.value['email'],
      role:'user',
      username:this.registerForm.value['username'],
      password:this.registerForm.value['password'],
    }
    //step : 14
    this.loginService.createUser(MODEL).subscribe(reg =>{
      //step : 15
      console.log(reg);
    });
    console.table(this.registerForm);
  }
  //step : 16 create custom validation
 checkPassword:ValidatorFn=(group :AbstractControl):ValidationErrors |null =>{
  let password=group.get('password')?.value;
  let confirmPassword=group.get('confirmPassword')?.value;
  return password === confirmPassword?null:{notSame:true};
 }
}
