import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../services/tasks.service';
import { AddTaskComponent } from '../add-task/add-task.component';
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
  users: any = [
    { name: "Moahmed", id: 1 },
    { name: "Ali", id: 2 },
    { name: "Ahmed", id: 3 },
    { name: "Zain", id: 4 },
  ]

  status: any = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  //### component Life Hook's #####
  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
  }
  //### private methods 
  getAllTasks() {
    this.spinnerService.show();
    this.tasksService.getAllTasks()
      .subscribe((res: any) => {
        this.dataSource = this.mappingTasks(res.tasks);
        this.spinnerService.hide();
      }, error => {
        this.toastrService.error(error.error.message);
        this.spinnerService.hide();
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
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllTasks();
      }
    });
  }
  deleteTask(id: any) {
    this.spinnerService.show();
    this.tasksService.deleteTask(id).subscribe(reg =>{
      this.spinnerService.hide();
      this.getAllTasks();
    },error=>{
      this.toastrService.error(error.error.message);
      this.spinnerService.hide();
    });
  }
}