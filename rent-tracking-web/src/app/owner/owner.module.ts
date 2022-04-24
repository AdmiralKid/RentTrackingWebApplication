import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { FormsModule } from '@angular/forms';
import { ApartmentStoreModule } from '../core/store/apartment/apartment-store.module';

@NgModule({
  declarations: [
    OwnerComponent,
    DashboardComponent,
    NavbarComponent,
    ApartmentsComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MaterialModule,
    FormsModule,
    ApartmentStoreModule
  ],
})
export class OwnerModule {}
