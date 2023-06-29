import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, share} from "rxjs";
import {Producto} from "../modelos/producto";
import {Router} from "@angular/router";
import {ServicioStorage} from "../servicios/servicioStorage";
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from '../modelos/respuesta';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {


  images: Producto[] = [];

  constructor(private http: HttpClient, protected router:Router, private servicioStorage: ServicioStorage, private toastr: ToastrService) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    this.images = this.servicioStorage.getTodosLosProductosDelCarrito();

  }

  confirmPurchase(){

    if(confirm("Estas seguro de realizar la compra?")) {
      
      this.http.post<Respuesta>('http://localhost:3000/grabarCompra', this.images).subscribe(
        (response) => {          
          this.toastr.info('Compra realizada con exito', response.resp, {
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
            timeOut: 5000,
            tapToDismiss: false
          });      

          this.cleanPurchase();
          this.router.navigate(['/tienda-arte']);



        },
        (error) => {
          console.error(error);
        }
      );      
    }
  }

  cleanPurchase() {
    this.images = [];
    this.servicioStorage.actualizarCarrito(this.images);
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
