import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProducto } from './crear-producto.component';

describe('CrearProducto', () => {
  let component: CrearProducto;
  let fixture: ComponentFixture<CrearProducto>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearProducto],
    });
    fixture = TestBed.createComponent(CrearProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
