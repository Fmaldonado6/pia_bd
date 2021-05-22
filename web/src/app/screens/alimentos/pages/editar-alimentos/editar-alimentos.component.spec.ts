import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlimentosComponent } from './editar-alimentos.component';

describe('EditarAlimentosComponent', () => {
  let component: EditarAlimentosComponent;
  let fixture: ComponentFixture<EditarAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
