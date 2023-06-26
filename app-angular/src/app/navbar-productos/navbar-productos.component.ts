import {Component, OnInit} from '@angular/core';
import {ServicioStorage} from "../servicios/servicioStorage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-productos',
  templateUrl: './navbar-productos.component.html',
  styleUrls: ['./navbar-productos.component.css']
})
export class NavbarProductosComponent implements OnInit{


  constructor(private servicioStorage: ServicioStorage, private router: Router) {
  }

  ngOnInit(): void {
  }

  getTotalCarrito(): string{
    return this.servicioStorage.getCantidadProductosEnCarrito()
  }

  logOut() {
    this.router.navigate(['/login'])
  }


}
