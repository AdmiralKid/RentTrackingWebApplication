import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Apartment } from '../models/apartment.model';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsService {
  baseUrl = environment.apiBaseURL;

  constructor(private http: HttpClient) {}

  apartments$ = this.http.get<Apartment[]>(`${this.baseUrl}/apartment`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
}
