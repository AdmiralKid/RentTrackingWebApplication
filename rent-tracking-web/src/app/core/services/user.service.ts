import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = environment.apiBaseURL;
  }
  tenantDetailsByTenantId$ = (tenantId: string) => this.http.get<User>(`${this._baseUrl}/tenant/details/${tenantId}`);
}
