import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, share} from "rxjs";
import {Producto} from "../tienda-arte/producto";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {

  images: Producto[] = [];

  constructor(private http: HttpClient) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    this.images = JSON.parse(localStorage.getItem('carritoArte') ?? '[]');

    /*let res: Observable<Producto[]> =
      this.http.get<Producto[]>('https://picsum.photos/v2/list?page=2&limit=9')
        .pipe(share());
    res.subscribe(
      value=> {
        this.images = value;
      },
      error => {
        console.log('ocurrio un error');

      });*/
  }

}
