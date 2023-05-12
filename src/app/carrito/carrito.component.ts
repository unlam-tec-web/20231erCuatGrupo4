import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, share} from "rxjs";
import {Imagenes} from "../tienda-arte/imagenes";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent {

  images: Imagenes[] = [];

  constructor(private http: HttpClient) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    let res: Observable<Imagenes[]> =
      this.http.get<Imagenes[]>('https://picsum.photos/v2/list?page=2&limit=9')
        .pipe(share());
    res.subscribe(
      value=> {
        this.images = value;
      },
      error => {
        console.log('ocurrio un error');

      });
  }

}
