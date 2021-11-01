import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule } from '../routing/routing.module';
import { HomeComponent } from './pages/views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './pages/views/navigation/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { AdministrationComponent } from './pages/views/administration/administration.component';
import { BookingComponent } from './pages/views/booking/booking.component';
import { ReportingComponent } from './pages/views/reporting/reporting.component';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AdministrationComponent,
    BookingComponent,
    ReportingComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
		FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
   MatNativeDateModule,
    

  ], exports: [
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
		FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule  
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
