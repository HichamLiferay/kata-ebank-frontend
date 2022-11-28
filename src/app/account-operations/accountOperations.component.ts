import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountsService } from '../services/accounts.service';
@Component({
  selector: 'app-accounts',
  templateUrl: './accountOperations.component.html',
  styleUrls: ['./accountOperations.component.css']
})
export class AccountOperationsComponent implements OnInit {


  accountId! : string;
  accountFormGroup!: FormGroup;
  operationsFormGroup!: FormGroup;
  accountObservable!: Observable<AccountDetails>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;

  constructor(private accountsService: AccountsService, private fb: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.params['id'];
    this.handleSearchAccount();
   
    this.operationsFormGroup = this.fb.group({
      operationType: this.fb.control(null,Validators.required),
      amount: this.fb.control(0,Validators.min(10)),
      description: this.fb.control(null)
    })
  }

  handleSearchAccount() {
    this.accountObservable = this.accountsService.getAccount(this.accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.error.message;
        return throwError(() => err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountOperationType = this.operationsFormGroup.value.operationType;
    let amount: number = this.operationsFormGroup.value.amount;
    let description: string = this.operationsFormGroup.value.description;

    if (accountOperationType == 'WITHDRAWAL') {
      this.accountsService.withdrawal(this.accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success withdrawal operation");
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(() => err);
        }
      });
    } else if (accountOperationType == 'DEPOSIT') {
      this.accountsService.deposit(this.accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success deposit operation");
          this.operationsFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
          this.errorMessage = err.error.message;
          return throwError(() => err);
        }
      });
    }
  }
}
