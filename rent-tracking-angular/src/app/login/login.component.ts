import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { AuthResponseData } from '../shared/services/returns.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUserData = { email: '', password: '' };

  constructor(private _authService: AuthService, private _router: Router,private _toastService:ToastService) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email_username = this.loginUserData.email;
    const password = this.loginUserData.password;

    let authObser: Observable<AuthResponseData>;

    authObser = this._authService.login(email_username, password);

    authObser.subscribe(
      (resData:any) => {
        console.log(resData);
        this.showToast(resData.message,"bg-success text-line");
        localStorage.setItem('token', resData.token);
        setTimeout(()=>{
          this._router.navigate(['/dashboard']);
        },5000)
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.showToast(errorMessage,'bg-danger text-line');
      }
    );
    form.reset();
    this.onHandleError();
  }

  onHandleError() {
    this._toastService.setMessage('', false,"bg-white text-line");
  }

  private showToast(message: string,bgColor: string) {
    this._toastService.setMessage(message, true, bgColor);
  }
}
