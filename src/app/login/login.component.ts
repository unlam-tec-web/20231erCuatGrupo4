import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, share} from "rxjs";
import {Usuario} from "../modelos/usuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSignin: FormGroup;
  mensaje: string;

  constructor(protected router: Router, protected httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.mensaje = "";
  }

  ngOnInit(): void {
    this.formSignin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ingresar() {

    let usuarios: Observable<Usuario[]> = this.httpClient.get<Usuario[]>('../assets/usuarios.json')
      .pipe(share());
    usuarios.subscribe(
      value => {

        if (value.some(rec => rec.mail == this.formSignin.get('email')?.value && rec.password == this.formSignin.get('password')?.value)) {
          this.router.navigate(['/tienda-arte'])
        } else {

          this.mensaje = "Acceso Invalido";
        }

      },
      error => {
        console.log('Error al leer los usuarios');

      });
  }

}
