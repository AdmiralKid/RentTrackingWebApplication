import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentDetailsComponent } from './containers/apartment-details/apartment-details.component';
import { ApartmentsComponent } from './containers/apartments/apartments.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { OwnerComponent } from './owner.component';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'apartment/:apartmentId', component: ApartmentDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
