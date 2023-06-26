import {Injectable} from "@angular/core";
import {Producto} from "../modelos/producto";
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../modelos/usuario";
import {Respuesta} from "../modelos/respuesta";

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuario {

  constructor(private httpCliente: HttpClient) {}

  login(usuario: { password: string; username: string }){

    return this.httpCliente.post<Respuesta>('http://localhost:3000/login',usuario);

  }

  registrar(usuario: { password: string; email: string; username: string }) {

    return this.httpCliente.post<Respuesta>('http://localhost:3000/registrar',usuario);

  }
}
