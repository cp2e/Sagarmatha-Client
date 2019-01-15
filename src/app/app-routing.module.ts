import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { OrdersComponent } from './orders/orders.component';
import { AnalysisComponent } from './analysis/analysis.component';

const routes: Routes =  [

  {path: '',component: CustomerComponent},
  {path: 'Customer',component: CustomerComponent},
  {path: 'Orders',component: OrdersComponent},
  {path: 'Analysis',component: AnalysisComponent},
 
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
