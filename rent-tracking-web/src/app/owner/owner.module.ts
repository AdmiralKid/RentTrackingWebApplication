import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { OwnerRoutingModule } from './owner-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApartmentsComponent } from './containers/apartments/apartments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApartmentStoreModule } from '../core/store/apartment/apartment-store.module';
import { ApartmentListComponent } from './components/apartment-list/apartment-list.component';
import { ApartmentDetailsComponent } from './containers/apartment-details/apartment-details.component';
import { FlatLookupStoreModule } from '../core/store/flat-lookup/flat-lookup-store.module';
import { FlatListComponent } from './components/flat-list/flat-list.component';
import { FlatComponent } from './containers/flat/flat.component';
import { FlatDetailsComponent } from './components/flat-details/flat-details.component';
import { FlattenancyDetailsComponent } from './components/flattenancy-details/flattenancy-details.component';
import { TenantDetailsComponent } from './components/tenant-details/tenant-details.component';
import { FlatStoreModule } from '../core/store/flat/flat-store.module';
import { AssignTenantDialogComponent } from './components/assign-tenant-dialog/assign-tenant-dialog.component';
import { CreateBillDialogComponent } from './components/create-bill-dialog/create-bill-dialog.component';
import { BillingHistoryComponent } from './components/billing-history/billing-history.component';
import { BillStoreModule } from '../core/store/bill/bill-store.module';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const MaterialImports = [
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatTabsModule,
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatExpansionModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    OwnerComponent,
    DashboardComponent,
    NavbarComponent,
    ApartmentsComponent,
    ApartmentListComponent,
    ApartmentDetailsComponent,
    FlatListComponent,
    FlatComponent,
    FlatDetailsComponent,
    FlattenancyDetailsComponent,
    TenantDetailsComponent,
    AssignTenantDialogComponent,
    CreateBillDialogComponent,
    BillingHistoryComponent,
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    ApartmentStoreModule,
    FormsModule,
    FlatLookupStoreModule,
    FlatStoreModule,
    BillStoreModule,
    MaterialImports,
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
})
export class OwnerModule {}
