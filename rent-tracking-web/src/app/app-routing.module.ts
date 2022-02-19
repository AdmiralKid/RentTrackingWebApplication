import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard'

const redirectUnauth = () => redirectUnauthorizedTo(["home"]);
const redirectSignedInUser = () => redirectLoggedInTo(["owner"]);


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/home/home.module').then((m) => m.HomeModule),
      data:{authGuardPipe: redirectSignedInUser},
      canActivate:[AngularFireAuthGuard]
  },
  {
    path: 'owner',
    loadChildren: () =>
      import('src/app/owner/owner.module').then((m) => m.OwnerModule),
      canActivate:[AngularFireAuthGuard],
      data:{authGuardPipe: redirectUnauth}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
