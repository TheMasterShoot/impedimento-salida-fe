import { TestBed } from '@angular/core/testing';

import { CiudadanoService } from './ciudadano.service';

describe('LevantamientoSalidaService', () => {
  let service: CiudadanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudadanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
