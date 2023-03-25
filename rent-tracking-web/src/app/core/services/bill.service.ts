import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bill, BillForm } from '../models/bill.model';
import { DateService } from './date.service';
import { SnackBarService } from './snack-bar.service';
@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _baseUrl: string;
  constructor(
    private http: HttpClient,
    private date: DateService,
    private snackBar: SnackBarService
  ) {
    this._baseUrl = environment.apiBaseURL;
  }
  billByFlatTenancyId$ = (flatTenancyId: number) =>
    this.http.get<Bill[]>(`${this._baseUrl}/bill/${flatTenancyId}`);
  deleteBillByBillId$ = (billId: number) =>
    this.http.delete(`${this._baseUrl}/bill/delete/${billId}`);
  createBill = (bill: BillForm) => {
    bill.paymentDate = this.date.convertToUTC(bill.paymentDate);
    return this.http.post(`${this._baseUrl}/bill/create`, bill).pipe(
      tap((data) => {
        this.snackBar.openSnackBar('Bill Created successfully...');
      }),
      catchError(() => {
        this.snackBar.openSnackBar('Failed to create bill...');
        return of();
      })
    );
  };
}
