import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { User } from "./components/request/models/user.model";
import { CookieService } from 'ngx-cookie-service';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { ApartmentComponent } from './components/apartment/apartment.component';
import { AddApartmentComponent } from './components/add-apartment/add-apartment.component';
import { UpdateApartmentComponent } from './components/update-apartment/update-apartment.component';

const appRoutes: Routes =[
  { path: '', component: MainComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'about', component: AboutComponent},
  { path: 'apartment', component: ApartmentComponent},
  { path: 'add-apartment', component: AddApartmentComponent},
  { path: 'update', component: UpdateApartmentComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainComponent,
    LoginComponent,
    ProfileComponent,
    AboutComponent,
    ApartmentComponent,
    AddApartmentComponent,
    UpdateApartmentComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    User,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
