import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearProductoComponent } from './crear-producto.component';

@NgModule({
  declarations: [CrearProductoComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CrearProductoModule {}
