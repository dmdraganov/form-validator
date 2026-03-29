import { validateInn, applyInnMask } from '../../src/features/innValidation';

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

describe('INN Mask', () => {
  it('should apply a 10-digit INN mask to a string', () => {
    const event = {
      target: {
        value: '1234567890',
      },
    } as unknown as Event;
    applyInnMask(event);
    expect((event.target as HTMLInputElement).value).toBe('12-345-678-90');
  });

  it('should apply a 12-digit INN mask to a string', () => {
    const event = {
      target: {
        value: '123456789012',
      },
    } as unknown as Event;
    applyInnMask(event);
    expect((event.target as HTMLInputElement).value).toBe('1234-567890-12');
  });

  it('should handle partial 10-digit INN input', () => {
    const event = {
      target: {
        value: '12345',
      },
    } as unknown as Event;
    applyInnMask(event);
    expect((event.target as HTMLInputElement).value).toBe('12-345');
  });

  it('should handle partial 12-digit INN input (interpreted as 10-digit mask)', () => {
    const event = {
      target: {
        value: '1234567',
      },
    } as unknown as Event;
    applyInnMask(event);
    expect((event.target as HTMLInputElement).value).toBe('12-345-67');
  });
});
