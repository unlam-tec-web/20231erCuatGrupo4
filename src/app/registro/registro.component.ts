import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, share} from "rxjs";
import {ServicioUsuario} from "../servicios/servicioUsuario";
import {Respuesta} from "../modelos/respuesta";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formSignUp: FormGroup;
  mensaje: string;

  constructor(protected router: Router, protected httpClient: HttpClient, private formBuilder: FormBuilder, private servicioUsuario: ServicioUsuario) {
    this.mensaje = "";
  }

  ngOnInit(): void {
    this.formSignUp = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  registrar() {

    const usuario =
      {
        'username': this.formSignUp.get('username')?.value,
        'email': this.formSignUp.get('email')?.value,
        'password': this.formSignUp.get('password')?.value
      }

    let respuesta: Observable<Respuesta> = this.servicioUsuario.registrar(usuario).pipe(share());
    respuesta.subscribe(
      value => {

        if (value.resp == "OK") {
          this.router.navigate(['/tienda-arte'])
        } else {

          this.mensaje = value.resp;
        }

      },
      error => {
        console.log('Error al leer los usuarios');

      });
  }

}
