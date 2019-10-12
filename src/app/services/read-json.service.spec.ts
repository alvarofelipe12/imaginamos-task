import { TestBed } from '@angular/core/testing';

import { ReadJsonService } from './read-json.service';

describe('ReadJsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadJsonService = TestBed.get(ReadJsonService);
    expect(service).toBeTruthy();
  });
});
