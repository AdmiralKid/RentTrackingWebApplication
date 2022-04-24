import { logOutUser } from './../../../core/store/user/user.actions';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  pic$ = this.auth.user.pipe(map((user) => user?.photoURL));
  name$ = this.auth.user.pipe(map((user) => user?.displayName));
  email$ = this.auth.user.pipe(map((user) => user?.email));

  constructor(
    private auth: AngularFireAuth,
    private store: Store
  ) {}
  async logOut() {
    this.store.dispatch(logOutUser());
  }
}
