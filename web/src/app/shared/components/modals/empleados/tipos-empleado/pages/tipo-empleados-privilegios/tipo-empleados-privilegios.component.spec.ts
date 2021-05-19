import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEmpleadosPrivilegiosComponent } from './tipo-empleados-privilegios.component';

describe('TipoEmpleadosPrivilegiosComponent', () => {
  let component: TipoEmpleadosPrivilegiosComponent;
  let fixture: ComponentFixture<TipoEmpleadosPrivilegiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEmpleadosPrivilegiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEmpleadosPrivilegiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
