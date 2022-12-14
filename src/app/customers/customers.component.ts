import { Component, OnInit } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormGroup , FormBuilder}   from '@angular/forms';

import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup! : FormGroup;

  constructor(private customerService: CustomerService, private fb : FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    })
    this.handleSearchCustomers();
  }

  handleSearchCustomers(){
    let kw = this.searchFormGroup.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err =>{
        this.errorMessage = err.message;
        return throwError(() => err);
      })
    );
  }

  handleCustomerAccounts(customer : Customer){
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state : customer});
  }

}
