import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { HomeDosComponent } from './home-dos/home-dos.component';
import { LoginComponent } from './login/login.component';
import { TiendaArteComponent } from './tienda-arte/tienda-arte.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RegistroComponent } from './registro/registro.component';
import { CrearProductoModule } from './crear-producto/crear-producto.module';
@NgModule({
  declarations: [
    AppComponent,
    DetalleProductoComponent,
    HomeDosComponent,
    LoginComponent,
    TiendaArteComponent,
    CarritoComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CrearProductoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
