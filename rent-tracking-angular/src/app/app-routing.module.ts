import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, CanActivate } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { DashboardGuard } from './shared/guards/dashboard.guard';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path:"login",
    loadChildren:()=>import("./login/login.module").then(m=>m.LoginModule),
    canActivate:[DashboardGuard]
  },
  {
    path:"register",
    loadChildren:()=>import("./register-user/register.module").then(m=>m.RegisterModule),
  },
  {
    path:"dashboard",
    loadChildren:()=>import("./user-dashboard/user-dashboard.module").then(m=>m.UserDashBoardModule),
    canActivate:[LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
