import { TestBed, inject } from '@angular/core/testing';

import { AlmacenDatosService } from './almacen-datos.service';

describe('AlmacenDatosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlmacenDatosService]
    });
  });

  it('should be created', inject([AlmacenDatosService], (service: AlmacenDatosService) => {
    expect(service).toBeTruthy();
  }));
});
