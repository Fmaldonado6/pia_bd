import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlimentosComponent } from './agregar-alimentos.component';

describe('AgregarAlimentosComponent', () => {
  let component: AgregarAlimentosComponent;
  let fixture: ComponentFixture<AgregarAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAlimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
