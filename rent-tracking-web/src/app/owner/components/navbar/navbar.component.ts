import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
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

  constructor(public auth: AngularFireAuth, private _router: Router) {}

  logOut() {
    this.auth
      .signOut()
      .then((res) => {
        this._router.navigate(['/home']);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
