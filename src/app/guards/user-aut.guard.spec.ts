import { TestBed } from '@angular/core/testing';

import { UserAutGuard } from './user-aut.guard';

describe('UserAutGuard', () => {
  let guard: UserAutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
