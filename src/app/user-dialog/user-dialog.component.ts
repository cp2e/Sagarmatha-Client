import { Component, OnInit, EventEmitter } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface Item {
  firstName:string  
  lastName:string  
  adress:string  
  phoneNum:string
  roles:any[]
  orders:[]
 
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})




export class UserDialogComponent implements OnInit {

  Customer:boolean=false
  Admin:boolean=false
  onAdd = new EventEmitter();

  constructor( public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item?: Item) { 
      console.log(item)
      if(item.roles.length>0)
      {
        if(item.roles.find(x=>x.name==="Admin")) 
        {
          this.Admin=true
        }
        if(item.roles.find(x=>x.name==="Customer"))               
        {
          this.Customer=true
        }
      }
    }

  ngOnInit() {
  }
  onSave():any
  {
    this.dialogRef.close({item:this.item,Customer:this.Customer,Admin:this.Admin})
  }
  onClose():any
  {
    this.dialogRef.close(null)
  }

}
