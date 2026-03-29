import { calculatePasswordStrength } from '../../src/features/passwordStrength.js';

describe('calculatePasswordStrength', () => {
  it('should return 0 for an empty password', () => {
    expect(calculatePasswordStrength('')).toBe(0);
  });

  it('should return 1 for a short password', () => {
    expect(calculatePasswordStrength('abc')).toBe(1);
  });

  it('should return 2 for a password with length and lowercase', () => {
    expect(calculatePasswordStrength('abcdefghi')).toBe(2);
  });

  it('should return 3 for a password with length, lowercase and uppercase', () => {
    expect(calculatePasswordStrength('Abcdefghi')).toBe(3);
  });

  it('should return 4 for a password with length, lowercase, uppercase and numbers', () => {
    expect(calculatePasswordStrength('Abcdefghi1')).toBe(4);
  });

  it('should return 5 for a strong password', () => {
    expect(calculatePasswordStrength('Abcdefghi1!')).toBe(5);
  });
});
