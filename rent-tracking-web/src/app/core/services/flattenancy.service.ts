import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FlatTenancy } from '../models/flat-tenancy.model';

@Injectable({
  providedIn: 'root',
})
export class FlatTenancyService {
  private _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = environment.apiBaseURL;
  }

  flatTenancyDetailsByTenantId$ = (tenantId: string) =>
    this.http.get<FlatTenancy>(
      `${this._baseUrl}/flattenancy/details/${tenantId}`
    );
}
