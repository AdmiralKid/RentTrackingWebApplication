import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UserDashboardComponent }]),
  ],
})
export class UserDashBoardModule{}
