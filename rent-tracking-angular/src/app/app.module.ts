import { ToastModule } from './toast-info/toast.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core.module';
import {LoginGuard} from './shared/guards/login.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    NgbModule,
    HttpClientModule,
    CoreModule,
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
