import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoAlimentoComponent } from './eliminar-tipo-alimento.component';

describe('EliminarTipoAlimentoComponent', () => {
  let component: EliminarTipoAlimentoComponent;
  let fixture: ComponentFixture<EliminarTipoAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarTipoAlimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTipoAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
