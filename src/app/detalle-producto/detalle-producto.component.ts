import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, share} from "rxjs";
import {Producto} from "../modelos/producto";
import {ActivatedRoute} from '@angular/router';
import {ServicioStorage} from "../servicios/servicioStorage";
import {ServicioProductos} from "../servicios/servicioProductos";

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  productos: Producto[] = [];
  id: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private servicioStorage: ServicioStorage, private servicioProductos: ServicioProductos) {
    this.loadImages();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = params.id;

    });
  }

  loadImages(): void {

    //por lo que entendi lo saca del json y lo guarda en un array posteriormente se usara la bdd
    let respuesta: Observable<Producto[]> = this.servicioProductos.getTodosLosProducts()
      .pipe(share());
    respuesta.subscribe(
      value => {
        console.log(value);
        this.productos = value;
      },
      error => {
        console.log('ocurrio un error');
      });

  }

  addToCart(imagen: Producto): void {

    this.servicioStorage.agregarProductoAlCarrito(imagen)

    console.log('Imagen agregada al carrito:', imagen);

  }


}
