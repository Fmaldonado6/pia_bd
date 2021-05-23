import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlimentosComponent } from './ver-alimentos.component';

describe('VerAlimentosComponent', () => {
  let component: VerAlimentosComponent;
  let fixture: ComponentFixture<VerAlimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAlimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
