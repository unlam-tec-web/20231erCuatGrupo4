import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {Observable, share} from "rxjs";
import {Producto} from "../modelos/producto";
import {ServicioStorage} from "../servicios/servicioStorage";
import {ServicioProductos} from "../servicios/servicioProductos";
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-tienda-arte',
  templateUrl: './tienda-arte.component.html',
  styleUrls: ['./tienda-arte.component.css']
})

export class TiendaArteComponent implements OnInit{

  productos: Producto[] = [];
  imagenSeleccionada: Producto;

  constructor(private http: HttpClient, private servicioStorage: ServicioStorage,
              private servicioProductos: ServicioProductos,private toastr: ToastrService,
              private modalService: NgbModal) {
    this.loadImages();
  }

  ngOnInit(): void {

  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.servicioStorage.eliminarCarritoTemporal();
    localStorage.removeItem('tokenUsuario');
  }

  loadImages(): void {

    let respuesta: Observable<Producto[]> = this.servicioProductos.getTodosLosProducts()
        .pipe(share());
    respuesta.subscribe(
      value=> {

        this.productos = value;

        this.actualizarEstado();
      },
      error => {
        console.log('ocurrio un error');
      });
  }

  addToCart(imagen: Producto): void {

    imagen.EnCarrito=true;

    this.servicioStorage.agregarProductoAlCarrito(imagen)

    this.toastr.info('Producto agregado al Carrito','', {
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
      tapToDismiss: false
    });

  }

  actualizarEstado(){

    const carrito = this.servicioStorage.getTodosLosProductosDelCarrito();

    for(const producto of this.productos)
    {
      producto.EnCarrito = carrito.some(item => item.Id == producto.Id);
    }
  }


}
