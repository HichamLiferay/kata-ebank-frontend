import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number):Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHost+"/api/bank/accounts/"+accountId+"/operations?page="+page+"&size="+size)
  }

  public getAccounts(customerId : number):Observable<Array<Account>>{
    return this.http.get<Array<Account>>(environment.backendHost+"/api/bank/accounts/customer/"+customerId)
  }

  public withdrawal(accountId: string, amount : number, description : string){

    let data = {accountId,amount,description};
    return this.http.post(environment.backendHost+"/api/bank/accounts/withdrawal",data)
  }

  public deposit(accountId: string, amount : number, description : string){

    let data = {accountId,amount,description};
    return this.http.post(environment.backendHost+"/api/bank/accounts/deposit",data)
  }
}
