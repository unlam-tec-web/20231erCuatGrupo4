import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, share} from "rxjs";
import {Producto} from "../modelos/producto";
import {Router} from "@angular/router";
import {ServicioStorage} from "../servicios/servicioStorage";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {

  images: Producto[] = [];

  constructor(private http: HttpClient, protected router:Router, private servicioStorage: ServicioStorage) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    this.images = this.servicioStorage.getTodosLosProductosDelCarrito();

  }

  confirmPurchase(){

    if(confirm("Estas seguro de realizar la compra?")) {
      alert("Compra realizada con exito");
      this.router.navigate(['/tienda-arte'])
    }

  }

  deletItem(id: string){

    this.images = this.images.filter(  image => image.Id != id);

    this.servicioStorage.actualizarCarrito(this.images);

    /* const index = products.findIndex(product => product.product_id === productId);
    if (index > -1) {
        products.splice(index, 1);
    } */
    //localStorage.removeItem('carritoArte', JSON.stringify(this.images));

  }
}
