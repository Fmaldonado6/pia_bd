import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentosCantidadComponent } from './alimentos-cantidad.component';

describe('AlimentosCantidadComponent', () => {
  let component: AlimentosCantidadComponent;
  let fixture: ComponentFixture<AlimentosCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlimentosCantidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
