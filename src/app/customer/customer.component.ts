import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component'
import {UserDialogComponent} from '../user-dialog/user-dialog.component'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns:any[]
  dataSource
  page=1 
  pagesToShow=10  
  perPage=10 
  count=1
  _UserService

  constructor(public UserService: UserService,public dialog: MatDialog ) {
    this.displayedColumns=['firstName','lastName','adress','phoneNum','actions']
    this._UserService=UserService

    UserService.GetAllUsers(this.page,this.perPage).subscribe(res=>
      {
      this.dataSource=res.json()
      console.log( this.dataSource)
      })
  
      UserService.GetUserCount(this.page,this.perPage).subscribe(res=>
        {
        let result =res.json()
        this.count=result.count
        })
   
  
  //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
   
  // ];
  }
  
  
 
  ngOnInit() {
  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: item
    });
  }

  edit(item)
  {
    this.openDialog(item)
  }
  goPage(Page)
  {
    this.page=Page
    this._UserService.GetAllUsers(this.page,this.perPage).subscribe(res=>
      {
      this.dataSource=res.json()
      console.log( this.dataSource)
      })
  }

  goNext()
  {
    this.page++
    this._UserService.GetAllUsers(this.page,this.perPage).subscribe(res=>
      {
      this.dataSource=res.json()
      console.log( this.dataSource)
      })

  }
  goPrev()
  {
    this.page--
    this._UserService.GetAllUsers(this.page,this.perPage).subscribe(res=>
      {
      this.dataSource=res.json()
      console.log( this.dataSource)
      })

  }
  
  

}
