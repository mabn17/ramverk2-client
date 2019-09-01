import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { AboutComponent } from './about/about.component';

import { UserService } from './services/user/user.service';
import { HttpService } from './services/http/http.service';
import { SocketService } from './services/socket/socket.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddReportComponent } from './add-report/add-report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';

import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportsComponent,
    ReportDetailsComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    AddReportComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ChatModule,
    MaterialModule
  ],
  providers: [
    HttpService,
    SocketService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
