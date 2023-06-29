import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})

export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  productos: any[] = [];
  imageUrl: SafeResourceUrl | null = null;
  selectedImage: File | null = null;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route:  ActivatedRoute,
    private router: Router,

  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      imagen: [
        '',
        Validators.compose([
          Validators.required,
          this.validateImage.bind(this),
        ]),
      ],
    });
  }

  ngOnInit() {

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          reader.result as string
        );
        this.productoForm.get('imagen')?.setValue(file); // Establecer el valor del control 'imagen'
      };
    }
  }

  agregarProducto() {
    if (this.productoForm.valid && this.selectedImage) {

      const formData = new FormData();
      formData.append('nombre', this.productoForm.value.nombre);
      formData.append('descripcion', this.productoForm.value.descripcion);
      formData.append('precio', this.productoForm.value.precio);
      formData.append('imagen', this.selectedImage);

      this.http.post('http://localhost:3000/generarNuevoProducto', formData).subscribe(
        (response) => {
          console.log(response);

          this.productoForm.reset();
          this.imageUrl = null;
          this.selectedImage = null;

          this.router.navigate(['/tienda-arte'])

        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  validateImage(control: AbstractControl) {
    const file: File = control.value;
    this.error = '';
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;
      const allowedExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxFileSize = 10 * 1024 * 1024; // 10MB

      if (!allowedExtensions.includes(fileType)) {
        this.error = 'El archivo no es una imagen válida';
        return {
          invalidExtension: true,
        };
      }

      if (fileSize > maxFileSize) {
        this.error = 'El archivo es demasiado grande';
        return {
          invalidSize: true,
        };
      }
    }

    return null;
  }
}
