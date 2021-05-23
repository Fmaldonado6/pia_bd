import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAlimentoComponent } from './eliminar-alimento.component';

describe('EliminarAlimentoComponent', () => {
  let component: EliminarAlimentoComponent;
  let fixture: ComponentFixture<EliminarAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAlimentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
