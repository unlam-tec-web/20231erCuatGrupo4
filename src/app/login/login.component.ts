import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formSignin: FormGroup;
  mensaje: string;

  constructor(protected router:Router, protected httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.mensaje="";
  }

  ngOnInit(): void {
    this.formSignin = this.formBuilder.group({
      email: new FormControl('',  Validators.required),
      password: new FormControl('',  Validators.required),
    });
  }

  ingresar(){
    if (this.formSignin.get('email')?.value == "usuario@test.com")
    {
      this.router.navigate(['/home'])
    }else {
      this.mensaje = "Acceso Invalido";
    }
  }



}
