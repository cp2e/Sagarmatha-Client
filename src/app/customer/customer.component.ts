import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/UserService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { UserDialogComponent } from '../user-dialog/user-dialog.component'
import { debug } from 'util';

export interface Item {
  userName: string
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
  dataSource = [null, null, null, null, null, null, null, null, null, null]
  page = 1
  pagesToShow = 10
  perPage = 10
  count = 1
  _UserService
  editAble
  
  constructor(public UserService: UserService, public dialog: MatDialog) {
    this.editAble=JSON.parse(localStorage.getItem('userDetails')).roles.find(x=>x.name=="Admin")?true:false
   
    this.displayedColumns = ['userName', 'firstName', 'lastName', 'adress', 'phoneNum', 'actions']
    this._UserService = UserService
    this.getAllUsers()
    this.getUserCount()
   
  }

  ngOnInit() { }



  //grid events
  add() {
    const item: Item = { userName: "", firstName: "", lastName: "", adress: "", phoneNum: "", roles: [], orders: [] }
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      height: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action == "Save") {
        if (result) {
          result.item.roles=[];
          if (result.Admin == true) result.item.roles.push({ name: "Admin", description: "Admin is allowed to preform all actions" })
          if (result.Customer == true) result.item.roles.push({ name: "Customer", description: "Customer is allowed to preform actions related to him" })
          if (result.item._id) this.UpdateUserToTheDB(result.item)
          else this.SaveUserToTheDB(result.item)
        }

      }
      console.log(result)
      console.log('The dialog was closed');
    });
  }

  edit(item) {

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      height: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action == "Save") {
        if (result) {
          result.item.roles=[];
          if (result.Admin == true) result.item.roles.push({ name: "Admin", description: "Admin is allowed to preform all actions" })
          if (result.Customer == true) result.item.roles.push({ name: "Customer", description: "Customer is allowed to preform actions related to him" })
          if(JSON.parse(localStorage.getItem('userDetails'))._id==result.item._id)
          {
            localStorage.setItem('userDetails', JSON.stringify(result.item))
          }
          if (result.item._id) this.UpdateUserToTheDB(result.item)
          else this.SaveUserToTheDB(result.item)
        }

      }
      console.log(result)
      console.log('The dialog was closed');
    });

    // let res= this.openDialog(item) 
    // console.log(res)
  }

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
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this.UserService.UpdateUser(item).subscribe(
        res => {
          if (res.status === 200) {
            dialogRef.close()
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
        });
    }
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
