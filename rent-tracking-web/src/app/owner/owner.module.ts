import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [OwnerComponent, DashboardComponent, NavbarComponent],
  imports: [CommonModule, OwnerRoutingModule, MaterialModule],
})
export class OwnerModule {}
