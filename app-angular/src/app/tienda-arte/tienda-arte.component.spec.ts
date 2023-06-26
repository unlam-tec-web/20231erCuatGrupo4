import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaArteComponent } from './tienda-arte.component';

describe('TiendaArteComponent', () => {
  let component: TiendaArteComponent;
  let fixture: ComponentFixture<TiendaArteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiendaArteComponent]
    });
    fixture = TestBed.createComponent(TiendaArteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
