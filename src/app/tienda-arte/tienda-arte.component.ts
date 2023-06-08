import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {Observable, share} from "rxjs";
import {Producto} from "../modelos/producto";
import {ServicioStorage} from "../servicios/servicioStorage";
import {ServicioProductos} from "../servicios/servicioProductos";


@Component({
  selector: 'app-tienda-arte',
  templateUrl: './tienda-arte.component.html',
  styleUrls: ['./tienda-arte.component.css']
})

export class TiendaArteComponent implements OnInit{
  productos: Producto[] = [];

  constructor(private http: HttpClient, private servicioStorage: ServicioStorage, private servicioProductos: ServicioProductos) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    let respuesta: Observable<Producto[]> = this.servicioProductos.getTodosLosProducts()
        .pipe(share());
    respuesta.subscribe(
      value=> {
        console.log(value);
        this.productos = value;
      },
      error => {
        console.log('ocurrio un error');
      });
  }

  addToCart(imagen: Producto): void {

    this.servicioStorage.agregarProductoAlCarrito(imagen)

    console.log('Producto agregado al carrito:', imagen);


  }



}
