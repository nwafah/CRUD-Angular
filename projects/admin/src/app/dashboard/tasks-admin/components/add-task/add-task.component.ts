import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  //#### Local form Variable
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]
  newTaskForm!:FormGroup;
  fileName='';
  //### Component Life Hooks ####
  constructor(
    private fb:FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog:MatDialog,
    private taskService:TasksService
    ) { }
  ngOnInit(): void {
    this.createForm();
  }
  //### private methods
  createForm(){
    this.newTaskForm=this.fb.group({
      title:['',Validators.required],
      userId:['',Validators.required],
      image:['',Validators.required],
      description:['',Validators.required],
      deadline:['',Validators.required],
    });
  }
  prepareFormDate(){
    let newDate=moment(this.newTaskForm.value['deadline']).format('DD-MM-YYYY');

    let formData=new FormData();
    Object.entries(this.newTaskForm.value)
    .forEach(([key,value]:any)=>{
      if(key=='deadline'){
        formData.append(key,newDate);
      }
      else{
        formData.append(key,value);
      }
    }
    );
    return formData;
  }
  // ##### Form Events #######
  createTask(){
    // let formData=new FormData();
    // formData.append('title',this.newTaskForm.value['title']);
    // formData.append('userId',this.newTaskForm.value['userId']);
    // formData.append('image',this.newTaskForm.value['image']);
    // formData.append('description',this.newTaskForm.value['description']);
    // formData.append('deadline',this.newTaskForm.value['deadline']);
    let model=this.prepareFormDate();
    this.taskService.createTask(model).subscribe(res => {

    });
  }
  selectImage(event:any){
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
    this.fileName=event.target.value;
  }
    
 
}
