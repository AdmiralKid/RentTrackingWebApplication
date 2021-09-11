import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../shared/services/auth.service';
import { AuthResponseData } from '../shared/services/returns.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUserData = { email: '', password: '' };

  error: string = '';
  constructor(private _authService: RegisterService, private _router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email_username = this.loginUserData.email;
    const password = this.loginUserData.password;

    let authObser: Observable<AuthResponseData>;

    authObser = this._authService.login(email_username, password);

    authObser.subscribe(
      (resData) => {
        console.log(resData);
        this._router.navigate(['/']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
      }
    );
    form.reset();
    this.onHandleError();
  }

  onHandleError() {
    this.error = '';
  }

  private showErrorAlert(message: string) {
    console.log(message);
  }
}
