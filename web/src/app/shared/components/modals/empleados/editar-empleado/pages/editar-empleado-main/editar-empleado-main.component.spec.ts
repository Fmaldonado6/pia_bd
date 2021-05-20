import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleadoMainComponent } from './editar-empleado-main.component';

describe('EditarEmpleadoMainComponent', () => {
  let component: EditarEmpleadoMainComponent;
  let fixture: ComponentFixture<EditarEmpleadoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEmpleadoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEmpleadoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
