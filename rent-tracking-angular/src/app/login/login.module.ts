import { ToastModule } from './../toast-info/toast.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ToastModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  bootstrap:[LoginComponent]
})
export class LoginModule {}
