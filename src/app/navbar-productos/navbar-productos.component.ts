import {Component, OnInit} from '@angular/core';
import {ServicioStorage} from "../servicios/servicioStorage";

@Component({
  selector: 'app-navbar-productos',
  templateUrl: './navbar-productos.component.html',
  styleUrls: ['./navbar-productos.component.css']
})
export class NavbarProductosComponent implements OnInit{

  cantidadProductos: string;

  constructor(private servicioStorage: ServicioStorage) {
  }

  ngOnInit(): void {
  }

  getTotalCarrito(): string{
    return this.servicioStorage.getCantidadProductosEnCarrito()
  }
}
