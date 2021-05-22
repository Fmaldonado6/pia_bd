import { TestBed } from '@angular/core/testing';

import { TiposAlimentosService } from './tipos-alimentos.service';

describe('TiposAlimentosService', () => {
  let service: TiposAlimentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposAlimentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
