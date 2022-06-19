import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  hasCustomClaim,
  canActivate,
  AuthPipe,
  AuthPipeGenerator,
  loggedIn,
} from '@angular/fire/compat/auth-guard';
import { forkJoin, map, Observable, pipe} from 'rxjs';

const ownerUser = () => hasCustomClaim('owner');
const combineAuthPipes =
  (...args: AuthPipe[]) =>
  (source: Observable<any>) =>
    forkJoin(args.map((arg) => arg(source)));

const redirectSignedInUser: AuthPipeGenerator = () =>
  pipe(
    combineAuthPipes(loggedIn, hasCustomClaim('owner')),
    map((value) => {
      const [_, v2] = value;
      if (v2) return ['owner/dashboard'];
      return true;
    })
  );

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectSignedInUser),
  },
  {
    path: 'owner',
    loadChildren: () =>
      import('src/app/owner/owner.module').then((m) => m.OwnerModule),
    ...canActivate(ownerUser),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
