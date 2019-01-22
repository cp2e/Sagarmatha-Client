import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/OrderService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import {OrderDialogComponent} from '../order-dialog/order-dialog.component'

export interface Item {
  firstName: string
  lastName: string
  adress: string
  phoneNum: string
  roles: any[]
  orders: []

}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: any[]
  dataSource=[null,null,null,null,null,null,null,null,null,null]
  page = 1
  pagesToShow = 10
  perPage = 10
  count = 1
  _OrderService
  constructor(public OrderService: OrderService, public dialog: MatDialog) {
    this.displayedColumns = ['company', 'description', 'currency', 'actions']
    this._OrderService = OrderService
    this.getAllOrders()
    this.getOrderCount()
   }

  ngOnInit() {
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '800px',
      height: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.Admin == true) result.item.roles.push({ name: "Admin", description: "Admin is allowed to preform all actions" })
        if (result.Customer == true) result.item.roles.push({ name: "Customer", description: "Customer is allowed to preform actions related to him" })
        if (result.item._id) this.UpdateOrderToTheDB(result.item)
        else this.SaveOrderToTheDB(result.item)
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
  getAllOrders() {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
      this._OrderService.GetAllOrders(this.page, this.perPage).subscribe(
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
      this._OrderService.DeleteOrder(item).subscribe(
        res => {
          if (res.status === 200) {
            if ((this.count - 1) % 10 == 0)
              this.page--
            dialogRef.close()
            this.getOrderCount()
            this.getAllOrders()
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

  UpdateOrderToTheDB(item: any) {

    this._OrderService.UpdateOrder(item);
  }

  SaveOrderToTheDB(result) {
    try {
      const dialogRef = this.dialog.open(DialogComponent, { width: '600px', height: '600px' });
    this._OrderService.AddOrder(result).subscribe(
      res => {
      if (res.status === 200) {
        if ((this.count + 1) % 10 == 0)
          this.page++
        dialogRef.close()
        this.getOrderCount()
        this.getAllOrders()
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

  getOrderCount() {
    // this._OrderService.GetOrderCount(this.page, this.perPage).subscribe(res => {
    //   let result = res.json()
    //   this.count = result.count
    // })
  }
}