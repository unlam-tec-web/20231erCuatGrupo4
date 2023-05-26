import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {Observable, share} from "rxjs";
import {Producto} from "./producto";


@Component({
  selector: 'app-tienda-arte',
  templateUrl: './tienda-arte.component.html',
  styleUrls: ['./tienda-arte.component.css']
})

export class TiendaArteComponent implements OnInit{
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    //por ahora se cargan de un sitio random.
    //Aca deberia irlas a buscar a la base supongo consumiento nuestra API
    let res: Observable<Producto[]> =
      this.http.get<Producto[]>('../assets/productos.json')
        .pipe(share());
    res.subscribe(
      value=> {
        console.log(value);
        this.productos = value;
      },
      error => {
        console.log('ocurrio un error');

      });
  }

  addToCart(imagen: Producto): void {

    const productosCarrito: Producto[] = JSON.parse(localStorage.getItem('carritoArte') ?? '[]');

    if (productosCarrito.some(Producto => Producto.Id === imagen.Id)) {
      console.log('El producto ya existe en el array');
    } else {
      productosCarrito.push(imagen);
    }

    localStorage.setItem('carritoArte', JSON.stringify(productosCarrito));

    console.log('Imagen agregada al carrito:', imagen);

  }



}
