import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  constructor(  
    public dialog: MatDialogRef<ConfirmationComponent>,
    public matDialog:MatDialog,
  ){

  }
  confirm(){
        //هذه تقوم بإغلاق جميع الدايلوج المفتوحة
    this.matDialog.closeAll();
  }
  close(){
    //هذه تقوم بإغلاق فقط الدايلوج الحالي
    this.dialog.close();
  }

}
