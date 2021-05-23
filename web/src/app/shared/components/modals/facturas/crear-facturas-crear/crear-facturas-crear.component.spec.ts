import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFacturasCrearComponent } from './crear-facturas-crear.component';

describe('CrearFacturasCrearComponent', () => {
  let component: CrearFacturasCrearComponent;
  let fixture: ComponentFixture<CrearFacturasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFacturasCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFacturasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
