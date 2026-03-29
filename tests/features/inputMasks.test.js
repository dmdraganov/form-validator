import { applyPhoneMask } from '../../src/features/inputMasks.js';

describe('Input Masks', () => {
  it('should apply a phone mask to a string', () => {
    const event = {
      target: {
        value: '79991234567',
      },
    };
    applyPhoneMask(event);
    expect(event.target.value).toBe('+7(999)123-45-67');
  });

  it('should handle partial input', () => {
    const event = {
      target: {
        value: '7999',
      },
    };
    applyPhoneMask(event);
    expect(event.target.value).toBe('+7(999');
  });
});
