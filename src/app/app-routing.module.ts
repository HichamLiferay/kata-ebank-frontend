import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOperationsComponent } from './account-operations/accountOperations.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: "customers", component: CustomersComponent },
  { path: "accounts/:id/operations", component: AccountOperationsComponent },
  { path: "customer-accounts/:id", component: CustomerAccountsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
