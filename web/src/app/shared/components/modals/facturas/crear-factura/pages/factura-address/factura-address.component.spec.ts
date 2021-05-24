import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAddressComponent } from './factura-address.component';

describe('FacturaAddressComponent', () => {
  let component: FacturaAddressComponent;
  let fixture: ComponentFixture<FacturaAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
