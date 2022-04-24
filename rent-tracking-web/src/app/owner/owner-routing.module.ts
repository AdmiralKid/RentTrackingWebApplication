import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsComponent } from './components/apartments/apartments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerComponent } from './owner.component';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'apartment', component: ApartmentsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerRoutingModule {}
