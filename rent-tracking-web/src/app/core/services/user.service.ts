import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl = environment.apiBaseURL;;

  constructor(private http: HttpClient) { }

  tenantDetailsByTenantId = (tenantId: string) => this.http.get<User>(`${this._baseUrl}/tenant/details/${tenantId}`);

  tenantsLookup$ = this.http.get<User[]>(`${this._baseUrl}/tenant/tenantlookup`)
}
