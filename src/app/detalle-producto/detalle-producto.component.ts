import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, share} from "rxjs";
import {Producto} from "./producto";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  productos: Producto[] = [];
  id: number;




    constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.loadImages();
  }
    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            this.id = params.id;

        });
    }

  loadImages(): void {

    //por ahora se cargan de un sitio random.
    //por lo que entendi lo saca del json y lo guarda en un array posteriormente se usara la bdd
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
            alert('el producto ya esta en el carrito');
        } else {
            productosCarrito.push(imagen);
            alert('se agrego el producto al carrito');
        }

        localStorage.setItem('carritoArte', JSON.stringify(productosCarrito));

        console.log('Imagen agregada al carrito:', imagen);

    }




}
