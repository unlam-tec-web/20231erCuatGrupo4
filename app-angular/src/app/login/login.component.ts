import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, share} from "rxjs";
import {Usuario} from "../modelos/usuario";
import {ServicioUsuario} from "../servicios/servicioUsuario";
import {Respuesta} from "../modelos/respuesta";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignin: FormGroup;
  mensaje: string;

  constructor(protected router: Router, protected httpClient: HttpClient,
              private formBuilder: FormBuilder, private servicioUsuario: ServicioUsuario,
              private toastr: ToastrService) {
    this.mensaje = "";
  }

  ngOnInit(): void {
    this.formSignin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ingresar() {

    const usuario =
      {
        'username': this.formSignin.get('email')?.value,
        'password': this.formSignin.get('password')?.value
      }

    let respuesta: Observable<Respuesta> = this.servicioUsuario.login(usuario).pipe(share());
    respuesta.subscribe(
      value => {

        console.log(value);

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
