import { Router } from '@angular/router';
import { User } from '../models/userModel';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterResponseData, AuthResponseData } from './returns.service';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private _registerUrl = 'http://localhost:5000/api/user/register';
  private _loginUrl = 'http://localhost:5000/api/user/signin';
  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {}
  signup(user: User, password: string) {
    return this.http
      .post<RegisterResponseData>(this._registerUrl, {
        user: user,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData.message);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  login(email_username: string, password: string) {
    return this.http
      .post<AuthResponseData>(this._loginUrl, {
        credentials: {
          usernameOrEmail: email_username,
          password: password,
        },
      })
      .pipe(catchError(this.handleError));
  }

  private handleAuthentication(message: string) {}
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown Error!';
    if (!errorResponse.error || !errorResponse.error.console.error) {
      return throwError(errorMessage);
    } else {
      return throwError(errorResponse.error.error.message);
    }
  }
}
