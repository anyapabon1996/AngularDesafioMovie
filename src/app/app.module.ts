import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { InfoComponent } from './components/info/info.component';
import { CartComponent } from './components/cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //importamos libreria correspondiente
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MoviesComponent,
    InfoComponent,
    CartComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, //Vamos a trabajar con formulario reactivo
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, // aqui viene del export del material module
    HttpClientModule, //Importamos el módulo de HTTP client, para los método get, put, post and delete
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
