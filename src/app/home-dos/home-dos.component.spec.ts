import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDosComponent } from './home-dos.component';

describe('HomeDosComponent', () => {
  let component: HomeDosComponent;
  let fixture: ComponentFixture<HomeDosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDosComponent]
    });
    fixture = TestBed.createComponent(HomeDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
