import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BillType } from '../models/bill-type.model';
import { PaymentMethodType } from '../models/payment-type.model';
import { UserLookup } from '../models/userlookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = environment.apiBaseURL;
  }
  fetchAllBillType$ = () => this.http.get<BillType[]>(`${this._baseUrl}/lookup/billtype`);
  fetchAllPaymentMethod$ = () => this.http.get<PaymentMethodType[]>(`${this._baseUrl}/lookup/paymentmethod`);
  fetchAllOwner$ = () => this.http.get<UserLookup[]>(`${this._baseUrl}/lookup/owner`);
}
