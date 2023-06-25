import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}


@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  //### Local Variables #####
  displayedColumns: string[] = ['position', 'title', 'user', 'deadline', 'status', 'actions'];
  dataSource: any = [];
  tasksFilter!: FormGroup
  //#### Local form Variable
  users:any = [
    {name:"Moahmed" , id:'63f46258ff653d8c3c756133'},
    {name:"Ali" , id:'63f4634aff653d8c3c756136'},
    {name:"Ahmed" , id:'63f4635eff653d8c3c756139'},
    {name:"Zain" , id:'63f4637fff653d8c3c75613c'},
  ]

  status: any[] = [
    // { name: "Complete", id: 1 },
    // { name: "In-Progress", id: 2 },
    { name: this.translateService.instant('tasks.Complete'), id: "Complete" },
    { name: this.translateService.instant('tasks.In-Progress'), id: "In-Progress" },
  ]
   //# page
   page:any=1;
   total:any;
  //### component Life Hook's #####
  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog, 
    private toastrService: ToastrService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
  }
  //### private methods 
  getAllTasks() {
    // this.spinnerService.show(); commit this after add loader interceptor
    this.tasksService.getAllTasks(this.filtration)
      .subscribe((res: any) => {
        this.dataSource = this.mappingTasks(res.tasks);
        this.total=res.totalItems;
        // this.spinnerService.hide(); commit this after add loader interceptor
      }, error => {
        this.toastrService.error(error.error.message);
        // this.spinnerService.hide(); commit this after add loader interceptor
      }
      );
  }
  mappingTasks(data: any[]) {
    let newTasks = data.map(item => {
      return {
        // title:item.title,
        // deadline:item.deadline,
        // status:item.status,
        ...item,
        user: item.userId.username
      }
    });
    return newTasks;
  }
  //### Events ####
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
  deleteTask(id: any) {
    // this.spinnerService.show(); commit this after add loader interceptor
    this.tasksService.deleteTask(id).subscribe(reg =>{
      // this.spinnerService.hide(); commit this after add loader interceptor
      this.getAllTasks();
    },error=>{
      this.toastrService.error(error.error.message);
      // this.spinnerService.hide(); commit this after add loader interceptor
    });
  }
  updateTask(element:any)
  {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data:element,
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
  //### Search ###
  filtration:any={
    page:this.page,
    limit:5
  };
  timeOutId:any;
  search(event:any){
    this.filtration['keyword']=event.value;

    this.page=1;
    this.filtration['page']=1;

    clearTimeout(this.timeOutId);
    this.timeOutId=setTimeout(()=>{
       this.getAllTasks(); 
    },2000);
  }
  selectUser(event:any){
    this.filtration['userId']=event.value;

    this.page=1;
    this.filtration['page']=1;

    this.getAllTasks();
  }
  selectStatus(event:any){
    this.filtration['status']=this.status.find( obj => obj.id=== event.value).id;//event.value;
    
    this.page=1;
    this.filtration['page']=1;
    
    this.getAllTasks();
  }
  selectDate(event: any ,type :any){
    this.filtration[type]=moment(event.value).format('DD-MM-YYYY');
    if(type=='toDate'&& this.filtration['toDate']!=='Invalid date'){
      this.getAllTasks();
    }
  }
  //# page
  changePage(event:any){
    this.page=event;
    this.filtration['page']=event;
    this.getAllTasks();
  }
}