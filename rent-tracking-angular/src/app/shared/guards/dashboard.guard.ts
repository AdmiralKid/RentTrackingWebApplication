import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this._authService.loggedIn()) {
      return this._router.parseUrl('/dashboard');
    } else {
      return true;
    }
  }
}
