import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
// import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';

import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
    // AppBootstrapModule
  ],
  providers: [Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
