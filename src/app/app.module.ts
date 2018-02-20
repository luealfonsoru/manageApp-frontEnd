import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MyMaterialModule } from './app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import {AuthService} from "./services/auth.service";
import {ApiServiceService} from "./services/api-service.service";
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
// import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ToolbarComponent, AppLoginDialog, AppRegisterDialog, AppErrorDialog} from './toolbar/toolbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ToolbarComponent,
    AppLoginDialog,
    AppRegisterDialog,
    AppErrorDialog
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    FormsModule
    // AppBootstrapModule
  ],
  providers: [Angular2TokenService, AuthService, ApiServiceService],
  bootstrap: [AppComponent],
  entryComponents: [AppLoginDialog,AppRegisterDialog,AppErrorDialog]
})
export class AppModule { }
