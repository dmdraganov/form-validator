import { validateInn } from '../../src/features/innValidation';

describe('INN Validation', () => {
  it('should return true for a valid 10-digit INN', () => {
    expect(validateInn('7707083893')).toBe(true);
  });

  it('should return false for an invalid 10-digit INN', () => {
    expect(validateInn('7707083894')).toBe(false);
  });

  it('should return true for a valid 12-digit INN', () => {
    expect(validateInn('500100732259')).toBe(true);
  });

  it('should return false for an invalid 12-digit INN', () => {
    expect(validateInn('770730419051')).toBe(false);
  });

  it('should return false for an INN with incorrect length', () => {
    expect(validateInn('123')).toBe(false);
  });

  it('should return false for an INN with non-digit characters', () => {
    expect(validateInn('123a')).toBe(false);
  });
});
