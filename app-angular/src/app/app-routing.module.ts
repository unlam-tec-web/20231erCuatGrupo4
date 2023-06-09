import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { LoginComponent } from './login/login.component';
import { TiendaArteComponent } from './tienda-arte/tienda-arte.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import {RegistroComponent} from "./registro/registro.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'detalle-producto/:id', component: DetalleProductoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tienda-arte', component: TiendaArteComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
