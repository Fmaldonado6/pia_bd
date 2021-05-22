import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaVerComponent } from './factura-ver.component';

describe('FacturaVerComponent', () => {
  let component: FacturaVerComponent;
  let fixture: ComponentFixture<FacturaVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
