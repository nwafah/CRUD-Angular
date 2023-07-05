import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
// export interface PeriodicElement {
//   title: string;
//   description: string;
//   deadLineDate: string;
//   status: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {status:'Complete' , title: 'Hydrogen', description: "1.0079", deadLineDate:"10-11-2022" },
//   {status:'In-Prossing' , title: 'Helium', description: "4.0026", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Lithium', description: "6.941", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Beryllium', description: "9.0122", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Boron', description: "10.811", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Carbon', description: "12.010", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Nitrogen', description: "14.006", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Oxygen', description: "15.999", deadLineDate:"10-11-2022" },
//   {status:'Complete' , title: 'Fluorine', description: "18.998", deadLineDate:"10-11-2022" },
//   { status:'Complete' , title: 'Neon', description: "20.179", deadLineDate:"10-11-2022" },
// ];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any = [];//ELEMENT_DATA;
  tasksFilter!:FormGroup
  users:any = [
    {name:"Moahmed" , id:1},
    {name:"Ali" , id:2},
    {name:"Ahmed" , id:3},
    {name:"Zain" , id:4},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(
    public dialog: MatDialog ,
    private fb:FormBuilder,
    private tasksService:TasksService,
    private toastrService:ToastrService,
    private translateService:TranslateService
    ) { }

  ngOnInit(): void {
    this.createForm()
    this.getUserData();
    this.getAllTasks();
  }

  createForm() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }
  userData:any;
  selectStatus:String="In-Progress";
  getUserData(){
    let token=JSON.stringify(localStorage.getItem('token'));
    // console.log('token : ',token);
    // console.log('userData : ',window.atob(token.split('.')[1]));
    this.userData=JSON.parse(window.atob(token.split('.')[1]));
  }
  
  getAllTasks() {
    let params={
      page:this.page,
      limit:10,
      status:this.selectStatus
    }
    this.tasksService.getUserTasks(this.userData.userId,params).subscribe((res:any) =>{
      this.dataSource=res.tasks;
      this.totalItems=res.totalItems
    });
  }
  //# page
  page:any=1;
  total:any;
  totalItems:any=0;
  changePage(event:any){
    this.page=event;
    this.getAllTasks();
  }

  //# go to complete Popup 
  complete(ele:any){
    const MODEL={
      id:ele._id
    };
    this.tasksService.completeTasks(MODEL).subscribe(res=>{
      this.getAllTasks();
      this.toastrService.success(this.translateService.instant('tasks.taskCompleteSuccess'),this.translateService.instant("general.success"));
    });
  }
}
