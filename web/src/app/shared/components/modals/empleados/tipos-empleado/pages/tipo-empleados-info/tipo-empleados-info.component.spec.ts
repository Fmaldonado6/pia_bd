import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpleadosInfoComponent } from './tipo-empleados-info.component';

describe('TipoEmpleadosInfoComponent', () => {
  let component: TipoEmpleadosInfoComponent;
  let fixture: ComponentFixture<TipoEmpleadosInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpleadosInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpleadosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
