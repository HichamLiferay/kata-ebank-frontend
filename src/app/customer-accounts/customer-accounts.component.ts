import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Account } from '../model/account.model';
import { Customer } from '../model/customer.model';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  accounts!: Observable<Array<Account>>;
  customerId!: number;
  customer!: Customer;
  errorMessage!: string;


  constructor(private route: ActivatedRoute, private router: Router, private accountsService: AccountsService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.handleAccountsCustomers(this.customerId);
  }

  handleAccountsCustomers(customerId: number) {
    this.accounts = this.accountsService.getAccounts(customerId).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    );
  }

  handleCustomerOperations(account : Account){
    this.router.navigateByUrl("/accounts/"+account.id+"/operations");
  }

}
