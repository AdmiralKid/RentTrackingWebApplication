import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // uncomment when login is done.
  // pic$ = this.auth.user.pipe(map((user) => user?.photoURL));
  // name$ = this.auth.user.pipe(map((user) => user?.displayName));
  // email$ = this.auth.user.pipe(map((user) => user?.email));

  // for now we display sid's info
  pic$ = new Observable((sub) =>
    sub.next(
      'https://lh3.googleusercontent.com/a-/AOh14GiREoPaWH5QTjNquqxFWltIK3n2s0w0odBAfw=s288-p-rw-no'
    )
  );
  name$ = new Observable((sub) => sub.next('Siddharth V'));
  email$ = new Observable((sub) => sub.next('siddharth6397@gmail.com'));

  constructor(public auth: AngularFireAuth) {}

  ngOnInit(): void {}

  logout() {
    this.auth.signOut();
  }
}
