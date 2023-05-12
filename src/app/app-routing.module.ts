import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DetalleProductoComponent} from "./detalle-producto/detalle-producto.component";
import {HomeDosComponent} from "./home-dos/home-dos.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'',component:HomeDosComponent},
  { path: 'detalle-producto', component: DetalleProductoComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
