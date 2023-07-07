import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import {  NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { UsersService } from '../../../manage-users/services/users.service';
 

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  //#### Local form Variable
  users:any = []
  newTaskForm!:FormGroup;
  fileName='';
  formValues:any;//this variable will hold data to check if there is change by user.(compare data between old and new)
  //### Component Life Hooks ####
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private fb:FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog:MatDialog,
    private taskService:TasksService,
    private toastrService:ToastrService,
    private spinner:NgxSpinnerService,
    private useService:UsersService
    ) { 
      
    this.getDataFromUserSubject();
    }
  ngOnInit(): void {
    this.createForm();
  }
  getDataFromUserSubject(){
    this.useService.userData.subscribe((res:any)=>{
      this.users=this.mappingUsers(res.data);
    });
  }

  mappingUsers(data: any[]) {
    let newTasks = data?.map(item => {
      return {
        name:item.username,
        id:item._id
      }
    });
    return newTasks;
  }

  //### private methods
  createForm(){
    this.newTaskForm=this.fb.group({
      title:[this.data?.title||'',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId._id||'',Validators.required],
      image:[this.data?.image||'',Validators.required],
      description:[this.data?.description||'',Validators.required],
      deadline:[this.data ? new Date(this.data?.deadline?.split('-').reverse().join('-')).toISOString():'',Validators.required],
    });
    this.formValues=this.newTaskForm.value;
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
    //this.spinner.show(); commit this after add loader interceptor
    // let formData=new FormData();
    // formData.append('title',this.newTaskForm.value['title']);
    // formData.append('userId',this.newTaskForm.value['userId']);
    // formData.append('image',this.newTaskForm.value['image']);
    // formData.append('description',this.newTaskForm.value['description']);
    // formData.append('deadline',this.newTaskForm.value['deadline']);
    let model=this.prepareFormDate();
    this.taskService.createTask(model).subscribe(res => {
      this.toastrService.success('Task Created Successfully','Success');
      // this.spinner.hide(); commit this after add loader interceptor
      this.dialog.close(true);
    },error=>{
      console.log(error);
      this.toastrService.error(error.error.message);
      // this.spinner.hide();  commit this after add loader interceptor
    });
  }

  updateTask(){
    // this.spinner.show(); commit this after add loader interceptor
    let model=this.prepareFormDate();
    this.taskService.updateTask(model,this.data._id).subscribe(res => {
      this.toastrService.success('Task Updated Successfully','Success');
      // this.spinner.hide(); commit this after add loader interceptor
      this.dialog.close(true);
    },error=>{
      console.log(error);
      this.toastrService.error(error.error.message);
      // this.spinner.hide(); commit this after add loader interceptor
    });
  }

  selectImage(event:any){
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
    this.fileName=event.target.value;
  }
    
  close(){
    let hasChanges=false;
    Object.keys(this.formValues).forEach((item)=>{
      if(this.formValues[item] !== this.newTaskForm.value[item]){
        hasChanges=true;
      }
    });

    if(hasChanges){
      const dialogRef=this.matDialog.open(
        ConfirmationComponent,
        {
          width:'800px'
        }
      );
    }
    else{
      this.dialog.close();
    }
  }
 
}
