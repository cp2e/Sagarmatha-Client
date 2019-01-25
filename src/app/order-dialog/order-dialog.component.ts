import { Component, OnInit, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../services/UserService';
export interface Item {
  company: string
  description: string
  currency: string
}
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  customerName = ""
  AdminCustomer = true
  action: "";
  saveDisable = true
  spinnerDisabled = true
  selectedUser= {userName:""}
  _UserService
  onAdd = new EventEmitter();


  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>, public UserService: UserService,
    @Inject(MAT_DIALOG_DATA) public data?: any) {
    this._UserService = UserService
    this.action=data.action
    // let yyyy=data.user.roles.find(x=>x.name=="Admin")
    this.AdminCustomer = data.user.roles.find(x => x.name === "Admin") ? true : false
    if(this.AdminCustomer==false)
    {
      this.selectedUser=this.data.user
    }


    console.log(this.AdminCustomer)
    console.log("")

  }
  ngOnInit() {
  }
  onSave(): any {
    console.log("save")
    this.dialogRef.close({ selectedUser:this.selectedUser["_id"] ,item: this.data.item })
  }
  onClose(): any {
    this.dialogRef.close(null)
  }
  Search(customerName) {
    this.spinnerDisabled = false;
    this._UserService.GetUserByUserName(customerName).subscribe(res => {
      this.selectedUser=res?res:{userName:"Not Found Try Again"}
      this.saveDisable=res?false:true
      this.spinnerDisabled = true;
      console.log("search")
    }
    

    )
  }

}
