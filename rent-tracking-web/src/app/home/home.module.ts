import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, MaterialModule],
})
export class HomeModule {}
