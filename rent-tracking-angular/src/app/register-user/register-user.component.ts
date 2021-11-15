import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserType } from '../shared/models/userModel';
import { AuthService } from '../shared/services/auth.service';
import { ToastService } from './../shared/services/toast.service';
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
  bgColor = '';
  show = false;
  // delay:any;
  signUpData = { username: '', email: '', password: '' };
  selectedLevel = '';
  data: Array<dataType> = [
    { id: 0, name: 'client' },
    { id: 1, name: 'admin' },
  ];

  message: string = '';
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _toastService: ToastService,
  ) {}

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
        // console.log(resData);
        this.bgColor = 'bg-success text-line';
        console.log(resData.message)
        this.showToast(resData.message, this.bgColor);
        setTimeout(() => {
          this._router.navigate(['/']);
        }, 5000);
      },
      (errorMessage: any) => {
        this.bgColor = 'bg-danger text-line';
        console.log(errorMessage);
        this.showToast(errorMessage, this.bgColor);
      }
    );
    form.reset();
    this.onHandleError();
  }

  onHandleError() {
    this._toastService.setMessage('', false,"bg-white text-line");
  }

  private showToast(message: string, bgColor: string) {
    this._toastService.setMessage(message, true, bgColor);
  }
}
