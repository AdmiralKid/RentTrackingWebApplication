import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApartmentInt } from '../models/apartment.model';

@Injectable({
  providedIn: 'root',
})
export class ApartmentListService {
  _baseUrl: string;
  constructor(private http: HttpClient) {
    this._baseUrl = 'http://localhost:3000/api/';
  }

  fetchApartments(): Observable<ApartmentInt[]> {
    return this.http.get(`${this._baseUrl}apartment/getbyownerid/ql05JCANt7eRQELI3KlBWvMuPXU2`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }) as Observable<ApartmentInt[]>;
  }
}
