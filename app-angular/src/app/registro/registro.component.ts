import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, share} from "rxjs";
import {ServicioUsuario} from "../servicios/servicioUsuario";
import {Respuesta} from "../modelos/respuesta";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formSignUp: FormGroup;
  mensaje: string;
  submitted = false;

  constructor(protected router: Router, protected httpClient: HttpClient,
              private formBuilder: FormBuilder, private servicioUsuario: ServicioUsuario,
              private toastr: ToastrService) {
    this.mensaje = "";
  }

  ngOnInit(): void {
    this.formSignUp = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formSignUp.controls;
  }

  registrar() {


    this.submitted = true;

    if (this.formSignUp.invalid) {
      Object.values(this.formSignUp.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

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

          this.toastr.info('Por favor revise su casilla de mail para confirmar el registro de su usuario','Gracias por Registrarse!', {
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
            timeOut: 5000,
            tapToDismiss: false
          });

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
