import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposEmpleadoComponent } from './tipos-empleado.component';

describe('TiposEmpleadoComponent', () => {
  let component: TiposEmpleadoComponent;
  let fixture: ComponentFixture<TiposEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposEmpleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
