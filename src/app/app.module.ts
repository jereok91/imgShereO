import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccontComponent } from './components/create-accont/create-accont.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Page404Component } from './components/page404/page404.component';
import { HttpClientModule } from "@angular/common/http";
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { CrearPosComponent } from './components/crear-pos/crear-pos.component';

import { ComentService } from "./provider/coment.service";
import { UserService } from "./provider/user.service";
import { PostService } from "./provider/post.service";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccontComponent,
    HomeComponent,
    Page404Component,
    CabeceraComponent,
    CrearPosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    ComentService, 
    PostService, 
    UserService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
