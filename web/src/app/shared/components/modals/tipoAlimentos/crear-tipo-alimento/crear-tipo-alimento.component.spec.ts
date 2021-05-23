import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoAlimentoComponent } from './crear-tipo-alimento.component';

describe('CrearTipoAlimentoComponent', () => {
  let component: CrearTipoAlimentoComponent;
  let fixture: ComponentFixture<CrearTipoAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTipoAlimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTipoAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
