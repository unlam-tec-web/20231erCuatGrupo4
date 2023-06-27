import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';
import {Observable, share} from "rxjs";
import {ServicioUsuario} from "../servicios/servicioUsuario";
import {Respuesta} from "../modelos/respuesta";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formSignin: FormGroup = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl(''),

    }
  );
  submitted = false;
  mensaje: string;

  constructor(protected router: Router, protected httpClient: HttpClient,
              private formBuilder: FormBuilder, private servicioUsuario: ServicioUsuario) {
    this.mensaje = "";
  }

  ngOnInit(): void {

    this.formSignin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSignin.controls;
  }

  ingresar() {

    this.submitted = true;

    if (this.formSignin.invalid) {
      Object.values(this.formSignin.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

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
        this.mensaje = 'Error al leer los usuarios';

      });
  }

}
