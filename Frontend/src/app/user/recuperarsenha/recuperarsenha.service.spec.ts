import { TestBed } from '@angular/core/testing';

import { RecuperarsenhaService } from './recuperarsenha.service';

describe('RecuperarsenhaService', () => {
  let service: RecuperarsenhaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarsenhaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
