import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

const MatImports = [MatButtonModule, MatToolbarModule];

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    AboutUsComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, MatImports],
})
export class HomeModule {}
