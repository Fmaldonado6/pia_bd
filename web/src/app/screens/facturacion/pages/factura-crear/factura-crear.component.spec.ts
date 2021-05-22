import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaCrearComponent } from './factura-crear.component';

describe('FacturaCrearComponent', () => {
  let component: FacturaCrearComponent;
  let fixture: ComponentFixture<FacturaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
