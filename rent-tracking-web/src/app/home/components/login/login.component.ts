import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { googleSignin } from '../../../core/store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private store: Store) {}
  login() {
    this.store.dispatch(googleSignin());
  }
}
