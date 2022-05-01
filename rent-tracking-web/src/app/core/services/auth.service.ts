import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, AuthProvider } from '@angular/fire/auth';
import { from, mergeMap, Observable, of, zip } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Private members
  private _baseUrl: string;
  private bufferMins: number = 1;

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

  createOrUpdateUser(token: string): Observable<User> {
    return this.http.get<User>(`${this._baseUrl}/auth`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        token: `${token}`,
      },
    });
  }

  token$ = zip(this.auth.user, this.auth.idTokenResult).pipe(
    mergeMap(([user, token]) => {
      if (!user) throw new Error('User is not signed in.');
      if (!token) return from(user.getIdToken(true));
      console.log(user, token);
      if (
        new Date(token.expirationTime) <
        new Date(
          new Date().setMinutes(new Date().getMinutes() - this.bufferMins)
        )
      )
        return from(user.getIdToken(true));
      else return of(token.token);
    })
  );

  logout() {
    return from(this.auth.signOut());
  }
}
