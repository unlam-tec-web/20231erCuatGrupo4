import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {
  nombre: string;
  precio: number;
  imageUrl: string;
  descripcion: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: any) => {
      this.nombre = params.nombre;
      this.precio = params.precio;
      this.imageUrl = params.imageUrl;

      this.descripcion = params.descripcion;
    });
  }
}
