import {Injectable} from "@angular/core";
import {Producto} from "../modelos/producto";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServicioProductos {

  constructor(private httpCliente: HttpClient) {}

  getTodosLosProducts(){
    return this.httpCliente.get<Producto[]>('http://localhost:3000/getImagenes')
  }

}

