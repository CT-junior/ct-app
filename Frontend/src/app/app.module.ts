import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { UserComponent } from './user/user.component';

import { AuthService } from './user/login/auth.service';
import { AuthGuard } from './guards/auth.guard';


import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';

import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    AlertModalComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    FormsModule,
    CommonModule,
    SidebarModule.forRoot()
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
