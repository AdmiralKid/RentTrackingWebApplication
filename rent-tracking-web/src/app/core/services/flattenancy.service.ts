import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FlatTenancy } from '../models/flat-tenancy.model';
import { formatDate } from '@angular/common';
import { DateService } from './date.service';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class FlatTenancyService {
  private _baseUrl: string;

  constructor(
    private http: HttpClient,
    private date: DateService,
    private snackBar: SnackBarService
  ) {
    this._baseUrl = environment.apiBaseURL;
  }

  flatTenancyDetailsByTenantId$ = (tenantId: string) =>
    this.http.get<FlatTenancy>(
      `${this._baseUrl}/flattenancy/details/${tenantId}`
    );

  updateFlatTenancyDetails = (flatTenancy: FlatTenancy) => {
    flatTenancy.startDate = this.date.convertToUTC(flatTenancy.startDate);

    return this.http
      .post<FlatTenancy>(`${this._baseUrl}/flattenancy/modify`, flatTenancy)
      .pipe(
        catchError(() => {
          this.snackBar.openSnackBar('Failed to assign tenant...');
          return of();
        }),
        tap((data) => this.snackBar.openSnackBar('Assigned Tenant...'))
      );
  };
}
