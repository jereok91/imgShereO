import { TestBed } from '@angular/core/testing';

import { UserNoAutGuard } from './user-no-aut.guard';

describe('UserNoAutGuard', () => {
  let guard: UserNoAutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNoAutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
