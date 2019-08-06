import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { AboutComponent } from './about/about.component';

import { HttpService } from './services/http/http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportsComponent,
    ReportDetailsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
