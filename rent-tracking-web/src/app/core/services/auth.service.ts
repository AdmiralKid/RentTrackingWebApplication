import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, AuthProvider } from '@angular/fire/auth';
import { from, mergeMap, Observable, of } from 'rxjs';
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

  getTokenId() {
    return this.auth.user.pipe(
      mergeMap((user) => {
        if (!user) throw new Error('User is not signed in.');
        return from(user.getIdTokenResult()).pipe(
          mergeMap((token) => {
            if (
              new Date(token.expirationTime) <
              new Date(
                new Date().setMinutes(new Date().getMinutes() + this.bufferMins)
              )
            )
              return from(user.getIdToken(true));
            else return of(token.token);
          })
        );
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }
}
