import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    RouterModule,
    
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
