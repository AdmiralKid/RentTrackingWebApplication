import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApartmentsComponent } from './containers/apartments/apartments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApartmentStoreModule } from '../core/store/apartment/apartment-store.module';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentFormComponent } from './components/apartment-form/apartment-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ApartmentDetailsComponent } from './containers/apartment-details/apartment-details.component';
import { FlatLookupStoreModule } from '../core/store/flat-lookup/flat-lookup-store.module';

const MaterialImports = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatTabsModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    OwnerComponent,
    DashboardComponent,
    NavbarComponent,
    ApartmentsComponent,
    ApartmentListComponent,
    ApartmentFormComponent,
    ApartmentDetailsComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    ApartmentStoreModule,
    FlatLookupStoreModule,
    MaterialImports,
  ],
})
export class OwnerModule {}
