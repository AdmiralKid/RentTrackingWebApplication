import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path:"login",
    loadChildren:()=>import("./login/login.module").then(m=>m.LoginModule)
  },
  {
    path:"register",
    loadChildren:()=>import("./register-user/register.module").then(m=>m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
