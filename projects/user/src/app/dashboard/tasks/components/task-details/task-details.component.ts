import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId:any;
  taskDetails:any=[];
  constructor(
    private activatedRoute:ActivatedRoute,
    private tasksService:TasksService,
    private toastrService:ToastrService,
    private translateService:TranslateService,
    private route:Router
  ) {
    this.activatedRoute.paramMap.subscribe((res:any)=>{
      this.taskId=res.params["id"];
    });
   }
  ngOnInit(): void {
    this.getTaskDetails();
  }



  getTaskDetails(){
    this.tasksService.taskDetails(this.taskId).subscribe((res:any)=>{
      console.table(res);
      this.taskDetails=res.tasks;
    });
  }

  //# go to complete Popup 
  complete(ele:any){
    const MODEL={
      id:ele._id
    };
    this.tasksService.completeTasks(MODEL).subscribe(res=>{
        this.toastrService.success(this.translateService.instant('tasks.taskCompleteSuccess'),this.translateService.instant("general.success"));
        this.route.navigate(['/tasks']);
      });
  }
}
