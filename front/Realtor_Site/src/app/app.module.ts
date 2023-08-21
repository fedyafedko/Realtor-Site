import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import {NgOptimizedImage} from "@angular/common";

const appRoutes: Routes =[
  { path: '', component: MainComponent},
  { path: 'register', component: RegisterComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
