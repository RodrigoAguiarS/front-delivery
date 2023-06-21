import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home/home.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { HeaderComponent } from './components/header/header/header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { LoginCreateComponent } from './components/login/login-create/login-create.component';
import { LoginRecuperarComponent } from './components/login/login-recuperar/login-recuperar.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LoginCreateComponent,
    LoginRecuperarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzIconModule,
    HttpClientModule,
    NzCardModule,
    NzMessageModule,
    NzPageHeaderModule

  ],
  providers: [NzIconService],
  bootstrap: [AppComponent]
})
export class AppModule { }
