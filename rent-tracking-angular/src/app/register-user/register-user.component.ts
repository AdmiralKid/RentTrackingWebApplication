import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserType } from '../shared/models/userModel';
import { RegisterService } from '../shared/services/auth.service';
import { RegisterResponseData } from '../shared/services/returns.service';

interface dataType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  isLoginMode = true;
  signUpData = { username: '', email: '', password: '' };
  selectedLevel = '';
  data: Array<dataType> = [
    { id: 0, name: 'client' },
    { id: 1, name: 'admin' },
  ];

  error: string = '';
  constructor(private _authService: RegisterService, private _router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = this.signUpData.username;
    const email = this.signUpData.email;
    let userType: UserType;
    if (this.selectedLevel == 'client' || this.selectedLevel == 'admin') {
      userType = this.selectedLevel;
    } else {
      userType = 'client';
    }
    const password = this.signUpData.password;

    let userinfo: User = {
      username: username,
      email: email,
      userType: userType,
    };

    let authObser: Observable<RegisterResponseData>;

    authObser = this._authService.signup(userinfo, password);

    authObser.subscribe(
      (resData: any) => {
        console.log(resData);
        this._router.navigate(['/']);
      },
      (errorMessage: any) => {
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
