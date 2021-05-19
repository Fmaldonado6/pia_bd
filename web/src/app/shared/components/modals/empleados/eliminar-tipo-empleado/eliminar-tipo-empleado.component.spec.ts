import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoEmpleadoComponent } from './eliminar-tipo-empleado.component';

describe('EliminarTipoEmpleadoComponent', () => {
  let component: EliminarTipoEmpleadoComponent;
  let fixture: ComponentFixture<EliminarTipoEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTipoEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTipoEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
