import { logOutUser } from './../../../core/store/user/user.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../core/store/user/user.selectors';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // Public members
  user$ = this.store.select(userSelector);

  constructor(private store: Store) {}

  logOut() {
    this.store.dispatch(logOutUser());
  }
}
