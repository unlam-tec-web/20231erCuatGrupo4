import {Injectable} from "@angular/core";
import {Producto} from "../modelos/producto";

@Injectable({
  providedIn: 'root'
})
export class ServicioStorage {

  constructor() {}

  agregarProductoAlCarrito(producto: Producto) {
    const productosCarrito: Producto[] = JSON.parse(localStorage.getItem('carritoArte') ?? '[]');

/*
    if (productosCarrito.some(p => p.Id === producto.Id)) {
      alert('El producto ya está en el carrito');
    } else {
*/
      productosCarrito.push(producto);
/*      alert('Se agregó el producto al carrito');
    }*/

    localStorage.setItem('carritoArte', JSON.stringify(productosCarrito));

  }

  getTodosLosProductosDelCarrito = (): Producto[] => JSON.parse(localStorage.getItem('carritoArte') ?? '[]');

  actualizarCarrito = (productos: Producto[]): void => localStorage.setItem('carritoArte', JSON.stringify(productos));

  getCantidadProductosEnCarrito = (): string => this.getTodosLosProductosDelCarrito().length.toString();

  eliminarCarritoTemporal = (): void => localStorage.removeItem('carritoArte');

}

