import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAlimentosComponent } from './eliminar-alimentos.component';

describe('EliminarAlimentosComponent', () => {
  let component: EliminarAlimentosComponent;
  let fixture: ComponentFixture<EliminarAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAlimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
