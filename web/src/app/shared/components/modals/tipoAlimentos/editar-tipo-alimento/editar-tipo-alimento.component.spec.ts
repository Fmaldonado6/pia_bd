import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoAlimentoComponent } from './editar-tipo-alimento.component';

describe('EditarTipoAlimentoComponent', () => {
  let component: EditarTipoAlimentoComponent;
  let fixture: ComponentFixture<EditarTipoAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoAlimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipoAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
