import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { OrdersComponent } from './orders/orders.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/GuardService';

const routes: Routes =  [

  
  {path: '',component: CustomerComponent,canActivate: [GuardService]} ,
  {path: 'Login',component: LoginComponent},
  //{path: 'Customers',component: CustomerComponent,canActivate: [GuardService]},
  {path: 'Customers',component: CustomerComponent},
  {path: 'Orders',component: OrdersComponent,canActivate: [GuardService]},
  {path: 'Analysis',component: AnalysisComponent,canActivate: [GuardService]},
 
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private GuardService:GuardService )
  {}
}
