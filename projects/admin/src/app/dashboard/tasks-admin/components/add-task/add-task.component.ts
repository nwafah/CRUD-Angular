import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(private fb:FormBuilder , public dialog: MatDialogRef<AddTaskComponent> , public matDialog:MatDialog) { }

  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]
  newTaskForm!:FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.newTaskForm=this.fb.group({
      title:['',Validators.required],
      userId:['',Validators.required],
      image:['',Validators.required],
      description:['',Validators.required],
      deadline:['',Validators.required],
    });
  }

  createTask(){
    console.log("🚀 ~ file: add-task.component.ts:38 ~ AddTaskComponent ~ createTask ~ this.newTaskForm.value", this.newTaskForm.value);
  }
    

}
