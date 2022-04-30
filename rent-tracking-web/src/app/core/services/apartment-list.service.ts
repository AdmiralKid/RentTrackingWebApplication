import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Apartment } from '../models/apartment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApartmentListService {
  _baseUrl: string;
  constructor(private http: HttpClient, private auth: AuthService) {
    this._baseUrl = environment.apiBaseURL;
  }

  apartments$ = this.auth.getTokenId().pipe(
    mergeMap((token) =>
      this.http.get<Apartment[]>(`${this._baseUrl}/apartment`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          token,
        },
      })
    )
  );
}
