import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource : any=[];
    //# paging 
    page:any=1;
    total:any;
    filtration:any={
      page:this.page,
      limit:5
    };
  constructor(
    private usersService:UsersService,
    private toastrService:ToastrService,
    private translateService:TranslateService,
  ) { 
    this.getUsersDataFromSubject();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
this.usersService.getAllUsers(this.filtration)
}

getUsersDataFromSubject(){
  this.usersService.userData.subscribe((res:any)=>{
      this.dataSource=res.data;
      this.total=res.data;
  })
}
  //# page
  changePage(event:any){
    this.page=event;
    this.filtration['page']=event;
    this.getUsers();
  }


  //#update user status
  updateUserStatus(ele:any){
    let MODEL:any={
      id:ele._id,
      status:ele.status
    };
    this.usersService.changeUserStatus(MODEL).subscribe(res=>{
      this.getUsers();
      this.toastrService.success("User Status Updated","Success");
    });
  }

  deleteUser(id: any) {
    // this.spinnerService.show(); commit this after add loader interceptor
    this.usersService.deleteUser(id).subscribe(reg =>{
      // this.spinnerService.hide(); commit this after add loader interceptor
      this.toastrService.success("User Deleted Success","Success");
      this.getUsers();
    });
  }
}
