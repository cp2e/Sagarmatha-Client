import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { UserDialogComponent } from '../user-dialog/user-dialog.component'
import { debug } from 'util';

export interface Item {
  firstName: string
  lastName: string
  adress: string
  phoneNum: string
  roles: any[]
  orders: []

}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent implements OnInit {
  displayedColumns: any[]
  dataSource=[null,null,null,null,null,null,null,null,null,null]
  page = 1
  pagesToShow = 10
  perPage = 10
  count = 1
  _UserService

  constructor(public UserService: UserService, public dialog: MatDialog) {
    this.displayedColumns = ['firstName', 'lastName', 'adress', 'phoneNum', 'actions']
    this._UserService = UserService
    this.getAllUsers()
    this.getUserCount()
  }

  ngOnInit() { }

  openDialog(item): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      height: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.Admin == true) result.item.roles.push({ name: "Admin", description: "Admin is allowed to preform all actions" })
        if (result.Customer == true) result.item.roles.push({ name: "Customer", description: "Customer is allowed to preform actions related to him" })
        if (result.item._id) this.UpdateUserToTheDB(result.item)
        else this.SaveUserToTheDB(result.item)
      }
      console.log('The dialog was closed');
    });
  }

  //grid events
  add() {
    const item: Item = { firstName: "", lastName: "", adress: "", phoneNum: "", roles: [], orders: [] }
    this.openDialog(item)
  }

  edit(item) { this.openDialog(item) }

  goPage(Page) {
    this.page = Page
    this.getAllUsers()
  }

  goNext() {
    this.page++
    this.getAllUsers()

  }
  goPrev() {
    this.page--
    this.getAllUsers()

  }

  // CRUD operations
  getAllUsers() {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this._UserService.GetAllUsers(this.page, this.perPage).subscribe(
        result => {
          console.log("fromclient", result)
          this.dataSource = result
          dialogRef.close()
        },
        err => {
          dialogRef.afterClosed().subscribe(result => alert("problem preforming this action" + err))
          dialogRef.close()
          
        })

    }
    catch (err) {
      console.log(err)
    }
  }

  delete(item) {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this.UserService.DeleteUser(item).subscribe(
        res => {
          if (res.status === 200) {
            if ((this.count - 1) % 10 == 0)
              this.page--
            dialogRef.close()
            this.getUserCount()
            this.getAllUsers()
          }
        }),
        err => {
          dialogRef.afterClosed().subscribe(result => alert("problem preforming this action" + err))
          dialogRef.close()
          
        }
    }
    catch (err) {
      console.log(err)
    }
  }

  UpdateUserToTheDB(item: any) {

    this.UserService.UpdateUser(item);
  }

  SaveUserToTheDB(result) {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
    this.UserService.AddUser(result).subscribe(
      res => {
      if (res.status === 200) {
        if ((this.count + 1) % 10 == 0)
          this.page++
        dialogRef.close()
        this.getUserCount()
        this.getAllUsers()
      }
      
    },
    err => {
      dialogRef.afterClosed().subscribe(result => alert("problem preforming this action" + err))
      dialogRef.close()
    });}
    catch (err) {
      console.log(err)
    }
  }

  getUserCount() {
    this._UserService.GetUserCount(this.page, this.perPage).subscribe(res => {
      let result = res.json()
      this.count = result.count
    })
  }
}
