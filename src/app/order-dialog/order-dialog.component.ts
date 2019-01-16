import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public item?: any) { }
  ngOnInit() {
  }

}
