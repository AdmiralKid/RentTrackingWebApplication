import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Flat } from '../models/flat.model';
import { FlatLookup } from '../models/flatlookup.model';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  private _baseUrl: string;

  constructor(private http: HttpClient) {
    this._baseUrl = environment.apiBaseURL;
  }
  flatLookupByApartmentId$ = (apartmentId: number) => this.http.get<FlatLookup[]>(`${this._baseUrl}/flat/flatlookup/${apartmentId}`);

  flatDetailsByFlatId$ = (flatId: number) => this.http.get<Flat>(`${this._baseUrl}/flat/details/${flatId}`);

}
