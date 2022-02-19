import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(public auth: AngularFireAuth, private _router: Router) {}

  logout() {
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
