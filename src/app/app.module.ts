import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { HomeDosComponent } from './home-dos/home-dos.component';
import { LoginComponent } from './login/login.component';
import { TiendaArteComponent } from './tienda-arte/tienda-arte.component';

@NgModule({
  declarations: [
    AppComponent,
    DetalleProductoComponent,
    HomeDosComponent,
    LoginComponent,
    TiendaArteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
