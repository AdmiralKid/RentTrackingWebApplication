import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, AuthProvider } from '@angular/fire/auth';
import { from, map, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Private members
  private _baseUrl: string;

  constructor(private auth: AngularFireAuth, private http: HttpClient) {
    this._baseUrl = environment.apiBaseURL;
  }

  // Public functions
  login(provider: AuthProvider) {
    return from(this.auth.signInWithPopup(provider));
  }

  googleLogin() {
    return this.login(new GoogleAuthProvider());
  }

  createOrUpdateUser(): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/auth`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    });
  }

  logout() {
    return from(this.auth.signOut());
  }
}
