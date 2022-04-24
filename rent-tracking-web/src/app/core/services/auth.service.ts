import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, AuthProvider } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl: string;
  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
  ) {
    this._baseUrl = 'http://localhost:3000/api/';
  }
  login(provider: AuthProvider) {
    return this.auth.signInWithPopup(provider);
  }
  googleLogin() {
    return from(this.login(new GoogleAuthProvider()));
  }
  createOrUpdateUser(token: string): Observable<User> {
    return this.http.get(`${this._baseUrl}auth`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        token: `${token}`,
      },
    }) as Observable<User>;
  }
  logout() {
    return from(this.auth.signOut());
  }
}
