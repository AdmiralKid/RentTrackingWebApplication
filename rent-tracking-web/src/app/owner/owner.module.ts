import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { MaterialModule } from '../core/material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApartmentsComponent } from './containers/apartments/apartments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApartmentStoreModule } from '../core/store/apartment/apartment-store.module';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentFormComponent } from './components/apartment-form/apartment-form.component';

@NgModule({
  declarations: [
    OwnerComponent,
    DashboardComponent,
    NavbarComponent,
    ApartmentsComponent,
    ApartmentListComponent,
    ApartmentFormComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ApartmentStoreModule,
  ],
})
export class OwnerModule {}
