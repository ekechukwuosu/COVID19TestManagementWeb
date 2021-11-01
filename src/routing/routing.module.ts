import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../app/pages/views/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from '../app/pages/views/administration/administration.component';
import { BookingComponent } from '../app/pages/views/booking/booking.component';
import { ReportingComponent } from '../app/pages/views/reporting/reporting.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdministrationComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'reporting', component: ReportingComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }

