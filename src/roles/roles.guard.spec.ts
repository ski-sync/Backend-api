import { RoleGuard } from './roles.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new RoleGuard()).toBeDefined();
  });
});
