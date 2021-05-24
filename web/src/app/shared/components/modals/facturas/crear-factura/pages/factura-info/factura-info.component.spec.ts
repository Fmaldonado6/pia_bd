import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaInfoComponent } from './factura-info.component';

describe('FacturaInfoComponent', () => {
  let component: FacturaInfoComponent;
  let fixture: ComponentFixture<FacturaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
