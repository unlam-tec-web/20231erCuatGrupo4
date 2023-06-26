import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
    private sanitizer: DomSanitizer
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
    this.http.get('assets/productos.json').subscribe((data: any) => {
      this.productos = data.Productos;
      console.log(this.productos);
    });
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
      const nuevoId =
        this.productos.length > 0
          ? parseInt(this.productos[this.productos.length - 1].Id) + 1
          : 1;
      const nombreImagen = nuevoId.toString() + '.png';

      const nuevoProducto = {
        Id: nuevoId.toString(),
        Nombre: this.productoForm.value.nombre,
        Descripcion: this.productoForm.value.descripcion,
        Clasificacion: this.productoForm.value.clasificacion,
        Precio: this.productoForm.value.precio,
        ImageUrl: '/assets/imagenes/' + nombreImagen,
      };

      this.productos.push(nuevoProducto);
      console.log('Prudcto agregado');
      console.log(this.productos);
      // TODO: Guardar la imagen y json en el servidor
      this.productoForm.reset();
      this.imageUrl = null;
      this.selectedImage = null;
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
