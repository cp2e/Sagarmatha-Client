import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule,  MatDialogModule, MatButtonModule, MatCheckboxModule,MatTable,MatTableModule, MatPaginatorModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerComponent } from './customer/customer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { OrdersComponent } from './orders/orders.component';
import { GridComponent } from './grid/grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CustomerComponent,
    PaginationComponent,
    OrdersComponent,
    AnalysisComponent,
    OrdersComponent,
    GridComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule, 
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
