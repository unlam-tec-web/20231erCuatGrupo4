import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { LoginComponent } from './login/login.component';
import { TiendaArteComponent } from './tienda-arte/tienda-arte.component';
import { CarritoComponent } from './carrito/carrito.component';
import { RegistroComponent } from './registro/registro.component';
import { CrearProductoModule } from './crear-producto/crear-producto.module';
import { NavbarProductosComponent } from './navbar-productos/navbar-productos.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DetalleProductoComponent,
    LoginComponent,
    TiendaArteComponent,
    CarritoComponent,
    RegistroComponent,
    NavbarProductosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CrearProductoModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
