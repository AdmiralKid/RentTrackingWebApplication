import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from '../toast-info/toast.module';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ToastModule,
    RouterModule.forChild([{ path: '', component: RegisterUserComponent }]),
  ],
  bootstrap:[RegisterUserComponent],
})
export class RegisterModule {}
