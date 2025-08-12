import { JwtAuthGuard } from './authguard.guard';

describe('AuthguardGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
