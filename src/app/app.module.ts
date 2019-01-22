import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule,   MatInputModule, MatSelectModule,MatOptionModule, MatFormFieldModule,MatIconModule,  MatDialogModule, MatButtonModule, MatCheckboxModule,MatTable,MatTableModule, MatPaginatorModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerComponent } from './customer/customer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { OrdersComponent } from './orders/orders.component';
import { GridComponent } from './grid/grid.component';
import{UserService} from './services/UserService'
import{OrderService} from './services/OrderService'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { EmptyRowsFillerPipePipe } from './empty-rows-filler-pipe.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component'
import { FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component'
import { GuardService } from './services/GuardService';

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
    EmptyRowsFillerPipePipe,
    DialogComponent,
    UserDialogComponent,
    OrderDialogComponent,
    LoginComponent,
    

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
    MatDialogModule,
    HttpModule,
    MatFormFieldModule,
    MatSelectModule,MatOptionModule,MatInputModule,FormsModule,HttpClientModule,
    MatProgressSpinnerModule
   
  ],
  providers: [UserService,OrderService,GuardService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent,UserDialogComponent,OrderDialogComponent],
})
export class AppModule { }
