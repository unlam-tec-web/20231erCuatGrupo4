import {Component, OnInit} from '@angular/core';
import {ServicioStorage} from "../servicios/servicioStorage";
import { Router } from '@angular/router';
import { ServicioUsuario } from '../servicios/servicioUsuario';

@Component({
  selector: 'app-navbar-productos',
  templateUrl: './navbar-productos.component.html',
  styleUrls: ['./navbar-productos.component.css']
})
export class NavbarProductosComponent implements OnInit{
  estaLogueado: boolean = false;
  cantidadItems: string = '';

  constructor(private servicioStorage: ServicioStorage,
              private servicioUsuario: ServicioUsuario,
              private router: Router) {
  }

  ngOnInit(): void {

    this.getTotalCarrito();

  }

  getTotalCarrito(): string{
    return  this.servicioStorage.getCantidadProductosEnCarrito()
  }

  usuarioLogueado(): boolean{
    return this.servicioUsuario.estaLogueado();
  }


  logOut() {
    this.servicioStorage.eliminarCarritoTemporal();
    localStorage.removeItem('tokenUsuario');
    this.router.navigate(['/login'])
  }


}
