import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rent-tracking-angular';

  isLoggedIn: boolean = false;

  constructor(private _authService: AuthService) {}

  checkLogin() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  onLogout() {    
    this._authService.logout();
    this.checkLogin();
  }

  ngOnInit() {}
}
