import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  error: any = undefined;
  username: string = '';
  email: string = '';
  constructor(private _authService: AuthService) {}
  ngOnInit() {
    let authObser: Observable<any>;
    let token = localStorage.getItem('token');
    if (token != null) {
      authObser = this._authService.getUserDetails(token);
      authObser.subscribe(
        (resData) => {
          console.log(resData);
          this.username=resData.username;
          this.email=resData.email;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          console.log(this.error);
        }
      );
    }
  }
}
