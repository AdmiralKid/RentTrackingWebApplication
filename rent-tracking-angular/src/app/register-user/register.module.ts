import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user.component';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: RegisterUserComponent }]),
  ],
})
export class RegisterModule {}
