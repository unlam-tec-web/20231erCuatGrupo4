import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {Observable, share} from "rxjs";
import {Imagenes} from "./imagenes";

interface Image {
  url: string;
}

@Component({
  selector: 'app-tienda-arte',
  templateUrl: './tienda-arte.component.html',
  styleUrls: ['./tienda-arte.component.css']
})

export class TiendaArteComponent implements OnInit{
  images: Imagenes[] = [];

  constructor(private http: HttpClient) {
    this.loadImages();
  }

  ngOnInit(): void {
  }

  loadImages(): void {

    //por ahora se cargan de un sitio random.
    //Aca deberia irlas a buscar a la base supongo consumiento nuestra API
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

  addToCart(image: Image): void {
    // Agregar lógica para agregar la imagen al carrito
    console.log('Imagen agregada al carrito:', image);
  }
}
