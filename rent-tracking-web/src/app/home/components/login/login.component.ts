import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public auth: AngularFireAuth,private _router:Router) {}
  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log(res)
        this._router.navigate(['/owner'])
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.auth.signOut();
  }
}
