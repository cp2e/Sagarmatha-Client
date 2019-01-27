import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/OrderService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { OrderDialogComponent } from '../order-dialog/order-dialog.component'

export interface Item {
  company: string
  description: string
  currency: string
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: any[]
  dataSource = [null, null, null, null, null, null, null, null, null, null]
  page = 1
  pagesToShow = 10
  perPage = 10
  count = 1
  _OrderService
  CurrenUser
  constructor(public OrderService: OrderService, public dialog: MatDialog) {
    this.CurrenUser = JSON.parse(localStorage.getItem('userDetails'));
    this.displayedColumns = ['company', 'description', 'currency','created_date', 'actions']
    this._OrderService = OrderService
    this.getAllOrders()

  }

  ngOnInit() {
  }

  openDialog(item,action): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '800px',
      height: '800px',
      data: { item: item, user: this.CurrenUser ,action}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //if (result.Admin == true) result.item.roles.push({ name: "Admin", description: "Admin is allowed to preform all actions" })
        // if (result.Customer == true) result.item.roles.push({ name: "Customer", description: "Customer is allowed to preform actions related to him" })
        if (result.item._id) this.UpdateOrderToTheDB(result.item)
        else this.SaveOrderToTheDB(result.selectedUser,result.item)
      }
      console.log('The dialog was closed');
    });
  }

  //grid events
  add() {

    const item: Item = { company: "", description: "", currency: "" }
    this.openDialog(item,"add")
  }

  edit(item) {
    this.openDialog(item,"edit")
  }

  goPage(Page) {
    this.page = Page
    this.getAllOrders()
  }

  goNext() {
    this.page++
    this.getAllOrders()

  }
  goPrev() {
    this.page--
    this.getAllOrders()

  }

  // CRUD operations
  async getAllOrders() {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this._OrderService.GetAllOrders(this.page, this.perPage, this.CurrenUser._id).subscribe(
        result => {

          console.log("fromclient", result)
          this.dataSource = result
          this.getOrderCount()
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
      this._OrderService.DeleteOrder(item, this.CurrenUser._id).subscribe(
        res => {
          if (res.status === 200) {
          if ((this.count - 1) % 10 == 0)
          this.page--
          this._OrderService.GetAllOrders(this.page, this.perPage, this.CurrenUser._id).subscribe(
            result => {

              console.log("fromclient", result)
              this.dataSource = result
              dialogRef.close()
            },
            err => {
              dialogRef.afterClosed().subscribe(result => alert("problem preforming this action" + err))
              dialogRef.close()

            })
          
            // dialogRef.close()

            //   this.getOrderCount()
            this.getAllOrders()
            this.count = this.count - 1
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

  UpdateOrderToTheDB(result) {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this._OrderService.UpdateOrder(result, this.CurrenUser._id).subscribe(
        res => {
          if (res.status === 200) {
            dialogRef.close()
            // this.getOrderCount()
            this.getAllOrders()
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

  SaveOrderToTheDB(selectedUser,result) {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this._OrderService.AddOrder(this.CurrenUser._id,result,selectedUser ).subscribe(
        res => {
          if (res.status === 200) {
            if ((this.count + 1) % 10 == 0)
              this.page++
            dialogRef.close()
            //  this.getOrderCount()
            this.getAllOrders()
            this.count++
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

  async getOrderCount() {
    const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
    this._OrderService.GetOrderCount(this.page, this.perPage, this.CurrenUser._id).subscribe(res => {
      let result = res.json()
      this.count = result.count
      dialogRef.close() 
    })
  }
}