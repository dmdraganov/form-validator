import { validateSnils } from '../../src/features/snilsValidation';

describe('SNILS Validation', () => {
  it('should return true for a valid SNILS', () => {
    expect(validateSnils('112-233-445 95')).toBe(true);
  });

  it('should return false for an invalid SNILS', () => {
    expect(validateSnils('123-456-789 01')).toBe(false);
  });

  it('should return false for a SNILS with incorrect length', () => {
    expect(validateSnils('123')).toBe(false);
  });

  it('should return false for a SNILS with non-digit characters', () => {
    expect(validateSnils('123a')).toBe(false);
  });
});
